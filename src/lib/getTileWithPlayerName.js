export default function(name) {
  return this.grid.tiles.find(tile => {
    return tile.player && tile.player.name === name;
  });
}
