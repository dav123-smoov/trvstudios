export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { passcode, title, client, category, description, highlights, coverImage, galleryImages } = body;

    // 1. Verify Passcode
    if (passcode !== process.env.ADMIN_PASSCODE) {
      return new Response(JSON.stringify({ error: 'Invalid passcode' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = process.env.GITHUB_PAT;
    const owner = process.env.GITHUB_OWNER || 'trvstuds-afk';
    const repo = process.env.GITHUB_REPO || 'trvstudios';

    if (!token) {
      return new Response(JSON.stringify({ error: 'GitHub PAT not configured on Netlify' }), { status: 500 });
    }

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    };

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // Helper to upload a blob
    const uploadBlob = async (content, encoding = 'utf-8') => {
      const res = await fetch(`${baseUrl}/git/blobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content, encoding })
      });
      if (!res.ok) throw new Error(`Failed to create blob: ${await res.text()}`);
      return (await res.json()).sha;
    };

    // 2. Upload Images as Blobs
    // coverImage: { filename: 'hero.jpg', base64: '...' }
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

    const galleryPaths = [];
    if (galleryImages && Array.isArray(galleryImages)) {
      for (const img of galleryImages) {
        galleryPaths.push(await uploadImage(img));
      }
    }

    // 3. Fetch existing caseStudies.json
    const fileRes = await fetch(`${baseUrl}/contents/src/data/caseStudies.json`, { headers });
    let caseStudies = [];
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      caseStudies = JSON.parse(decodedContent);
    }

    // 4. Create new Case Study Object
    const newId = caseStudies.length > 0 ? Math.max(...caseStudies.map(cs => parseInt(cs.id))) + 1 : 1;
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

    caseStudies.unshift(newCaseStudy); // Add to beginning

    // 5. Upload updated JSON blob
    const jsonSha = await uploadBlob(JSON.stringify(caseStudies, null, 2), 'utf-8');
    newTreeItems.push({
      path: 'src/data/caseStudies.json',
      mode: '100644',
      type: 'blob',
      sha: jsonSha
    });

    // 6. Get latest commit SHA & Tree
    const refRes = await fetch(`${baseUrl}/git/ref/heads/main`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    const commitRes = await fetch(`${baseUrl}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 7. Create new Tree
    const treeRes = await fetch(`${baseUrl}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: newTreeItems
      })
    });
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
    const newCommitData = await newCommitRes.json();

    // 9. Update Ref (main branch)
    await fetch(`${baseUrl}/git/refs/heads/main`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: false
      })
    });

    return new Response(JSON.stringify({ success: true, caseStudy: newCaseStudy }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('CMS Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
