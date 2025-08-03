import express from 'express';
import { VacancyController } from '../controllers/vacancy.controller.js';
import { validateVacancyInput } from '../middleware/vacancy.validation.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/vacancies - Get all vacancies (public)
router.get('/', async (req, res) => {
  try {
    const result = await VacancyController.getAllVacancies();
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('❌ Get vacancies error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/vacancies/:id - Get vacancy by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await VacancyController.getVacancyById(id);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error('❌ Get vacancy error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/vacancies - Create new vacancy (admin only)
router.post('/', authenticateUser, requireAdmin, validateVacancyInput, async (req, res) => {
  try {
    const vacancyData = req.body;
    const result = await VacancyController.createVacancy(vacancyData);
    
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('❌ Create vacancy error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PUT /api/vacancies/:id - Update vacancy (admin only)
router.put('/:id', authenticateUser, requireAdmin, validateVacancyInput, async (req, res) => {
  try {
    const { id } = req.params;
    const vacancyData = req.body;
    const result = await VacancyController.updateVacancy(id, vacancyData);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('❌ Update vacancy error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// DELETE /api/vacancies/:id - Delete vacancy (admin only)
router.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await VacancyController.deleteVacancy(id);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('❌ Delete vacancy error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 