import uuidv4 from 'uuid/v4';

export default class {
  constructor() {
    this.tileTypes = [];
  }

  add(tile) {
    tile.uuid = uuidv4();
    this.tileTypes.push(tile);
  }

  remove(uuid) {
    this.tileTypes = this.tileTypes.filter(el => el.uuid !== uuid);
  }
}
