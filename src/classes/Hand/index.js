import Entity          from 'classes/Entity';
import Tile            from 'classes/Tile';
import Vector2         from 'classes/Vector2';
import getPixelDensity from 'lib/getPixelDensity';

export default class extends Entity {
  constructor(config) {
    super(config);

    this.player = config.player;
    this.tiles = [];
    this.selectedTile = 0;
    this.size = 64;
    this.scale = 1.5 * getPixelDensity();
    this.paddingRatio = 0.2;
  }

  add(tileType) {
    if (!tileType) return;

    const tile = new Tile({
      GameState  : this.GameState,
      dimensions : new Vector2(this.size, this.size),
      offset     : new Vector2(0.5, 0.5),
      placedBy   : this.player,
      scale      : new Vector2(this.scale, this.scale),
      type       : tileType,
      isVisible  : false,
      isInHand   : true,
    });

    this.tiles.push(tile);
    this.updatePosition();
  }

  remove(uuid) {
    this.tiles = this.tiles.filter(el => el.uuid !== uuid);
    this.updatePosition();
  }

  updatePosition() {
    const offsetX = (this.tiles.length * this.size * this.scale) / 2;
    this.tiles.forEach((tile, index) => {
      tile.canvasPosition = new Vector2(
        this.GameState.Canvas.cx + (index * this.size * (this.scale + this.paddingRatio)) - offsetX,
        this.GameState.Canvas.height - (this.size * this.scale) / 2,
      );
    });
  }

  load() {
    this.tiles.forEach(tile => {
      tile.load();
    });
  }

  drawEntity() {
    this.tiles.forEach(tile => {
      tile.drawEntity();
    });
  }

  setVisibility(isVisible) {
    this.tiles.forEach(tile => {
      tile.isVisible = isVisible;
    });
  }
}
