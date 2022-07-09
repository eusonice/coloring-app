import "https://cdn.skypack.dev/vanilla-colorful";

const picker = document.querySelector("hex-color-picker");

picker.addEventListener("color-changed", (event) => {
  // get updated color value
  const newColor = event.detail.value;
  // get current color value
  console.log(picker.color);
  // All .current-brush-color elements will be updated to the new color
  updateCurrentColor(newColor);
});
