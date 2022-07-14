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
    name: "Save",
    description: "Save the current drawing",
  },
  {
    triggers: ["mod+z"],
    name: "Undo",
    description: "Undo the last action",
  },
  {
    triggers: ["mod+shift+z"],
    name: "Redo",
    description: "Redo the last action",
  },
  {
    triggers: ["b"],
    name: "Brush",
    description: "Switch to brush tool",
  },
  {
    triggers: ["e"],
    name: "Eraser",
    description: "Switch to eraser tool",
  },
  {
    triggers: ["c"],
    name: "Color Picker",
    description: "Switch to color picker tool",
  },
  {
    triggers: ["alt+0", "...", "alt+9"],
    name: "Switch Color",
    description:
      "Switch to the active color, either in the canvas or in the color picker",
  },
  {
    triggers: ["alt+shift+0", "...", "alt+shift+9"],
    name: "Custom color",
    description: "Switch to 1st or 10th custom color",
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

// populate to the DOM inside the div id: help-modal-body
// This could've been sooooo much easier if I could use React :(
const helpModalBody = document.getElementById("help-modal-body");
function mapKbd(triggerSplit, triggerKbdWrap) {
  return triggerSplit.map((kbd) => {
    if (kbd === "+") {
      triggerKbdWrap.appendChild(document.createTextNode(" + "));
    } else {
      const kbdTag = document.createElement("kbd");
      kbdTag.innerText = kbd;
      triggerKbdWrap.appendChild(kbdTag);
    }
  });
}
shortcuts.forEach((shortcut) => {
  const shortcutCardWrap = document.createElement("div");
  shortcutCardWrap.classList.add(
    "shortcut",
    "!p-4",
    "!border",
    "!border-gray-100",
    "!rounded-lg",
    "!bg-white",
    "flex",
    "items-end",
    "justify-between",
    "!gap-4"
  );
  // triggers div, split by +, join by +, splitted element is a kbd tag
  const triggerKbdWrap = document.createElement("div");
  const triggers = shortcut.triggers.map((trigger) => {
    const triggerKbdDiv = document.createElement("div");
    const triggerSplit = trigger.split(/(\+)/);
    triggerKbdWrap.classList.add("min-w-[140px]");
    triggerKbdDiv.classList.add("!text-gray-400");
    if (triggerSplit[0] === "mod") {
      // for mac the mod key symbol is ⌘
      let modMac = triggerSplit;
      modMac[0] = "⌘";
      mapKbd(modMac, triggerKbdDiv);
      // Add a br to the end of the mod key
      triggerKbdDiv.appendChild(document.createElement("br"));
      let modWin = triggerSplit;
      modWin[0] = "ctrl";
      mapKbd(modWin, triggerKbdDiv);
    } else {
      mapKbd(triggerSplit, triggerKbdDiv);
    }
    return triggerKbdDiv;
  });
  triggerKbdWrap.append(...triggers);
  shortcutCardWrap.appendChild(triggerKbdWrap);
  const shortcutCardBody = document.createElement("div");
  const nameH3 = document.createElement("h3");
  nameH3.classList.add(
    "!text-base",
    "!text-gray-600",
    "!font-semibold",
    "!mt-1",
    "text-right"
  );
  nameH3.innerText = shortcut.name;
  const description = document.createElement("p");
  description.classList.add("!text-sm", "!text-gray-600", "!text-right");
  description.innerText = shortcut.description;
  shortcutCardBody.appendChild(nameH3);
  shortcutCardBody.appendChild(description);
  shortcutCardWrap.appendChild(shortcutCardBody);
  helpModalBody.append(shortcutCardWrap);
});

// Simulate mouse keydown event
function toggleButton(button, message = undefined) {
  button.click();
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
  if (customColors && customColors.length > 0) {
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
keyboardJS.bind("mod + z", (e) => {
  e.preventDefault();
  toast("Undo Stroke");
});

// SHORTCUT --- redo --- mod + shift + z
keyboardJS.bind("mod + shift + z", (e) => {
  e.preventDefault();
  toast("Redo Stroke");
});

// SHORTCUT --- brush tool --- b
keyboardJS.bind("b", (e) => {
  e.preventDefault();
  const brushButton = $("#brush");
  brushButton.click();
  brushButton.addClass("active");
  $("#eraser").removeClass("active");
  $(".slider-wrap.slider-eraser").addClass("hidden");
  $(".slider-wrap.slider-brush").removeClass("hidden");
  toast("Brush Tool");
});

// SHORTCUT --- eraser tool --- e
keyboardJS.bind("e", (e) => {
  e.preventDefault();
  const eraserButton = $("#eraser");
  eraserButton.click();
  eraserButton.addClass("active");
  $("#brush").removeClass("active");
  $(".slider-wrap.slider-brush").addClass("hidden");
  $(".slider-wrap.slider-eraser").removeClass("hidden");
  toast("Eraser Tool");
});

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
keyboardJS.bind(["shift + up", "shift + w"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-height").val();
  // Update the slider value (convert to int)
  updateSlider("height", Number(currentValue) + 10, false);
  toast("Brush height + 10");
});

// SHORTCUT --- decrease brush height by 5 --- arrow down, s
keyboardJS.bind(["down", "s"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-height").val();
  // Update the slider value (convert to int)
  updateSlider("height", Number(currentValue) - 5, false);
  toast("Brush height - 5");
});

// SHORTCUT --- decrease brush height by 10 --- shift + arrow down, shift + s
keyboardJS.bind(["shift + down", "shift + s"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-height").val();
  // Update the slider value (convert to int)
  updateSlider("height", Number(currentValue) - 10, false);
  toast("Brush height - 10");
});

// SHORTCUT --- decrease brush width by 5 --- arrow left, a
keyboardJS.bind(["left", "a"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-width").val();
  // Update the slider value (convert to int)
  updateSlider("width", Number(currentValue) - 5, false);
  toast("Brush width - 5");
});

// SHORTCUT --- decrease brush width by 10 --- shift + arrow left, shift + a
keyboardJS.bind(["shift + left", "shift + a"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-width").val();
  // Update the slider value (convert to int)
  updateSlider("width", Number(currentValue) - 10, false);
  toast("Brush width - 10");
});

// SHORTCUT --- increase brush width by 5 --- arrow right, d
keyboardJS.bind(["right", "d"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-width").val();
  // Update the slider value (convert to int)
  updateSlider("width", Number(currentValue) + 5, false);
  toast("Brush width + 5");
});

// SHORTCUT --- increase brush width by 10 --- shift + arrow right, shift + d
keyboardJS.bind(["shift + right", "shift + d"], (e) => {
  e.preventDefault();
  // Get the current brush height from the DOM
  const currentValue = $("#slider-width").val();
  // Update the slider value (convert to int)
  updateSlider("width", Number(currentValue) + 10, false);
  toast("Brush width + 10");
});

// SHORTCUT --- increase brush angle by 5 --- e
keyboardJS.bind("alt + e", (e) => {
  e.preventDefault();
  const currentValue = $("#slider-angle").val();
  updateSlider("angle", Number(currentValue) + 5, false);
  toast("Brush angle + 5");
});

// SHORTCUT --- increase brush angle by 15 --- shift + e
keyboardJS.bind("shift + e", (e) => {
  e.preventDefault();
  const currentValue = $("#slider-angle").val();
  updateSlider("angle", Number(currentValue) + 15, false);
  toast("Brush angle + 15");
});

// SHORTCUT --- decrease brush angle by 5 --- q
keyboardJS.bind("q", (e) => {
  e.preventDefault();
  const currentValue = $("#slider-angle").val();
  updateSlider("angle", Number(currentValue) - 5, false);
  toast("Brush angle - 5");
});

// SHORTCUT --- decrease brush angle by 15 --- shift + q
keyboardJS.bind("shift + q", (e) => {
  e.preventDefault();
  const currentValue = $("#slider-angle").val();
  updateSlider("angle", Number(currentValue) - 15, false);
  toast("Brush angle - 15");
});

// SHORTCUT --- help (?) --- shift + /

keyboardJS.bind("shift + /", (e) => {
  const helpBtn = $("#help-button");
  toggleButton(helpBtn, "Help");
});
