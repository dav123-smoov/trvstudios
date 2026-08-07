export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { passcode, id, title, client, category, description, highlights, coverImage, galleryImages } = req.body;

    // 1. Verify Passcode
    if (passcode !== process.env.ADMIN_PASSCODE) {
      return res.status(401).json({ error: 'Invalid passcode' });
    }

    const token = process.env.GITHUB_PAT;
    const owner = process.env.GITHUB_OWNER || 'dav123-smoov';
    const repo = process.env.GITHUB_REPO || 'trvstudios';

    if (!token) {
      return res.status(500).json({ error: 'GitHub PAT not configured on Vercel' });
    }

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    };

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // Helper to upload a blob
    const uploadBlob = async (content, encoding = 'utf-8') => {
      const response = await fetch(`${baseUrl}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, encoding })
      });
      if (!response.ok) throw new Error(`Failed to create blob: ${await response.text()}`);
      return (await response.json()).sha;
    };

    const newTreeItems = [];

    const uploadImage = async (imgObj) => {
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

    // 2. Fetch existing caseStudies.json
    const fileRes = await fetch(`${baseUrl}/contents/src/data/caseStudies.json`, { headers });
    let caseStudies = [];
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      caseStudies = JSON.parse(decodedContent);
    }

    // 3. Find the case study to edit
    const targetIndex = caseStudies.findIndex(cs => cs.id === id);
    if (targetIndex === -1) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    const targetStudy = caseStudies[targetIndex];

    // 4. Handle Images (Keep old if not provided)
    let finalCoverImagePath = targetStudy.coverImage;
    if (coverImage) {
      finalCoverImagePath = await uploadImage(coverImage);
    }

    let finalGalleryPaths = targetStudy.gallery;
    // If galleryImages is provided and has items, replace entirely.
    // If it's passed as empty array, it means user didn't upload new ones, we KEEP old ones.
    if (galleryImages && galleryImages.length > 0) {
      finalGalleryPaths = [finalCoverImagePath]; // usually we prepend cover
      for (const img of galleryImages) {
        finalGalleryPaths.push(await uploadImage(img));
      }
    } else if (coverImage) {
      // If they changed the cover but not the gallery, make sure the new cover is in the gallery
      // It's a bit tricky to replace the old cover in the gallery list. 
      // Safest is to just prepend the new cover and maybe leave the rest. 
      // But standard TRV logic: cover is always first gallery item.
      if (finalGalleryPaths.length > 0) {
        finalGalleryPaths[0] = finalCoverImagePath;
      } else {
        finalGalleryPaths = [finalCoverImagePath];
      }
    }

    // 5. Update the object
    const updatedStudy = {
      ...targetStudy,
      title: title || targetStudy.title,
      client: client || targetStudy.client,
      category: category || targetStudy.category,
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

    // 7. Get latest commit SHA & Tree
    const refRes = await fetch(`${baseUrl}/git/ref/heads/main`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    const commitRes = await fetch(`${baseUrl}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 8. Create new Tree
    const treeRes = await fetch(`${baseUrl}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: newTreeItems
      })
    });
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
    const newCommitData = await newCommitRes.json();

    // 10. Update Ref (main branch)
    await fetch(`${baseUrl}/git/refs/heads/main`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: false
      })
    });

    return res.status(200).json({ success: true, caseStudy: updatedStudy });

  } catch (error) {
    console.error('CMS Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
