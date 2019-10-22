import PriorityQueue from 'classes/PriorityQueue';
import getRandomArrayValue from 'lib/getRandomArrayValue';

export default class {
  constructor(grid) {
    this.grid = grid;

    this.startCell = null;
    this.endCell = null;
    this.frontier = new PriorityQueue();
    this.pathFound = false;
    this.hasSearched = {};

    // Remove cameFrom value from grid tiles to prevent
    // inaccurate paths on build of failed path.
    this.grid.forEach(tile => {
      delete tile.cameFrom;
    });
  }

  findPath(startCell, endCell) {
    this.startCell = startCell;
    this.endCell = endCell;
    this.hasSearched[startCell.id] = true;
    this.frontier.enqueue(startCell, 1);

    let breaker = 0;
    const breakerLimit = 100;
    while(!this.pathFound && this.frontier.items.length > 0) {
      breaker++;
      if (breaker > breakerLimit) break;

      for (let i = 0; i < this.frontier.items.length; i++) {
        this.getFrontier();
      }
    }

    return this.buildPath();
  }

  isPassable(neighbor) {
    return (
      (neighbor.tileType.type !== 'PLAYER_COLUMN' || neighbor.player)
      && neighbor.tileType.type !== 'EMPTY'
    );
  }

  isConnected(cell, neighbor) {
    // vv this one checks if the neighbor has a connection to the cell, it has to be a 2 way connection vv
    return neighbor.neighbors.find(neighborNeighbor => {
      if (!neighborNeighbor) return false;
      return neighborNeighbor.uuid === cell.uuid;
    });
  }

  getFrontier() {
    const cell = this.frontier.dequeue();

    cell.neighbors.forEach(neighbor => {
      if (!neighbor) return;
      if (neighbor.uuid === this.endCell.uuid) this.pathFound = true;

      if (
        !this.hasSearched[neighbor.id]
        && this.isPassable(neighbor)
        && this.isConnected(cell, neighbor)
      ) {
        this.hasSearched[neighbor.id] = true;
        neighbor.cameFrom = cell;
        this.frontier.enqueue(neighbor, 1);
      }
    });
  }

  buildPath() {
    const path = [this.endCell];
    const breakerLimit = 100;
    let breaker = 0;
    let pathBuilt = false;

    while(pathBuilt === false) {
      breaker++;
      if (breaker > breakerLimit) break;

      const newestEntry = path[path.length - 1].cameFrom;
      if (!newestEntry) break;

      if (this.startCell.uuid === newestEntry.uuid) pathBuilt = true;

      path.push(newestEntry);
    }

    return this.pathFound ? path : [];
  }

  buildFailedPath() {
    const path = [this.startCell];
    const breakerLimit = 100;
    const hasSearchedFailedPath = {};
    let breaker = 0;
    let pathBuilt = false;

    while (pathBuilt === false) {
      breaker++;
      if (breaker > breakerLimit) break;

      const cell = path[path.length - 1];

      if (hasSearchedFailedPath[cell.id]) {
        break;
      }
      hasSearchedFailedPath[cell.id] = true

      const connectedNeighbors = cell.neighbors.filter(neighbor => 
        neighbor
        && this.isPassable(neighbor)
        && this.isConnected(cell, neighbor)
        && neighbor.id !== this.startCell.id
      );

      const randomConnectedNeighbor = getRandomArrayValue(connectedNeighbors);
      if (!randomConnectedNeighbor) return;

      path.push(randomConnectedNeighbor);
      cell.cameFrom = randomConnectedNeighbor;
    }

    return path.length > 1 ? path.reverse() : [];
  }
}
