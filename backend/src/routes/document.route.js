import express from 'express';
import multer from 'multer';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { database } from '../dbconn/database.js';

const router = express.Router();

// Configure multer for memory storage (no file system)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow common document types
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, JPG, PNG, and DOC files are allowed.'), false);
        }
    }
});

// GET /api/documents - Get all documents for authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        console.log('📄 Fetching documents for user:', req.userId);
        
        const query = `
            SELECT 
                document_id,
                document_type,
                file_name,
                file_size,
                mime_type,
                document_status,
                expiry_date,
                is_required,
                version_number,
                upload_date,
                updated_at,
                reviewed_at,
                rejection_reason
            FROM documents 
            WHERE user_id = $1 
            ORDER BY upload_date DESC
        `;
        
        const result = await database.query(query, [req.userId]);
        
        console.log(`📄 Found ${result.rows.length} documents for user ${req.userId}`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching documents:', error);
        res.status(500).json({ 
            error: 'Failed to fetch documents',
            details: error.message 
        });
    }
});

// GET /api/documents/:documentId/download - Download specific document
router.get('/:documentId/download', authenticateToken, async (req, res) => {
    try {
        const { documentId } = req.params;
        console.log('⬇️ Downloading document:', documentId, 'for user:', req.userId);
        
        const query = `
            SELECT 
                file_name,
                file_data,
                mime_type,
                file_size,
                document_type
            FROM documents 
            WHERE document_id = $1 AND user_id = $2
        `;
        
        const result = await database.query(query, [documentId, req.userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        const document = result.rows[0];
        
        // Set appropriate headers
        res.setHeader('Content-Type', document.mime_type);
        res.setHeader('Content-Length', document.file_size);
        res.setHeader('Content-Disposition', `attachment; filename="${document.file_name}"`);
        
        // Send the binary data
        res.send(document.file_data);
        
        console.log('✅ Document downloaded successfully:', document.file_name);
        
    } catch (error) {
        console.error('❌ Error downloading document:', error);
        res.status(500).json({ 
            error: 'Failed to download document',
            details: error.message 
        });
    }
});

// POST /api/documents/upload - Upload new document
router.post('/upload', authenticateToken, upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const { document_type, expiry_date, is_required } = req.body;
        
        console.log('📤 Uploading document:', {
            userId: req.userId,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            documentType: document_type
        });
        
        // Validate required fields
        if (!document_type) {
            return res.status(400).json({ error: 'Document type is required' });
        }
        
        const query = `
            INSERT INTO documents (
                user_id, 
                document_type, 
                file_name, 
                file_data, 
                file_size, 
                mime_type,
                expiry_date,
                is_required,
                document_status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending_review')
            RETURNING document_id, file_name, upload_date
        `;
        
        const values = [
            req.userId,
            document_type,
            req.file.originalname,
            req.file.buffer, // Store file as BYTEA
            req.file.size,
            req.file.mimetype,
            expiry_date || null,
            is_required === 'true' || is_required === true
        ];
        
        const result = await database.query(query, values);
        
        console.log('✅ Document uploaded successfully:', result.rows[0]);
        
        res.status(201).json({
            message: 'Document uploaded successfully',
            document: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error uploading document:', error);
        res.status(500).json({ 
            error: 'Failed to upload document',
            details: error.message 
        });
    }
});

// PATCH /api/documents/:documentId - Update document status (admin only)
router.patch('/:documentId', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const { documentId } = req.params;
        const { document_status, rejection_reason } = req.body;
        
        console.log('📝 Updating document status:', {
            documentId,
            status: document_status,
            reviewedBy: req.userId
        });
        
        const query = `
            UPDATE documents 
            SET 
                document_status = $1,
                rejection_reason = $2,
                reviewed_by = $3,
                reviewed_at = NOW(),
                updated_at = NOW()
            WHERE document_id = $4
            RETURNING document_id, document_status, reviewed_at
        `;
        
        const result = await database.query(query, [
            document_status,
            rejection_reason || null,
            req.userId,
            documentId
        ]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        console.log('✅ Document status updated:', result.rows[0]);
        
        res.json({
            message: 'Document status updated successfully',
            document: result.rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error updating document:', error);
        res.status(500).json({ 
            error: 'Failed to update document',
            details: error.message 
        });
    }
});

// DELETE /api/documents/:documentId - Delete document
router.delete('/:documentId', authenticateToken, async (req, res) => {
    try {
        const { documentId } = req.params;
        
        console.log('🗑️ Deleting document:', documentId, 'for user:', req.userId);
        
        const query = `
            DELETE FROM documents 
            WHERE document_id = $1 AND user_id = $2
            RETURNING file_name
        `;
        
        const result = await database.query(query, [documentId, req.userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        console.log('✅ Document deleted successfully:', result.rows[0].file_name);
        
        res.json({
            message: 'Document deleted successfully',
            fileName: result.rows[0].file_name
        });
        
    } catch (error) {
        console.error('❌ Error deleting document:', error);
        res.status(500).json({ 
            error: 'Failed to delete document',
            details: error.message 
        });
    }
});

// GET /api/documents/pending - Get documents pending review (admin only)
router.get('/pending', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        console.log('📋 Fetching pending documents for admin review');
        
        const query = `
            SELECT 
                d.document_id,
                d.document_type,
                d.file_name,
                d.file_size,
                d.mime_type,
                d.document_status,
                d.expiry_date,
                d.is_required,
                d.upload_date,
                u.first_name,
                u.last_name,
                u.email,
                u.role
            FROM documents d
            JOIN users u ON d.user_id = u.user_id
            WHERE d.document_status = 'pending_review'
            ORDER BY d.upload_date ASC
        `;
        
        const result = await database.query(query);
        
        console.log(`📋 Found ${result.rows.length} pending documents`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching pending documents:', error);
        res.status(500).json({ 
            error: 'Failed to fetch pending documents',
            details: error.message 
        });
    }
});

// GET /api/documents/expiring - Get expiring documents (admin only)
router.get('/expiring', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        console.log('⏰ Fetching expiring documents');
        
        const query = `
            SELECT * FROM expiring_documents
            ORDER BY expiry_date ASC
        `;
        
        const result = await database.query(query);
        
        console.log(`⏰ Found ${result.rows.length} expiring documents`);
        res.json(result.rows);
        
    } catch (error) {
        console.error('❌ Error fetching expiring documents:', error);
        res.status(500).json({ 
            error: 'Failed to fetch expiring documents',
            details: error.message 
        });
    }
});

export default router;
