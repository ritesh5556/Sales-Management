import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

const PieChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const chartRef = useRef(null);
  let pieChartInstance = null;

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/chart/pie`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month: selectedMonth }),
        });
        const data = await response.json();

        const categories = data.statistics.map((stat) => stat.category);
        const itemCounts = data.statistics.map((stat) => stat.itemCount);

        // Destroy the chart instance if it already exists
        if (pieChartInstance) {
          pieChartInstance.destroy();
        }

        // Create the chart
        const ctx = chartRef.current.getContext("2d");
        pieChartInstance = new Chart(ctx, {
          type: "pie",
          data: {
            labels: categories,
            datasets: [
              {
                label: "Category Distribution",
                data: itemCounts,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allow custom sizing
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Pie Chart - ${data.month}`,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchData();

    // Cleanup the chart instance on unmount
    return () => {
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }
    };
  }, [selectedMonth]);

  return (
    <div className="mb-20"  style={{ textAlign: "center" }}>
        <div className="flex justify-center items-center gap-5 pb-6">
        <h1>Pie Chart</h1>
      <div style={{}}>
        <select value={selectedMonth} onChange={handleMonthChange} className="flex items-center justify-center p-2">
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
          <option value="Jul">July</option>
          <option value="Aug">August</option>
          <option value="Sep">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
        </select>
            </div>
        </div>
      
      <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default PieChart;
