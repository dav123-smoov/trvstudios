export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { passcode, id } = body;

    // 1. Verify Passcode
    if (passcode !== process.env.ADMIN_PASSCODE) {
      return new Response(JSON.stringify({ error: 'Invalid passcode' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = process.env.GITHUB_PAT;
    const owner = process.env.GITHUB_OWNER || 'dav123-smoov';
    const repo = process.env.GITHUB_REPO || 'trvstudios';

    if (!token) {
      return new Response(JSON.stringify({ error: 'GitHub PAT not configured on Netlify' }), { status: 500 });
    }

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    };

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // 2. Fetch existing caseStudies.json
    const fileRes = await fetch(`${baseUrl}/contents/src/data/caseStudies.json`, { headers });
    let caseStudies = [];
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      caseStudies = JSON.parse(decodedContent);
    }

    // 3. Find and remove the case study
    const initialLength = caseStudies.length;
    caseStudies = caseStudies.filter(cs => cs.id !== id);

    if (caseStudies.length === initialLength) {
       return new Response(JSON.stringify({ error: 'Case study not found' }), { status: 404 });
    }

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

    // 4. Upload updated JSON blob
    const jsonSha = await uploadBlob(JSON.stringify(caseStudies, null, 2), 'utf-8');
    
    // 5. Get latest commit SHA & Tree
    const refRes = await fetch(`${baseUrl}/git/ref/heads/main`, { headers });
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    const commitRes = await fetch(`${baseUrl}/git/commits/${latestCommitSha}`, { headers });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 6. Create new Tree
    const treeRes = await fetch(`${baseUrl}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [{
          path: 'src/data/caseStudies.json',
          mode: '100644',
          type: 'blob',
          sha: jsonSha
        }]
      })
    });
    const newTreeData = await treeRes.json();

    // 7. Create new Commit
    const newCommitRes = await fetch(`${baseUrl}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: `CMS: Delete Case Study ID ${id}`,
        tree: newTreeData.sha,
        parents: [latestCommitSha]
      })
    });
    const newCommitData = await newCommitRes.json();

    // 8. Update Ref (main branch)
    await fetch(`${baseUrl}/git/refs/heads/main`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: false
      })
    });

    return new Response(JSON.stringify({ success: true }), {
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
