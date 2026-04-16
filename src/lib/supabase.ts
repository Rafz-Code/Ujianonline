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
        // Return a proxy that handles nested access without throwing immediately
        const nullClient = new Proxy({}, {
          get(t, p) {
            console.error(`Attempted to access supabase.${String(p)} but Supabase is not configured.`);
            return new Proxy(() => {}, {
              get: () => () => {},
              apply: () => {
                const msg = 'Supabase environment variables are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel project settings.';
                console.error(msg);
                return { data: { session: null, subscription: { unsubscribe: () => {} } }, error: { message: msg } };
              }
            });
          }
        });
        return nullClient;
      }
      
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
    
    const value = (supabaseInstance as any)[prop];
    return typeof value === 'function' ? value.bind(supabaseInstance) : value;
  }
}) as any;
