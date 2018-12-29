import HumanController from 'class/HumanController';
import uuidv4          from 'uuid/v4';
import Vector2         from 'class/Vector2';

export default class {
  constructor({
    GameState,
    name = 'Player 1',
    hand = [],
    controller = new HumanController(),
    avatar,
  }) {
    this.GameState = GameState;
    this.name = name;
    this.hand = hand;
    this.controller = controller;
    this.avatar = avatar;

    this.actions = 2;
    this.maxActions = 2;
  }
}
