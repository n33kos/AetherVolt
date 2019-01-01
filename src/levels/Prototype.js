import Action       from 'class/Action';
import ActionType   from 'class/ActionType';
import Avatar       from 'class/Avatar';
import Background   from 'class/Background';
import Deck         from 'class/Deck';
import Grid         from 'class/Grid';
import Hand         from 'class/Hand';
import Level        from 'class/Level';
import Pathfinder   from 'class/Pathfinder';
import Player       from 'class/Player';
import randomRange  from 'lib/randomRange';
import SpriteButton from 'class/SpriteButton';
import Tile         from 'class/Tile';
import TileHelper   from 'class/TileHelper';
import TileType     from 'class/TileType';
import uuidv4       from 'uuid/v4';
import Vector2      from 'class/Vector2';

export default class extends Level {
  constructor(config) {
    super(config);

    const {
      GameState,
    } = config;

    this.name = "Prototype Level";
    this.rows = 6;
    this.columns = 6;
    this.currentPlayerTurn = 0;
    this.selectedTile = null;
    this.currentAction = null;
    this.tileHelper = new TileHelper(GameState);
  }

  load() {
    this.GameState.Scene.clear();

    // Add background
    const bg = new Background({
      GameState: this.GameState,
      dimensions: new Vector2(this.GameState.Canvas.width, this.GameState.Canvas.height),
      offset: new Vector2(0, 0),
      imageUrl: './img/sky.png',
      repeat: 'repeat',
      scale: new Vector2(15, 15),
    });
    bg.canvasPosition = new Vector2(0, 0);
    this.GameState.Scene.add(bg);

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
    this.players.forEach((player, index) => {
      const hand = new Hand({
        GameState : this.GameState,
        position: new Vector2(0, -this.GameState.Canvas.cy),
      });
      // Draw tiles from deck
      for (let i = 0; i < (player.handSize - index); i++) {
        hand.add(this.deck.draw());
      }

      // Set visibility of hand
      hand.setVisibility(false);
      if (index === this.currentPlayerTurn) hand.setVisibility(true);

      player.hand = hand;
      this.GameState.Scene.add(hand);
    });

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
    this.currentAction = new Action({ player : this.players[this.currentPlayerTurn] });

    // Init Controls
    this.addControlsCallback('mouseDown', this.handleMouseDown.bind(this));
    this.addControlsCallback('mouseUp', this.handleMouseUp.bind(this));
    this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this));
  }

  handleMouseDown(e) {
    const clickedTile = this.findTileAtPosition(this.GameState.Controls.position)
    if (!clickedTile) return;

    // Set source tile in current action
    this.currentAction.sourceTile = clickedTile;

    if (clickedTile.isInHand) {
      this.tileHelper.initDrag(clickedTile, this.currentAction, this.cycleActions.bind(this));
    }
  }

  handleMouseMove(e) {
    if (this.tileHelper.isDragging && this.tileHelper.tile) {
      this.tileHelper.tile.canvasPosition = this.GameState.Controls.position;
    }
  }

  handleMouseUp(e) {
    const clickedTile = this.findTileAtPosition(this.GameState.Controls.position);

    // ----EMPTY TILE ACTION----
    if (
      !clickedTile
      || (clickedTile.tileType.type === 'EMPTY' && !this.tileHelper.isDragging)
    ) {
      this.currentAction.sourceTile = null;
      this.currentAction.targetTile = null;
      this.tileHelper.clear();
      return;
    }

    // Set target tile in action
    this.currentAction.targetTile = clickedTile;

    //----PLACE ACTION----
    if (
      clickedTile.tileType.type === 'EMPTY'
      && this.currentAction.sourceTile
      && this.currentAction.sourceTile.isInHand
    ) {
      this.tileHelper.placeDraggedCell();
      this.tileHelper.clear();
    }

    //----MOVE ACTION----
    if (
      clickedTile.tileType.type === 'PLAYER_COLUMN'
      && clickedTile.player
      && clickedTile.player.name === this.players[this.currentPlayerTurn].name
      && this.currentAction.sourceTile
      && this.currentAction.sourceTile.tileType.type === 'PLAYER_COLUMN'
    ) {
      this.tileHelper.initMove(clickedTile, this.currentAction, this.cycleActions.bind(this));
    }

    //----ROTATE ACTION----
    if (
      clickedTile.tileType.type !== 'PLAYER_COLUMN'
      && clickedTile.tileType.type !== 'EMPTY'
      && this.currentAction.sourceTile
      && this.currentAction.sourceTile.uuid === clickedTile.uuid
    ) {
      this.tileHelper.initRotation(clickedTile, this.currentAction, this.cycleActions.bind(this));
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

  cycleActions() {
    this.processConnection();

    // Decrement action
    this.players[this.currentPlayerTurn].actions -= 1;
    if (this.players[this.currentPlayerTurn].actions <= 0) {
      // Reset player actions to max
      this.players[this.currentPlayerTurn].actions = this.players[this.currentPlayerTurn].maxActions;
      // Cycle turns
      this.cyclePlayerTurn();
    }

    // Reset currrent action
    this.currentAction = new Action({ player : this.players[this.currentPlayerTurn] });

    // Update UI
    this.GameState.UI.updatePlayerStats(this.players);
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
    if (this.deck.tiles.length > 0) this.players[this.currentPlayerTurn].hand.add(this.deck.draw());
  }

  processConnection() {
    // vvv There must be a better way to get these cells vvv
    const startCell = this.grid.tiles.find(tile => {
      return tile.player && tile.player.name === this.players[this.currentPlayerTurn].name;
    });
    const endCell = this.grid.tiles.find(tile => {
      return tile.player && tile.player.name !== this.players[this.currentPlayerTurn].name;
    });
    const pathfinder = new Pathfinder(this.grid.tiles);
    const path = pathfinder.findPath(startCell, endCell);

    if (path.length > 0) {
      let damageAmplifier = 0;

      path.forEach(tile => {
        // Animate Tiles in path by resetting frame to 0
        tile.currentFrame = 0

        //Increase Damage by 1 for every cell in path placed by the attacker
        if (tile.placedBy.name === startCell.player.name) damageAmplifier += 1;
      });

      // Apply Damage
      endCell.player.health -= (startCell.player.damage + damageAmplifier);
    }

    this.endGameLogic();
  }

  endGameLogic() {
    let gameOver = false;

    this.players.forEach(player => {
      if (player.health <= 0) {
        gameOver = true;
        player.health = 0;
      }
    });

    if (gameOver) {
      this.winner = this.players.find(player => player.health > 0);
      this.GameState.isPaused = true;
      this.GameState.UI.updateScoreScreen();
      this.GameState.UI.setScreen('score');
    }
  }
}
