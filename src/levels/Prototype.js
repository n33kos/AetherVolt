import Action      from 'class/Action';
import ActionType  from 'class/ActionType';
import Avatar      from 'class/Avatar';
import Deck        from 'class/Deck';
import Grid        from 'class/Grid';
import Hand        from 'class/Hand';
import Level       from 'class/Level';
import Player      from 'class/Player';
import randomRange from 'lib/randomRange';
import Tile        from 'class/Tile';
import TileType    from 'class/TileType';
import uuidv4      from 'uuid/v4';
import Vector2     from 'class/Vector2';

export default class extends Level {
  constructor(config) {
    super(config);

    this.name = "Prototype Level";
    this.rows = 6;
    this.columns = 6;
    this.currentPlayerTurn = 0;
    this.selectedTile = null;
    this.lastSelectedTile = null;
    this.currentAction = null;
  }

  load() {
    this.GameState.Scene.clear();

    // Init deck
    this.deck = new Deck({
      deckSize : this.rows * this.columns,
    });

    // Init players
    this.players = [
      new Player({
        GameState : this.GameState,
        name : 'Player 1',
        uuid : uuidv4(),
        color: 'blue',
        avatar: new Avatar({
          GameState : this.GameState,
          dimensions: new Vector2(64, 64),
          scale: new Vector2(2, 2),
          offset: new Vector2(0.5, 0.5),
          sprite: './img/Avatar_Test.png',
        })
      }),
      new Player({
        GameState : this.GameState,
        name : 'Player 2',
        uuid : uuidv4(),
        color: 'red',
        avatar: new Avatar({
          GameState : this.GameState,
          dimensions: new Vector2(64, 64),
          scale: new Vector2(2, 2),
          offset: new Vector2(0.5, 0.5),
          sprite: './img/Avatar_Test_2.png',
        })
      }),
    ];

    // Init hands
    this.players.forEach(player => {
      const hand = new Hand({
        GameState : this.GameState,
        position: new Vector2(0, -this.GameState.Canvas.cy),
      });
      for (let i = 0; i < player.handSize; i++) {
        hand.add(this.deck.draw());
      }
      player.hand = hand;
      this.GameState.Scene.add(hand);
    });
    this.players[0].hand.setVisibility(true);
    this.players[1].hand.setVisibility(false);

    // Init grid, it automatically adds the tiles to the scene
    this.grid = new Grid({
      GameState : this.GameState,
      rows : this.rows,
      columns : this.columns,
      minimumPadding : 100,
      players: this.players,
    });
    this.grid.init();

    // Init current action
    this.currentAction = new Action({
      callback : this.cycleActions.bind(this),
      player   : this.players[this.currentPlayerTurn],
    });

    // Init Controls
    this.addControlsCallback('mouseUp', this.handleClick.bind(this));
    this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this));
  }

  handleMouseMove(e) {
    // Bail out if we didnt click a tile
    this.hoveredTile = this.findTileAtPosition(this.GameState.Controls.position);
    if (!this.hoveredTile) return;

    // Set tile to hovered
    this.grid.tiles.forEach(tile => {
      tile.isHovered = false;
      if (this.hoveredTile.id === tile.id) tile.isHovered = true;
    })
  }

  handleClick(e) {
    //TODO: this function feels messy, figure out a better way to handle this logic
    const clickedTile = this.findTileAtPosition(this.GameState.Controls.lastPosition)
    if (!clickedTile) return;

    this.selectTile(clickedTile);
    this.currentAction.sourceTile = this.lastSelectedTile;
    this.currentAction.targetTile = this.selectedTile;

    if (clickedTile.tileType.type === 'EMPTY' && this.lastSelectedTile.isInHand) {
      this.currentAction.actionType = new ActionType('PLACE');
    }

    if (clickedTile.tileType.type !== 'EMPTY' && clickedTile.tileType.type !== 'PLAYER_COLUMN') {
      this.currentAction.actionType = new ActionType('ROTATE');
    }

    if (clickedTile.tileType.type === 'PLAYER_COLUMN') {
      this.currentAction.actionType = new ActionType('MOVE');
    }
  }

  findTileAtPosition(pos) {
    // Search grid
    let clickedTile = this.grid.getCellAtCanvasPosition(pos);

    // Then search hand
    if (!clickedTile) {
      clickedTile = this.players[this.currentPlayerTurn].hand.getCellAtCanvasPosition(pos);
    }

    return clickedTile;
  }

  selectTile(tileToSelect) {
    // Remember last tile selected
    this.lastSelectedTile = this.selectedTile;

    // Deselect all tiles in hand or on grid
    this.grid.tiles.forEach(tile => tile.isSelected = false);
    this.players.forEach(player => {
      player.hand.tiles.forEach(tile => tile.isSelected = false);
    });

    //Select New tile
    tileToSelect.isSelected = true;
    this.selectedTile = tileToSelect;
  }

  cycleActions() {
    // Decrement action
    this.players[this.currentPlayerTurn].actions -= 1;
    if (this.players[this.currentPlayerTurn].actions <= 0) {
      // Reset player actions to max
      this.players[this.currentPlayerTurn].actions = this.players[this.currentPlayerTurn].maxActions;
      // Cycle turns
      this.cyclePlayerTurn();
    }

    // Reset currrent action
    this.currentAction = new Action({
      callback : this.cycleActions.bind(this),
      player   : this.players[this.currentPlayerTurn],
    });
  }

  cyclePlayerTurn() {
    // Hide old hand
    this.players[this.currentPlayerTurn].hand.setVisibility(false);

    // Increment turn
    this.currentPlayerTurn++;
    if (this.currentPlayerTurn >= this.players.length) this.currentPlayerTurn = 0;

    //Show new hand
    this.players[this.currentPlayerTurn].hand.setVisibility(true);
    // Draw new tile
    this.players[this.currentPlayerTurn].hand.add(this.deck.draw());
  }
}
