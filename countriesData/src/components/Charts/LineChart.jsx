import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const LineChart = ({ data, selectedCountries }) => {

  useEffect(() => {
    d3.select("#line-chart").selectAll("*").remove(); // Clear previous chart

    if (!data.length) return;

    const width = 900, height = 500, margin = { top: 20, right: 30, bottom: 70, left: 60 };

    // Filter data based on selected countries
    const filteredData = data.filter((d) => selectedCountries.includes(d.name.common));

    // Scales
    const xScale = d3.scaleBand()
      .domain(filteredData.map((d) => d.name.common))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.population)])
      .range([height - margin.bottom, margin.top]);

    // Create SVG
    const svg = d3.select("#line-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Add X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Add Y Axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Line Generator
    const line = d3.line()
      .x((d) => xScale(d.name.common) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.population))
      .curve(d3.curveMonotoneX);

    // Draw Line
    svg.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add Points
    svg.selectAll(".dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.name.common) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.population))
      .attr("r", 4)
      .attr("fill", "red")
      .append("title")
      .text((d) => `${d.name.common}: ${d.population.toLocaleString()}`);

      const zoom = d3.zoom()
  .scaleExtent([1, 10])
  .translateExtent([[0, 0], [width, height]])
  .extent([[0, 0], [width, height]])
  .on("zoom", (event) => {
    svg.attr("transform", event.transform);
  });
  }, [data, selectedCountries]);


  return <div id="line-chart"></div>;
};

export default LineChart;
