/* 
    GitHub: https://gist.github.com/lilbond/b397f29f168715c70c500f864d5324b8
*/

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
/* 
function onMouseDown(event) {
  // The mouse was clicked, so let's put a newly created Path into
  // myPath, give it the color black and add the location as the
  // path's first segment.
  handler.handle(new RUEvent(RUType.mouseDown, event));
}

function onMouseUp(event) {
  // The mouse was released, so we add the new location as the end
  // segment of the line.
  handler.handle(new RUEvent(RUType.mouseUp, event));
}

function onKeyDown(event) {
  // When a key is pressed, set the content of the text item:
  text.content = "The " + event.key + " key was pressed!";
  if (event.key === "u") {
    handler.handle(new RUEvent(RUType.undo));
  }

  if (event.key === "r") {
    handler.handle(new RUEvent(RUType.redo));
  }
}

function onKeyUp(event) {
  // When a key is released, set the content of the text item:
  text.content = "The " + event.key + " key was released!";
} */
