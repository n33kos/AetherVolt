import Entity       from 'class/Entity';
import rectContains from 'lib/rectContains';
import Tile         from 'class/Tile';
import uuidv4       from 'uuid/v4';
import Vector2      from 'class/Vector2';

export default class extends Entity {
  constructor(config) {
    super(config);

    this.tiles = [];
    this.selectedTile = 0;
    this.size = 64;
    this.scale = 2;
    this.paddingRatio = 0.2;
  }

  add(tileType) {
    const tile = new Tile({
      GameState: this.GameState,
      dimensions: new Vector2(this.size, this.size),
      offset: new Vector2(0.5, 0.5),
      scale: new Vector2(this.scale, this.scale),
      type: tileType,
      isVisible: false,
      isInHand: true,
    });

    tile.uuid = uuidv4();
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

  getCellAtCanvasPosition(position) {
    return this.tiles.find(tile => {
      return rectContains(
        position,
        new Vector2(
          tile.canvasPosition.x + tile.absoluteOffset.x,
          tile.canvasPosition.y + tile.absoluteOffset.y,
        ),
        new Vector2(
          tile.dimensions.x * tile.scale.x,
          tile.dimensions.y * tile.scale.y,
        ),
      );
    });
  }
}
