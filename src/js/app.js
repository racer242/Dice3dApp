import '../scss/app.scss';
import gameScene from './gameScene.js';
window.scene = new gameScene(gameSceneInitProps.container,gameSceneInitProps);
window.scene.init();
