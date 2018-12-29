import Avatar      from 'class/Avatar';
import Deck        from 'class/Deck';
import Grid        from 'class/Grid';
import Hand        from 'class/Hand';
import Level       from 'class/Level';
import Player      from 'class/Player';
import randomRange from 'lib/randomRange';
import Tile        from 'class/Tile';
import Vector2     from 'class/Vector2';

export default class extends Level {
  constructor(config) {
    super(config);

    this.name = "Prototype";
    this.rows = 6;
    this.columns = 6;
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
  }
}
