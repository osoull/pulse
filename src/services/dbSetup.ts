import { supabase } from '../lib/supabase';

export async function initializeDatabase() {
  try {
    // Vérifier si les tables existent déjà
    const { data: existingTables } = await supabase
      .from('funds')
      .select('id')
      .limit(1);

    // Si les tables existent déjà, ne rien faire
    if (existingTables !== null) {
      console.log('Database already initialized');
      return;
    }

    // Exécuter le schéma SQL
    const { error } = await supabase.rpc('initialize_database');
    
    if (error) {
      console.error('Error initializing database:', error);
      return;
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error checking database status:', error);
  }
}