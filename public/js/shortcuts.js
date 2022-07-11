import { solidColors, updateSlider } from "./toolbar.js";
import { updateCurrentColor } from "./color-picker.js";
import { getStorage } from "./storage.js";
import { toast } from "./util.js";
/* 
    This is a file that contains all the shortcuts for the application.

    It uses a library called "keyboardJS" to listen for keyboard events.
    More information about keyboardJS can be found here:

    https://github.com/RobertWHurst/KeyboardJS

    Note: mod == cmd on Mac, ctrl on Windows.

    Shortcuts lists:
    - mod + s = Save
    - mod + z = Undo
    - mod + shift + z = Redo
    - b = Brush tool
    - e = Eraser tool
    - c = Color picker tool
    - alt + 1 = First solid color or first custom color in color picker mode
    - alt + 2 = Second solid color or second custom color in color picker mode
    - alt + 3 = Third solid color or third custom color in color picker mode
    - alt + 4 = Fourth solid color or fourth custom color in color picker mode
    - alt + 5 = First gradient color or fifth custom color in color picker mode
    - alt + 6 = Second gradient color or sixth custom color in color picker mode
    - alt + 7 = Third gradient color or seventh custom color in color picker mode
    - alt + 8 = Eighth custom color in color picker mode
    - alt + 9 = Ninth custom color in color picker mode
    - alt + 0 = Tenth custom color in color picker mode
    - alt + shift + 1 = First custom color in color picker mode
    - alt + shift + 2 = Second custom color in color picker mode
    - alt + shift + 3 = Third custom color in color picker mode
    - alt + shift + 4 = Fourth custom color in color picker mode
    - alt + shift + 5 = Fifth custom color in color picker mode
    - alt + shift + 6 = Sixth custom color in color picker mode
    - alt + shift + 7 = Seventh custom color in color picker mode
    - alt + shift + 8 = Eighth custom color in color picker mode
    - alt + shift + 9 = Ninth custom color in color picker mode
    - alt + shift + 0 = Tenth custom color in color picker mode
    - z = Zoom in
    - x, shift + z = Zoom out
    - up = Increase brush height by 5
    - shift + up = Increase brush height by 10
    - down = Decrease brush height by 5
    - shift + down = Decrease brush height by 10
    - left = Decrease brush width by 5
    - shift + left = Decrease brush width by 10
    - right = Increase brush width by 5
    - shift + right = Increase brush width by 10
    - e = Increase brush angle by 5 degrees
    - shift + e = Increase brush angle by 15 degrees
    - q = Increase brush angle by 5 degrees
    - shift + q = Decrease brush angle by 15 degrees
    - shift + / = Help
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
    name: "First solid or custom color",
    description:
      "Switch to 1st solid color, or 1st custom color in color picker mode",
  },
  {
    triggers: ["alt+2"],
    name: "Second solid or custom color",
    description:
      "Switch to 2nd solid color, or 2nd custom color in color picker mode",
  },
  {
    triggers: ["alt+3"],
    name: "Third solid or custom color",
    description:
      "Switch to 3rd solid color, or 3rd custom color in color picker mode",
  },
  {
    triggers: ["alt+4"],
    name: "Fourth solid or custom color",
    description:
      "Switch to 4th solid color, or 4th custom color in color picker mode",
  },
  {
    triggers: ["alt+5"],
    name: "First gradient color or fifth custom color",
    description:
      "Switch to 1st gradient color, or 5th custom color in color picker mode",
  },
  {
    triggers: ["alt+6"],
    name: "Second gradient color or sixth custom color",
    description:
      "Switch to 2nd gradient color, or 6th custom color in color picker mode",
  },
  {
    triggers: ["alt+7"],
    name: "Third gradient color or seventh custom color",
    description:
      "Switch to 3rd gradient color, or 7th custom color in color picker mode",
  },
  {
    triggers: ["alt+8"],
    name: "Eighth custom color",
    description: "Switch to 8th custom color in color picker mode",
  },
  {
    triggers: ["alt+9"],
    name: "Ninth custom color",
    description: "Switch to 9th custom color in color picker mode",
  },
  {
    triggers: ["alt+0"],
    name: "Tenth custom color",
    description: "Switch to 10th custom color in color picker mode",
  },
  {
    triggers: ["alt+shift+1"],
    name: "First custom color",
    description: "Switch to 1st custom color",
  },
  {
    triggers: ["alt+shift+2"],
    name: "Second custom color",
    description: "Switch to 2nd custom color",
  },
  {
    triggers: ["alt+shift+3"],
    name: "Third custom color",
    description: "Switch to 3rd custom color",
  },
  {
    triggers: ["alt+shift+4"],
    name: "Fourth custom color",
    description: "Switch to 4th custom color",
  },
  {
    triggers: ["alt+shift+5"],
    name: "Fifth custom color",
    description: "Switch to 5th custom color",
  },
  {
    triggers: ["alt+shift+6"],
    name: "Sixth custom color",
    description: "Switch to 6th custom color",
  },
  {
    triggers: ["alt+shift+7"],
    name: "Seventh custom color",
    description: "Switch to 7th custom color",
  },
  {
    triggers: ["alt+shift+8"],
    name: "Eighth custom color",
    description: "Switch to 8th custom color",
  },
  {
    triggers: ["alt+shift+9"],
    name: "Ninth custom color",
    description: "Switch to 9th custom color",
  },
  {
    triggers: ["alt+shift+0"],
    name: "Tenth custom color",
    description: "Switch to 10th custom color",
  },
  {
    triggers: ["z"],
    name: "Zoom in",
    description: "Zoom in",
  },
  {
    triggers: ["x"],
    name: "Zoom out",
    description: "Zoom out",
  },
  {
    triggers: ["up"],
    name: "Increase brush height",
    description: "Increase brush height by 5",
  },
  {
    triggers: ["shift+up"],
    name: "Increase brush height",
    description: "Increase brush height by 10",
  },
  {
    triggers: ["down"],
    name: "Decrease brush height",
    description: "Decrease brush height by 5",
  },
  {
    triggers: ["shift+down"],
    name: "Decrease brush height",
    description: "Decrease brush height by 10",
  },
  {
    triggers: ["left"],
    name: "Decrease brush width",
    description: "Decrease brush width by 5",
  },
  {
    triggers: ["shift+left"],
    name: "Decrease brush width",
    description: "Decrease brush width by 10",
  },
  {
    triggers: ["right"],
    name: "Increase brush width",
    description: "Increase brush width by 5",
  },
  {
    triggers: ["shift+right"],
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
    name: "Increase brush angle",
    description: "Increase brush angle by 15 degrees",
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
function toggleButton(button, message = undefined) {
  button.addClass("active");
  setTimeout(function () {
    button.removeClass("active");
  }, 250);
  if (message) {
    toast(message);
  }
}
// bind color buttons with current storage
export function bindColorButtons() {
  const customColors = JSON.parse(getStorage("preset-colors"));
  if (customColors.length > 0) {
    keyboardJS.withContext("picker", () => {
      for (let i = 1; i <= Math.min(customColors.length, 10); i++) {
        const k = i === 10 ? "0" : i;
        keyboardJS.off(`alt + ${k}`, updateCurrentColor);
        keyboardJS.bind(`alt + ${k}`, (e) =>
          updateCurrentColor(customColors[i - 1], "multi")
        );
      }
    });
    keyboardJS.withContext("canvas", () => {
      for (let i = 1; i <= Math.min(customColors.length, 10); i++) {
        const k = i === 10 ? "0" : i;
        keyboardJS.off(`alt + shift + ${k}`, updateCurrentColor);
        keyboardJS.bind(`alt + shift + ${k}`, (e) =>
          updateCurrentColor(customColors[i - 1], "multi")
        );
      }
    });
  }
}

keyboardJS.setContext("canvas"); // Set the context to the canvas

keyboardJS.bind("mod + s", (e) => {
  e.preventDefault(); // prevent browser from opening a save dialog
  toast("Saving...");
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
/* 
  When in drawing mode, the key bindings are bound to the toolbar colors;
  When in color picker mode, the key bindings are bound to the custom colors, with max of 10 colors.
*/
keyboardJS.withContext("canvas", () => {
  for (let i = 1; i <= 4; i++) {
    keyboardJS.bind(`alt + ${i}`, (e) => {
      e.preventDefault();
      console.log(`set solid color to ${solidColors[i - 1]}`);
      updateCurrentColor(solidColors[i - 1]);
    });
  }
});
bindColorButtons();

// SHORTCUT --- 1st gradient color --- alt + 5

// SHORTCUT --- 2nd gradient color --- alt + 6

// SHORTCUT --- 3rd gradient color --- alt + 7

// SHORTCUT --- zoom in --- z
keyboardJS.bind("z", (e) => {
  e.preventDefault();
  const btn = $("#zoomin-button");
  toggleButton(btn, "Zoom In");
});
// SHORTCUT --- zoom out --- x, shift + z
keyboardJS.bind(["x", "shift + z"], (e) => {
  e.preventDefault();
  const btn = $("#zoomout-button");
  toggleButton(btn, "Zoom Out");
});

// SHORTCUT --- increase brush height by 5 --- arrow up, w
keyboardJS.bind(["up", "w"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-height").val();
  // Update the slider value (convert to int)
  updateSlider("height", Number(currentValue) + 5, false);
  toast("Brush height + 5");
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
