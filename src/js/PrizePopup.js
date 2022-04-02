class PrizePopup {

  constructor() {
  }

  init(props) {

    if (!props?.container) {
      throw "You must to set container in props";
    }
    this.container=props.container;
    this.prizeContainer=props.prizeContainer;

    if (props?.callbacks) {
      if (props.callbacks.content) {
        this.contentCallback=props.callbacks.content;
      }
      if (props.callbacks.view) {
        this.viewCallback=props.callbacks.view;
      }
      if (props.callbacks.close) {
        this.closeCallback=props.callbacks.close;
      }
    }

    this.create(props);
  }

  create(props) {
    var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
    const init = () => {
    	canvas = document.createElement("canvas");
      canvas.width=props.nativeWidth;
      canvas.height=props.nativeHeight;
      canvas.style.width="100%";
      canvas.style.height="100%";
      props.windowContainer.appendChild(canvas);
      anim_container = props.container;

    	var comp=AdobeAn.getComposition(props.compositionId);
    	var lib=comp.getLibrary();
      lib.properties.manifest = props.manifest;
    	var loader = new createjs.LoadQueue(false);
    	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
    	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
    	var lib=comp.getLibrary();
    	loader.loadManifest(lib.properties.manifest);
    }
    const handleFileLoad = (evt, comp) => {
    	var images=comp.getImages();
    	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
    }
    const handleComplete = (evt,comp) => {
    	var lib=comp.getLibrary();
    	var ss=comp.getSpriteSheet();
    	var queue = evt.target;
    	var ssMetadata = lib.ssMetadata;
    	for(let i=0; i<ssMetadata.length; i++) {
    		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    	}
    	exportRoot = new lib.popup();
    	stage = new lib.Stage(canvas);
    	//Registers the "tick" event listener.
    	fnStartAnimation = function() {
    		stage.addChild(exportRoot);
    		createjs.Ticker.setFPS(lib.properties.fps);
    		createjs.Ticker.addEventListener("tick", stage);
    	}
    	//Code to support hidpi screens and responsive scaling.
    	AdobeAn.compositionLoaded(lib.properties.id);
    	fnStartAnimation();
      this.loadHandler(exportRoot);
    }
    init();
  }

  loadHandler(animationRoot) {
    this.root=animationRoot;
    this.container.style.display="none";
    this.root.stop();

    this.root.showContentCallback=() => {
      if (this.contentCallback) {
        this.contentCallback(this.prizeContainer);
      }
    }
    this.root.viewCallback=() => {
      console.log("!!!",this.viewCallback);
      if (this.viewCallback) {
        this.viewCallback();
      }
    }

    this.root.closeCallback=() => {
      console.log("???",this.closeCallback);
      if (this.closeCallback) {
        this.closeCallback();
      }
    }

  }

  show() {
    this.container.style.display="block";
    this.root.gotoAndPlay(0);
  }

  hide() {
    this.container.style.display="none";
    this.root.gotoAndStop(0);
  }


}
export default PrizePopup;
