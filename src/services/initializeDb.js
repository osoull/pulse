import { supabase } from '../lib/supabase.js';

async function executeSQL(sql) {
  try {
    const { error } = await supabase.rpc('exec', { query: sql });
    if (error) throw error;
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // Create SQL functions first
    await executeSQL(`
      -- Create exec function for running raw SQL
      create or replace function exec(query text)
      returns void as $$
      begin
        execute query;
      end;
      $$ language plpgsql security definer;
    `);

    // Create tables and setup database
    const schemaSQL = await fetch('/supabase/schema.sql').then(res => res.text());
    await executeSQL(schemaSQL);

    // Create initial admin user if not exists
    await executeSQL(`
      -- Create admin user if not exists
      insert into auth.users (
        email,
        raw_user_meta_data,
        created_at,
        updated_at
      )
      values (
        'admin@osoul.partners',
        '{"name": "Admin", "role": "admin", "title": "System Administrator"}',
        now(),
        now()
      )
      on conflict (email) do nothing;
    `);

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Execute if running directly
if (import.meta.url === import.meta.url) {
  initializeDatabase()
    .then(() => console.log('Database reset completed'))
    .catch(console.error);
}

export { initializeDatabase };