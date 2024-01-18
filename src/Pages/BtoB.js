import React, { useState, useEffect } from "react";
import TableNew from "../Components/Table";
import { CryptoLogos } from "@web3uikit/core";

const { Web3 } = require("web3");

// Connect to an Ethereum node (replace 'http://localhost:8545' with your node's URL)
const web3 = new Web3(
  "https://mainnet.infura.io/v3/068081b203ca4e468ff3291b6a0b1333"
);

// Replace 'startBlock' and 'endBlock' with the block numbers you want to track
const startBlock = 1000000;
const endBlock = 1000010;

// Function to get transactions in a given block

export default function BtoB() {
  const [data, setData] = useState([]);
  async function getTransactions(blockNumber) {
    try {
      const block = await web3.eth.getBlock(blockNumber, true);
      if (block && block.transactions) {
        console.log(
          `Transactions in block ${blockNumber}:`,
          block.transactions
        );
        return block.transactions;
      } else {
        console.log(`No transactions in block ${blockNumber}`);
        return [];
      }
      // console.log("data:", data)
    } catch (error) {
      console.error(
        `Error retrieving block ${blockNumber} transactions:`,
        error
      );
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];
      for (
        let blockNumber = startBlock;
        blockNumber <= endBlock;
        blockNumber++
      ) {
        promises.push(getTransactions(blockNumber));
      }

      try {
        const results = await Promise.all(promises);
        const mergedData = results.flat(); // Flatten the array of arrays
        setData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const modifiedData =
    Array.isArray(data) &&
    data.map((obj) => ({
      block_Hash: obj.blockHash,
      block_number: obj.blockNumber,
      from_address: obj.from,
      to_address: obj.to,
      value: obj.value,
    }));

  const NewData =
    modifiedData &&
    modifiedData.map((obj) => {
      // Truncate miner ID if it's longer than truncationLength
      const truncatedhash =
        obj.block_Hash.length > 20
          ? obj.block_Hash.substring(0, 20) + "..."
          : obj.block_Hash;

      const truncatedfrom =
        obj.from_address.length > 12
          ? obj.from_address.substring(0, 12) + "..."
          : obj.from_address;

      const truncatedto =
        obj.to_address.length > 12
          ? obj.to_address.substring(0, 12) + "..."
          : obj.to_address;
      const truncatedvalue = parseInt(obj.value) / 1e18;

      return [
        <CryptoLogos
          chain="ethereum"
          onClick={function noRefCheck() {}}
          size="35px"
        />,
        truncatedhash,
        obj.block_number,
        truncatedfrom,
        truncatedto,
        truncatedvalue,
      ];
    });

  const header2 = [
    "",
    <span>Block Hash</span>,
    "",
    <span>From</span>,
    <span>To</span>,
    <span>Value</span>,
  ];

  const style = "130px 1fr 1fr 1fr 1fr 1fr  100px";
  console.log("data", NewData);

  return (
    <div className="bg-slate-900 h-[100vh]">
      <p className="text-white text-2xl  font-bold pt-20">
        Internal Block To Block Transactions
      </p>
      <div className="w-[70vw] m-auto pt-20">
        <TableNew data={NewData} header={header2} style={style} />
      </div>
    </div>
  );
}
