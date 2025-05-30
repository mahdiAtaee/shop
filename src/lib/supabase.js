import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://fwgxrnpokcmubavvgwwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Z3hybnBva2NtdWJhdnZnd3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzMwMzIsImV4cCI6MjA2Mzg0OTAzMn0.zQeCmuRT7sb89alHDFO_VJ9unM_G4O3y6Z3p6QqJPDU'
)