import endGame               from './endGame';
import fireLightning         from './fireLightning';
import getTileWithPlayerName from './getTileWithPlayerName';
import Pathfinder            from 'classes/Pathfinder';

export default function() {
  const pathfinder = new Pathfinder(this.grid.tiles);
  const startCell = getTileWithPlayerName.call(this, this.attackingPlayer.name);
  const endCell = getTileWithPlayerName.call(this, this.defendingPlayer.name);
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
