export default class {
  constructor(type) {
    this.id = this.getTypeId(type);
    this.type = this.getTypeString(this.id);
    this.spriteSheet = this.getSpriteSheet(this.id);
    this.neighborPattern = this.getNeighborPattern(this.id);
  }

  getTypeId(type) {
    const ids = {
      EMPTY         : 1,
      PLAYER_COLUMN : 2,
      STRAIGHT      : 3,
      BEND          : 4,
      TRIPLE        : 5,
      QUAD          : 6,
    };

    return ids[type];
  }

  getTypeString(id) {
    const types = {
      1 : 'EMPTY',
      2 : 'PLAYER_COLUMN',
      3 : 'STRAIGHT',
      4 : 'BEND',
      5 : 'TRIPLE',
      6 : 'QUAD',
    };

    return types[id];
  }

  getSpriteSheet(id) {
    const sprites = {
      1 : './img/Conduit_Empty.png',
      2 : './img/Conduit_Empty.png',
      3 : './img/Conduit_Straight.png',
      4 : './img/Conduit_Bend.png',
      5 : './img/Conduit_Triple.png',
      6 : './img/Conduit_Quad.png',
    };

    return sprites[id];
  }

  getNeighborPattern(id) {
    const patterns = {
      1 : [],
      2 : [0,1,2,3],
      3 : [1,3],
      4 : [0,1],
      5 : [0,1,3],
      6 : [0,1,2,3],
    };

    return patterns[id];
  }
}
