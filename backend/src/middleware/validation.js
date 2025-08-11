// Input validation and sanitization middleware
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 chars, one letter and one number
  return password && password.length >= 8;
};

// Login validation
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email and password are required' 
    });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }
  
  next();
};

// Registration validation
export const validateRegistration = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email and password are required' 
    });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }
  
  if (!validatePassword(password)) {
    return res.status(400).json({ 
      error: 'Password must be at least 8 characters' 
    });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ 
      error: 'Passwords do not match' 
    });
  }
  
  next();
};

// Message validation
export const validateMessage = (req, res, next) => {
  const { receiver_id, subject, content } = req.body;
  
  if (!receiver_id || !subject || !content) {
    return res.status(400).json({ 
      error: 'Receiver, subject and content are required' 
    });
  }
  
  if (subject.length > 200) {
    return res.status(400).json({ 
      error: 'Subject too long (max 200 characters)' 
    });
  }
  
  if (content.length > 5000) {
    return res.status(400).json({ 
      error: 'Message too long (max 5000 characters)' 
    });
  }
  
  next();
};

// Sanitize input - remove dangerous characters
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim(); // Remove whitespace
};

// Generic sanitization middleware
export const sanitizeBody = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeInput(req.body[key]);
      }
    });
  }
  next();
};
