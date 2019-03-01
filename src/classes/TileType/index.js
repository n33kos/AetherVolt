export default class {
  constructor(type) {
    this.id = this.getTypeId(type);
    this.type = this.getTypeString(this.id);
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
