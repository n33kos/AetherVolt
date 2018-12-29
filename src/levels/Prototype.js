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
      const hand = new Hand();
      for (let i = 0; i < player.handSize; i++) {
        hand.add(this.deck.draw());
      }
      player.hand = hand;
    });

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

  cyclePlayerTurn() {
    this.currentPlayerTurn++;
    if (this.currentPlayerTurn >= this.players.length) this.currentPlayerTurn = 0;
  }

  handleClick(e) {
    const clickedCell = this.grid.getCellAtCanvasPosition(this.GameState.Controls.lastPosition);
    if (clickedCell) {
      clickedCell.setType(new TileType('BEND'));
      clickedCell.rotateCell(1);
      this.cyclePlayerTurn();
    }
  }

  handleMouseMove(e) {
    this.hoveredCell = this.grid.getCellAtCanvasPosition(this.GameState.Controls.position);
    if (!this.hoveredCell) return;

    this.grid.tiles.forEach(cell => {
      cell.isHovered = false;
      if (this.hoveredCell.id === cell.id) cell.isHovered = true;
    })
  }
}
