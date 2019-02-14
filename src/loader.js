import Audio     from 'class/Audio';
import Canvas    from 'class/Canvas';
import Controls  from 'class/Controls';
import GameState from 'class/GameState';
import Render    from 'class/Render';
import Scene     from 'class/Scene';
import UI        from 'class/UI';
import Update    from 'class/Update';

const AetherVolt = {
  Audio,
  Canvas,
  Controls,
  GameState,
  Render,
  Scene,
  UI,
  Update,
}

document.addEventListener("DOMContentLoaded", (e) => {
  const GameState = new AetherVolt.GameState();
  GameState.init();

  // Add gamestate to window so we can inspect it if we like
  window.GameState = GameState;

  GameState.Audio = new AetherVolt.Audio(GameState);
  // Audio must be initialized after a user interacts somehow, this is a standard.
  // As such, the Audio class is initialized from the UI class when a button is clicked instead of here.

  GameState.Canvas = new AetherVolt.Canvas(GameState);
  GameState.Canvas.init();

  GameState.Controls = new AetherVolt.Controls(GameState);
  GameState.Controls.init();

  GameState.Scene = new AetherVolt.Scene(GameState);
  GameState.Scene.init();

  GameState.Render = new AetherVolt.Render(GameState);
  GameState.Render.init();

  GameState.Update = new AetherVolt.Update(GameState);
  GameState.Update.init();

  GameState.UI = new AetherVolt.UI(GameState);
  GameState.UI.init();
});
