import BaseService   from 'services/BaseService';
import Lightning     from 'classes/Lightning';
import Pathfinder    from 'classes/Pathfinder';
import TileService   from 'services/TileService';

export default class extends BaseService {
  constructor(GameState) {
    super(GameState);

    this.lightningDuration = 750;
    this.tileService = new TileService(GameState);
  }

  handleLightningDischarge() {
    const startCell = this.tileService.getTileWithPlayer(this.GameState.currentLevel.attackingPlayer);
    const endCell = this.tileService.getTileWithPlayer(this.GameState.currentLevel.defendingPlayer);

    const pathfinder = new Pathfinder(GameState.currentLevel.grid.tiles);
    const path = pathfinder.findPath(startCell, endCell);

    if (path.length > 0) {
      const damageAmplifier = path.length;

      // Apply Damage
      endCell.player.health -= (startCell.player.damage + damageAmplifier);
      endCell.player.avatar.takeDamageAnimation();
      this.fireLightning(path);

      // Apply damage to tiles
      path.forEach(tile => {
        // For now we will only apply 1 damage per discharge, that may change or be tied to abilities
        tile.takeDamage(1);
      });
    }
  }

  fireLightning(path) {
    const lightning = new Lightning({
      GameState: this.GameState,
      path,
    });

    window.setTimeout(
      () => this.GameState.Scene.remove(lightning.uuid),
      this.lightningDuration,
    );
  }
}
