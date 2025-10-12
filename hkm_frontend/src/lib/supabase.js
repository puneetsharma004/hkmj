// src/lib/supabase.js (in your FRONTEND project)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rkrcdihogyjnpnffpakq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcmNkaWhvZ3lqbnBuZmZwYWtxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDA0ODIxOSwiZXhwIjoyMDc1NjI0MjE5fQ.oS2HnqC7ySdCiQS62Lo6W6cBsQAdRBdE7g_0W4WeOE0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
