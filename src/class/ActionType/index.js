export default class {
  constructor(type) {
    this.id = this.getTypeId(type);
    this.type = this.getTypeString(this.id);
  }

  getTypeId(type) {
    const ids = {
      MOVE   : 1,
      PLACE  : 2,
      ROTATE : 3,
    };

    return ids[type];
  }

  getTypeString(id) {
    const types = {
      1 : 'MOVE',
      2 : 'PLACE',
      3 : 'ROTATE',
    };

    return types[id];
  }
}
