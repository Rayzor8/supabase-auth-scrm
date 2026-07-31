import type { Database } from "./supabase";

export type Sale = Database["public"]["Tables"]["sales_deals"]["Row"];
export type SaleMetrics = {
  name: Database["public"]["Tables"]["sales_deals"]["Row"]["name"];
  sum: Database["public"]["Tables"]["sales_deals"]["Row"]["value"];
};
