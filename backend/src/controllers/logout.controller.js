// Logout controller with custom cookie session cleanup
import { database } from '../dbconn/database.js';

export async function logoutUser(req, res) {
  try {
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
      return res.status(400).json({ error: "No active session" });
    }
    
    // Deactivate session in database
    await database.query(
      'UPDATE user_sessions SET is_active = false WHERE session_token = $1',
      [sessionId]
    );
    
    // Clear the cookie (environment-aware)
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('sessionId', {
      path: '/',
      httpOnly: true,
      secure: isProduction, // Match login cookie settings
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? undefined : undefined
    });
    
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: "Failed to logout" });
  }
}
