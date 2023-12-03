import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("database key or url is missing");
}
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
