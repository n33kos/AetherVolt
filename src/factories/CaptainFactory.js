import CreateCaptainService from 'services/CreateCaptainService';

export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.createCaptainService = new CreateCaptainService(GameState);
  }

  generateCaptain(config) {
    return this.createCaptainService.createCaptain(config);
  }
}
