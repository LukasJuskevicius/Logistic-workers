// Logout controller with session cleanup
export function logoutUser(req, res) {
  if (!req.session) {
    return res.status(400).json({ error: "No active session" });
  }
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    
    res.clearCookie('connect.sid'); // Clear session cookie
    res.json({ success: true, message: "Logged out successfully" });
  });
}
