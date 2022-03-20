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
  TextureLoader,
  MeshPhysicalMaterial
} from 'three';

import { RoundedBoxGeometry } from "./geometries/RoundedBoxGeometry"
import TWEEN from '@tweenjs/tween.js'

class gameScene {

  constructor(container, props) {

    this.container=container;

    this.diceProps={
      w:1.6,
      h:1.6,
      d:1.6,
      x:0.1,
      y:-0.5,
      z:.8,
      r:0.3,
      f:0.14,
      m:{
        roughness:0,//0,
        metalness:0.9,//0.05,
        clearcoat:0.9,
        clearcoatRoughness:0,//0,
      }
    }

    if (props?.dice) {
      this.diceProps={
        ...this.diceProps,
        ...props.dice
      }
    }

    this.cameraProps={
      x:0,
      y:-3,
      z:15,
    }
    if (props?.camera) {
      this.cameraProps={
        ...this.cameraProps,
        ...props.camera
      }
    }

    this.lightProps={
      x:5,
      y:-1,
      z:25,
      b:0.7,
      a:0.5,
    }
    if (props?.light) {
      this.lightProps={
        ...this.lightProps,
        ...props.light
      }
    }

    this.shadowProps={
      r:15,
      o:.2,
    }
    if (props?.shadow) {
      this.shadowProps={
        ...this.shadowProps,
        ...props.shadow
      }
    }

    this.edgeTextures=[
      "Asset 5@3x-8.png",
      "Asset 6@3x-8.png",
      "Asset 7@3x-8.png",
      "Asset 8@3x-8.png",
      // "1.png",
      // "2.png",
      // "3.png",
      // "4.png",
      // "5.png",
      // "6.png",
    ];
    if (props?.edgeTextures) {
      this.edgeTextures=props.edgeTextures;
    }

    this.edges=[
      0,
      1,
      2,
      3,
    ];

    let randEdges=this.edges.concat();
    this.edges.push(randEdges.splice(Math.floor(Math.random()*randEdges.length),1)[0]);
    this.edges.push(randEdges.splice(Math.floor(Math.random()*randEdges.length),1)[0]);

    randEdges=this.edges.concat();
    let resultEdges=[];
    let endEdges=[];

    for (let i = 0; i < 4; i++) {
      let first1=randEdges.splice(0,1)[0];
      let index2=randEdges.indexOf(first1);
      if (index2>=0) {
        let first2=randEdges.splice(index2,1)[0];
        resultEdges.push(first1);
        resultEdges.push(first2);
      } else {
        endEdges.push(first1);
      }
    }
    this.edges=resultEdges.concat(endEdges);

    this.texturesPath='./images/content/';
    if (props?.texturesPath) {
      this.texturesPath=props.texturesPath;
    }

    this.diceRotations=[
      {x:0,y:-Math.PI/2,z:0},
      {x:0,y:Math.PI/2,z:0},
      {x:Math.PI/2,y:0,z:0},
      {x:-Math.PI/2,y:0,z:0},
      {x:0,y:0,z:0},
      {x:0,y:-Math.PI,z:0},
    ];


    this.defaultRendererWidth=1024;

    this.iteration=this.iteration.bind(this);

    this.animation=false;

  }

  run() {
    this.animation=true;

    this.downLimit=this.diceProps.d/2;
    this.upLimit=6.5;

    this.desiredValue=Math.floor(Math.random()*4);
    this.desiredIndex=this.edges.indexOf(this.desiredValue);
    this.desiredRotation=this.diceRotations[this.desiredIndex];

    this.jumpCount=5;
    this.jumpScatter=.1;
    this.jumpFirstDuration=800;
    this.jumpLastDuration=200;
    this.startDelay=500;

    let motionTweens=[];
    let jumpHeight=this.upLimit;
    let jumpStep=(this.upLimit-this.downLimit)/this.jumpCount;

    let duration=this.jumpFirstDuration;
    let durationStep=(this.jumpFirstDuration-this.jumpLastDuration)/this.jumpCount;

    let rotationTweens=[];

    for (let i = 0; i < this.jumpCount; i++) {

      let upTween=(new TWEEN.Tween(this.dice.position))
      .to({
        x:this.diceProps.x+(this.jumpCount-i-1)*(this.jumpScatter-this.jumpScatter*2*Math.random()),
        y:this.diceProps.y+(this.jumpCount-i-1)*(this.jumpScatter-this.jumpScatter*2*Math.random()),
        z:jumpHeight,
      },duration/2)
      .easing(TWEEN.Easing.Cubic.Out);

      let downTween=(new TWEEN.Tween(this.dice.position))
      .to({
        x:this.diceProps.x+(this.jumpCount-i-1)*(this.jumpScatter-this.jumpScatter*2*Math.random()),
        y:this.diceProps.y+(this.jumpCount-i-1)*(this.jumpScatter-this.jumpScatter*2*Math.random()),
        z:this.downLimit,
      },duration/2)
      .easing(TWEEN.Easing.Cubic.In);

      motionTweens.push(upTween);
      motionTweens.push(downTween);

      let rotationTween;
      if (i<this.jumpCount-1) {
        rotationTween=(new TWEEN.Tween(this.dice.rotation))
        .to({
          x:this.desiredRotation.x+(this.jumpCount-i)*.7*Math.random(),
          y:this.desiredRotation.y+(this.jumpCount-i)*.7*Math.random(),
          z:this.desiredRotation.z+(this.jumpCount-i)*.7*Math.random(),
        },duration)
      } else {
        rotationTween=(new TWEEN.Tween(this.dice.rotation))
        .to(this.desiredRotation,duration)
        .easing(TWEEN.Easing.Back.Out);
      }

      rotationTweens.push(rotationTween);

      jumpHeight-=jumpStep;
      duration-=durationStep;
    }

    for (let i = 0; i < motionTweens.length-1; i++) {
      motionTweens[i].chain(motionTweens[i+1]);
    }

    for (let i = 0; i < rotationTweens.length-1; i++) {
      rotationTweens[i].chain(rotationTweens[i+1]);
    }

    motionTweens[0].delay(this.startDelay);
    motionTweens[0].start();

    rotationTweens[0].delay(this.startDelay);
    rotationTweens[0].start();

    motionTweens[motionTweens.length-1].onComplete(()=>{
      this.run();
    })
  }

  stop() {
    this.animation=false;
    this.dice.position.z=this.downLimit;
    this.dice.rotation.x=this.desiredRotation.x;
    this.dice.rotation.y=this.desiredRotation.y;
    this.dice.rotation.z=this.desiredRotation.z;
  }

  createRenderer() {
    this.renderer = new WebGLRenderer( { antialias: true, alpha: true } );
    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.outputEncoding = sRGBEncoding;
  }

  createCamera() {
    this.camera = new PerspectiveCamera( 50 );
    this.camera.position.x = this.cameraProps.x;
    this.camera.position.y = this.cameraProps.y;
    this.camera.position.z = this.cameraProps.z;
    this.camera.lookAt(0,0,0);
  }

  createScene() {
    this.scene = new Scene();
  }


  loadTextures() {
    const material = new THREE.MeshBasicMaterial(  );
  }

  createObjects() {

    let geometry, material, mesh;

    geometry = new RoundedBoxGeometry( this.diceProps.w, this.diceProps.h, this.diceProps.d, 7, this.diceProps.f );

    let textureLoader = new TextureLoader();
    textureLoader.setPath(this.texturesPath);
    let materials = [];

    for (let i = 0; i < 6; i++) {
      let material=new MeshPhysicalMaterial( { map: textureLoader.load( this.edgeTextures[this.edges[i]] )} )//MeshPhysicalMaterial//MeshPhongMaterial
      material.roughness=this.diceProps.roughness;
      material.metalness=this.diceProps.metalness;
      material.clearcoat=this.diceProps.clearcoat;
      material.clearcoatRoughness=this.diceProps.clearcoatRoughness;
      materials.push(material);
    }

    mesh = new Mesh( geometry, materials );
    mesh.castShadow = true;
    this.scene.add( mesh );
    this.dice = mesh;

    this.dice.position.x=this.diceProps.x;
    this.dice.position.y=this.diceProps.y;
    this.dice.position.z=this.diceProps.z;
    this.dice.rotation.z=this.diceProps.r;

    geometry = new PlaneGeometry( 10, 10 );
    material = new ShadowMaterial( );
    // material = new MeshPhongMaterial();
    material.opacity = this.shadowProps.o;
    mesh = new Mesh( geometry, material );
    mesh.receiveShadow = true;
    this.scene.add( mesh );
  }

  createLight() {
    const light = new PointLight( 0xffffff, this.lightProps.b, 100 );
    light.position.set( this.lightProps.x, this.lightProps.y, this.lightProps.z );
    light.castShadow = true;
    light.shadow.radius = this.shadowProps.r;
    light.shadow.mapSize.width = 512*2;
    light.shadow.mapSize.height = 512*2;
    this.scene.add( light );

    const ambientLight = new AmbientLight(0xffffff, this.lightProps.a);
    this.scene.add(ambientLight);
  }


  iteration( time ) {
    if (this.animation) {
      TWEEN.update();
    }
    this.renderer.render( this.scene, this.camera );
  }

  init() {

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createObjects();
    this.createLight();

    this.container.appendChild( this.renderer.domElement );
  }

  resize() {
    // this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    // this.camera.zoom=this.container.clientWidth/this.defaultRendererWidth;
    // this.camera.updateProjectionMatrix();
    // console.log(window.devicePixelRatio);
    // this.renderer.setPixelRatio( window.devicePixelRatio );
    this.camera.zoom=2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth/2, this.container.clientHeight/2 );
    this.renderer.domElement.style.position="absolute";
    this.renderer.domElement.style.left=this.container.clientWidth/4+"px";
    this.renderer.domElement.style.top=this.container.clientHeight/4+"px";
  }

  start() {
    this.renderer.setAnimationLoop( this.iteration );

    this.run();
  }

}
export default gameScene;
