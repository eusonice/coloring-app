var path;
var currentColor = 'black'
var currentWidth = 5
var strokePreview = new Path.Circle({
    center: [20, 20],
    radius: currentWidth/2,
    fillColor: currentColor
});
var brushCircle = new Path.Circle({
    center: [900,900],
    radius: 5,
    strokeColor: 'black',
    strokeWidth: 1
    });

var erase = false;
updateGUI();

tool.onMouseDown = function(event) {
    //draw a circle on click, gives the brush a circular "mark" feeling (makes our strokes look more "rounded")
    path = new Path.Circle(event.point, currentWidth/2);
    path.fillColor = currentColor;

    // Create a new path every time the mouse is clicked
    path = new Path();
    path.add(event.point);
    path.strokeColor = currentColor;
    path.strokeWidth = currentWidth;
    path.strokeJoin = 'round'; //another thing that makes strokes smoother
    updateGUI();
}
tool.onMouseDrag = function(event) {
    brushCircle.position = event.point;
    path.add(event.point);
    updateGUI();
}
tool.onMouseUp = function(event) {
    //when stroke is over, have a circle mark end the path. again, makes our strokes look more "rounded"
    path = new Path.Circle(event.point, currentWidth/2);
    path.fillColor = currentColor;
    updateGUI();

}

tool.onMouseMove = function(event) { //have the brush circle preview move with the mouse
     brushCircle.position = event.point;
}

//-- helper function -- //

function updateGUI(){
    strokePreview.style = {
    center: [20, 20],
    fillColor: currentColor
    };

    if (!erase){ //only the eraser should have a border around it to make it easy to see; the other tools should not
        strokePreview.strokeWidth = 0;
    }
    //get the size of the "preview" circle and brush circle to scale appropriately. it's dumb looking but it works so I went with it. http://paperjs.org/tutorials/project-items/transforming-items/
    strokePreview.scale((currentWidth/2) / (strokePreview.bounds.width / 2));
    brushCircle.scale((currentWidth/2) / (brushCircle.bounds.width / 2));

    //redraw the border around the canvas
    var border = new Path.Rectangle(0, 0, 800, 600);
    border.strokeColor = 'black';
    border.strokeWidth = 5;
}

// -- button functionality --//

$('#default').on('click', function (e) {
    currentColor = 'black'
    currentWidth = 2
    erase = false;
    updateGUI();
})
$('#thick-green').on('click', function (e) {
    currentColor = '#438c4b'
    erase = false;
    updateGUI();
})

$('#yellow').on('click', function (e) {
    currentColor = '#edbb3e'
    erase = false;
    updateGUI();
})
$('#blue').on('click', function (e) {
    currentColor = '#324bad'
    erase = false;
    updateGUI();
})
$('#red').on('click', function (e) {
    currentColor = '#d64b4b'
    erase = false;
    updateGUI();
})

$('#eraser').on('click', function (e) {
    erase = true;
    currentColor = 'white'
    currentWidth = 20
    // special case: make the stroke preview have a black outline for the eraser brush
    strokePreview.style = {
    strokeColor: 'black',
    strokeWidth: 1
    };
    updateGUI();

})

$('#stroke-up').on('click', function (e) {
    currentWidth += 3;
    if (currentWidth >= 40){ //limit max size to 40
        currentWidth = 40;
    }
    updateGUI();
})
$('#stroke-down').on('click', function (e) {
    currentWidth -= 3;
    if (currentWidth < 1){ //minimum size is 1
        currentWidth = 1;
    }
    updateGUI();
})

$('#clear').on('click', function (e) {
    paper.project.activeLayer.removeChildren();
    paper.view.draw();
    strokePreview = new Path.Circle({
    center: [20, 20],
    radius: currentWidth/2,
    fillColor: currentColor
    });
    brushCircle = new Path.Circle({
    center: [900,900],
    radius: 5,
    strokeColor: 'black',
    strokeWidth: 1
    });
    updateGUI();
})