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

window.RUType = {
  mouseUp: 1,
  mouseDown: 2,
  undo: 3,
  redo: 4,
};

function RUEvent(type, payload) {
  this.type = type;
  this.payload = payload;
}

function Handler() {
  this.undoStack = [];
  this.redoStack = [];
  this.paths = {};
  this.context = {
    op: "line",
    current: undefined,
  };

  this.handle = function (event) {
    switch (event.type) {
      case RUType.mouseDown:
        if (this.context.op === "line") {
          console.log(event.payload);
          var newPath = new Path();
          newPath.strokeColor = "black";
          newPath.add(event.payload.point);
          newPath.id = id++;
          this.undoStack.push({ type: "addPath", id: newPath.id });
          this.paths[newPath.id] = newPath;
          this.context.current = newPath.id;
        }
        break;
      case RUType.mouseUp:
        console.log("mouseup");
        if (this.context.op === "line") {
          var tempPath = this.paths[this.context.current];
          tempPath.add(event.payload.point);
        }
        break;
      case RUType.undo:
        console.log("undoing...");
        var op = this.undoStack.pop();
        if (op && op.type === "addPath") {
          var tempPath = this.paths[op.id];
          var segments = tempPath.removeSegments();
          delete this.paths[op.id];
          this.redoStack.push({
            type: "path.removeSegments",
            segments: segments,
          });
        }
        break;
      case RUType.redo:
        console.log("redoing-...");
        var op = this.redoStack.pop();
        if (op && op.type === "path.removeSegments") {
          var tempPath = new Path();
          tempPath.id = id++;
          tempPath.strokeColor = "red";
          tempPath.addSegments(op.segments);
          this.undoStack.push({ type: "addPath", id: tempPath.id });
        }
        break;
      default:
        break;
    }
  };
}

//-- helper function -- //
var id = 0;
window.RUHandler = new Handler();
window.RUEvent = RUEvent;
window.updateGUI = function updateGUI() {
  currentColor = localStorage.getItem("current-brush-color");
  currentWidth = localStorage.getItem("width");
  currentHeight = localStorage.getItem("height");
  currentAngle = localStorage.getItem("angle");
  brushCircle.style = {
    point: [currentWidth / 2, currentHeight / 2],
    size: [currentWidth, currentHeight],
    strokeColor: currentColor,
    selected: true,
    // transform: "rotate(" + currentAngle + "deg)",
  };
  brushCircle.scale(1);
};

var erase = false;
updateGUI();

tool.onMouseDown = function (event) {
  //draw a circle on click, gives the brush a circular "mark" feeling (makes our strokes look more "rounded")
  path = new Path.Circle(event.point, currentWidth / 2);
  path.fillColor = currentColor;

  // Create a new path every time the mouse is clicked
  path = new Path();
  path.add(event.point);
  path.strokeColor = currentColor;
  path.strokeWidth = currentWidth;
  path.strokeJoin = "round"; //another thing that makes strokes smoother
  path.selected = true;
  RUHandler.handle(new RUEvent(window.RUType.mouseDown, event));
  updateGUI();
};
tool.onMouseDrag = function (event) {
  brushCircle.position = event.point;
  path.add(event.point);
  path.smooth(); //makes our strokes smoother
  updateGUI();
};
tool.onMouseUp = function (event) {
  //when stroke is over, have a circle mark end the path. again, makes our strokes look more "rounded"
  path = new Path.Circle(event.point, currentWidth / 2);
  path.fillColor = currentColor;
  path.reduce();
  RUHandler.handle(new RUEvent(window.RUType.mouseUp, event));

  updateGUI();
};

tool.onMouseMove = function (event) {
  //have the brush circle preview move with the mouse
  brushCircle.position = event.point;
  brushCircle.bringToFront();
};

view.onResize = function (event) {
  // Whenever the view is resized, move the path to its center:
  if (path) {
    path.position = view.center;
  }
};
