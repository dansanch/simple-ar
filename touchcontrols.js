AFRAME.registerComponent("touch-controls", {
  schema: {
    element: { default: "" },
  },

  init: function () {
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.deltaX = 0;

    this.el.addEventListener("touchstart", this.handleTouchStart);
    this.el.addEventListener("touchmove", this.handleTouchMove);
  },

  handleTouchStart: function (event) {
    console.log("touchstart");
    this.startX = event.touches[0].pageX;
  },

  handleTouchMove: function (event) {
    console.log("touchmove");
    this.currentX = event.touches[0].pageX;
    this.deltaX = this.currentX - this.startX;

    let player = document.querySelector(this.data.element);
    let currentPosition = player.getAttribute("position");

    currentPosition.x += this.deltaX * 0.01;
    currentPosition.x = Math.min(Math.max(currentPosition.x, -2), 2); // Clamp the position between -2 and 2

    player.setAttribute("position", currentPosition);

    this.startX = this.currentX;
  },

  remove: function () {
    this.el.removeEventListener("touchstart", this.handleTouchStart);
    this.el.removeEventListener("touchmove", this.handleTouchMove);
  },
});