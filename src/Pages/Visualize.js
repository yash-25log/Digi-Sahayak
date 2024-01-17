import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import FlowChart from "../Components/FlowChart";
import {
  select,
  drag,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  scaleOrdinal,
  schemeCategory10,
} from "d3";

export default function Visualize() {
  const location = useLocation();
  const data = location.state?.data || {};
  const svgRef = useRef(null);

  useEffect(() => {
    const nodes = data.map((transaction) => ({
      id: transaction.from_address,
      label: transaction.from_address_label,
      value: transaction.value,
    }));

    const links = data.map((transaction) => ({
      source: transaction.from_address,
      target: transaction.to_address,
      value: transaction.value,
      timestamp: transaction.timestamp,
    }));

    createNetwork(nodes, links);
  }, [data]);

  const createNetwork = (nodes, links) => {
    const svg = select(svgRef.current);

    const width = 800;
    const height = 600;

    // Create a color scale for nodes
    const color = scaleOrdinal(schemeCategory10);

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink().id((d) => d.id)
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line");

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => color(d.id))
      .call(
        drag()
          .on("start", (event, d) => dragstarted(event, d, simulation))
          .on("drag", (event, d) => dragged(event, d))
          .on("end", (event, d) => dragended(event, d, simulation))
      );

    simulation.on("tick", ticked);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event, d, simulation) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d, simulation) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };
  // const data = location.state?.data || {};
  console.log("in visualize data =>", location.state.data);
  const incomingTransactions = location.state.data.filter(
    (tx) => tx.to_address.toLowerCase() === location.state.id.toLowerCase()
  );

  const outgoingTransactions = location.state.data.filter(
    (tx) => tx.from_address.toLowerCase() === location.state.id.toLowerCase()
  );

  console.log("incoming =>", incomingTransactions);
  console.log("outcoming =>", outgoingTransactions);
  return (
    <div>
      {/* <p className="text-black font-2xl font-bold pt-8">Visualization</p> */}
      <div className="w-[100vw]  h-[100vh] flex justify-between">
        <div className="w-[50vw] bg-black pt-28">
          <FlowChart
            incomingTransactions={incomingTransactions}
            outgoingTransactions={outgoingTransactions}
          />
        </div>
        <div className="w-[50vw]">
          <svg ref={svgRef} width={750} height={600} className=" pt-12"></svg>
        </div>
      </div>
    </div>
  );
}
