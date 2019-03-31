import BaseService from 'services/BaseService';
import Player      from 'classes/Player';

export default class extends BaseService {
  createCaptain(config) {
    this.player = new Player({
      GameState : this.GameState,
      ...config,
    });

    return this.player;
  }
}
