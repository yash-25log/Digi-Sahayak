import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useLocation } from "react-router-dom";

const Detect = () => {
  const location = useLocation();
  const data = location.state?.data || {};
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Value",
        data: [],
        borderColor: "white",
        fill: false, // Set fill to false for line chart
      },
    ],
  });

  useEffect(() => {
    // Extract labels and values from data
    const labels = data.map((item) => item.block_timestamp);
    const values = data.map((item) => item.value);

    // Update chart data
    setChartData({
      labels,
      datasets: [
        {
          label: "Value",
          data: values,
          borderColor: "white",
          fill: false,
        },
      ],
    });
  }, [data]);

  return (
    <div className="bg-slate-900 h-[100vh]">
      <p className="text-white pt-12 text-xl">
        Transaction Time v/s Value Representation
      </p>
      <div className="w-[70vw] m-auto pt-12">
        <Line data={chartData} />;
      </div>
    </div>
  );
};

export default Detect;
