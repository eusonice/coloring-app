import { getStorage, setStorage } from "./storage.js";

var images = [{name: "unicorn", url: "./images/unicorn-transparent.png", duration: 25}, {name: "easter-bunny", url: "./images/easter-bunny-transparent.png", duration: 30}];
let currentTemplate = JSON.parse(getStorage("current-template")) || images[0];

if (!getStorage("current-template")) {
    setStorage("current-template", JSON.stringify(images[0]));
}