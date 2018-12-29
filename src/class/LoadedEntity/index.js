export default class {
  constructor({
    GameState,
  }) {
    this.GameState = GameState;
    this.audioNodes = [];
    this.controlCallbackIds = [];
  }

  load() {
  }

  unload() {
    // Stop audio nodes
    this.audioNodes.forEach(audioNode => {
      audioNode.stop(0);
    });
    this.audioNodes = [];

    // Remove control callbacks
    this.controlCallbackIds.forEach(callbackId => {
      this.GameState.Controls.removeCallback(callbackId)
    });
    this.controlCallbackIds = [];
  }

  addControlsCallback(eventKey, callback) {
    this.controlCallbackIds.push(
      this.GameState.Controls.addCallback(eventKey, callback),
    );
  }

  addAudioNode(audioNode) {
    this.audioNodes.push(audioNode);
    audioNode.load();
  }
}
