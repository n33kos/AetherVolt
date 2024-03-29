import Entity from 'classes/Entity';
import Vector2 from 'classes/Vector2';
import getPixelDensity from 'lib/getPixelDensity';

export default class extends Entity {
  constructor(config) {
    super(config);

    const {
      GameState,
      path,
      color = '142,205,255',
    } = config;

    this.GameState = GameState;
    this.path = path;
    this.color = color;
    this.elements = [];
    this.offshoots = 12;
    this.maxwidth = 12 * getPixelDensity();
    this.ofshootBranchLength = 20 * getPixelDensity();

    this.GameState.Scene.add(this);
    this.createElements();
  }

  createElements() {
    this.elements = [];

    for (var i = 0; i < this.path.length; i++) {
      if (!this.path[i].cameFrom) return;

      this.elements[i] = {
        from : this.path[i].cameFrom.canvasPosition,
        to : this.path[i].canvasPosition,
        index: Math.floor(Math.random() * 3),
        children : [],
      };

      let pos = this.path[i].canvasPosition;
      for (var j = 0; j < this.offshoots; j++) {
        let directionx = Math.random() > 0.5 ? 1 : -1;
        let directiony = Math.random() > 0.5 ? 1 : -1;
        let newPos = new Vector2(
          pos.x + Math.random() * this.ofshootBranchLength * directionx,
          pos.y + Math.random() * this.ofshootBranchLength * directiony,
        );

        this.elements[i].children.push({
          from : pos,
          to : newPos,
          index : j,
        });

        pos = newPos;
      }
    }
  }

  drawEntity() {
    this.createElements();
    this.elements.forEach(element => {
      this.drawLine(element.from, element.to, 1);
      element.children.forEach(
        child => this.drawLine(child.from, child.to, child.index),
      );
    });
  }

  drawLine(from, to, iteration) {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.strokeStyle = `rgba(${this.color}, 0.685)`;
    this.GameState.Canvas.ctx.lineWidth = Math.max(1, Math.random() * (this.maxwidth - iteration));
    this.GameState.Canvas.ctx.moveTo(from.x, from.y);
    this.GameState.Canvas.ctx.lineTo(to.x, to.y);
    this.GameState.Canvas.ctx.stroke();

    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.strokeStyle = 'rgba(255,255,255, 0.85)';
    this.GameState.Canvas.ctx.lineWidth = this.GameState.Canvas.ctx.lineWidth / 3;
    this.GameState.Canvas.ctx.moveTo(from.x, from.y);
    this.GameState.Canvas.ctx.lineTo(to.x, to.y);
    this.GameState.Canvas.ctx.stroke();
  }
}
