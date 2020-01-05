import BaseService from 'services/BaseService';
import Lightning   from 'classes/Lightning';
import Pathfinder  from 'classes/Pathfinder';
import TileService from 'services/TileService';
import Vector3     from 'classes/Vector3';

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
    
    // Get dat path
    let path = pathfinder.findPath(startCell, endCell);
    const doesPathConnect = path.length > 0;

    // If it doesn't connect lets make a random path to fire off on
    if (!doesPathConnect) {
      path = pathfinder.buildFailedPath();
    }
    
    // If we have a path lets discharge some lightning bb
    if (path && path.length > 0) {
      this.fireLightning(path, doesPathConnect);
      
      // But like... only do damage if it actually connects.
      if (doesPathConnect) {
        const damageAmplifier = path.length;

        // Apply Damage
        endCell.player.health -= (startCell.player.damage + damageAmplifier);
        endCell.player.avatar.takeDamageAnimation();
  
        // Apply damage to tiles
        path.forEach(tile => {
          // For now we will only apply 1 damage per discharge, that may change or be tied to abilities
          tile.takeDamage(1);
        });
      }
    }
  }

  fireLightning(path, doesPathConnect) {
    const attacker = this.GameState.currentLevel.attackingPlayer;
    const defender = this.GameState.currentLevel.defendingPlayer;

    const lightning = new Lightning({
      color: attacker.color,
      GameState: this.GameState,
      path,
    });

    // Only apply colorization if it connected
    if (doesPathConnect) {
      defender.avatar.colorize(
        new Vector3(
          ...attacker.color.split(',')
        ),
      );
    }
    
    // set the removal timeout
    window.setTimeout(
      () => {
        this.GameState.Scene.remove(lightning.uuid);

        // Make sure not to decolorize unless we colorized first. It causes a visible flash otherwise
        if (doesPathConnect) defender.avatar.decolorize();
      },
      this.lightningDuration,
    );
  }
}
