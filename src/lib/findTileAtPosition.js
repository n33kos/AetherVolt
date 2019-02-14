export default function(pos) {  
  // Search grid
  let clickedTile = this.grid.getCellAtCanvasPosition(pos);

  // Then search hand
  if (!clickedTile) {
    clickedTile = this.attackingPlayer.hand.getCellAtCanvasPosition(pos);
  }

  return clickedTile;
}
