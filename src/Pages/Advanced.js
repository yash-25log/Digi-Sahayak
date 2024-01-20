import React, { useEffect, useState } from "react";
import { CryptoLogos } from "@web3uikit/core";
import TableNew from "../Components/Table";
import axios from "axios";
import configdata from "../config.json";

export default function Advanced() {
  const [getTable, setGetTable] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    const highVol = async () => {
      const response = await axios.get(`${configdata.api}/high-volume`);
      console.log("my new data=>", response.data.data);
      setData(response.data.data);
      setGetTable(true);
    };

    highVol();
  }, []);

  const modifiedData =
    data &&
    data.map((obj) => ({
      chain: obj.chain,
      interactedAddress: obj.interactedAddress,
      value:
        obj.transfers && obj.transfers.length > 0 ? obj.transfers[0].amount : 0,
      txnHash: obj.txnHash,
    }));

  const header2 = [
    "",
    <span>Chain</span>,
    <span>Address</span>,
    <span>TxnHash</span>,
    <span>Value</span>,
  ];

  const style = "120px 1fr 1fr 1fr  150px";

  const NewData =
    modifiedData &&
    modifiedData.map((obj) => {
      // Truncate miner ID if it's longer than truncationLength
      const truncatedadd =
        obj.interactedAddress.length > 12
          ? obj.interactedAddress.substring(0, 12) + "..."
          : obj.interactedAddress;
      const truncatedtxnhash =
        obj.txnHash.length > 12
          ? obj.txnHash.substring(0, 12) + "..."
          : obj.txnHash;

      const truncatedvalue = parseInt(obj.value) / 1e18;
      // obj.value.length > 7 ? obj.value.substring(0, 7) + "..." : obj.value;

      // Return array of values with truncated miner ID
      return [
        <CryptoLogos
          chain="ethereum"
          onClick={function noRefCheck() {}}
          size="35px"
        />, // Empty string at the beginning
        obj.chain,
        truncatedadd,
        truncatedtxnhash,
        truncatedvalue,
      ];
    });

  return (
    <div className="bg-slate-900 h-[100vh]">
      <p className="text-white text-2xl pt-10 font-bold">
        Filtered High Value Transactions
      </p>
      <div className="w-[70vw] m-auto pt-16">
        {getTable ? (
          <TableNew data={NewData} header={header2} style={style} />
        ) : (
          <TableNew data={[]} header={header2} style={style} />
        )}
      </div>
    </div>
  );
}
