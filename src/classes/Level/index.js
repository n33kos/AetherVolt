import LoadedEntity from 'classes/LoadedEntity';
import TileHelper   from 'classes/TileHelper';

export default class extends LoadedEntity {
  constructor(config) {
    super(config);

    const {
      name = 'Default Level',
      rows = 4,
      columns = 4,
      currentPlayerTurn = 0,
      selectedTile = null,
      currentAction = null,
      tileHelper = new TileHelper(config.GameState),
      attackingPlayer = null,
      defendingPlayer = null,
      hoveredTile = null,
    } = config;

    this.name = name;
    this.rows = rows;
    this.columns = columns;
    this.currentPlayerTurn = currentPlayerTurn;
    this.selectedTile = selectedTile;
    this.currentAction = currentAction;
    this.tileHelper = tileHelper;
    this.attackingPlayer = attackingPlayer;
    this.defendingPlayer = defendingPlayer;
    this.hoveredTile = hoveredTile;
  }

  gameLogic() {
    // Override this function to add level specific game logic
  }

  load() {
    // Override this function to add load logic
  }
}
