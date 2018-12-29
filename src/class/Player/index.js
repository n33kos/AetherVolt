import HumanController from 'class/HumanController';
import uuidv4          from 'uuid/v4';
import Vector2         from 'class/Vector2';

export default class {
  constructor({
    GameState,
    actions = 2,
    avatar,
    controller = new HumanController(),
    hand = [],
    handSize = 4,
    maxActions = 2,
    name = 'Player 1',
  }) {
    this.GameState = GameState;
    this.name = name;
    this.hand = hand;
    this.controller = controller;
    this.avatar = avatar;
    this.handSize = handSize;
    this.actions = actions;
    this.maxActions = maxActions;
  }
}
