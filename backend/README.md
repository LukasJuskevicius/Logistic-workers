# Logistic Workers Backend

This is the backend API server for the Logistic Workers website. It provides a clean separation between frontend and database operations using Supabase.

## Architecture

```
Frontend → Backend API → Supabase Database
```

## File Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── supabase.js   # Supabase client & database functions
│   ├── middleware/        # Express middleware
│   │   └── validation.js # Input validation middleware
│   ├── routes/           # API routes (separated by feature)
│   │   └── auth/
│   │       ├── login.js  # Login endpoint
│   │       ├── register.js # Registration endpoint
│   │       ├── logout.js # Logout endpoint
│   │       └── profile.js # Profile management
│   ├── services/         # Business logic
│   │   └── authService.js # Authentication service
│   ├── scripts/          # Utility scripts
│   │   └── createDemoData.js # Demo data creation
│   └── index.js          # Main server file
├── tests/                # All tests
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   ├── e2e/            # End-to-end tests
│   ├── fixtures/        # Test data
│   └── setup.js         # Test setup
├── package.json
├── jest.config.js       # Jest configuration
└── README.md
```

## Features

- ✅ **Authentication**: Login, Register, Logout
- ✅ **User Management**: Profile CRUD operations
- ✅ **Database Integration**: Works with existing Supabase tables
- ✅ **Security**: Rate limiting, CORS, Helmet
- ✅ **Health Checks**: Database status monitoring
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Input Validation**: Express-validator middleware
- ✅ **Testing**: Unit, Integration, and E2E tests
- ✅ **Demo Data**: Scripts to populate empty tables
- ✅ **Code Quality**: ESLint configuration

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Copy `env.example` to `.env` and fill in your values:

```bash
cp env.example .env
```

Required variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS

### 3. Database Setup

Make sure your Supabase database has the required tables:
- `users`
- `vacancies`
- `job_applications`
- `contact_messages`
- `testimonials`

Run the database setup script in your Supabase SQL editor.

### 4. Create Demo Data

```bash
npm run demo:create
```

### 5. Start the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

### 6. Run Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update user profile

### Health & Status
- `GET /health` - Server health check
- `GET /database/status` - Database status

## Database Integration

The backend automatically:
- ✅ Checks if database tables exist on startup
- ✅ Creates user profiles if they don't exist
- ✅ Handles authentication with Supabase
- ✅ Provides database statistics

## Security Features

- 🔒 Rate limiting (100 requests per 15 minutes)
- 🔒 CORS protection
- 🔒 Helmet security headers
- 🔒 Input validation
- 🔒 Error sanitization

## Development

The backend uses:
- **Express.js** - Web framework
- **Supabase** - Database and auth
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - Request logging
- **Rate Limiting** - API protection

## Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:3001/health

# Database status
curl http://localhost:3001/database/status

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## Troubleshooting

### Database Connection Issues
1. Check your Supabase credentials in `.env`
2. Verify tables exist in your Supabase database
3. Check the `/database/status` endpoint

### CORS Issues
1. Verify `FRONTEND_URL` in `.env`
2. Check that frontend is running on the correct port

### Authentication Issues
1. Verify Supabase service role key
2. Check user exists in Supabase Auth
3. Verify user profile exists in `users` table 