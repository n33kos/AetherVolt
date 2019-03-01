import Vector2 from 'classes/Vector2';

export default class {
  constructor({
    GameState,
    actions = 2,
    avatar,
    color = 'blue',
    controller = 'human',
    damage = 2,
    hand = [],
    handSize = 4,
    health = 50,
    maxActions = 2,
    maxHealth = 50,
    maxMoves = 1,
    moves = 1,
    name = 'Player 1',
  }) {
    this.GameState = GameState;
    this.actions = actions;
    this.avatar = avatar;
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
  }

  setAvatarPosition(tile) {
    const playerSide = (this.name === 'Player 1' ? -1 : 1);
    this.avatar.targetPosition = tile.canvasPosition;
  }
}
