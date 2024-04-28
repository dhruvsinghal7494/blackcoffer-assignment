import { useState, useEffect } from "react";
import axios from "axios";
import * as d3 from "d3";

const VisualizationComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint using Axios
    axios
      .get("http://localhost:5000/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // D3.js visualization code
    const svg = d3.select("#visualization-svg");
    const width = 800;
    const height = 600;

    // Data processing and visualization creation
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.Country))
      .attr("y", (d) => yScale(d.Intensity))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.Intensity))
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return <svg id="visualization-svg" width="800" height="600"></svg>;
};

export default VisualizationComponent;
