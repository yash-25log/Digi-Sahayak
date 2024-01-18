import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useLocation } from "react-router-dom";
import { CryptoLogos, Button } from "@web3uikit/core";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Detect = () => {
  const location = useLocation();
  const data = location.state?.data || {};
  const id = location.state?.id || {};

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [wid, setWid] = useState();
  const [time, setTime] = useState();

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
  const submit = () => {
    alert(
      `wallet id - ${wid} with timestamp ${time} has been reported successfully`
    );
  };

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
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Report this Address
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-basic"
                label="Wallet Address"
                variant="outlined"
                className="m-4"
                value={wid}
                onChange={(e) => setWid(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Timestamp"
                variant="outlined"
                className="m-4"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Typography>
            <Button
              style={{}}
              // onClick={() => handleVisualize()}
              onClick={() => submit()}
              text="Report"
              theme="primary"
            />
          </Box>
        </Modal>
      </div>
      <p className="text-white pt-12 text-xl">
        Transaction Time v/s Value Representation
      </p>
      <p className="text-white mt-2"> wallet id - {id} </p>
      <Button
        style={{
          padding: "0.5rem",
          marginRight: "1rem",
          width: "100px",
          position: "absolute",
          right: "10%",
        }}
        // onClick={() => handleVisualize()}
        onClick={() => setOpen(true)}
        text="Report"
        theme="primary"
      />
      <div className="w-[70vw] m-auto pt-8">
        <Line data={chartData} />;
      </div>
    </div>
  );
};

export default Detect;
