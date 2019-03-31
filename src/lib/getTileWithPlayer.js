export default function(player) {
  return this.grid.tiles.find(tile => {
    return tile.player && tile.player.uuid === player.uuid;
  });
}
