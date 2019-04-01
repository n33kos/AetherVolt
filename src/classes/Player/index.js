import CreateAvatarService from 'services/CreateAvatarService';
import uuidv4              from 'uuid/v4';

export default class {
  constructor({
    GameState,
    actions = 2,
    avatar,
    color = 'blue',
    controller = 'AI',
    damage = 2,
    hand = [],
    handSize = 4,
    health = 50,
    maxActions = 2,
    maxHealth = 50,
    maxMoves = 1,
    moves = 1,
    name = 'Player 1',
    tiles = {},
    spritePath = '',
  }) {
    this.GameState = GameState;
    this.actions = actions;
    this.color = color;
    this.controller = controller;
    this.damage = damage;
    this.hand = hand;
    this.handSize = handSize;
    this.health = health;
    this.maxActions = maxActions;
    this.maxHealth = maxHealth;
    this.maxMoves = maxMoves;
    this.moves = moves;
    this.name = name;
    this.spritePath = spritePath;
    this.createAvatarService = new CreateAvatarService(this.GameState);
    this.uuid = uuidv4();

    this.avatar = null;
    this.tiles = {
      // These IDs MUST match up with tileType IDs
      1 : `${this.spritePath}/Propeller_Conductor_Empty.png`,
      2 : `${this.spritePath}/Propeller_Conductor_Empty.png`,
      3 : `${this.spritePath}/Propeller_Conductor_Straight.png`,
      4 : `${this.spritePath}/Propeller_Conductor_Bend.png`,
      5 : `${this.spritePath}/Propeller_Conductor_Triple.png`,
      6 : `${this.spritePath}/Propeller_Conductor_Quad.png`,
    };
  }

  setAvatarPosition(tile) {
    this.avatar.targetPosition = tile.canvasPosition;
  }

  load() {
    this.avatar = this.createAvatarService.createAvatar({
      player : this,
    });
  }
}
