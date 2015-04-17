// 
// PieChart
//
// 2015 Michael Watts
//
// Expects an object with one or more of the following:
//

function PieChart(id, d) {
  
  d = typeof a !== 'undefined' ? d : {
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

  this.values = d.values ? d.values : [30, 70, 45, 65, 20, 130]; // degrees
  this.labels = d.labels ? d.labels : ["First", "Second", "Third", "Four", "Five", "Six"];
  this.colors = d.colors ? d.colors : [
    ["#bbddb3", "#1d8e04"], // green
    ["#e2f5b4", "#9edd08"], // yellow green
    ["#fdfbb4", "#faf406"], // yellow
    ["#fbd4b7", "#f2700f"], // orange
    ["#f8bdb4", "#ea2507"], // red
    ["#e2bcbd", "#9e2126"]  // purple
  ];

  this.canvas = document.getElementById(id);
}

PieChart.prototype = {

  select: function (segment) {
    var self = this;
    var context = this.canvas.getContext("2d");
    this.drawSegment(this.canvas, context, segment, this.values[segment], true);
  },

  draw: function () {
    var self = this;
    var context = this.canvas.getContext("2d");
    for (var i = 0; i < this.values.length; i++) {
      this.drawSegment(this.canvas, context, i, this.values[i], false);
    }
  },

  drawSegment: function (canvas, context, i, size, isSelected) {
    var self = this;
    context.save();
    var centerX = Math.floor(canvas.width / 2),
        centerY = Math.floor(canvas.height / 2),
        radius = Math.floor(canvas.width / 2),
        startingAngle = this.degreesToRadians(this.sumTo(self.values, i)),
        arcSize = this.degreesToRadians(size),
        endingAngle = startingAngle + arcSize;

    console.log(this.sumTo(self.values, i) + ":" + size + ":" + (this.sumTo(self.values, i)-size));

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
    context.closePath();

    isSelected ? 
      context.fillStyle = self.colors[i][1] :
      context.fillStyle = self.colors[i][0];

    context.fill();
    context.restore();

    self.drawSegmentLabel(canvas, context, i, isSelected);
  },

  drawSegmentLabel: function (canvas, context, i, isSelected) {
    var self = this;
    context.save();
    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);
    var angle;
    var angleD = self.sumTo(self.values, i);
    var flip = (angleD < 90 || angleD > 270) ? false : true;

    context.translate(x,y);
    
    if (flip) {
      angleD = angleD - 180;
      context.textAlign = "left";
      angle = self.degreesToRadians(angleD);
      context.rotate(angle);
      context.translate(-(x + (canvas.width * 0.5))+15, -(canvas.height * 0.05) - 10);
    } else {
      context.textAlign = "right";
      angle = self.degreesToRadians(angleD);
      context.rotate(angle);
    }
    
    var fontSize = Math.floor(canvas.height / 25);
    context.font = fontSize + "pt Helvetica";

    var dx = Math.floor(canvas.width * 0.5) - 10;
    var dy = Math.floor(canvas.height * 0.05);
    context.fillText(self.labels[i], dx, dy);

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

  sumTo: function (a, i) {
    var sum = 0;

    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
  }  
};
