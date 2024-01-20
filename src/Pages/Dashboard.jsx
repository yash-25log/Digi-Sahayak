import react, { useState, useEffect } from "react";
import Table from "../Components/Table";
import TableNew from "../Components/Table";
import axios from "axios";
import { CryptoLogos } from "@web3uikit/core";
import "./dashboard.css";
import { Link } from "react-router-dom";

import configdata from "../config.json";

const Dashboard = () => {
  const [menu, setMenu] = useState(false);
  const [inpId, setInpId] = useState();
  const [result, setResult] = useState();

  const [totalTransactions, setTotalTransactions] = useState();
  const [latestBlock, setLatestBlock] = useState();
  const [blockResult, setBlockResult] = useState();
  const [transactionsResult, setTransactionsResult] = useState();

  useEffect(() => {
    const getBlockInfo = async () => {
      const response = await axios.get(`${configdata.api}/getblockinfo`, {});
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

  const handleSubmitId = async () => {
    console.log("id=>", inpId);
    document.querySelector("#inputField").value = "";

    const response = await axios.get("http://localhost:8002/address", {
      params: { address: inpId },
    });

    setResult(response.data.result);
    console.log("Id data =>", response.data.result);
  };

  const header1 = [
    "",
    <span>TransactionId</span>,
    <span>From</span>,
    <span>To</span>,
    <span>Value</span>,
  ];

  const style = "70px 2fr 2fr 2fr 170px";

  const NewData =
    blockResult &&
    blockResult.map((obj) => {
      // Truncate miner ID if it's longer than truncationLength
      const truncatedtxnid =
        obj.transactionHash.length > 12
          ? obj.transactionHash.substring(0, 12) + "..."
          : obj.transactionHash;
      const truncatedfromid =
        obj.fromAddress.length > 12
          ? obj.fromAddress.substring(0, 12) + "..."
          : obj.fromAddress;

      const truncatedtoid =
        obj.toAddress.length > 12
          ? obj.toAddress.substring(0, 12) + "..."
          : obj.toAddress;
      const truncatedvalue =
        obj.value.length > 7 ? obj.value.substring(0, 7) + "..." : obj.value;

      // Return array of values with truncated miner ID
      return [
        <CryptoLogos
          chain="ethereum"
          onClick={function noRefCheck() {}}
          size="35px"
        />, // Empty string at the beginning
        truncatedtxnid,
        truncatedfromid,
        truncatedtoid,
        truncatedvalue,
      ];
    });

  return (
    <div>
      <section id="background_main" style={{ height: "110vh" }}>
        <div className="w-full  relative pb-10 px-6 xl:px-0 ">
          {/* <img className="absolute w-full inset-0 h-full object-cover object-center " src="https://cdn.tuk.dev/assets/templates/weCare/hero2-bg.png" alt="we care family"/> */}
          <nav className="lg:hidden relative z-40">
            <div className="flex py-6 justify-between items-center px-4">
              <div style={{ fontFamily: "Limelight,cursive;" }}>
                <p>Digi Sahayak</p>
              </div>
              <div className="flex items-center">
                <ul
                  id="list"
                  className={`${
                    menu ? "" : "hidden"
                  } p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16`}
                >
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Dashboard</span>
                    </a>
                  </li>
                  <li
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Alerts</span>
                    </a>
                  </li>
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Visualizer</span>
                    </a>
                  </li>
                  <li
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Oracle</span>
                    </a>
                  </li>
                </ul>
                <div className="xl:hidden">
                  <img
                    id="open"
                    className={` ${menu ? "hidden" : ""} close-m-menu`}
                    onClick={() => setMenu(!menu)}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg1.svg"
                    alt="menu"
                  />
                  <div
                    id="close"
                    className={` ${menu ? "" : "hidden"} close-m-menu`}
                    onClick={() => setMenu(!menu)}
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg2.svg"
                      alt="cross"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <nav
            role="navigation"
            aria-label="Main"
            tabIndex="0"
            className="hidden relative z-10 w-full lg:flex justify-between items-center p-20"
          >
            <div className="w-2/6">
              <a
                tabIndex="0"
                aria-label="we care company logo"
                href="javascript:void(0)"
              >
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  Digi Sahayak
                </p>
              </a>
            </div>
            <div className="w-5/6">
              <div className="flex items-center justify-end">
                {/* <ul className="text-white lg:space-x-8 flex items-center leading-none">
                  <li>
                    <a
                      className="hover:text-indigo-500 text-lg focus:text-indigo-500"
                      href="#"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="ml-4 hover:text-indigo-500 ">
                    <a
                      className="focus:text-indigo-500 text-lg"
                      href="javascript:void(0)"
                    >
                      Alerts
                    </a>
                  </li>
                  <li className="ml-4 hover:text-indigo-500 focus:text-indigo-500">
                    <a
                      className="focus:text-indigo-500 text-lg"
                      href="javascript:void(0)"
                    >
                      Visualizer
                    </a>
                  </li>
                  <li className="ml-4 hover:text-indigo-500 focus:text-white">
                    <a
                      className="focus:text-white text-lg"
                      href="javascript:void(0)"
                    >
                      Oracle
                    </a>
                  </li>
                </ul> */}
                <div className="pl-40">
                  <Link to="/advanced-search">
                    {" "}
                    <button
                      role="button"
                      aria-label="live chat"
                      className="focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 font-semibold rounded focus:outline-none"
                    >
                      Advanced Vision
                    </button>
                  </Link>
                  <Link to="/tracker">
                    {" "}
                    <button
                      role="button"
                      aria-label="live chat"
                      className="focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 font-semibold rounded focus:outline-none"
                    >
                      Deep Dive
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div
            className="lg:w-10/12 pt-1 lg:flex items-center relative z-10 container mx-auto"
            style={{ gap: "2rem" }}
          >
            <div className="lg:w-1/2 h-full lg:pr-10 xl:pr-0">
              {/* <img tabIndex="0" role="img" aria-label="people smiling" className="mx-auto" src="https://cdn.tuk.dev/assets/templates/weCare/hero2-left.png"  alt="people smiling"/> */}
              {NewData ? (
                <TableNew data={NewData} header={header1} style={style} />
              ) : (
                <TableNew data={[]} header={header1} style={style} />
              )}
            </div>
            <div
              role="contentinfo"
              className="w-full lg:flex lg:flex-col lg:w-1/2 h-4/6"
              style={{
                color: "rgb(102,74,201)",
                height: "65vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "between",
                gap: "1rem",
                fontFamily: "Limelight,cursive;",
              }}
            >
              <p
                tabIndex="0"
                className=" uppercase text-2xl mb-4"
                style={{ color: "white" }}
              ></p>
              <h1
                tabIndex="0"
                className=" text-4xl lg:text-6xl font-black mb-8"
              >
                Digi Sahayak
              </h1>
              <p
                tabIndex="0"
                className="text-white font-regular mb-8 w-[30vw] text-center ml-20"
                style={{ textWrap: "wrap" }}
              >
                Ride the Crypto Wave with Cryptoflow: Your Ultimate Tracker for
                Seamless Insights
              </p>
              <div
                className="bg-white lg:mt-16 py-1 px-1 flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center shadow-lg rounded-lg"
                style={{ border: "2px solid aqua", borderRadius: "180rem" }}
              >
                <div className="sm:flex items-center py-2">
                  <div className="flex items-center">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg4.svg"
                      alt="icon"
                    />
                    <Link to="/search">
                      <input
                        value={inpId}
                        onChange={(e) => setInpId(e.target.value)}
                        aria-label="Transaction address"
                        className="w-full xl:w-full leading-none tracking-normal text-gray-800 ml-2.5 placeholder-black"
                        placeholder="Transaction address"
                      />{" "}
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => handleSubmitId()}
                  id="inputField"
                  role="button"
                  style={{ marginRight: "0.4rem", borderRadius: "100px" }}
                  aria-label="search"
                  className="focus:bg-indigo-700 focus:ring-indigo-700 focus:ring-2 focus:ring-offset-2 text-white bg-indigo-600 hover:bg-indigo-700 mt-4 sm:mt-0 p-3 lg:-ml-8 rounded w-full sm:w-auto relative"
                >
                  <img
                    className="absolute right-0 mr-2 sm:mr-auto sm:relative icon icon-tabler icon-tabler-search cursor-pointer"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg7.svg"
                    alt="search"
                  />
                  <input
                    aria-label="Advanced Vision"
                    className="sm:hidden border-b border-gray-300 w-full bg-transparent pr-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
            /* Top menu */
            .top-100 {
                animation: slideDown 0.5s ease-in-out;
            }
            @keyframes slideDown {
                0% {
                    top: -50%;
                }
                100% {
                    top: 0;
                }
            }
            * {
                outline: none !important;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
            }`}
      </style>
    </div>
  );
};
export default Dashboard;
