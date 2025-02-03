import React, {useState, useEffect} from "react";
import * as d3 from "d3";

const BarChartD3 = ({ data }) => {
    useEffect(() => {
      d3.select("#bar-chart").selectAll("*").remove();
  
      if (data.length === 0) return;
  
      const margin = { top: 40, right: 30, bottom: 100, left: 80 };
      const width = window.innerWidth - margin.left - margin.right;
      const height = window.innerHeight - margin.top - margin.bottom;
  
      const svg = d3
        .select("#bar-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      // **X Scale**
      const x = d3.scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, width])
        .padding(0.2);
  
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px");
  
      // **Y Scale**
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.population)])
        .range([height, 0]);
  
      svg.append("g")
        .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format(".2s")));
  
      // **Color scale**
      const colorScale = d3.scaleOrdinal()
        .domain([...new Set(data.map((d) => d.region))])
        .range(d3.schemeSet2);
  
      // **Bars with transitions**
      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.name))
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", (d) => colorScale(d.region))
        .on("mouseover", function (event, d) {
          d3.select(this).attr("opacity", 0.7);
          d3.select("#tooltip")
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 40 + "px")
            .style("opacity", 1)
            .html(`<strong>${d.name}</strong><br>Population: ${d.population.toLocaleString()}`);
        })
        .on("mouseout", function () {
          d3.select(this).attr("opacity", 1);
          d3.select("#tooltip").style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .attr("y", (d) => y(d.population))
        .attr("height", (d) => height - y(d.population));

      //   // ✅ Adding Zoom & Panning
      //   const zoom = d3.zoom()
      //   .scaleExtent([1, 5]) // Zoom limits
      //   .translateExtent([[0, 0], [width, height]])
      //   .on("zoom", function (event) {
      //     svg.selectAll("g").attr("transform", event.transform);
      //     bars.attr("transform", event.transform);
      //   });

      // d3.select("#bar-chart").call(zoom);

    }, [data]);
  
    return <div id="tooltip" className="tooltip"></div>;
};
  
export default BarChartD3;