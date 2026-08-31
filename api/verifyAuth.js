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

    return res.status(200).json({ valid: true });
  } catch (error) {
    return res.status(500).json({ valid: false, error: error.message });
  }
}
