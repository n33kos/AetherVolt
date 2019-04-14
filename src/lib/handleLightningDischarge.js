import endGame           from './endGame';
import fireLightning     from './fireLightning';
import Pathfinder        from 'classes/Pathfinder';
import TileService       from 'services/TileService';

export default function() {
  const tileService = new TileService(this.GameState);
  const pathfinder = new Pathfinder(this.grid.tiles);
  const startCell = tileService.getTileWithPlayer(this.attackingPlayer);
  const endCell = tileService.getTileWithPlayer(this.defendingPlayer);
  const path = pathfinder.findPath(startCell, endCell);

  if (path.length > 0) {
    const damageAmplifier = path.length;

    // Apply Damage
    endCell.player.health -= (startCell.player.damage + damageAmplifier);
    endCell.player.avatar.takeDamageAnimation();
    fireLightning.call(this, path);

    // Apply damage to tiles
    path.forEach(tile => {
      // For now we will only apply 1 damage per discharge, that may change or be tied to abilities
      tile.takeDamage(1);
    });
  }

  endGame.call(this);
}
