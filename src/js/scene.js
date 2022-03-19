import {
  PerspectiveCamera,
  Scene,
  MeshNormalMaterial,
  Mesh,
  WebGLRenderer,
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
  PointLight,
  MeshPhongMaterial,
  PCFSoftShadowMap,
  sRGBEncoding,
  AmbientLight,
  ShadowMaterial,
} from 'three';

import { RoundedBoxGeometry } from "./geometries/RoundedBoxGeometry"


const diceProps={
  w:1.6,
  h:1.6,
  d:1.6,
  x:0.2,
  y:-0.5,
  z:.5,
  r:0.3,
  f:0.13,
}

const cameraProps={
  x:2,
  y:-1,
  z:10,
}

const lightProps={
  x:5,
  y:-5,
  z:15,
  b:0.8,
  a:0.3,
}

const shadowProps={
  r:40,
  o:.2,
}

let animated = 1;

const defaultRendererWidth=1024;


const renderer = new WebGLRenderer( { antialias: true, alpha: true } );
renderer.setClearColor( 0x000000, 0 );


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.outputEncoding = sRGBEncoding;

const camera = new PerspectiveCamera( 50 );
camera.position.x = cameraProps.x;
camera.position.y = cameraProps.y;
camera.position.z = cameraProps.z;
camera.lookAt(0,0,0);

const scene = new Scene();

let geometry, material, mesh

geometry = new RoundedBoxGeometry( diceProps.w, diceProps.h, diceProps.d, 7, diceProps.f );
material = new MeshPhongMaterial();
mesh = new Mesh( geometry, material );
mesh.castShadow = true;
scene.add( mesh );
const dice = mesh;

dice.position.x=diceProps.x;
dice.position.y=diceProps.y;
dice.position.z=diceProps.z;
dice.rotation.z=diceProps.r;

let direction=1;

const animation = ( time ) => {

  if (animated) {
  	dice.rotation.x = time / 2000;
  	dice.rotation.y = time / 1000;

    dice.position.z +=0.1 * direction;
    if (dice.position.z>5) {
      direction=-1
    }
    if (dice.position.z<1) {
      direction=1
    }
  }

	renderer.render( scene, camera );
}


geometry = new PlaneGeometry( 10, 10 );
material = new ShadowMaterial( );
// material = new MeshPhongMaterial();
material.opacity = shadowProps.o;
mesh = new Mesh( geometry, material );
mesh.receiveShadow = true;
scene.add( mesh );

const container = document.getElementById("dice3d");
container.appendChild( renderer.domElement );



const light = new PointLight( 0xffffff, lightProps.b, 100 );
light.position.set( lightProps.x, lightProps.y, lightProps.z );
light.castShadow = true;
light.shadow.radius = shadowProps.r;
light.shadow.mapSize.width = 512*4;
light.shadow.mapSize.height = 512*4;
scene.add( light );

const ambientLight = new AmbientLight(0xffffff, lightProps.a);
scene.add(ambientLight);




const resize = () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.zoom=container.clientWidth/defaultRendererWidth;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );
}

renderer.setAnimationLoop( animation );

window.addEventListener("resize",(event) => {
  resize();
});

window.addEventListener("load",(event) => {
  resize();
  container.style.visibility="visible";
});
