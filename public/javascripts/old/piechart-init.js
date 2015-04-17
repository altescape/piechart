window.onload = createPieChart;
function createPieChart() {
  var pieChart = new PieChart( "piechart",  {
    values: [3000000, 3000000, 3000000],
    labels: ["$1,000,000", "$3,000,000", "$300,000"],
    colors: [
      ["#bbddb3", "#1d8e04"], // green
      ["#e2f5b4", "#9edd08"], // yellow green
      ["#fdfbb4", "#faf406"], // yellow
      ["#fbd4b7", "#f2700f"], // orange
      ["#f8bdb4", "#ea2507"], // red
      ["#e2bcbd", "#9e2126"]  // purple
    ]
  });

  pieChart.draw();

  var segment = 0;
  function nextSegment() {
    pieChart.select(segment);
    segment++;
    if (segment < pieChart.values.length) {
      setTimeout(nextSegment, 1000);
    }
  }
  //setTimeout(nextSegment, 1000);
}
