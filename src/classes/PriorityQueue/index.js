export default class {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    var contain = false;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > element.priority) {
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }

    if (!contain) this.items.push(element);
  }

  dequeue() {
    if (this.items.length == 0) return;
    return this.items.shift();
  }
}
