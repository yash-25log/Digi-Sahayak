import React, { useEffect, useState } from "react";
import { Avatar, Tag, Table, CryptoLogos } from "@web3uikit/core";
import axios from "axios";

const TableNew = () => {
  const data = [
    ["", "Moralis Magi", "0xldg1234", "0x18...130e", "123"],
    ["", "Moralis Magi", "0xldg1234", "0x18...130e", "123"],
  ];

  const [totalTransactions, setTotalTransactions] = useState();
  const [latestBlock, setLatestBlock] = useState();
  const [blockResult, setBlockResult] = useState();
  const [transactionsResult, setTransactionsResult] = useState();

  useEffect(() => {
    const getBlockInfo = async () => {
      const response = await axios.get(
        "http://localhost:8002/getblockinfo",
        {}
      );
      console.log("resp=>", response);
      const blockArray = [
        response.data.previousBlockInfo[0].transactions[0],
        response.data.previousBlockInfo[0].transactions[1],
        response.data.previousBlockInfo[0].transactions[2],
        response.data.previousBlockInfo[0].transactions[3],
        response.data.previousBlockInfo[0].transactions[4],
      ];

      const transactions = [response.data.previousBlockInfo[0].transactions];

      setTotalTransactions(
        response.data.previousBlockInfo[1].totalTransactions
      );
      setLatestBlock(response.data.latestBlock);
      setBlockResult(blockArray);
      setTransactionsResult(response.data.previousBlockInfo[0].transactions);
    };

    getBlockInfo();
    console.log("data=>", blockResult);
  }, []);

  const NewData =
    blockResult &&
    blockResult.map((obj) => {
      // Truncate miner ID if it's longer than truncationLength
      const truncatedtxnid =
        obj.transactionHash.length > 8
          ? obj.transactionHash.substring(0, 8) + "..."
          : obj.transactionHash;
      const truncatedfromid =
        obj.fromAddress.length > 8
          ? obj.fromAddress.substring(0, 8) + "..."
          : obj.fromAddress;

      const truncatedtoid =
        obj.toAddress.length > 8
          ? obj.toAddress.substring(0, 8) + "..."
          : obj.toAddress;
      const truncatedvalue =
        obj.value.length > 5 ? obj.value.substring(0, 5) + "..." : obj.value;

      // Return array of values with truncated miner ID
      return [
        <CryptoLogos
          chain="ethereum"
          onClick={function noRefCheck() {}}
          size="48px"
        />, // Empty string at the beginning
        truncatedtxnid,
        truncatedfromid,
        truncatedtoid,
        truncatedvalue,
      ];
    });

  return (
    <div>
      <Table
        columnsConfig="80px 3fr 2fr 2fr 80px"
        data={NewData}
        header={[
          "",
          <span>TransactionId</span>,
          <span>From</span>,
          <span>To</span>,
          <span>Value</span>,
        ]}
        isColumnSortable={[false, true, false, false]}
        maxPages={3}
        onPageNumberChanged={function noRefCheck() {}}
        onRowClick={function noRefCheck() {}}
        pageSize={5}
      />
    </div>
  );
};

export default TableNew;
