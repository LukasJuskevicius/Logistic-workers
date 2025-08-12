import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

export function createSessionConfig(database) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Basic session config that should always work
  const baseConfig = {
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    proxy: true, // Trust proxy
    name: 'sessionId', // Custom cookie name
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: false, // Start with false, even in production
      sameSite: 'lax' // Start with lax
    }
  };
  
  // Only enable secure cookies if explicitly set
  if (isProduction && process.env.SECURE_COOKIES === 'true') {
    baseConfig.cookie.secure = true;
    baseConfig.cookie.sameSite = 'none';
  }
  
  // Try to use PostgreSQL store only if explicitly enabled
  if (isProduction && process.env.USE_PG_SESSION === 'true' && process.env.DATABASE_URL) {
    try {
      const PgSession = connectPgSimple(session);
      baseConfig.store = new PgSession({
        conString: process.env.DATABASE_URL,
        tableName: 'session',
        createTableIfMissing: true
      });
    } catch (err) {
      console.error('⚠️ Failed to setup PostgreSQL session store:', err.message);
    }
  } else {
    if (isProduction) {
        console.error('⚠️ Using MemoryStore in production (set USE_PG_SESSION=true for persistence)');
    }
  }
  
  return baseConfig;
}
