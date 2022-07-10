import "https://cdn.skypack.dev/vanilla-colorful";
import { bindColorButtons } from "./shortcuts.js";
import { setStorage, getStorage } from "./storage.js";
import { rgbToHex, isLight } from "./util.js";

const picker = document.querySelector("hex-color-picker");

export function updateMultiPickerColor(color) {
  const colorPicker = document.querySelector(".color-picker-circle");
  colorPicker.style.backgroundColor = color;
  // Also update the hex-color-picker color attribute
  picker.color = color;
}

/* 
An event listener to open the color picker.
Any button with the class "color-picker" will open the color picker.
A backdrop is added to the color picker to prevent it from being clicked.
*/

export function updateCurrentColor(newColor) {
  document.querySelectorAll(".current-brush-color").forEach((el) => {
    el.style.backgroundColor = newColor;
    el.style.fill = newColor;
  });
  // update .current-brush-color-bg based on isLight(newColor)
  document.querySelectorAll(".current-brush-color-bg").forEach((el) => {
    el.style.backgroundColor = isLight(newColor) ? "#48494a" : "#fff";
  });

  // Set all .btn-solid-picker that match newColor active
  document.querySelectorAll(".btn-solid-picker").forEach((el) => {
    el.classList.remove("active");
    const elColor = rgbToHex(el.style.backgroundColor);
    if (elColor === newColor) {
      el.classList.add("active");
    }
  });

  // Set localStorage color
  setStorage("current-brush-color", newColor);
}

$(window).on("load", function () {
  function appendColorButton(color) {
    const colorDiv = document.createElement("div");
    const colorSelectButton = document.createElement("button");
    colorDiv.classList.add("relative", "color-removeable-wrap");
    colorSelectButton.classList.add("btn-solid-picker", "color-removeable");
    colorSelectButton.style.backgroundColor = color;
    colorSelectButton.style.fill = color;
    // add a span to the button
    const colorDivSpan = document.createElement("span");
    colorDivSpan.classList.add("btn-solid-picker-ring");
    colorSelectButton.append(colorDivSpan);
    presetColorContainer.prepend(colorDiv);
    // add a click event to the button
    colorSelectButton.addEventListener(
      "click",
      function () {
        updateCurrentColor(color);
        updateMultiPickerColor(color);
      } // end of click event
    );
    colorDiv.append(colorSelectButton);
    // Add another button for deleting the color
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-solid-remove");
    deleteButton.innerHTML = "Delete";
    colorDiv.append(deleteButton);
    // add a click event to the delete button
    deleteButton.addEventListener(
      "click",
      function () {
        $(colorDiv).remove();
        const presetColors = JSON.parse(getStorage("preset-colors"));
        // remove the color from solidColors
        const index = presetColors.indexOf(color);
        presetColors.splice(index, 1);
        setStorage("preset-colors", JSON.stringify(presetColors));
        bindColorButtons();
      } // end of click event
    );
    bindColorButtons();
  }

  picker.addEventListener("color-changed", (event) => {
    // get updated color value
    const newColor = event.detail.value;
    // get current color value
    //   console.log(picker.color);
    // All .current-brush-color elements will be updated to the new color
    updateCurrentColor(newColor);
    updateMultiPickerColor(newColor);
  });

  /* 
    Display all custom colors created by the user.
    Retrived from localStorage.
    The colors will be displayed in the element id: preset-color-container.
*/

  const presetColorContainer = $("#preset-color-container");
  // get presetColors and parse it to an array
  const customColors = JSON.parse(getStorage("preset-colors"));
  // if presetColors is not empty, display them

  if (customColors) {
    customColors.reverse().forEach((color) => {
      appendColorButton(color);
    });
  }
  // Add a add color button to the preset color container
  const addColorButton = document.createElement("button");
  addColorButton.classList.add(
    "button-focus-default",
    "btn-icon-secondary",
    "group"
  );
  // add a span to the button
  const addColorButtonSpan = document.createElement("span");
  addColorButtonSpan.classList.add(
    "material-symbols-rounded",
    "transition",
    "group-active:scale-125"
  );
  addColorButtonSpan.innerHTML = "add";
  addColorButton.append(addColorButtonSpan);
  addColorButton.addEventListener(
    "click",
    () => {
      // get the current color value
      const currentColor = picker.color;
      // get the current preset colors
      const presetColors = JSON.parse(getStorage("preset-colors"));
      // if presetColors is empty, set it to the current color
      let stringyfiedColor;
      if (!presetColors) {
        stringyfiedColor = JSON.stringify([currentColor]);
      } else {
        // if presetColors is not empty, add the current color to it
        // Add to the first index of the array
        presetColors.unshift(currentColor);
        console.log(
          `presetColors: ${presetColors}, currentColor: ${currentColor}`
        );
        stringyfiedColor = JSON.stringify(presetColors);
      }
      setStorage("preset-colors", stringyfiedColor);
      // display the current color in the preset color container
      $(".btn-solid-picker").removeClass("active");
      appendColorButton(currentColor);
    } // end of addColorButton.addEventListener
  ); // end of addColorButton.addEventListener
  presetColorContainer.append(addColorButton);
});
