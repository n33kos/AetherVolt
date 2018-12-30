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

    this.name = "Prototype";
    this.rows = 6;
    this.columns = 6;
    this.currentPlayerTurn = 0;
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
          x: 0,
          y: 4,
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
          x: 7,
          y: 3,
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

    // Init grid, it automatically adds the cells to the scene
    this.grid = new Grid({
      GameState : this.GameState,
      rows : this.rows,
      columns : this.columns,
      minimumPadding : 100,
      players: this.players,
    });
    this.grid.init();

    // Init Controls
    this.addControlsCallback('mouseUp', this.handleClick.bind(this));
    this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this));
  }

  findTileAtPosition(pos) {
    // Search grid
    let clickedCell = this.grid.getCellAtCanvasPosition(pos);

    // Then search hand
    if (!clickedCell) {
      clickedCell = this.players[this.currentPlayerTurn].hand.getCellAtCanvasPosition(pos);
    }

    return clickedCell;
  }

  handleClick(e) {
    const clickedCell = this.findTileAtPosition(this.GameState.Controls.lastPosition)
    if (!clickedCell) return;

    if (clickedCell.tileType.type === 'EMPTY') {
      this.commitAction('place', clickedCell);
      if (!clickedCell.isInHand) this.cycleActions();
      return;
    }

    if (clickedCell.tileType.type !== 'EMPTY' && clickedCell.tileType.type !== 'PLAYER_COLUMN') {
      this.commitAction('rotate', clickedCell);
      if (!clickedCell.isInHand) this.cycleActions();
      return;
    }

    if (clickedCell.tileType.type === 'PLAYER_COLUMN') {
      this.commitAction('move', clickedCell);
      if (!clickedCell.isInHand) this.cycleActions();
      return;
    }
  }

  handleMouseMove(e) {
    // Bail out if we didnt click a cell
    this.hoveredCell = this.grid.getCellAtCanvasPosition(this.GameState.Controls.position);
    if (!this.hoveredCell) return;

    this.grid.tiles.forEach(cell => {
      cell.isHovered = false;
      if (this.hoveredCell.id === cell.id) cell.isHovered = true;
    })
  }

  // TODO: create an action type class and pass it instead maybe?
  commitAction(actionType, cell) {
    switch (actionType) {
      case 'rotate':
        cell.rotateCell(1);
        break;
      case 'place':
        cell.setType(new TileType('BEND'));
        break;
      case 'move':
        cell.setExclusivePlayer(this.players[this.currentPlayerTurn]);
        this.grid.setAvatarPosition(
          this.players[this.currentPlayerTurn].avatar,
          cell.x,
          cell.y,
        );
        break;
    }

    this.GameState.UI.updatePlayerStats(this.players);
  }

  cycleActions() {
    this.players[this.currentPlayerTurn].actions -= 1;
    if (this.players[this.currentPlayerTurn].actions <= 0) {
      // Reset player actions to max
      this.players[this.currentPlayerTurn].actions = this.players[this.currentPlayerTurn].maxActions;
      // Cycle turns
      this.cyclePlayerTurn();
    }
  }

  cyclePlayerTurn() {
    // Hide old hand
    this.players[this.currentPlayerTurn].hand.setVisibility(false);

    this.currentPlayerTurn++;
    if (this.currentPlayerTurn >= this.players.length) this.currentPlayerTurn = 0;

    //Show new hand
    this.players[this.currentPlayerTurn].hand.setVisibility(true);
  }
}
