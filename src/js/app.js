import '../scss/app.scss';
import gameScene from './gameScene.js';

const container = document.getElementById("dice3d");

let scene = new gameScene(container);

window.addEventListener("resize",(event) => {
  scene.resize();
});

window.addEventListener("load",(event) => {
  scene.resize();
  container.style.visibility="visible";
});

scene.init();
scene.start();
