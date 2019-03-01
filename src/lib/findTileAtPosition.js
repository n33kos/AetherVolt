export default function(pos) {  
  // Search grid
  let clickedTile = this.grid.getTileAtCanvasPosition(pos);

  // Then search hand
  if (!clickedTile) {
    clickedTile = this.attackingPlayer.hand.getTileAtCanvasPosition(pos);
  }

  return clickedTile;
}
