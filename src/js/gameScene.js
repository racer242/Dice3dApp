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
      f:0.16,
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
      y:-5,
      z:25,
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


    this.animation=1;

    this.edges=[
      "Asset 5@3x-8.png",
      "Asset 6@3x-8.png",
      "Asset 7@3x-8.png",
      "Asset 8@3x-8.png",
    ];

    if (props?.edges) {
      this.edges=props.edges;
    }
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

    this.direction=1;


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
      let material=new MeshPhysicalMaterial( { map: textureLoader.load( this.edges[i] )} )
      material.roughness=0;
      material.metalness=0.05;
      material.clearcoat=0.9;
      material.clearcoatRoughness=0;
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
      if (this.dice.position.z>6) {
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
    // this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    // this.camera.zoom=this.container.clientWidth/this.defaultRendererWidth;
    // this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
  }

  start() {
    this.renderer.setAnimationLoop( this.iteration );
  }

}
export default gameScene;
