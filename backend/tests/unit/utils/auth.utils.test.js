import { hashPassword, verifyPassword } from '../../../src/utils/auth.js';

// No mocking needed — pure bcrypt logic, no DB calls.
describe('auth utils', () => {
  describe('hashPassword', () => {
    it('returns a hashed string different from the input', async () => {
      const hash = await hashPassword('mySecret123');
      expect(hash).not.toBe('mySecret123');
      expect(typeof hash).toBe('string');
    });

    it('produces a bcrypt hash (starts with $2)', async () => {
      const hash = await hashPassword('test');
      expect(hash.startsWith('$2')).toBe(true);
    });

    it('two hashes of the same password are different (salt)', async () => {
      const h1 = await hashPassword('same');
      const h2 = await hashPassword('same');
      expect(h1).not.toBe(h2);
    });

    it('throws when given no argument', async () => {
      await expect(hashPassword(undefined)).rejects.toThrow();
    });
  });

  describe('verifyPassword', () => {
    it('returns true for a matching password', async () => {
      const hash = await hashPassword('correct');
      const result = await verifyPassword('correct', hash);
      expect(result).toBe(true);
    });

    it('returns false for a wrong password', async () => {
      const hash = await hashPassword('correct');
      const result = await verifyPassword('wrong', hash);
      expect(result).toBe(false);
    });

    it('returns false for an empty string against a real hash', async () => {
      const hash = await hashPassword('real');
      const result = await verifyPassword('', hash);
      expect(result).toBe(false);
    });

    it('is consistent — repeated calls with same inputs return same result', async () => {
      const hash = await hashPassword('stable');
      const r1 = await verifyPassword('stable', hash);
      const r2 = await verifyPassword('stable', hash);
      expect(r1).toBe(true);
      expect(r2).toBe(true);
    });
  });
});
