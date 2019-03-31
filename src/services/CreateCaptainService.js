import BaseService from 'services/BaseService';
import Player      from 'classes/Player';

export default class extends BaseService {
  createCaptain(config) {
    this.captain = new Player({
      GameState : this.GameState,
      ...config,
    });

    return this.captain;
  }
}
