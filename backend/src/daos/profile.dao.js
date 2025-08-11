import { database } from '../dbconn/database.js';

export async function getProfileById(userId) {
  const result = await database.query(`
    SELECT u.*, up.*, 
           COALESCE(d.first_name, c.contact_first_name, a.first_name) as first_name,
           COALESCE(d.last_name, c.contact_last_name, a.last_name) as last_name
    FROM users u
    LEFT JOIN user_profiles up ON u.user_id = up.user_id
    LEFT JOIN drivers d ON u.user_id = d.user_id
    LEFT JOIN clients c ON u.user_id = c.user_id
    LEFT JOIN admins a ON u.user_id = a.user_id
    WHERE u.user_id = $1
  `, [userId]);
  
  return result.rows[0];
}

export async function updateUserProfile(userId, updates) {
  const { bio, skills, location, phone, linkedin, profile_picture } = updates;
  
  const result = await database.query(`
    INSERT INTO user_profiles (user_id, bio, skills, location, phone, linkedin, profile_picture)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (user_id) DO UPDATE SET
      bio = COALESCE($2, user_profiles.bio),
      skills = COALESCE($3, user_profiles.skills),
      location = COALESCE($4, user_profiles.location),
      phone = COALESCE($5, user_profiles.phone),
      linkedin = COALESCE($6, user_profiles.linkedin),
      profile_picture = COALESCE($7, user_profiles.profile_picture),
      updated_at = NOW()
    RETURNING *
  `, [userId, bio, skills, location, phone, linkedin, profile_picture]);
  
  return result.rows[0];
}
