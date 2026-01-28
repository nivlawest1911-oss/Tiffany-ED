import { sql } from '@vercel/postgres';

export async function createUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'educator',
        subscription_tier VARCHAR(50) DEFAULT 'free',
        stripe_customer_id VARCHAR(255),
        google_id VARCHAR(255) UNIQUE,
        avatar_url TEXT,
        trial_ends_at TIMESTAMP WITH TIME ZONE,
        is_trial_converted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE
      );

      CREATE TABLE IF NOT EXISTS processed_checkouts (
        checkout_id VARCHAR(255) PRIMARY KEY,
        processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Add new columns if they don't exist
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_trial_converted BOOLEAN DEFAULT FALSE;`;
    // console.log('Users table created or already exists');
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

export { sql };
