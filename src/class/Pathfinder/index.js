import PriorityQueue from 'class/PriorityQueue';

export default class {
  constructor(grid) {
    this.grid = grid;

    this.startCell = null;
    this.endCell = null;
    this.frontier = new PriorityQueue();
    this.pathFound = false;
    this.hasSearched = {};

    this.grid.forEach(tile => {
      delete tile.cameFrom;
    });
  }

  findPath(startCell, endCell) {
    console.log('Finding path...'+startCell.id);

    this.startCell = startCell;
    this.endCell = endCell;
    this.hasSearched[startCell.id] = true;
    this.frontier.enqueue(startCell, 1);

    let breaker = 0;
    const breakerLimit = 100;
    while(!this.pathFound) {
      breaker++;
      if (breaker > breakerLimit) break;

      if (this.frontier.items.length === 0) this.pathFound = true;

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
    console.log('Getting Frontier...');
    console.log('Frontier Size:' + this.frontier.items.length);
    const cell = this.frontier.dequeue();

    cell.neighbors.forEach(neighbor => {
      if (!neighbor) return;
      if (neighbor.uuid === this.endCell.uuid) {
        this.pathFound = true;
        console.log('Found Path!');
      }

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
    console.log('Building Path...');
    const path = [this.endCell];
    const isComplete = false;

    let breaker = 0;
    const breakerLimit = 100;
    let pathBuilt = false;
    while(pathBuilt === false) {
      breaker++;
      if (breaker > breakerLimit) break;

      const newestEntry = path[path.length - 1].cameFrom;
      if (!newestEntry) break;

      if (newestEntry.uuid === this.endCell) isComplete = false;
      path.push(newestEntry);
    }

    return isComplete ? path : null;
  }
}
