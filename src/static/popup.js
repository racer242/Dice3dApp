(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



(lib.popup_1 = function() {
	this.initialize(img.popup_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1098,782);


(lib.starrotate = function() {
	this.initialize(img.starrotate);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,555,555);


(lib.star = function() {
	this.initialize(img.star);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,110,108);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.SmallStar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.star();
	this.instance.parent = this;
	this.instance.setTransform(-55,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.SmallStar, new cjs.Rectangle(-55,0,110,108), null);


(lib.BigStar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.starrotate();
	this.instance.parent = this;
	this.instance.setTransform(-278,-278);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.BigStar, new cjs.Rectangle(-278,-278,555,555), null);


(lib.Back = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.popup_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Back, new cjs.Rectangle(0,0,1098,782), null);


(lib.SwingingStar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_1 = function() {
		if (Math.random()>0.01) { this.gotoAndPlay(0)}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(124));

	// Layer_1
	this.instance = new lib.SmallStar();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({rotation:-44.9994},12,cjs.Ease.quadOut).to({scaleX:0.9999,scaleY:0.9999,rotation:30.0009},20,cjs.Ease.quadInOut).to({rotation:-20.0004},20,cjs.Ease.quadInOut).to({rotation:14.9995},20,cjs.Ease.quadInOut).to({rotation:-9.9996},20,cjs.Ease.quadInOut).to({scaleX:1,scaleY:1,rotation:4.9995},20,cjs.Ease.quadInOut).to({rotation:0},10,cjs.Ease.cubicIn).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.6,-38.9,216.89999999999998,160);


(lib.StarCluster = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// SwingingStar
	this.instance = new lib.SwingingStar();
	this.instance.parent = this;
	this.instance.setTransform(8.8,-12.7,0.144,0.144,0,0,180,-0.4,0);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({_off:false},0).to({regX:-0.2,regY:0.1,scaleX:0.4,scaleY:0.4,x:223.95,y:50.5,alpha:1},29,cjs.Ease.get(1)).wait(53).to({regX:-0.4,regY:0,scaleX:0.144,scaleY:0.144,x:8.8,y:-12.7,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(11));

	// SwingingStar
	this.instance_1 = new lib.SwingingStar();
	this.instance_1.parent = this;
	this.instance_1.setTransform(6.8,-24.4,0.18,0.18,0,0,0,0.3,-0.3);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({regX:-0.1,regY:0,scaleX:0.5,scaleY:0.5,x:181.55,y:-173.1,alpha:1},29,cjs.Ease.get(1)).wait(67).to({regX:0.3,regY:-0.3,scaleX:0.18,scaleY:0.18,x:6.8,y:-24.4,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(8));

	// SwingingStar
	this.instance_2 = new lib.SwingingStar();
	this.instance_2.parent = this;
	this.instance_2.setTransform(8.75,-18.55,0.144,0.144);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(22).to({_off:false},0).to({regX:-0.1,scaleX:0.4,scaleY:0.4,x:323.7,y:-71.75,alpha:1},29,cjs.Ease.get(1)).wait(51).to({regX:0,scaleX:0.144,scaleY:0.144,x:8.75,y:-18.55,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(9));

	// SwingingStar
	this.instance_3 = new lib.SwingingStar();
	this.instance_3.parent = this;
	this.instance_3.setTransform(6.9,-12.75,0.4319,0.4319,0,0,180,0,-0.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(13).to({_off:false},0).to({regY:0,scaleX:1.2,scaleY:1.2,x:201.65,y:85.9,alpha:1},29,cjs.Ease.get(1)).wait(62).to({regY:-0.1,scaleX:0.4319,scaleY:0.4319,x:6.9,y:-12.75,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(7));

	// SwingingStar
	this.instance_4 = new lib.SwingingStar();
	this.instance_4.parent = this;
	this.instance_4.setTransform(9.3,-31.6,0.36,0.36,0,0,180,-0.1,0);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3).to({_off:false},0).to({regX:0,scaleX:1,scaleY:1,x:283.75,y:-173.15,alpha:1},29,cjs.Ease.get(1)).wait(69).to({regX:-0.1,scaleX:0.36,scaleY:0.36,x:9.3,y:-31.6,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(10));

	// SwingingStar
	this.instance_5 = new lib.SwingingStar();
	this.instance_5.parent = this;
	this.instance_5.setTransform(11.25,-21.45,0.3239,0.3239);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({_off:false},0).to({scaleX:0.9,scaleY:0.9,x:317.15,y:-21.85,alpha:1},29,cjs.Ease.get(1)).wait(66).to({scaleX:0.3239,scaleY:0.3239,x:11.25,y:-21.45,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(7));

	// SwingingStar
	this.instance_6 = new lib.SwingingStar();
	this.instance_6.parent = this;
	this.instance_6.setTransform(-4.95,0.2,0.144,0.144,0,0,0,-0.4,0.4);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2).to({_off:false},0).to({regX:-0.2,regY:0.1,scaleX:0.4,scaleY:0.4,x:-252.45,y:42.75,alpha:1},29,cjs.Ease.get(1)).wait(71).to({regX:-0.4,regY:0.4,scaleX:0.144,scaleY:0.144,x:-4.95,y:0.2,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(9));

	// SwingingStar
	this.instance_7 = new lib.SwingingStar();
	this.instance_7.parent = this;
	this.instance_7.setTransform(-11.05,-7.6,0.2159,0.2159,0,0,0,-0.2,0.2);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(20).to({_off:false},0).to({regX:-0.3,regY:0.1,scaleX:0.35,scaleY:0.35,x:-252.45,y:-86.6,alpha:1},29,cjs.Ease.get(1)).wait(54).to({regX:-0.2,regY:0.2,scaleX:0.2159,scaleY:0.2159,x:-11.05,y:-7.6,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(8));

	// SwingingStar
	this.instance_8 = new lib.SwingingStar();
	this.instance_8.parent = this;
	this.instance_8.setTransform(-8.9,-25.9,0.144,0.144,0,0,180);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(5).to({_off:false},0).to({regX:-0.1,scaleX:0.4,scaleY:0.4,x:-197.4,y:-194.9,alpha:1},29,cjs.Ease.get(1)).wait(67).to({regX:0,scaleX:0.144,scaleY:0.144,x:-8.9,y:-25.9,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(10));

	// SwingingStar
	this.instance_9 = new lib.SwingingStar();
	this.instance_9.parent = this;
	this.instance_9.setTransform(-7.05,-10.3,0.4319,0.4319,0,0,0,0,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(16).to({_off:false},0).to({regY:0,scaleX:1.2,scaleY:1.2,x:-241.35,y:93.65,alpha:1},29,cjs.Ease.get(1)).wait(57).to({regY:0.1,scaleX:0.4319,scaleY:0.4319,x:-7.05,y:-10.3,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(9));

	// SwingingStar
	this.instance_10 = new lib.SwingingStar();
	this.instance_10.parent = this;
	this.instance_10.setTransform(-12.6,-21.45,0.36,0.36);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,x:-283.75,y:-187.15,alpha:1},29,cjs.Ease.get(1)).wait(61).to({scaleX:0.36,scaleY:0.36,x:-12.6,y:-21.45,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(7));

	// SwingingStar
	this.instance_11 = new lib.SwingingStar();
	this.instance_11.parent = this;
	this.instance_11.setTransform(-8.85,-12.75,0.3239,0.3239,0,0,180,0,-0.1);
	this.instance_11.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({regY:0,scaleX:0.9,scaleY:0.9,x:-322.45,y:-42,alpha:1},29,cjs.Ease.get(1)).wait(71).to({regY:-0.1,scaleX:0.3239,scaleY:0.3239,x:-8.85,y:-12.75,alpha:0},8,cjs.Ease.get(-1)).to({_off:true},1).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-371.9,-194.9,738.5999999999999,418.20000000000005);


(lib.RotatingStar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.BigStar();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:360},299).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-392.4,-392.4,784.9,784.9);


(lib.Scene = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// StarCluster
	this.instance = new lib.StarCluster("synched",0,false);
	this.instance.parent = this;
	this.instance.setTransform(550,390);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(39).to({_off:false},0).wait(61).to({startPosition:100},0).to({_off:true},15).wait(5));

	// RotatingStar
	this.instance_1 = new lib.RotatingStar();
	this.instance_1.parent = this;
	this.instance_1.setTransform(550,390,0.3058,0.3058);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(61).to({scaleX:0.2827,scaleY:0.2827,alpha:0},9,cjs.Ease.get(-1)).to({_off:true},1).wait(10));

	// Back
	this.instance_2 = new lib.Back();
	this.instance_2.parent = this;
	this.instance_2.setTransform(549.05,391.05,0.45,0.45,0,0,0,549,391);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:1,scaleY:1,x:549,y:391,alpha:1},19,cjs.Ease.get(1)).wait(90).to({regX:549.1,scaleX:0.285,scaleY:0.285,x:549.05,y:391.05,alpha:0},10,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1098,782);


// stage content:
(lib.popup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_29 = function() {
		if (this.showContentCallback) {
			this.showContentCallback();
		}
	}
	this.frame_99 = function() {
		this.stop();
		if (this.viewCallback) {
			this.viewCallback();
		}
	}
	this.frame_119 = function() {
		this.stop();
		if (this.closeCallback) {
			this.closeCallback();
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(29).call(this.frame_29).wait(70).call(this.frame_99).wait(20).call(this.frame_119).wait(1));

	// Scene
	this.instance = new lib.Scene("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(640,400,1,1,0,0,0,549,391);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(120));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(731,409,458,382);
// library properties:
lib.properties = {
	id: 'E9E7EFB6F4DF174892A12A98813B2490',
	width: 1280,
	height: 800,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/popup_1.png?1648928318062", id:"popup_1"},
		{src:"images/starrotate.png?1648928318062", id:"starrotate"},
		{src:"images/star.png?1648928318062", id:"star"}
	],
	preloads: []
};

console.log("!!!!!!!!!!!!!!!!!!!!!  !!!!!!!!!!!!!!!!!!!!!!!!!!!",this.viewCallback);


// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E9E7EFB6F4DF174892A12A98813B2490'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {
	var lastW, lastH, lastS=1;
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();
	function resizeCanvas() {
		var w = lib.properties.width, h = lib.properties.height;
		var iw = window.innerWidth, ih=window.innerHeight;
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
		if(isResp) {
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
				sRatio = lastS;
			}
			else if(!isScale) {
				if(iw<w || ih<h)
					sRatio = Math.min(xRatio, yRatio);
			}
			else if(scaleType==1) {
				sRatio = Math.min(xRatio, yRatio);
			}
			else if(scaleType==2) {
				sRatio = Math.max(xRatio, yRatio);
			}
		}
		domContainers[0].width = w * pRatio * sRatio;
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {
			container.style.width = w * sRatio + 'px';
			container.style.height = h * sRatio + 'px';
		});
		stage.scaleX = pRatio*sRatio;
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;
		stage.tickOnUpdate = false;
		stage.update();
		stage.tickOnUpdate = true;
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
