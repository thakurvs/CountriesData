import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RegionLineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 50, left: 100 };

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.population)])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.population));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d => d.slice(0, 3)));

    svg.append("g").attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default RegionLineChart;
