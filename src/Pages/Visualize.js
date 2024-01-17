// import React, { useEffect, useRef, useState } from "react";
// import {
//   select,
//   drag,
//   forceSimulation,
//   forceLink,
//   forceManyBody,
//   forceCenter,
// } from "d3"; // Importing specific modules from d3
// import * as d3 from "d3";
// import { useLocation } from "react-router-dom";

// function Visualize() {
//   const location = useLocation();
//   const data = location.state?.data || {};
//   console.log("in visualize data =>", location.state.data);
//   const svgRef = useRef(null);

//   useEffect(() => {
//     // Fetch transactions data (replace with your Moralis API call)
//     // ...

//     // Structure data for D3
//     const nodes = data.map((transaction) => ({
//       id: transaction.from_address,
//       label: transaction.from_address_label,
//       value: transaction.value,
//       // ...other properties
//     }));

//     const links =
//       data &&
//       data.map((transaction) => ({
//         source: transaction.from_address,
//         target: transaction.to_address,
//         value: transaction.value,
//         timestamp: transaction.timestamp,
//         // ...other properties
//       }));

//     // Create the network visualization
//     createNetwork(nodes, links);
//   }, [data]);

//   const createNetwork = (nodes, links) => {
//     const svg = select(svgRef.current);

//     // Set dimensions
//     const width = 800;
//     const height = 600;

//     // Create a force simulation for node positioning
//     const simulation = forceSimulation(nodes)
//       .force(
//         "link",
//         forceLink().id((d) => d.id)
//       )
//       .force("charge", forceManyBody())
//       .force("center", forceCenter(width / 2, height / 2));

//     // Add links
//     const link = svg
//       .append("g")
//       .attr("class", "links")
//       .selectAll("line")
//       .data(links)
//       .enter()
//       .append("line");

//     // Add nodes
//     const node = svg
//       .append("g")
//       .attr("class", "nodes")
//       .selectAll("circle")
//       .data(nodes)
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .call(
//         drag()
//           .on("start", (event, d) => dragstarted(event, d, simulation))
//           .on("drag", (event, d) => dragged(event, d))
//           .on("end", (event, d) => dragended(event, d, simulation))
//       );

//     // Update node and link positions on tick
//     simulation.on("tick", ticked);

//     function ticked() {
//       link
//         .attr("x1", (d) => d.source.x)
//         .attr("y1", (d) => d.source.y)
//         .attr("x2", (d) => d.target.x)
//         .attr("y2", (d) => d.target.y);

//       node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
//     }

//     // Drag functionality for nodes
//     function dragstarted(event, d, simulation) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     }

//     function dragged(event, d) {
//       d.fx = event.x;
//       d.fy = event.y;
//     }

//     function dragended(event, d, simulation) {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     }
//   };

//   return <svg ref={svgRef} width={800} height={600}></svg>;
// }

// export default Visualize;

import React, { useEffect, useRef, useState } from "react";
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
import { useLocation } from "react-router-dom";

function Visualize() {
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

  return (
    <div className="bg-[#0F172A] h-[100vh]">
      <p className="text-white font-2xl font-bold pt-8">Visualization</p>
      <svg
        ref={svgRef}
        width={1000}
        height={600}
        className="m-auto pt-12"
      ></svg>
    </div>
  );
}

export default Visualize;
