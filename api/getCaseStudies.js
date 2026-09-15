export default async function handler(req, res) {
  // Set cache prevention headers so clients always receive fresh data
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const token = process.env.GITHUB_PAT;
  const owner = process.env.GITHUB_OWNER || 'dav123-smoov';
  const repo = process.env.GITHUB_REPO || 'trvstudios';

  if (token) {
    try {
      const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
      const url = `${baseUrl}/contents/src/data/caseStudies.json?ref=main&_t=${Date.now()}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (response.ok) {
        const fileData = await response.json();
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        const caseStudies = JSON.parse(content);
        return res.status(200).json({ success: true, caseStudies, source: 'github' });
      } else {
        const errorText = await response.text();
        console.warn(`GitHub fetch error (${response.status}): ${errorText}`);
      }
    } catch (err) {
      console.warn('Failed to fetch case studies from GitHub, falling back to local:', err.message);
    }
  }

  // Fallback to local file if GitHub token is missing or GitHub request fails
  try {
    const { default: localData } = await import('../src/data/caseStudies.json', { with: { type: 'json' } });
    return res.status(200).json({ success: true, caseStudies: localData, source: 'local' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load case studies: ' + err.message });
  }
}
