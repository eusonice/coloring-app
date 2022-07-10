import { solidColors, updateSlider } from "./toolbar.js";
import { updateCurrentColor } from "./color-picker.js";
/* 
    This is a file that contains all the shortcuts for the application.

    It uses a library called "keyboardJS" to listen for keyboard events.
    More information about keyboardJS can be found here:

    https://github.com/RobertWHurst/KeyboardJS

    Note: mod == cmd on Mac, ctrl on Windows.
    Shortcuts:
        - mod + s = save
        - mod + z = undo
        - mod + shift + z = redo
        - b = brush tool
        - e = eraser tool
        - c = color picker
        - alt + 1 = 1st solid color
        - alt + 2 = 2nd solid color
        - alt + 3 = 3rd solid color
        - alt + 4 = 4th solid color
        - alt + 5 = 1st gradient color
        - alt + 6 = 2nd gradient color
        - alt + 7 = 3rd gradient color
        - z = zoom in
        - x = zoom out
        - up, w = increase brush height by 5
        - shift + up, shift + w = increase brush height by 10
        - down, s = decrease brush height by 5
        - shift + down, shift + s = decrease brush height by 10
        - left, a = decrease brush width by 5
        - shift + left, shift + a = decrease brush width by 10
        - right, d = increase brush width by 5
        - shift + right, shift + d = increase brush width by 10
        - e = increase brush angle by 5 degrees
        - shift + e = increase brush angle by 15 degrees
        - q = decrease brush angle by 5 degrees
        - shift + q = decrease brush angle by 15 degrees
        - shift + / = (?) = show help
*/

export const shortcuts = [
  {
    triggers: ["mod+s"],
    name: "save",
    description: "Save the current drawing",
  },
  {
    triggers: ["mod+z"],
    name: "undo",
    description: "Undo the last action",
  },
  {
    triggers: ["mod+shift+z"],
    name: "redo",
    description: "Redo the last action",
  },
  {
    triggers: ["b"],
    name: "brush",
    description: "Switch to brush tool",
  },
  {
    triggers: ["e"],
    name: "eraser",
    description: "Switch to eraser tool",
  },
  {
    triggers: ["c"],
    name: "Color Picker",
    description: "Switch to color picker tool",
  },
  {
    triggers: ["alt+1"],
    name: "First solid color",
    description: "Switch to 1st solid color",
  },
  {
    triggers: ["alt+2"],
    name: "Second solid color",
    description: "Switch to 2nd solid color",
  },
  {
    triggers: ["alt+3"],
    name: "Third solid color",
    description: "Switch to 3rd solid color",
  },
  {
    triggers: ["alt+4"],
    name: "Fourth solid color",
    description: "Switch to 4th solid color",
  },
  {
    triggers: ["alt+5"],
    name: "First gradient color",
    description: "Switch to 1st gradient color",
  },
  {
    triggers: ["alt+6"],
    name: "Second gradient color",
    description: "Switch to 2nd gradient color",
  },
  {
    triggers: ["alt+7"],
    name: "Third gradient color",
    description: "Switch to 3rd gradient color",
  },
  {
    triggers: ["z"],
    name: "zoom in",
    description: "Zoom in",
  },
  {
    triggers: ["x"],
    name: "zoom out",
    description: "Zoom out",
  },
  {
    triggers: ["up", "w"],
    name: "Increase brush height",
    description: "Increase brush height by 5",
  },
  {
    triggers: ["shift+up", "shift+w"],
    name: "Increase brush height",
    description: "Increase brush height by 10",
  },
  {
    triggers: ["down", "s"],
    name: "Decrease brush height",
    description: "Decrease brush height by 5",
  },
  {
    triggers: ["shift+down", "shift+s"],
    name: "Decrease brush height",
    description: "Decrease brush height by 10",
  },
  {
    triggers: ["left", "a"],
    name: "Decrease brush width",
    description: "Decrease brush width by 5",
  },
  {
    triggers: ["shift+left", "shift+a"],
    name: "Decrease brush width",
    description: "Decrease brush width by 10",
  },
  {
    triggers: ["right", "d"],
    name: "Increase brush width",
    description: "Increase brush width by 5",
  },
  {
    triggers: ["shift+right", "shift+d"],
    name: "Increase brush width",
    description: "Increase brush width by 10",
  },
  {
    triggers: ["e"],
    name: "Increase brush angle",
    description: "Increase brush angle by 5 degrees",
  },
  {
    triggers: ["shift+e"],
    name: "Decrease brush angle",
    description: "Decrease brush angle by 15 degrees",
  },
  {
    triggers: ["q"],
    name: "Decrease brush angle",
    description: "Decrease brush angle by 5 degrees",
  },
  {
    triggers: ["shift+q"],
    name: "Decrease brush angle",
    description: "Decrease brush angle by 15 degrees",
  },
  {
    triggers: ["shift+/"],
    name: "Help",
    description: "Show help",
  },
];

// Simulate mouse keydown event
function toggleButton(button) {
  button.addClass("active");
  setTimeout(function () {
    button.removeClass("active");
  }, 250);
}

keyboardJS.bind("mod + s", (e) => {
  e.preventDefault(); // prevent browser from opening a save dialog
  console.log("save drawing");
});

// SHORTCUT --- undo --- mod + z
// Hint: check out the zoom in and zoom out shortcuts

// SHORTCUT --- redo --- mod + shift + z

// SHORTCUT --- brush tool --- b

// SHORTCUT --- eraser tool --- e

// SHORTCUT --- color picker --- c
// Hint: menapulate a click event on the color picker

// SHORTCUT --- 1st ~ 4th solid color --- alt + 1 ~ 4
for (let i = 1; i <= 4; i++) {
  keyboardJS.bind(`alt + ${i}`, (e) => {
    e.preventDefault();
    console.log(`set solid color to ${solidColors[i - 1]}`);
    updateCurrentColor(solidColors[i - 1]);
  });
}

// SHORTCUT --- 1st gradient color --- alt + 5

// SHORTCUT --- 2nd gradient color --- alt + 6

// SHORTCUT --- 3rd gradient color --- alt + 7

// SHORTCUT --- zoom in --- z
keyboardJS.bind("z", (e) => {
  e.preventDefault();
  const btn = $("#zoomin-button");
  toggleButton(btn);
  console.log("zoom in");
});
// SHORTCUT --- zoom out --- x
keyboardJS.bind("x", (e) => {
  e.preventDefault();
  const btn = $("#zoomout-button");
  toggleButton(btn);
  console.log("zoom out");
});

// SHORTCUT --- increase brush height by 5 --- arrow up, w
keyboardJS.bind(["up", "w"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-height").val();
  // Update the slider value (convert to int)
  updateSlider("height", Number(currentValue) + 5, false);
  console.log("increase brush height by 5");
});

// SHORTCUT --- increase brush height by 10 --- shift + arrow up, shift + w

// SHORTCUT --- decrease brush height by 5 --- arrow down, s

// SHORTCUT --- decrease brush height by 10 --- shift + arrow down, shift + s

// SHORTCUT --- decrease brush width by 5 --- arrow left, a

// SHORTCUT --- decrease brush width by 10 --- shift + arrow left, shift + a

// SHORTCUT --- increase brush width by 5 --- arrow right, d

// SHORTCUT --- increase brush width by 10 --- shift + arrow right, shift + d

// SHORTCUT --- increase brush angle by 5 --- e

// SHORTCUT --- increase brush angle by 15 --- shift + e

// SHORTCUT --- decrease brush angle by 5 --- q

// SHORTCUT --- decrease brush angle by 15 --- shift + q

// SHORTCUT --- help (?) --- shift + /
