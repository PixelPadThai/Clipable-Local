
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://avwghryytgicvecydqkr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d2docnl5dGdpY3ZlY3lkcWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NzM2ODYsImV4cCI6MjA2NDM0OTY4Nn0.hIihzYCnKdT_B30v9T7wPU1sX9-nLOW5t8j3mp1WwPc'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
