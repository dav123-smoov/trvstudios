export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { passcode, id, title, client, category, description, highlights, coverImage, galleryImages } = req.body || {};

    // 1. Verify Passcode
    const adminPasscode = process.env.ADMIN_PASSCODE?.trim();
    if (!adminPasscode) {
      return res.status(500).json({ error: 'ADMIN_PASSCODE is not configured in Vercel Environment Variables. Please add it in Vercel Settings > Environment Variables and redeploy.' });
    }

    if ((passcode || '').trim() !== adminPasscode) {
      return res.status(401).json({ error: 'Invalid passcode. Please check your passcode and try again.' });
    }

    const rawToken = process.env.GITHUB_PAT?.trim();
    const owner = (process.env.GITHUB_OWNER || 'dav123-smoov').trim();
    const repo = (process.env.GITHUB_REPO || 'trvstudios').trim();

    if (!rawToken) {
      return res.status(500).json({ error: 'GITHUB_PAT is not configured in Vercel Environment Variables.' });
    }

    const authHeader = rawToken.startsWith('Bearer ') || rawToken.startsWith('token ') ? rawToken : `Bearer ${rawToken}`;

    const headers = {
      'Authorization': authHeader,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'TRV-Studio-CMS/1.0',
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
        if (response.status === 401) {
          throw new Error('GitHub PAT token has expired or is invalid (401 Bad credentials). Please update GITHUB_PAT in Vercel.');
        }
        const errorText = await response.text();
        throw new Error(`GitHub Blob creation failed (${response.status}): ${errorText}`);
      }
      return (await response.json()).sha;
    };

    const newTreeItems = [];

    const uploadImage = async (imgObj) => {
      if (!imgObj || !imgObj.base64) return '';
      const rawBase64 = imgObj.base64.includes(',') ? imgObj.base64.split(',')[1] : imgObj.base64;
      const cleanFilename = (imgObj.filename || 'image.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFilename = `${Date.now()}_${cleanFilename}`;
      const path = `public/images/${uniqueFilename}`;
      
      const sha = await uploadBlob(rawBase64, 'base64');
      newTreeItems.push({
        path,
        mode: '100644',
        type: 'blob',
        sha
      });
      return `/images/${uniqueFilename}`;
    };

    // 2. Fetch existing caseStudies.json with cache busting
    const fileRes = await fetch(`${baseUrl}/contents/src/data/caseStudies.json?ref=main&_t=${Date.now()}`, { headers });
    let caseStudies = [];
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      caseStudies = JSON.parse(decodedContent);
    } else if (fileRes.status === 401) {
      throw new Error('GitHub PAT token has expired or is invalid (401 Bad credentials). Please update GITHUB_PAT in Vercel.');
    } else {
      const errText = await fileRes.text();
      throw new Error(`Failed to fetch caseStudies.json from GitHub (${fileRes.status}): ${errText}`);
    }

    // 3. Find the case study to edit
    const targetIndex = caseStudies.findIndex(cs => String(cs.id).trim() === String(id).trim());
    if (targetIndex === -1) {
      return res.status(404).json({ error: `Case study with ID "${id}" was not found on GitHub.` });
    }
    const targetStudy = caseStudies[targetIndex];

    // 4. Handle Images (Keep old if not provided)
    let finalCoverImagePath = targetStudy.coverImage;
    if (coverImage && coverImage.base64) {
      finalCoverImagePath = await uploadImage(coverImage);
    }

    let finalGalleryPaths = Array.isArray(targetStudy.gallery) ? [...targetStudy.gallery] : [];
    if (galleryImages && Array.isArray(galleryImages) && galleryImages.length > 0) {
      finalGalleryPaths = [finalCoverImagePath];
      for (const img of galleryImages) {
        const p = await uploadImage(img);
        if (p) finalGalleryPaths.push(p);
      }
    } else if (coverImage && coverImage.base64) {
      if (finalGalleryPaths.length > 0) {
        finalGalleryPaths[0] = finalCoverImagePath;
      } else {
        finalGalleryPaths = [finalCoverImagePath];
      }
    }

    // 5. Update the object
    const updatedStudy = {
      ...targetStudy,
      title: title !== undefined ? title : targetStudy.title,
      client: client !== undefined ? client : targetStudy.client,
      category: category !== undefined ? category : targetStudy.category,
      description: description !== undefined ? description : targetStudy.description,
      highlights: highlights || targetStudy.highlights,
      coverImage: finalCoverImagePath,
      gallery: finalGalleryPaths
    };

    caseStudies[targetIndex] = updatedStudy;

    // 6. Upload updated JSON blob
    const jsonSha = await uploadBlob(JSON.stringify(caseStudies, null, 2), 'utf-8');
    newTreeItems.push({
      path: 'src/data/caseStudies.json',
      mode: '100644',
      type: 'blob',
      sha: jsonSha
    });

    // 7. Get latest commit SHA & Tree with cache busting
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

    // 8. Create new Tree
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

    // 9. Create new Commit
    const newCommitRes = await fetch(`${baseUrl}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: `CMS: Edit Case Study - ${updatedStudy.title}`,
        tree: newTreeData.sha,
        parents: [latestCommitSha]
      })
    });
    if (!newCommitRes.ok) {
      const errText = await newCommitRes.text();
      throw new Error(`Failed to create Git commit (${newCommitRes.status}): ${errText}`);
    }
    const newCommitData = await newCommitRes.json();

    // 10. Update Ref (main branch)
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

    return res.status(200).json({ success: true, caseStudy: updatedStudy });

  } catch (error) {
    console.error('CMS Edit Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
