import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG elements

    const width = 800;
    const height = 600;
    const margin = { top: 40, right: 20, bottom: 100, left: 100 };

    svg.attr("width", width).attr("height", height);

    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.name)) // Country names
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.population)]) // Population values
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.name))
      .attr("y", d => yScale(d.population))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.population))
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", "steelblue");
      });

    // X-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d => d.slice(0, 3))) // Shorten country names
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
