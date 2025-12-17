import { supabaseAnonKey, supabaseUrl } from "@/constants";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);