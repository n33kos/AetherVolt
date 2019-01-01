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
    this.columns = 8;
    this.currentPlayerTurn = 0;
    this.selectedTile = null;
    this.currentAction = null;
    this.tileHelper = new TileHelper(GameState);
    this.attackingPlayer = null;
    this.defendingPlayer = null;
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
      scale: new Vector2(1, 40),
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
        color: '0,0,255',
        avatar: new Avatar({
          GameState : this.GameState,
          dimensions: new Vector2(64, 128),
          scale: new Vector2(4, 4),
          offset: new Vector2(0.5, 0.5),
          callback: this.clickAvatar.bind(this, 'Player 1'),
          mouseDownSprite : './img/Ship.png',
          mouseUpSprite : './img/Ship.png',
          targetPosition : new Vector2(
            -256,
            this.GameState.Canvas.cy,
          ),
        })
      }),
      new Player({
        GameState : this.GameState,
        name : 'Player 2',
        uuid : uuidv4(),
        color: '255,0,0',
        avatar: new Avatar({
          GameState : this.GameState,
          dimensions: new Vector2(64, 128),
          scale: new Vector2(4, 4),
          offset: new Vector2(0.5, 0.5),
          callback: this.clickAvatar.bind(this, 'Player 2'),
          mouseDownSprite : './img/Ship.png',
          mouseUpSprite : './img/Ship.png',
          targetPosition : new Vector2(
            this.GameState.Canvas.width + 256,
            this.GameState.Canvas.cy,
          ),
          mirrorX: true,
        })
      }),
    ];
    this.attackingPlayer = this.players[0];
    this.defendingPlayer = this.players[1];

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
    this.currentAction = new Action({ player : this.attackingPlayer });

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

  clickAvatar(playerName) {
    // Cant move if it isnt your turn
    if (!this.attackingPlayer.name === playerName) return;

    const playerTile = this.getTileWithPlayerName(playerName);
    this.currentAction.sourceTile = playerTile;
    this.tileHelper.initMove(
      playerTile,
      this.currentAction,
      this.cycleActions.bind(this),
    );
  }

  findTileAtPosition(pos) {
    // Search grid
    let clickedTile = this.grid.getCellAtCanvasPosition(pos);

    // Then search hand
    if (!clickedTile) {
      clickedTile = this.attackingPlayer.hand.getCellAtCanvasPosition(pos);
    }

    return clickedTile;
  }

  cycleActions() {
    this.processConnection();

    // Decrement action
    this.attackingPlayer.actions -= 1;
    if (this.attackingPlayer.actions <= 0) {
      // Reset player actions to max
      this.attackingPlayer.actions = this.attackingPlayer.maxActions;
      // Cycle turns
      this.cyclePlayerTurn();
    }

    // Reset currrent action
    this.currentAction = new Action({ player : this.attackingPlayer });

    // Update UI
    this.GameState.UI.updatePlayerStats(this.players);
  }

  cyclePlayerTurn() {
    // Set defending player
    this.defendingPlayer = this.players[this.currentPlayerTurn];

    // Hide old hand
    this.defendingPlayer.hand.setVisibility(false);

    // Increment turn
    this.currentPlayerTurn++;
    if (this.currentPlayerTurn >= this.players.length) this.currentPlayerTurn = 0;

    // set attacking player
    this.attackingPlayer = this.players[this.currentPlayerTurn];

    //Show new hand
    this.attackingPlayer.hand.setVisibility(true);

    // Draw new tile
    if (this.deck.tiles.length > 0) this.attackingPlayer.hand.add(this.deck.draw());
  }

  getTileWithPlayerName(name) {
    return this.grid.tiles.find(tile => {
      return tile.player && tile.player.name === name;
    });
  }

  processConnection() {
    const pathfinder = new Pathfinder(this.grid.tiles);
    const startCell = this.getTileWithPlayerName(this.attackingPlayer.name);
    const endCell = this.getTileWithPlayerName(this.defendingPlayer.name);
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
