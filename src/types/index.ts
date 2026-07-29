import type { Database } from "./supabase";

export type Sale = Database["public"]["Tables"]["sales_deals"]["Row"]