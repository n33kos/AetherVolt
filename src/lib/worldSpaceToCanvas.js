import Vector2 from 'class/Vector2';

export default (GameState, position) => new Vector2(
  position.x + (GameState.Canvas.width / 2),
  GameState.Canvas.height - (position.y + (GameState.Canvas.height / 2)),
);
