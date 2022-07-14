var template = localStorage.getItem("current-template");
template = JSON.parse(template);
console.log("template", template);

var raster = new Raster({
  source: template.url,
  position: view.center,
});

raster.fitBounds(view.bounds)

view.onFrame = function(event) {
  // resizeImg()
  raster.bringToFront();
}

// function resizeImg() {
//   raster.fitBounds(view.bounds)
// }
// add background color to the canvas
var rect = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  strokeColor: 'white',
  // selected: true
});
rect.sendToBack();
rect.fillColor = '#ffffff';

window.erase = false;
var eraserPath;
var currentColor = "black";
var currentWidth = localStorage.getItem("width");
var currentHeight = localStorage.getItem("height");
var currentAngle = localStorage.getItem("angle");
var eraserSize = localStorage.getItem("eraser") || 16;
window.brushCircle = new Path.Ellipse({
  point: [20, 20],
  size: [currentWidth, currentHeight],
  strokeColor: "black",
  strokeWidth: 1,
});
//-- helper function -- //




window.updateGUI = function updateGUI() {
  currentColor = localStorage.getItem("current-brush-color");
  currentWidth = localStorage.getItem("width"); // 100
  currentHeight = localStorage.getItem("height");
  currentAngle = localStorage.getItem("angle");
  eraserSize = localStorage.getItem("eraser");
  var pointSize = erase ? [eraserSize/2, eraserSize/2] : [currentWidth/2, currentHeight/2];
  var currentSize = erase ? [eraserSize, eraserSize] : [currentWidth, currentHeight];
  brushCircle.style = {
    center: pointSize,
    size: currentSize,
    strokeColor: erase ? 'black' : currentColor,
    strokeWidth: 1,
  };
};
updateGUI();

var circle;
tool.maxDistance = 1;

tool.onMouseDown = function (event) {
  // Create a new path every time the mouse is clicked
  if (erase == true){
    eraserPath = new Path();
    eraserPath.strokeWidth = eraserSize;
    eraserPath.strokeColor = "white";
    eraserPath.strokeJoin = "round";
    eraserPath.add(event.point); //another thing that makes strokes smoother
    updateGUI();
  }
};

tool.onMouseDrag = function(event) {
  if (erase == true) {
    eraserPath.add(event.point);
  }
  else {
    circle = new Path.Ellipse({
      center: event.middlePoint,
      size: [currentWidth, currentHeight],
      fillColor: currentColor,
    });
	  circle.rotate(currentAngle);
  }
  brushCircle.position = event.point;
  updateGUI();
}

tool.onMouseUp = function (event) {
  if (erase == true){
    eraserPath.add(event.point);
    eraserPath.smooth(); //makes our strokes smoother
    updateGUI();
  }
};

tool.onMouseMove = function (event) {
  //have the brush circle preview move with the mouse
  brushCircle.position = event.point;
  brushCircle.bringToFront();
};

// -- button functionality --//

$("#brush").on("click", function(e) {
  erase = false;
  $("#eraser").removeClass("active");
  $(".slider-wrap.slider-eraser").addClass("hidden");
  $(".slider-wrap.slider-brush").removeClass("hidden");
  $(this).addClass("active");
  updateGUI();
});

$("#eraser").on("click", function (e) {
  erase = true;
  currentColor = "white";
  currentWidth = eraserSize;
  $("#brush").removeClass("active");
  $(".slider-wrap.slider-brush").addClass("hidden");
  $(".slider-wrap.slider-eraser").removeClass("hidden");
  $(this).addClass("active");
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
  raster= new Raster({
    source: template.url,
    position: view.center,
  });
  raster.bringToFront();
  raster.fitBounds(view.bounds)
  updateGUI();
});

/* https://codepen.io/hichem147/pen/dExxNK */

$("#zoomin-button").on("click", function(e) {
  // raster.scale(1.25);
  // view.scale(1.25);
  paper.view.zoom = paper.view.zoom * 1.25;
});

$("#zoomout-button").on("click", function(e) {
  //raster.scale(0.8);
  //view.scale(0.8);
  paper.view.zoom = paper.view.zoom * 0.8;
});

$('#my-canvas').on('mousewheel', function(event) {
  var newZoom = paper.view.zoom; 
  var oldZoom = paper.view.zoom;
  
  $("#reset-zoom-button").removeClass("hidden");
  $("#zoomin-button").addClass("hidden");
  $("#zoomout-button").addClass("hidden");

  if (event.originalEvent.deltaY < 0) {			
    newZoom = paper.view.zoom * 1.05;
  } else {
    newZoom = paper.view.zoom * 0.95;
  }
  
  var beta = oldZoom / newZoom;
  
  var mousePosition = new paper.Point(event.offsetX, event.offsetY);
  
  //viewToProject: gives the coordinates in the Project space from the Screen Coordinates
  var viewPosition = paper.view.viewToProject(mousePosition);
  
  var mpos = viewPosition;
  var ctr = paper.view.center;
  
  var pc = mpos.subtract(ctr);
  var offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);	
  
  paper.view.zoom = newZoom;
  paper.view.center = paper.view.center.add(offset);
  
  event.preventDefault();
  paper.view.draw();			
  updateGUI();
});

$("#reset-zoom-button").on("click", function(e) {
  paper.view.zoom = 1;
  paper.view.center = [paper.view.bounds.width/2, paper.view.bounds.height/2]
  $("#reset-zoom-button").addClass("hidden");
  $("#zoomin-button").removeClass("hidden");
  $("#zoomout-button").removeClass("hidden");
});