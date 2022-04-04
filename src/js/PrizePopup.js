class PrizePopup {

  constructor() {
  }

  init(props) {

    if (!props?.container) {
      throw "You must to set container in props";
    }
    this.container=props.container;
    this.prizeContainer=props.prizeContainer;
    this.prizeTitleContainer=props.prizeTitleContainer;

    this.content = [
      "images/content/prize1.png",
      "images/content/prize2.png",
      "images/content/prize3.png",
      "images/content/prize4.png",
    ];

    if (props?.content) {
      this.content=props.content;
    }

    this.titles = [
      "МУЗЫКАЛЬНАЯ КОЛОНКА!",
      "ДЕНЬГИ НА ТЕЛЕФОН!",
      "ЭЛЕКТРОСАМОКАТ!",
      "ФОТОАППАРАТ!",
    ];

    if (props?.content) {
      this.content=props.content;
    }

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
      this.prizeContainer.style.opacity=1;
      this.prizeContainer.style.transform="translate(-50%,-50%) scale(1,1)";

      this.prizeTitleContainer.style.opacity=1;
      this.prizeTitleContainer.style.transform="translate(-50%,-50%) scale(1,1)";

      if (this.contentCallback) {
        this.contentCallback(this.prizeContainer,this.prizeTitleContainer);
      }
    }
    this.root.viewCallback=() => {
      if (this.viewCallback) {
        this.viewCallback();
      }
    }

    this.root.closeCallback=() => {
      this.container.style.display="none";
      this.root.gotoAndStop(0);
      if (this.closeCallback) {
        this.closeCallback();
      }
    }

  }

  show(index) {
    this.contentIndex=index;
    this.container.style.display="block";
    this.root.gotoAndPlay(0);

    this.prizeContainer.innerHTML=`<img src=${this.content[this.contentIndex]}>`;
    this.prizeTitleContainer.innerHTML=this.titles[this.contentIndex];
  }

  hide() {
    this.root.gotoAndPlay("close");
    this.prizeContainer.style.opacity=0;
    this.prizeContainer.style.transform="translate(-50%,-50%) scale(.3,.3)";

    this.prizeTitleContainer.style.opacity=0;
    this.prizeTitleContainer.style.transform="translate(-50%,-50%) scale(.3,.3)";    
  }


}
export default PrizePopup;
