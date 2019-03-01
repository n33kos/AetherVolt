import TileType from 'classes/TileType';

export default class {
  constructor({
    deckSize = 30,
  }) {
    this.tiles = [];
    this.tilesPerType = Math.floor(deckSize / 4);
    this.typeCounter = 0;
    this.currentType = 0;
    this.allowedTypes = [
      'STRAIGHT',
      'BEND',
      'TRIPLE',
      'QUAD',
    ];

    for (var i = 0; i < deckSize; i++) {
      this.tiles.push(
        new TileType(this.allowedTypes[this.currentType])
      );
      this.incrementType();
    }

    this.shuffle();
  }

  incrementType() {
    this.typeCounter++;
    if (this.typeCounter >= this.tilesPerType) {
      this.typeCounter = 0;
      this.currentType += 1
      if (this.currentType >= this.allowedTypes.length) this.currentType = 0;
    }
  }

  shuffle() {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }

  draw() {
    return this.tiles.pop();
  }
}
