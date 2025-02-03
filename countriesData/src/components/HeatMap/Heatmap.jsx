import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useFetchData from "./useFetchData";
import './HeatMap.css';

const Heatmap = () => {
    const { regions, loading } = useFetchData();
    const [metric, setMetric] = useState("population"); // Default metric
    const svgRef = useRef();
  
    useEffect(() => {
      if (loading || regions.length === 0) return;
  
      // Set dimensions
      const width = window.innerWidth - 50;
      const height = window.innerHeight - 50;
      const margin = { top: 50, right: 50, bottom: 50, left: 100 };
  
      // Select the SVG element
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("background", "#f5f5f5");
  
      // Clear previous content
      svg.selectAll("*").remove();
  
      // Scale for X and Y axes
      const xScale = d3.scaleBand()
        .domain(regions.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(regions, d => d[metric])])
        .range([height - margin.bottom, margin.top]);
  
      // Color scale
      const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(regions, d => d[metric])]);
  
      // Draw rectangles
      svg.selectAll("rect")
        .data(regions)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d[metric]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin.bottom - yScale(d[metric]))
        .attr("fill", d => colorScale(d[metric]))
        .on("mouseover", (event, d) => {
          tooltip.style("opacity", 1)
            .html(`<strong>${d.name}</strong><br>${metric}: ${d[metric].toLocaleString()}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 30 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
  
      // X Axis
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
  
      // Y Axis
      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));
  
      // Tooltip
      const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "8px")
        .style("border", "1px solid #ddd")
        .style("border-radius", "5px")
        .style("opacity", 0);
    }, [regions, metric]);
  
    return (
        <>
            <h1 style={{ textAlign: "center" }}>World Population Heatmap 🌎</h1>
            <div className="heatmap-container">
                <div className="controls">
                <label>Choose Metric: </label>
                <select value={metric} onChange={(e) => setMetric(e.target.value)}>
                    <option value="population">Population</option>
                    <option value="gdpPerCapita">GDP per Capita</option>
                </select>
                </div>
                <svg ref={svgRef}></svg>
            </div>
        </>
    );
  };
  
  export default Heatmap;