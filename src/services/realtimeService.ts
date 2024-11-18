import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

let channel: RealtimeChannel;

export function initializeRealtime() {
  channel = supabase.channel('db-changes')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public',
      table: 'funds'
    }, payload => {
      console.log('Change received!', payload);
    })
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public',
      table: 'investors'
    }, payload => {
      console.log('Change received!', payload);
    })
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public',
      table: 'kyc_documents'
    }, payload => {
      console.log('Change received!', payload);
    })
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
}

export function getRealtimeChannel() {
  return channel;
}