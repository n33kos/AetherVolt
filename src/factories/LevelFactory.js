import CreateLevelService from 'services/CreateLevelService';

export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.createLevelService = new CreateLevelService(GameState);
  }

  generateLevel(config) {
    return this.createLevelService.createLevel(config);
  }
}
