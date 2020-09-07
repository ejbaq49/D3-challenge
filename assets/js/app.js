// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 10,
  right: 40,
  bottom: 60,
  left: 100,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG warpper; append SVG group
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read Data
d3.csv("../assets/data/data.csv")
  .then(function (stateData) {
    // print data
    console.log(stateData);

    // data conversion
    stateData.forEach((data) => {
      data.poverty = +data.poverty;
      data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      data.healthcareLow = +data.healthcareLow;
      data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      data.obesityLow = +data.obesityLow;
      data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      data.smokesLow = +data.smokesLow;
      data.smokesHigh = +data.smokesHigh;
    });

    // create scale functions for Poverty and Healthcare
    var xLinearScale = d3
      .scaleLinear()
      .domain([8, d3.max(stateData, (d) => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3
      .scaleLinear()
      .domain([4, d3.max(stateData, (d) => d.healthcareHigh)])
      .range([height, 0]);

    // axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append axes to chart
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup
      .selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      .classed("stateCircle", true)
      .attr("cx", (d) => xLinearScale(d.poverty))
      .attr("cy", (d) => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("opacity", ".5");

    var textLabels = chartGroup
      .append("g")
      .selectAll("text")
      .data(stateData)
      .enter()
      .append("text")
      .classed("stateText", true)
      .attr("x", (d) => xLinearScale(d.poverty))
      .attr("y", (d) => yLinearScale(d.healthcare) + 5)
      .text((d) => d.abbr);
  })
  .catch(function (error) {
    console.log(error);
  });
