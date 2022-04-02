import '../scss/app.scss';
import GameScene from './GameScene.js';
import RotatingStar from './RotatingStar.js';
import PrizePopup from './PrizePopup.js';

class App {

  constructor() {
    this.dice=new GameScene();
    this.star=new RotatingStar();
    this.popup=new PrizePopup();
  }

  initDice(props) {
    this.dice.init(props)
  }

  initStar(props) {
    this.star.init(props)
  }

  initPopup(props) {
    this.popup.init(props)
  }

}
export default App;
