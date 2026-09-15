export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { passcode } = req.body || {};
    const serverPasscode = process.env.ADMIN_PASSCODE?.trim();

    if (!serverPasscode) {
      return res.status(500).json({ 
        valid: false, 
        error: 'ADMIN_PASSCODE is not configured in Vercel Environment Variables. Please add it in Vercel Settings > Environment Variables and redeploy.' 
      });
    }

    if ((passcode || '').trim() !== serverPasscode) {
      return res.status(401).json({ 
        valid: false, 
        error: 'Incorrect passcode. Please check your passcode and try again.' 
      });
    }

    // Passcode is valid. Now test GitHub token health
    const token = process.env.GITHUB_PAT;
    const owner = process.env.GITHUB_OWNER || 'dav123-smoov';
    const repo = process.env.GITHUB_REPO || 'trvstudios';
    let githubStatus = { valid: true, message: 'GitHub connection active' };

    if (!token) {
      githubStatus = {
        valid: false,
        message: 'GITHUB_PAT is missing in Vercel Environment Variables. You must add it for project uploads and deletions to work.'
      };
    } else {
      try {
        const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'TRV-CMS'
          }
        });
        if (!ghRes.ok) {
          if (ghRes.status === 401) {
            githubStatus = {
              valid: false,
              message: 'Your GitHub Personal Access Token (GITHUB_PAT) has expired or is invalid. Please generate a new token with "repo" scope on GitHub and update it in Vercel Settings > Environment Variables.'
            };
          } else if (ghRes.status === 404) {
            githubStatus = {
              valid: false,
              message: `GitHub repository "${owner}/${repo}" was not found or your GITHUB_PAT does not have access permissions to it.`
            };
          } else {
            githubStatus = {
              valid: false,
              message: `GitHub API returned error status ${ghRes.status}. Check your repository and token permissions.`
            };
          }
        }
      } catch (err) {
        githubStatus = {
          valid: false,
          message: 'Unable to verify GitHub connection: ' + err.message
        };
      }
    }

    return res.status(200).json({ valid: true, githubStatus });
  } catch (error) {
    return res.status(500).json({ valid: false, error: error.message });
  }
}
