import Audio     from 'class/Audio';
import Canvas    from 'class/Canvas';
import Controls  from 'class/Controls';
import GameState from 'class/GameState';
import Render    from 'class/Render';
import Scene     from 'class/Scene';
import UI        from 'class/UI';
import Update    from 'class/Update';

const PipeDream = {
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
  const GameState = new PipeDream.GameState();
  GameState.init();

  // Add gamestate to window so we can inspect it if we like
  window.GameState = GameState;

  // Audio needs to be initialized after user input, refer to UI class for init() call
  GameState.Audio = new PipeDream.Audio(GameState);

  GameState.Canvas = new PipeDream.Canvas(GameState);
  GameState.Canvas.init();

  GameState.Controls = new PipeDream.Controls(GameState);
  GameState.Controls.init();

  GameState.Scene = new PipeDream.Scene(GameState);
  GameState.Scene.init();

  GameState.Render = new PipeDream.Render(GameState);
  GameState.Render.init();

  GameState.Update = new PipeDream.Update(GameState);
  GameState.Update.init();

  GameState.UI = new PipeDream.UI(GameState);
  GameState.UI.init();
});
