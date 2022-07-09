/*
 
There are three range sliders in this file.
Each slider has an input field and a slider.
The input field is used to set the value of the slider.
The slider is used to set the value of the input field.
The sliders ids are:
    #slider-width
    #slider-height
    #slider-angle
The input ids are:
    #slider-input-width
    #slider-input-height
    #slider-input-angle
*/

const sliders = [
  {
    id: "width",
    min: 1,
    max: 100,
    value: 16,
  },
  {
    id: "height",
    min: 1,
    max: 100,
    value: 28,
  },
  {
    id: "angle",
    min: 0,
    max: 180,
    value: 160,
  },
];

/* 
A preview of the current brush stroke based on the current brush settings.
Which are the current color, width, and angle.
The element id for preview is: #stroke-preview
*/

function updateStrokePreview() {
  const preview = $("#stroke-preview");
  const width = $("#slider-width").val();
  const height = $("#slider-height").val();
  const angle = $("#slider-angle").val();
  preview.css({
    width: width * 0.7,
    height: height * 0.7,
    transform: `rotate(${angle}deg)`,
  });
}

function updateSlider(id, value, min, max) {
  const slider = $(`#slider-${id}`);
  const input = $(`#slider-input-${id}`);

  if (value < min) {
    value = min;
  }
  if (value > max) {
    value = max;
  }

  slider.val(value);
  input.val(value);

  const percent = ((value - min) / (max - min)) * 100;

  // update the background of the slider
  slider.css(
    "background",
    `linear-gradient(to right, rgb(192 132 252) ${percent}%, rgb(229 231 235) ${percent}%)`
  );

  // update the preview
  updateStrokePreview();
}

sliders.forEach((slider) => {
  updateSlider(slider.id, slider.value, slider.min, slider.max);
  $(`#slider-${slider.id}`).on("input", function () {
    updateSlider(slider.id, $(this).val(), slider.min, slider.max);
  });
  $(`#slider-input-${slider.id}`).on("input", function () {
    updateSlider(slider.id, $(this).val(), slider.min, slider.max);
  });
});

/* 
An event listener to open the color picker.
Any button with the class "color-picker" will open the color picker.
The element id for the color picker is: #color-picker
A backdrop is added to the color picker to prevent it from being clicked.
*/

function updateCurrentColor(newColor) {
  document.querySelectorAll(".current-brush-color").forEach((el) => {
    el.style.backgroundColor = newColor;
    el.style.fill = newColor;
  });
}

$(".color-picker:not(.open)").on("click", function () {
  $(".color-picker").addClass("open");
  $("#color-picker").show();
  $("#color-picker-backdrop").show();
});

$("#color-picker-backdrop").on("click", function () {
  $(".color-picker").removeClass("open");
  $("#color-picker").hide();
  $("#color-picker-backdrop").hide();
});

/* 
When any .btn-solid-picker is clicked, the color of the button will be set to the current color.
*/

$(".btn-solid-picker").on("click", function () {
  const color = $(this).css("background-color");
  updateCurrentColor(color);
});

updateCurrentColor("#2c99f2");