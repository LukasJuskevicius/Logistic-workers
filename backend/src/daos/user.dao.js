import { database } from '../dbconn/database.js';

export async function findUserByEmail(email) {
  const result = await database.query(
    'SELECT email, user_id, role FROM users WHERE email = ?',
    [email]
  );
  return result.rows[0];
}

export async function findUserById(id) {
  const result = await database.query(
    'SELECT * FROM users WHERE user_id = $1',
    [id]
  );
  return result.rows[0];
}

export async function createUser(email, passwordHash, role = 'client') {
  const result = await database.query(
    'INSERT INTO users (email, password_hash, role, is_verified) VALUES ($1, $2, $3, true) RETURNING *',
    [email, passwordHash, role]
  );
  return result.rows[0];
}

export async function findOrCreateGoogleUser(googleId, email, name) {
  const existing = await findUserByEmail(email);
  if (existing) return existing;
  
  return createUser(email, null, 'client');
}