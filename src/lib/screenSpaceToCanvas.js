import Vector2 from 'classes/Vector2';

export default (canvas, position) => new Vector2(
  position.x + (canvas.width / 2),
  canvas.height - (position.y + (canvas.height / 2)),
);
