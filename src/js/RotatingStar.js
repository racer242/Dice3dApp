class RotatingStar {

  constructor() {
  }

  init(props) {

    if (!props?.container) {
      throw "You must to set container in props";
    }
    this.container=props.container;

    this.starContainer = props.starContainer;

  }

  show() {
    this.container.style.opacity=1;
    this.starContainer.style.transform="translate(-50%,-50%) scale(1,1)";
  }

  hide() {
    this.container.style.opacity=0;
    this.starContainer.style.transform="translate(-50%,-50%) scale(.3,.3)";
  }


}
export default RotatingStar;
