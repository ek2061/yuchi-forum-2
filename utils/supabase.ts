import { createClient } from "@supabase/supabase-js";

const project_url = process.env.project_url ?? "";
const public_anon_key = process.env.public_anon_key ?? "";

export const supabase = createClient(project_url, public_anon_key);
