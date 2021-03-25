import uuidv4 from 'uuid/v4';

export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.gameObjects = [];
  }

  init() {}

  add(gameObject) {
    gameObject.uuid = uuidv4();
    gameObject.load();
    this.gameObjects.push(gameObject);

    return gameObject.uuid;
  }

  remove(uuid) {
    const gameObject = this.gameObjects.find(el => el.uuid === uuid);
    gameObject.unload();
    this.gameObjects = this.gameObjects.filter(el => el.uuid !== uuid);
  }

  find(filterFunction) {
    return this.gameObjects.filter(filterFunction);
  }

  clear() {
    this.gameObjects = [];
  }
}
