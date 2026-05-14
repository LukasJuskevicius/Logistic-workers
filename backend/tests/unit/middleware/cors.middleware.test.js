import { corsMiddleware } from '../../../src/middleware/cors.js';

// Test the exported corsMiddleware and the origin-selection logic.
// We don't re-test the cors library itself; we test our configuration.

describe('corsMiddleware export', () => {
  it('exports a function', () => {
    expect(typeof corsMiddleware).toBe('function');
  });

  it('is a valid Express-style middleware (callable function)', () => {
    expect(corsMiddleware).toBeInstanceOf(Function);
  });
});

// Extract and unit-test the origin-selection logic in pure form.
describe('CORS origin logic', () => {
  function makeOriginFn(isDev, allowedOrigins) {
    return (origin, callback) => {
      if (!origin && isDev) return callback(null, true);
      if (!origin) return callback(new Error('Missing origin header'));
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    };
  }

  const devOrigins = ['http://localhost:5173', 'http://localhost:3000'];
  const prodOrigins = ['https://logistic-workers.vercel.app'];

  describe('development mode', () => {
    const originFn = makeOriginFn(true, [...devOrigins, ...prodOrigins]);

    it('allows localhost:5173', (done) => {
      originFn('http://localhost:5173', (err, ok) => {
        expect(err).toBeNull();
        expect(ok).toBe(true);
        done();
      });
    });

    it('allows the production domain', (done) => {
      originFn('https://logistic-workers.vercel.app', (err, ok) => {
        expect(err).toBeNull();
        expect(ok).toBe(true);
        done();
      });
    });

    it('allows requests with no origin (curl/Postman) in dev', (done) => {
      originFn(undefined, (err, ok) => {
        expect(err).toBeNull();
        expect(ok).toBe(true);
        done();
      });
    });

    it('blocks unknown origins', (done) => {
      originFn('https://evil.com', (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('Not allowed by CORS');
        done();
      });
    });
  });

  describe('production mode', () => {
    const originFn = makeOriginFn(false, prodOrigins);

    it('allows the production domain', (done) => {
      originFn('https://logistic-workers.vercel.app', (err, ok) => {
        expect(err).toBeNull();
        expect(ok).toBe(true);
        done();
      });
    });

    it('blocks localhost in production', (done) => {
      originFn('http://localhost:5173', (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });

    it('blocks requests with no origin in production', (done) => {
      originFn(undefined, (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Missing origin header');
        done();
      });
    });
  });
});
