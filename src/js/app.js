import '../scss/app.scss';
import gameScene from './gameScene.js';

const container = document.getElementById("gameBox");
const gameContainer = document.getElementById("dice3d");

let scene = new gameScene(gameContainer);

const updateBounds=()=>{
  let scale=Math.min(container.clientWidth/1024,container.clientHeight/1024);
  gameContainer.style.transform="translate(-50%,-50%) scale("+scale+","+scale+")";
}

window.addEventListener("resize",(event) => {
  updateBounds();
});

window.addEventListener("load",(event) => {
  updateBounds();
  scene.resize();
  gameContainer.style.visibility="visible";
});

scene.init();
scene.start();
