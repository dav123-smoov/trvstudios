export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { passcode, title, client, category, description, highlights, coverImage, galleryImages } = req.body;

    // 1. Verify Passcode
    const adminPasscode = process.env.ADMIN_PASSCODE?.trim();
    if (!adminPasscode) {
      return res.status(500).json({ error: 'ADMIN_PASSCODE is not configured in Vercel Environment Variables. Please add it in Vercel Settings > Environment Variables and redeploy.' });
    }

    if ((passcode || '').trim() !== adminPasscode) {
      return res.status(401).json({ error: 'Invalid passcode. Please check your passcode and try again.' });
    }

    const token = process.env.GITHUB_PAT;
    const owner = process.env.GITHUB_OWNER || 'dav123-smoov';
    const repo = process.env.GITHUB_REPO || 'trvstudios';

    if (!token) {
      return res.status(500).json({ error: 'GITHUB_PAT is not configured in Vercel Environment Variables.' });
    }

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    };

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // Helper to upload a blob
    const uploadBlob = async (content, encoding = 'utf-8') => {
      const response = await fetch(`${baseUrl}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, encoding })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create blob (${response.status}): ${errorText}`);
      }
      return (await response.json()).sha;
    };

    // 2. Upload Images as Blobs
    const newTreeItems = [];

    const uploadImage = async (imgObj) => {
      // Remove data:image/...;base64, prefix if present
      const base64Data = imgObj.base64.replace(/^data:image\/\w+;base64,/, '');
      const cleanFilename = imgObj.filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFilename = `${Date.now()}_${cleanFilename}`;
      const path = `public/images/${uniqueFilename}`;
      
      const sha = await uploadBlob(base64Data, 'base64');
      newTreeItems.push({
        path,
        mode: '100644',
        type: 'blob',
        sha
      });
      return `/images/${uniqueFilename}`;
    };

    let coverImagePath = '';
    if (coverImage) coverImagePath = await uploadImage(coverImage);

    const galleryPaths = coverImagePath ? [coverImagePath] : [];
    if (galleryImages && Array.isArray(galleryImages)) {
      for (const img of galleryImages) {
        galleryPaths.push(await uploadImage(img));
      }
    }

    // 3. Fetch existing caseStudies.json with cache busting
    const fileRes = await fetch(`${baseUrl}/contents/src/data/caseStudies.json?ref=main&_t=${Date.now()}`, { headers });
    let caseStudies = [];
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      caseStudies = JSON.parse(decodedContent);
    } else if (fileRes.status === 404) {
      caseStudies = [];
    } else {
      const errText = await fileRes.text();
      throw new Error(`Failed to fetch caseStudies.json from GitHub (${fileRes.status}): ${errText}`);
    }

    // 4. Create new Case Study Object
    const newId = caseStudies.length > 0 ? Math.max(...caseStudies.map(cs => parseInt(cs.id) || 0)) + 1 : 1;
    const displayId = newId.toString().padStart(2, '0');
    
    const newCaseStudy = {
      id: newId.toString(),
      displayId,
      title,
      client,
      category,
      coverImage: coverImagePath,
      description,
      gallery: galleryPaths,
      highlights: highlights || []
    };

    caseStudies.push(newCaseStudy); // Add to end

    // 5. Upload updated JSON blob
    const jsonSha = await uploadBlob(JSON.stringify(caseStudies, null, 2), 'utf-8');
    newTreeItems.push({
      path: 'src/data/caseStudies.json',
      mode: '100644',
      type: 'blob',
      sha: jsonSha
    });

    // 6. Get latest commit SHA & Tree with cache busting
    const refRes = await fetch(`${baseUrl}/git/ref/heads/main?_t=${Date.now()}`, { headers });
    if (!refRes.ok) {
      const errText = await refRes.text();
      throw new Error(`Failed to get main branch ref (${refRes.status}): ${errText}`);
    }
    const refData = await refRes.json();
    const latestCommitSha = refData.object?.sha;
    if (!latestCommitSha) {
      throw new Error('Unable to determine latest commit SHA on main branch.');
    }

    const commitRes = await fetch(`${baseUrl}/git/commits/${latestCommitSha}`, { headers });
    if (!commitRes.ok) {
      const errText = await commitRes.text();
      throw new Error(`Failed to get commit details (${commitRes.status}): ${errText}`);
    }
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree?.sha;
    if (!baseTreeSha) {
      throw new Error('Unable to determine base tree SHA for commit.');
    }

    // 7. Create new Tree
    const treeRes = await fetch(`${baseUrl}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: newTreeItems
      })
    });
    if (!treeRes.ok) {
      const errText = await treeRes.text();
      throw new Error(`Failed to create Git tree (${treeRes.status}): ${errText}`);
    }
    const newTreeData = await treeRes.json();

    // 8. Create new Commit
    const newCommitRes = await fetch(`${baseUrl}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: `CMS: Add Case Study - ${title}`,
        tree: newTreeData.sha,
        parents: [latestCommitSha]
      })
    });
    if (!newCommitRes.ok) {
      const errText = await newCommitRes.text();
      throw new Error(`Failed to create Git commit (${newCommitRes.status}): ${errText}`);
    }
    const newCommitData = await newCommitRes.json();

    // 9. Update Ref (main branch)
    const patchRes = await fetch(`${baseUrl}/git/refs/heads/main`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: true
      })
    });
    if (!patchRes.ok) {
      const errText = await patchRes.text();
      throw new Error(`Failed to update main branch ref on GitHub (${patchRes.status}): ${errText}`);
    }

    return res.status(200).json({ success: true, caseStudy: newCaseStudy });

  } catch (error) {
    console.error('CMS Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
