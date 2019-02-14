export default function() {
  this.grid.tiles.forEach(tile => tile.isHovered = false);
  this.hoveredTile = null;
}
