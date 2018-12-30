export default class {
  constructor({
    GameState,
    actions = 2,
    avatar,
    color = 'blue',
    controller = 'human',
    damage = 4,
    hand = [],
    handSize = 4,
    health = 20,
    maxActions = 2,
    maxHealth = 20,
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
    this.name = name;
  }
}
