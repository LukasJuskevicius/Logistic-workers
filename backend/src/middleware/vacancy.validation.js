import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

export const validateVacancyInput = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Company name must be between 2 and 50 characters'),
  body('location')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Location must be between 3 and 100 characters'),
  body('salary')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Salary must be between 5 and 50 characters'),
  body('type')
    .isIn(['Full-time', 'Part-time', 'Contract', 'Temporary'])
    .withMessage('Job type must be Full-time, Part-time, Contract, or Temporary'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  body('requirements')
    .isArray({ min: 1 })
    .withMessage('At least one requirement must be specified'),
  body('requirements.*')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Each requirement must be between 3 and 100 characters'),
  body('deadline')
    .isISO8601()
    .withMessage('Deadline must be a valid date'),
  handleValidationErrors
]; 