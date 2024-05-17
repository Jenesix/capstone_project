import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../config/config";

export const supabase = createClient(supabaseUrl, supabaseKey)