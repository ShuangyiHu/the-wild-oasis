import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yseskwtrzyoolmkdvyrd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZXNrd3Ryenlvb2xta2R2eXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMzEwMDMsImV4cCI6MjAzNzYwNzAwM30.4tS4s6wPM-LgqOC68v7Hl73IO3_wQ66fx4LMI73GJxE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
