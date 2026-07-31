import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import type { SaleMetrics } from "../types";
import { Chart } from "react-charts";

function Dashboard() {
  const [metrics, setMetrics] = useState<SaleMetrics[] | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data, error } = await supabase.from("sales_deals").select(
          `
          name,
          value.sum()
          `,
        );
        if (error) {
          throw error;
        }
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    }
    fetchMetrics();
  }, []);

  console.log(metrics);

  const chartData = [
    {
      label: "Sales",
      data:
        metrics?.map((m) => ({
          primary: m.name,
          secondary: m.sum,
        })) ?? [],
    },
  ];

  function y_max() {
    if (metrics && metrics.length > 0) {
      const maxSum = Math.max(...metrics.map((m) => m.sum ?? 0));
      return maxSum + 2000;
    }
    return 5000;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        <div style={{ flex: 1 }}>
          {metrics && (
            <Chart
              options={{
                data: chartData,
                primaryAxis: {
                  getValue(datum) {
                    return datum.primary ?? "";
                  },
                  scaleType: "band",
                },
                secondaryAxes: [
                  {
                    getValue(datum) {
                      return datum.secondary ?? 0;
                    },
                    scaleType: "linear",
                    min: 0,
                    max: y_max(),                 
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
