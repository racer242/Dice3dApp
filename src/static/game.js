function game() {

  function create() {

    const dice3DInitProps={
      container:gameContainer,  //Контейнер, в который добавляется игровой канвас

      dice:{    //Параметры кубика
        w:1.6,  //Ширина кубика
        h:1.6,  //Высота кубика
        d:1.6,  //Глубина кубика
        x:0,  //Позиция по X (от центра поля)
        y:-0.2, //Позиция по Y (от центра поля)
        z:.8,   //Позиция по Z
        r:0.3,  //Поворот относительно оси Z
        f:0.14, //Размер фаски
        m:{     //Свойства материала
          roughness:0,          //Размытость бликов
          metalness:0.9,        //Металлический блеск
          clearcoat:0.9,        //Параметр бликов
          clearcoatRoughness:0, //Размытость бликов
        },
      },

      camera:{  //Параметры камеры
        x:0,    //Позиция по X (от центра поля)
        y:-3,   //Позиция по Y (от центра поля)
        z:15,   //Позиция по Z
      },

      light: {  //Параметры света
        x:5,    //Позиция точечного источника по X (от центра поля)
        y:-1,   //Позиция точечного источника по Y (от центра поля)
        z:25,   //Позиция точечного источника по Z
        b:0.7,  //Яркость точечного истточника
        a:0.5,  //Яркость фонового освещения
      },

      shadow: { //Параметры тени
        r:15,   //Радиус
        o:.2,   //Непрозрачность
      },

      startDelay:300,   //Задержка перед прыжком
      upLimit:6,        //Ограничение прыжка по вертикали

      jump: {   //Параметры прыжка (если заданы, должны все присутствовать)
        count:7,          //Количество отскоков
        scatter:{x:0.1,y:0.1},  //Разброс смещения при каждом движении
        offset:{x:-0.05,y:-0.05},   //Смещение смещения при каждом движении
        firstDuration:800,   //Длительность первого прыжка
        lastDuration:300,    //Длительность последнего прыжка
      },

      rotation: {   //Параметры вращения (если заданы, должны все присутствовать)
        randomPlace:.3,     //Доля количества прыжков, при которых работает startRandom
        startRandom:1.5,    //Разброс вращений при старте
        endRandom:.5,       //Разброс вращений при завершении
      },

      edgeTextures:[
        "Asset 5@3x-8.png",
        "Asset 6@3x-8.png",
        "Asset 7@3x-8.png",
        "Asset 8@3x-8.png",
      ],

      texturesPath:'./images/content/',

      callbacks:{ //Колбеки, обрабатывающие начало и конец игры. В параметр передается целевая позиция кубика
        create:onDiceAnimationCreate,
        load:onDiceAnimationLoad,
        start: onDiceAnimationStart,
        finish: onDiceAnimationFinish,
      }
    }


    const rotatingStarInitProps = {
      container:rotatingStarContainer,  //Контейнер со вращающейся звездой
      starContainer:starContainer,  //Контейнер звезды
    }

    const prizePopupProps = {
      container:prizePopupContainer,  //Контейнер для попапа
      windowContainer:prizeWindowContainer,  //Контейнер для окна попапа
      prizeContainer:prizeContainer,  //Контейнер картинки с призом
      prizeTitleContainer:prizeTitleContainer,  //Контейнер для заголовка
      compositionId:"E9E7EFB6F4DF174892A12A98813B2490", //Идентификатор композиции Animate
      manifest: [                     //Манифест предзагрузки картинок для окна и картинок приза
    		{src:"images/content/popup_1.png?1648908673238", id:"popup_1"},
    		{src:"images/content/star-rotate.png?1648908673238", id:"starrotate"},
    		{src:"images/content/star.png?1648908673238", id:"star"},

        {src:"images/content/prize1.png", id:"prize1"},
        {src:"images/content/prize2.png", id:"prize2"},
        {src:"images/content/prize3.png", id:"prize3"},
        {src:"images/content/prize4.png", id:"prize4"},

        // {src:"static/font/DolceCaffe-Regular.woff2", id:"font1"},
        // {src:"static/font/DolceCaffe-Regular.woff", id:"font2"},

    	],
      content: [                      //Картинки призов
        "images/content/prize1.png",
        "images/content/prize2.png",
        "images/content/prize3.png",
        "images/content/prize4.png",
      ],
      titles: [                       //Надписи призов
        "МУЗЫКАЛЬНАЯ КОЛОНКА!",
        "ДЕНЬГИ НА ТЕЛЕФОН!",
        "ЭЛЕКТРОСАМОКАТ!",
        "ФОТОАППАРАТ!",
      ],
      nativeWidth:1280, //Оригинальный размер окна попапа приза
      nativeHeight:800, //Оригинальный размер окна попапа приза
      callbacks:{ //Колбеки, обрабатывающие начало и конец игры. В параметр передается целевая позиция кубика
        content: onPrizePopupContent, //Появление контента окна приза (картинки)
        view: onPrizePopupView, //Момент остановки анимации появления окна
        close: onPrizePopupClose, //Момент окончания анимации окна
      }
    }

    const dice3dGame=new Dice3dGame();
    dice3dGame.initDice(dice3DInitProps);
    dice3dGame.initStar(rotatingStarInitProps);
    dice3dGame.initPopup(prizePopupProps);

    return dice3dGame;
  }

  //Определяем dom-элементы
  const container = document.getElementById("gameBox");
  const gameContainer = document.getElementById("dice3d");
  const rotatingStarContainer = document.getElementById("rotating");
  const starContainer = document.getElementById("star");
  const prizePopupContainer = document.getElementById("prizePopup");
  const prizeWindowContainer = document.getElementById("prizeWindow");
  const prizeContainer = document.getElementById("prize");
  const prizeTitleContainer = document.getElementById("prizeTitle");

  const clickArea = document.getElementById("clickArea");
  const startButton = document.getElementById("startButton");


  //Функция старта
  function runGame() {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      const response = JSON.parse(this.responseText);
      game.dice.run(response.prize.facetNum);
    }
    xhttp.open("GET", "./static/response.json");
    xhttp.send();
  }

  function updateBounds() {
    let scale=Math.min(container.clientWidth/1280,container.clientHeight/1280);
    gameContainer.style.transform="translate(-50%,-50%) scale("+scale+","+scale+")";
    prizePopupContainer.style.transform="translate(-50%,-50%) scale("+scale+","+scale+")";
  }

  function onDiceAnimationCreate(dice) {
    console.log("CREATE");
    dice.element.style.opacity=0;
  }

  function onDiceAnimationLoad(dice) {
    console.log("LOAD");
    dice.element.style.opacity=1;
  }

  function onDiceAnimationStart(value) {
    console.log("START",value);
    game.star.hide();
    game.popup.hide();
    startButton.style.pointerEvents="none";
    startButton.style.cursor="default";
    startButton.style.opacity=0.5;
    clickArea.style.display="none";
  }

  function onDiceAnimationFinish(value) {
    console.log("FINISH",value);
    game.star.show();
    setTimeout(
      function () {
        game.popup.show(game.dice.value);
      },1000
    )
  }

  function onPrizePopupContent(container1,container2) {
    console.log("CONTENT",container1,container2);
  }

  function onPrizePopupView() {
    console.log("VIEW");
    startButton.style.pointerEvents="all";
    startButton.style.cursor="pointer";
    startButton.style.opacity=1;
    startButton.style.visibility="visible";
    clickArea.style.display="block";
  }

  function onPrizePopupClose() {
    console.log("CLOSE");
  }

  window.addEventListener("resize",(event) => {
    updateBounds();
  });

  const game = create();
  updateBounds();
  game.dice.start();
  game.dice.resize();
  gameContainer.style.visibility="visible";

  startButton.addEventListener("click",runGame);
  clickArea.addEventListener("click",runGame);


}

window.addEventListener("load",(event) => {
  game();
});
