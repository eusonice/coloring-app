var path;
var currentColor = "black";
var currentWidth = localStorage.getItem("width");
var currentHeight = localStorage.getItem("height");
var currentAngle = localStorage.getItem("angle");
var brushCircle = new Path.Ellipse({
  point: [20, 20],
  size: [currentWidth, currentHeight],
  strokeColor: "black",
  strokeWidth: 1,
});
//-- helper function -- //

window.updateGUI = function updateGUI() {
  currentColor = localStorage.getItem("current-brush-color");
  currentWidth = localStorage.getItem("width");
  currentHeight = localStorage.getItem("height");
  currentAngle = localStorage.getItem("angle");
  brushCircle.style = {
    point: [currentWidth / 2, currentHeight / 2],
    size: [currentWidth, currentHeight],
    strokeColor: currentColor,
    // transform: "rotate(" + currentAngle + "deg)",
  };
  brushCircle.scale(1);
};

var erase = false;
updateGUI();

function drawEllipse(event, calcDelta) {
  var size = Math.max(currentWidth, currentHeight);
  var longer = Math.max(currentWidth, currentHeight) ? "width" : "height";
  brushCircle.position = event.point;
  path.add(event.point);
  if (calcDelta) {
    var delta = event.delta;
    var x = Math.abs(delta.x);
    var y = Math.abs(delta.y);
    var moveRatioX = x / (x + y);
    var moveRatioY = y / (x + y);
    // round to nearest 0.01
    moveRatioX = Math.round(moveRatioX * 100) / 100;
    moveRatioY = Math.round(moveRatioY * 100) / 100;
    console.log(moveRatioX, moveRatioY);
    var offset =
      longer === "width"
        ? Math.max(moveRatioX * size, currentWidth) / 2
        : Math.max(moveRatioY * size, currentHeight) / 2;
    PaperOffset.offsetStroke(path, offset, {
      cap: "round",
      join: "round",
    });
  }
  path.bringToFront();
  path.reduce();
  updateGUI();
}

tool.onMouseDown = function (event) {
  var size = Math.max(currentWidth, currentHeight);
  path = new Path.Circle(event.point, size / 2);
  path.strokeWidth = size;
  path.scale(currentWidth / size, currentHeight / size);
  path.fillColor = currentColor;

  // Create a new path every time the mouse is clicked
  path = new Path({
    selected: true,
  });
  path.add(event.point);
  path.strokeColor = currentColor;
  path.strokeWidth = 0;
  path.strokeJoin = "round";
  path.strokeCap = "round";
  // Create a new path every time the mouse is clicked
  drawEllipse(event, false);
  updateGUI();
};
tool.onMouseDrag = function (event) {
  drawEllipse(event, true);
};
tool.onMouseUp = function (event) {
  drawEllipse(event, false);
  path.reduce();
  path.smooth();
  updateGUI();
};

tool.onMouseMove = function (event) {
  //have the brush circle preview move with the mouse
  brushCircle.position = event.point;
};

// -- button functionality --//

$("#default").on("click", function (e) {
  currentColor = "black";
  currentWidth = 2;
  erase = false;
  updateGUI();
});
$("#thick-green").on("click", function (e) {
  currentColor = "#438c4b";
  erase = false;
  updateGUI();
});

$("#yellow").on("click", function (e) {
  currentColor = "#edbb3e";
  erase = false;
  updateGUI();
});
$("#blue").on("click", function (e) {
  currentColor = "#324bad";
  erase = false;
  updateGUI();
});
$("#red").on("click", function (e) {
  currentColor = "#d64b4b";
  erase = false;
  updateGUI();
});

$("#eraser").on("click", function (e) {
  erase = true;
  currentColor = "white";
  currentWidth = 20;

  updateGUI();
});

$("#stroke-up").on("click", function (e) {
  currentWidth += 3;
  if (currentWidth >= 40) {
    //limit max size to 40
    currentWidth = 40;
  }
  updateGUI();
});
$("#stroke-down").on("click", function (e) {
  currentWidth -= 3;
  if (currentWidth < 1) {
    //minimum size is 1
    currentWidth = 1;
  }
  updateGUI();
});

$("#clear").on("click", function (e) {
  paper.project.activeLayer.removeChildren();
  paper.view.draw();
  brushCircle = new Path.Circle({
    center: [900, 900],
    radius: 5,
    strokeColor: "black",
    strokeWidth: 1,
  });
  updateGUI();
});
