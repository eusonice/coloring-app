import "./color-picker.js";
import { setStorage, getStorage } from "./storage.js";
import { updateCurrentColor } from "./color-picker.js";

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
    value: getStorage("width") || 16,
  },
  {
    id: "height",
    min: 1,
    max: 100,
    value: getStorage("height") || 28,
  },
  {
    id: "angle",
    min: 0,
    max: 180,
    value: getStorage("angle") || 160,
  },
];

export const solidColors = ["#2c99f2", "#31db57", "#ffe43e", "#ee4b2e"];

/* 
A preview of the current brush stroke based on the current brush settings.
Which are the current color, width, and angle.
The element class is .stroke-preview.
*/

let previewIntervalId; // this value is to determine whether the preview popover is shown

export function showPreviewPopover(position) {
  // show #stroke-preview-popover, if the stroke preview has class opacity-100, otherwise wait 2 seconds change class opacity-100 to opacity-0
  // clear the interval if it exists
  if (previewIntervalId) {
    clearInterval(previewIntervalId);
  }
  const previewPopover = document.querySelector("#stroke-preview-popover");
  if (previewPopover.classList.contains("opacity-0")) {
    previewPopover.classList.remove("opacity-0");
    previewPopover.classList.add("opacity-100");
  } else {
    previewIntervalId = setInterval(() => {
      previewPopover.classList.remove("opacity-100");
      previewPopover.classList.add("opacity-0");
      clearInterval(previewIntervalId);
    }, 2000);
  }
  previewPopover.style.left = position.left + "px";
}
export function initPreviewPopover() {
  // when the first time the slider is updated, #stroke-preview-popover will be shown by removing class invisible
  const strokePreivewPopover = document.querySelector(
    "#stroke-preview-popover"
  );
  if (strokePreivewPopover.classList.contains("invisible")) {
    strokePreivewPopover.classList.remove("invisible");
  }
}

export function updateStrokePreview(id, showPopover = true) {
  // id is the id of the slider
  // this is to get the current position of the slider
  // so that the previewPopover can be shown at the right position
  const previews = document.querySelectorAll(".stroke-preview");
  const width = $("#slider-width").val();
  const height = $("#slider-height").val();
  const angle = $("#slider-angle").val();
  previews.forEach((el) => {
    el.style.width = width * 0.7 + "px";
    el.style.height = height * 0.7 + "px";
    el.style.transform = `rotate(${angle}deg)`;
  });
  // update the preview popover
  const position = $(`#slider-${id}`).position();
  showPreviewPopover(position);
}

export function updateSlider(id, value, showPopover = true) {
  const slider = $(`#slider-${id}`);
  const input = $(`#slider-input-${id}`);
  const { min, max } = sliders.find((slider) => slider.id === id);

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
  updateStrokePreview(id);
  // store the value to local storage based on id
  setStorage(id, value);
}

$(document).ready(() => {
  sliders.forEach((slider) => {
    updateSlider(slider.id, slider.value);
    $(`#slider-${slider.id}`).on("input", function () {
      initPreviewPopover();
      updateSlider(slider.id, $(this).val());
    });
    $(`#slider-input-${slider.id}`).on("input", function () {
      initPreviewPopover();
      updateSlider(slider.id, $(this).val());
    });
  });

  function showColorPicker(position) {
    $(".color-picker").addClass("open");
    $("#color-picker").show();
    $("#color-picker-backdrop").removeClass("pointer-events-none opacity-0");
    // apply position to the color picker
    console.log(position);
    $("#color-picker").css({
      bottom: position.bottom + "px",
      left: position.left + "px",
    });
  }
  function hideColorPicker() {
    $(".color-picker").removeClass("open");
    $("#color-picker").hide();
    $("#color-picker-backdrop").addClass("pointer-events-none opacity-0");
  }

  $(".color-picker:not(.open)").on("click", function () {
    // get the position of the button
    const position = {
      bottom: $(window).height() - $(this).offset().top + 8,
      left: $(this).offset().left,
    };
    showColorPicker(position);
  });

  $("#color-picker-backdrop").on("click", function () {
    hideColorPicker();
  });

  // Add keybindings to the color picker, when escape is pressed, the color picker will be closed
  $(document).on("keydown", function (e) {
    // Check if .color-picker is open, then close it if the key is escape
    if ($(".color-picker").hasClass("open")) {
      if (e.key === "Escape") {
        hideColorPicker();
      }
    }
  });
  /* 
When any .btn-solid-picker is clicked, the color of the button will be set to the current color.
*/

  $(".btn-solid-picker").on("click", function (e) {
    // remove active class from all .btn-solid-picker
    $(".btn-solid-picker").removeClass("active");
    const color = $(this).css("background-color");
    // add active class to the button that was clicked
    $(this).addClass("active");
    updateCurrentColor(color);
  });

  /* 
For each .btn-solid-picker, apply the color from solidColors array.
*/

  const solidPickers = document.querySelectorAll(".btn-solid-picker");
  solidPickers.forEach((el, key) => {
    el.style.backgroundColor = solidColors[key];
    el.style.fill = solidColors[key];
  });

  /* 
  Get current color from localStorage.
  If there is no color in localStorage, set the current color to the first color in solidColors.
*/
  const currentColor = getStorage("current-brush-color") || solidColors[0];
  setTimeout(() => {
    updateCurrentColor(currentColor);
  }, 300);
});
