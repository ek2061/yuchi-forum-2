import { Database } from "@/types/supabase.d";
import { createClient } from "@supabase/supabase-js";

const project_url = process.env.project_url ?? "";
const public_anon_key = process.env.public_anon_key ?? "";

export const supabase = createClient<Database>(project_url, public_anon_key);
