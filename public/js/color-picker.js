import "https://cdn.skypack.dev/vanilla-colorful";
import { updateCurrentColor } from "./toolbar.js";

const picker = document.querySelector("hex-color-picker");

export function updateMultiPickerColor(color) {
  const colorPicker = document.querySelector(".color-picker-circle");
  colorPicker.style.backgroundColor = color;
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
