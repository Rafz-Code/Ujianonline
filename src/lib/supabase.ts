/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

let supabaseInstance: any = null;

// Proxy to handle lazy initialization and prevent crash on module load
export const supabase = new Proxy({}, {
  get(target, prop) {
    if (!supabaseInstance) {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Settings.');
        // Return a dummy object that fails gracefully when methods are called
        return (...args: any[]) => {
          throw new Error('Supabase is not configured. Please check your environment variables.');
        };
      }
      
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
    
    const value = (supabaseInstance as any)[prop];
    return typeof value === 'function' ? value.bind(supabaseInstance) : value;
  }
}) as any;
