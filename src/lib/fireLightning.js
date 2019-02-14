import Lightning from 'class/Lightning';

export default function(path) {
  const lightning = new Lightning({
    GameState: this.GameState,
    path,
  });
  window.setTimeout(
    () => this.GameState.Scene.remove(lightning.uuid),
    750,
  );
}
