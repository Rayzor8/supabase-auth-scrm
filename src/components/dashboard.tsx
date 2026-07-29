import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import type { Sale } from "../types";

function Dashboard() {
  const [salesDeals, setSalesDeals] = useState<Sale[] | null>(null);

  useEffect(() => {
    async function getSalesDeals() {
      const { data, error } = await supabase.from("sales_deals").select(`*`);

      if (error) {
        console.error(error);
        return;
      }

      setSalesDeals(data);
    }
    getSalesDeals();
  }, []);

  console.log(salesDeals);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
      </div>
    </div>
  );
}

export default Dashboard;
