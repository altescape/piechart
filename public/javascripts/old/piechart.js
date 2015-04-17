// 
// PieChart
//
// 2015 Michael Watts
//
// Expects an object with one or more of the following:
//

function PieChart(id, d) {
  
  d = typeof d !== 'undefined' ? d : {
    values: [30, 70, 45, 65, 20, 130],
    labels: ["First", "Second", "Third", "Four", "Five", "Six"],
    colors: [
      ["#bbddb3", "#1d8e04"], // green
      ["#e2f5b4", "#9edd08"], // yellow green
      ["#fdfbb4", "#faf406"], // yellow
      ["#fbd4b7", "#f2700f"], // orange
      ["#f8bdb4", "#ea2507"], // red
      ["#e2bcbd", "#9e2126"]  // purple
    ]
  };

  this.values = d.values;
  this.labels = d.labels;
  this.colors = d.colors;
  this.canvas = document.getElementById(id);
}

PieChart.prototype = {

  select: function (segment) {
    var context = this.canvas.getContext("2d");
    this.drawSegment(this.canvas, context, segment, this.values[segment], true);
  },

  draw: function () {
    var context = this.canvas.getContext("2d");
    var startAngle = 1.57079633;
    for (var i = 0; i < this.values.length; i++) {
      var radians = this.degreesToRadians(this.degrees(this.values[i]));
      this.drawSegment(this.canvas, context, i, radians, startAngle, false);
      startAngle = startAngle + radians;
    }
  },

  drawSegment: function (canvas, context, i, size, startAngle, isSelected) {
    context.save();
    
    var centerX = Math.floor(canvas.width / 2),
        centerY = Math.floor(canvas.height / 2),
        radius = Math.floor(canvas.width / 2),
        arcSize = size, 
        endAngle = startAngle + arcSize;
    
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle, false);
    context.closePath();

    isSelected ? 
      context.fillStyle = this.colors[i][1] :
      context.fillStyle = this.colors[i][0];

    context.fill();
    context.restore();

    this.drawSegmentLabel(canvas, context, i, startAngle, isSelected);
  },

  drawSegmentLabel: function (canvas, context, i, size, isSelected) {
    context.save();
    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);
    var angle = this.radiansToDegrees(size);
    var angleD = size; 
    var flip = (angle < 90 || angle > 270) ? false : true;

    context.translate(x,y);
    context.rotate(angleD);
    context.fillStyle = "rgba(0,0,0,0.7)";

    if (flip) {
      angleD = angleD - 180;
      context.textAlign = "left";
      context.translate(-(x + (canvas.width * 0.5))+15, -(canvas.height * 0.05) - 10);
    } else {
      context.textAlign = "right";
    }
    
    var fontSize = Math.floor(canvas.height / 30);
    context.font = fontSize + "pt Helvetica";

    var dx = Math.floor(canvas.width * 0.5) - 10;
    var dy = Math.floor(canvas.height * 0.05);
    context.fillText(this.labels[i], dx, dy);

    context.restore();
  },

  drawLabel: function (i) {
    var self = this;
    var context = this.canvas.getContext("2d");
    var size = self.values[i];

    self.drawSegmentLabel(this.canvas, context, i, size, false);
  },

  degreesToRadians: function (degrees) {
    return (degrees * Math.PI)/180;
  },

  radiansToDegrees: function (value) {
    return (value * 180) / Math.PI;
  },

  percentage: function (value) {
    return (value / this.total()) * 100;
  },

  degrees: function (value) {
    return (value / this.total()) * 360; 
  },  

  total: function () {
    var total = 0;
    for (var i = 0; i < this.values.length; i++) {
      total += this.values[i];
    }
    return total;
  }  
};

