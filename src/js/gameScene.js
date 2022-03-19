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


class gameScene {

  constructor(container, props) {

    this.container=container;

    this.diceProps={
      w:1.6,
      h:1.6,
      d:1.6,
      x:0.2,
      y:-0.5,
      z:.5,
      r:0.3,
      f:0.13,
    }
    if (props?.dice) {
      this.diceProps={
        ...this.diceProps,
        ...props.dice
      }
    }

    this.cameraProps={
      x:2,
      y:-1,
      z:10,
    }
    if (props?.camera) {
      this.cameraProps={
        ...this.cameraProps,
        ...props.camera
      }
    }

    this.lightProps={
      x:5,
      y:-5,
      z:15,
      b:0.8,
      a:0.3,
    }
    if (props?.light) {
      this.lightProps={
        ...this.lightProps,
        ...props.light
      }
    }

    this.shadowProps={
      r:40,
      o:.2,
    }
    if (props?.shadow) {
      this.shadowProps={
        ...this.shadowProps,
        ...props.shadow
      }
    }

    this.direction=1;
    this.animation=1;

    this.defaultRendererWidth=1024;

    this.iteration=this.iteration.bind(this);

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

  createObjects() {

    let geometry, material, mesh;

    geometry = new RoundedBoxGeometry( this.diceProps.w, this.diceProps.h, this.diceProps.d, 7, this.diceProps.f );
    material = new MeshPhongMaterial();
    mesh = new Mesh( geometry, material );
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
    light.shadow.mapSize.width = 512*4;
    light.shadow.mapSize.height = 512*4;
    this.scene.add( light );

    const ambientLight = new AmbientLight(0xffffff, this.lightProps.a);
    this.scene.add(ambientLight);
  }


  iteration( time ) {

    if (this.animation) {
      this.dice.rotation.x = time / 2000;
      this.dice.rotation.y = time / 1000;

      this.dice.position.z +=0.1 * this.direction;
      if (this.dice.position.z>5) {
        this.direction=-1
      }
      if (this.dice.position.z<1) {
        this.direction=1
      }
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
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.zoom=this.container.clientWidth/this.defaultRendererWidth;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
  }

  start() {
    this.renderer.setAnimationLoop( this.iteration );
  }

}
export default gameScene;
