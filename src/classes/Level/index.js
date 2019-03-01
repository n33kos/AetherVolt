import LoadedEntity from 'classes/LoadedEntity';

export default class extends LoadedEntity {
  constructor(config) {
    super(config);

    this.name = 'Default Level';
  }

  gameLogic() {
    // Override this function to add level specific game logic
  }
}
