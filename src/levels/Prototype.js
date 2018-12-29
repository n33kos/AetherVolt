import Avatar      from 'gameObjects/Avatar';
import Grid        from 'class/Grid';
import Level       from 'class/Level';
import Player      from 'class/Player';
import randomRange from 'lib/randomRange';
import Tile        from 'gameObjects/Tile';
import Vector2     from 'class/Vector2';

export default class extends Level {
  constructor(config) {
    super(config);

    this.name = "Prototype";
  }

  load() {
    this.GameState.Scene.clear();

    // Init players
    this.players = [
      new Player({
        GameState : this.GameState,
        name : 'Player 1',
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

    // Init grid, it automatically adds the cells to the scene
    this.grid = new Grid({
      GameState : this.GameState,
      rows : 6,
      columns : 6,
      minimumPadding : 100,
      players: this.players,
    });
    this.grid.init();
  }
}
