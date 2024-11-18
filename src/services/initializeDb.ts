import { supabase } from '../lib/supabase';

export async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // First create the exec function
    const { error: funcError } = await supabase.rpc('create_exec_function', {
      sql: `
        create or replace function exec(query text)
        returns void
        language plpgsql
        security definer
        as $$
        begin
          execute query;
        end;
        $$;
      `
    });

    if (funcError) {
      console.error('Error creating exec function:', funcError);
      throw funcError;
    }

    // Read schema SQL
    const schemaSQL = await fetch('/supabase/schema.sql').then(res => res.text());

    // Execute schema SQL
    const { error: schemaError } = await supabase.rpc('exec', {
      query: schemaSQL
    });

    if (schemaError) {
      console.error('Error creating schema:', schemaError);
      throw schemaError;
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error in database initialization:', error);
    throw error;
  }
}

// Execute if running directly
if (import.meta.url === import.meta.url) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}