export default class {
  constructor({
    GameState,
    actions = 2,
    avatar,
    controller = 'human',
    hand = [],
    handSize = 4,
    maxActions = 2,
    name = 'Player 1',
    color = 'blue',
    health = 20,
    damage = 4,
  }) {
    this.GameState = GameState;
    this.name = name;
    this.hand = hand;
    this.controller = controller;
    this.avatar = avatar;
    this.handSize = handSize;
    this.actions = actions;
    this.maxActions = maxActions;
    this.color = color;
    this.health = health;
    this.damage = damage;
  }
}
