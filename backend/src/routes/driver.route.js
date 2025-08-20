import express from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth } from '../middleware/auth.js';
import { database } from '../dbconn/database.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and documents are allowed'));
    }
  }
});

// Debug route to test authentication
router.get('/api/drivers/debug', requireAuth, async (req, res) => {
  try {
    console.log('Debug route - req.userId:', req.userId);
    res.json({ 
      success: true, 
      userId: req.userId,
      message: 'Authentication working' 
    });
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update driver profile
router.patch('/api/drivers/:userId', requireAuth, async (req, res) => {
  try {
    // Use authenticated user ID from middleware instead of URL parameter
    const userId = req.userId;
    const updateData = req.body;
    
    console.log('🔧 PATCH route started');
    console.log('📝 User ID:', userId);
    console.log('📦 Update data:', updateData);

    // Update users table
    const userFields = ['first_name', 'last_name', 'phone', 'address', 'city', 'country', 'postal_code', 'date_of_birth', 'nationality'];
    const userUpdates = {};
    userFields.forEach(field => {
      if (updateData[field] !== undefined) {
        // Handle date fields - convert empty strings to null
        if (field === 'date_of_birth' && updateData[field] === '') {
          userUpdates[field] = null;
        } else if (updateData[field] !== '') {
          userUpdates[field] = updateData[field];
        }
      }
    });

    if (Object.keys(userUpdates).length > 0) {
      const userSetClause = Object.keys(userUpdates).map((key, index) => `${key} = $${index + 2}`).join(', ');
      const userValues = [userId, ...Object.values(userUpdates)];
      
      await database.query(
        `UPDATE users SET ${userSetClause}, updated_at = NOW() WHERE user_id = $1`,
        userValues
      );
    }

    // Update drivers table
    const driverFields = ['license_type', 'license_expiry_date', 'experience_years', 'preferred_job_types', 'has_own_vehicle', 'vehicle_type', 'vehicle_registration', 'max_weight', 'max_volume', 'is_available'];
    const driverUpdates = {};
    driverFields.forEach(field => {
      if (updateData[field] !== undefined) {
        // Handle date fields - convert empty strings to null
        if (field === 'license_expiry_date' && updateData[field] === '') {
          driverUpdates[field] = null;
        } else if (updateData[field] !== '') {
          driverUpdates[field] = updateData[field];
        }
      }
    });

    if (Object.keys(driverUpdates).length > 0) {
      const driverSetClause = Object.keys(driverUpdates).map((key, index) => `${key} = $${index + 2}`).join(', ');
      const driverValues = [userId, ...Object.values(driverUpdates)];
      
      await database.query(
        `UPDATE drivers SET ${driverSetClause}, updated_at = NOW() WHERE user_id = $1`,
        driverValues
      );
    }

    // Get updated profile data
    const result = await database.query(`
      SELECT u.*, d.* FROM users u 
      LEFT JOIN drivers d ON u.user_id = d.user_id 
      WHERE u.user_id = $1
    `, [userId]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating driver profile:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail,
      userId: req.userId,
      updateData: req.body
    });
    res.status(500).json({ 
      error: 'Failed to update profile',
      details: error.message 
    });
  }
});

// Upload driver document
router.post('/api/drivers/:userId/documents', requireAuth, upload.single('document'), async (req, res) => {
  try {
    // Use authenticated user ID from middleware instead of URL parameter
    const userId = req.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check document count limit
    const countResult = await database.query(
      'SELECT COUNT(*) FROM driver_documents WHERE user_id = $1',
      [userId]
    );

    if (parseInt(countResult.rows[0].count) >= 10) {
      return res.status(400).json({ error: 'Maximum number of documents (10) reached' });
    }

    // Insert document record
    const result = await database.query(`
      INSERT INTO driver_documents (user_id, file_name, file_path, file_size, mime_type, url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
      userId,
      file.originalname,
      file.path,
      file.size,
      file.mimetype,
      `/uploads/documents/${file.filename}`
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Get driver documents
router.get('/api/drivers/:userId/documents', requireAuth, async (req, res) => {
  try {
    // Use authenticated user ID from middleware instead of URL parameter
    const userId = req.userId;

    const result = await database.query(
      'SELECT * FROM driver_documents WHERE user_id = $1 ORDER BY upload_date DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Delete driver document
router.delete('/api/drivers/:userId/documents/:documentId', requireAuth, async (req, res) => {
  try {
    // Use authenticated user ID from middleware instead of URL parameter
    const userId = req.userId;
    const { documentId } = req.params;

    const result = await database.query(
      'DELETE FROM driver_documents WHERE id = $1 AND user_id = $2 RETURNING *',
      [documentId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// Legacy routes (keeping for compatibility)
router.get('/api/drivers/profile', requireAuth, async (req, res) => {
  res.json({ message: 'Driver profile endpoint' });
});

router.get('/api/drivers/jobs', requireAuth, async (req, res) => {
  res.json({ message: 'Driver jobs endpoint' });
});

router.post('/api/drivers/apply', requireAuth, async (req, res) => {
  res.json({ message: 'Driver application endpoint' });
});

export default router;
