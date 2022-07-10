import "https://cdn.skypack.dev/vanilla-colorful";
import { updateCurrentColor } from "./toolbar.js";
import { setStorage, getStorage } from "./storage.js";

const picker = document.querySelector("hex-color-picker");

export function updateMultiPickerColor(color) {
  const colorPicker = document.querySelector(".color-picker-circle");
  colorPicker.style.backgroundColor = color;
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
        $(".btn-solid-picker").removeClass("active");
        // find all .btn-solid-picker where background-color is the same as color
        $(".btn-solid-picker")
          .filter(function () {
            return (
              $(this).css("background-color") ===
              $(colorSelectButton).css("background-color")
            );
          })
          .addClass("active");

        updateCurrentColor(color);
        updateMultiPickerColor(color);
        setStorage("current-brush-color", color);
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
      } // end of click event
    );
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
  const presetColors = JSON.parse(getStorage("preset-colors"));
  // if presetColors is not empty, display them
  if (presetColors) {
    console.log(presetColors);
    presetColors.forEach((color) => {
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
