import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

const FlowChart = ({ incomingTransactions, outgoingTransactions }) => {
  const chartRef = useRef(null);
  console.log("out=>", outgoingTransactions);
  // useEffect(() => {
  //   // Destroy chart when the component is unmounted
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }
  //   };
  // }, []);

  // Extract values for the chart
  const incomingValues = incomingTransactions.map((tx) => parseFloat(tx.value));
  const outgoingValues = outgoingTransactions.map((tx) => parseFloat(tx.value));
  console.log("inval=>", incomingValues);
  console.log("outval=>", outgoingValues);
  // Create a Chart.js data object
  const data = {
    labels: ["Incoming Transactions", "Outgoing Transactions"],

    datasets: [
      {
        label: "Transaction Value",
        backgroundColor: ["green", "red"],
        data: [
          incomingValues.reduce((acc, val) => acc + val, 0),
          outgoingValues.reduce((acc, val) => acc + val, 0),
        ],
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Flow Visualization</h2>
      {incomingTransactions.length > 0 || outgoingTransactions.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data available for visualization.</p>
      )}
    </div>
  );
};

export default FlowChart;
