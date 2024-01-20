import React, { useState } from "react";
import TableNew from "../Components/Table";
import axios from "axios";
import { CryptoLogos, Button } from "@web3uikit/core";
import { useNavigate } from "react-router-dom";
import { Arrow } from "@web3uikit/icons";
import TransactionList from "../Components/TransactionList";
import configdata from "../config.json";

export default function TxtDetails() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [inpId, setInpId] = useState();
  const [result, setResult] = useState();
  const [getTable, setGetTable] = useState(false);

  const handleSubmitId = async () => {
    console.log("id=>", inpId);
    document.querySelector("#inputField").value = "";

    const response = await axios.get(`${configdata.api}/address`, {
      params: { address: inpId },
    });

    setResult(response.data.result);
    console.log("Id data =>", response.data.result);
    setGetTable(true);
  };

  const modifiedData =
    result &&
    result.map((obj) => ({
      hash: obj.hash,
      block_number: obj.block_number,
      from_address: obj.from_address,
      from_address_label: obj.from_address_label,
      to_address: obj.to_address,
      to_address_label: obj.to_address_labe,
      value: obj.value,
    }));

  const header2 = [
    "",
    <span>Transaction Hash</span>,
    <span>Block</span>,
    <span>From</span>,
    "",
    <span>To</span>,
    <span>Value</span>,
  ];

  const style = "120px 1fr 1fr 1fr 1fr 1fr 1fr 150px";

  const NewData =
    modifiedData &&
    modifiedData.map((obj) => {
      // Truncate miner ID if it's longer than truncationLength
      const truncatedhash =
        obj.hash.length > 12 ? obj.hash.substring(0, 12) + "..." : obj.hash;
      const truncatedfrom =
        obj.from_address.length > 12
          ? obj.from_address.substring(0, 12) + "..."
          : obj.from_address;

      const truncatedto =
        obj.to_address.length > 12
          ? obj.to_address.substring(0, 12) + "..."
          : obj.to_address;
      const truncatedvalue = parseInt(obj.value) / 1e18;
      // obj.value.length > 7 ? obj.value.substring(0, 7) + "..." : obj.value;

      // Return array of values with truncated miner ID
      return [
        <CryptoLogos
          chain="ethereum"
          onClick={function noRefCheck() {}}
          size="35px"
        />, // Empty string at the beginning
        truncatedhash,
        obj.block_number,
        truncatedfrom,
        <Arrow fontSize="25px" />,
        truncatedto,
        truncatedvalue,
      ];
    });

  const handleVisualize = () => {
    const data = {
      data: result,
      walletAdd: inpId,
    };

    // Navigate to the next page and pass the data
    console.log("visualize=>", data.data);
    data &&
      navigate("/visualize", {
        state: { data: data.data, id: data.walletAdd },
      });
  };

  const handleDetect = () => {
    const data = {
      data: result,
      id: inpId,
    };

    // Navigate to the next page and pass the data
    console.log("detect=>", data.data);
    data &&
      navigate("/detect", {
        state: { data: data.data, id: data.id },
      });
  };

  return (
    <div>
      <section className="bg-black">
        <div className="w-full h-[100vh] relative pb-10 px-6 xl:px-0 bg-slate-900">
          <nav className="lg:hidden relative z-40">
            <div className="flex py-6 justify-between items-center px-4">
              <div>
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg3.svg"
                  alt="logo"
                />
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
            style={{
              // border:"2px solid red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="hidden relative z-10 w-full lg:flex justify-between items-center pt-12 pl-20 pb-12"
          >
            <div className="w-[80%]">
              <div
                className="bg-white lg:mt-4 py-1.5 px-1.5 flex justify-center flex-col sm:flex-row justify-start lg:align-center sm:justify-between items-start sm:items-center shadow-lg rounded-lg "
                style={{ marginRight: "0.4rem", borderRadius: "100px" }}
              >
                <div className="sm:flex items-center py-1">
                  <div className="flex items-center">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg4.svg"
                      alt="icon"
                    />
                    <input
                      style={{ width: "600px" }}
                      value={inpId}
                      onChange={(e) => setInpId(e.target.value)}
                      aria-label="Transaction address"
                      className="w-full xl:w-full leading-none tracking-normal text-gray-800 ml-2.5 placeholder-black"
                      placeholder="Transaction address "
                    />
                  </div>
                </div>
                <button
                  style={{ marginRight: "0.4rem", borderRadius: "100px" }}
                  onClick={() => handleSubmitId()}
                  id="inputField"
                  role="button"
                  aria-label="search"
                  className="focus:bg-indigo-700 focus:ring-indigo-700 focus:ring-2 focus:ring-offset-2 text-white bg-indigo-600 hover:bg-indigo-700 mt-0 sm:mt-0 p-3 lg:-ml-8 rounded w-full sm:w-auto relative"
                >
                  <img
                    className="absolute right-0 mr-2 sm:mr-auto sm:relative icon icon-tabler icon-tabler-search cursor-pointer"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg7.svg"
                    alt="search"
                  />
                  <input
                    aria-label="search"
                    className="sm:hidden border-b border-gray-300 w-full bg-transparent pr-6"
                  />
                </button>
              </div>
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
                {getTable ? (
                  <>
                    <Button
                      style={{
                        padding: "0.5rem",
                        marginRight: "1rem",
                        width: "100px",
                      }}
                      onClick={() => handleVisualize()}
                      text="Visualize"
                      theme="primary"
                    />
                    <Button
                      style={{
                        padding: "0.5rem",
                        marginRight: "1rem",
                        width: "100px",
                      }}
                      onClick={() => handleDetect()}
                      text="Analyze"
                      theme="primary"
                    />
                  </>
                ) : (
                  ""
                )}

                <div className="pl-40"></div>
              </div>
            </div>
          </nav>
          <div className="pt-1 lg:flex items-center relative z-10 container mx-auto">
            <div className="w-full lg:w-[90%] m-auto h-full lg:pr-10 xl:pr-0">
              {getTable ? (
                <TableNew data={NewData} header={header2} style={style} />
              ) : (
                <TableNew data={[]} header={header2} style={style} />
              )}
              {/* {getTable ? (
                <TransactionList transactions={result} walletAddress={inpId} />
              ) : (
                ""
              )} */}
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
}
