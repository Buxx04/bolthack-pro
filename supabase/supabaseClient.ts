import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxkenjwjnoebowwlhdtk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4a2Vuandqbm9lYm93d2xoZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTkwMTQsImV4cCI6MjA2NTYzNTAxNH0.KGROASEY1OQTWvkH8E32dI4cALdxVWdDS5Qv1Cyhsoo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // ให้เก็บ session ใน localStorage อัตโนมัติ
    detectSessionInUrl: true,  // ถ้าใช้ OAuth redirect ให้ detect session จาก URL
  },
});
