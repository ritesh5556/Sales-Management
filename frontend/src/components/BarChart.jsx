import React, { useEffect, useState } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);



export default function BarChartComponent() {
  const [month, setMonth] = useState('May'); // Default month
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/chart/bar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ month }),
        });
        const data = await response.json();
        console.log("here we go data ... ", data);
        setChartData(data.statistics);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} items`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Item Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Price Range',
        },
      },
    },
  };

  const data = chartData
    ? {
        labels: chartData.map((item) => item.priceRange),
        datasets: [
          {
            label: 'Number of Items',
            data: chartData.map((item) => item.itemCount),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="p-6 max-w-3xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6">
        Transactions Bar Chart
        <span className="text-sm font-normal text-muted-foreground ml-2">
          {/* (Use your created API to fetch the data) */}
        </span>
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-medium">Select Month:</span>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="bg-white p-4 shadow rounded">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : chartData ? (
          <Bar options={options} data={data} />
        ) : (
          <div className="text-center text-muted-foreground">
            Failed to load chart data
          </div>
        )}
      </div>
    </div>
  );
}
