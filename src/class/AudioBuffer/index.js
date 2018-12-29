export default class {
  constructor({
    audioFileUrl,
    autoPlay,
    GameState,
    shouldLoop,
  }) {
    this.audioFileUrl = audioFileUrl;
    this.autoPlay = autoPlay;
    this.GameState = GameState;
    this.shouldLoop = shouldLoop;

    this.audioNode = null;
    this.buffer = null;
  }

  load(callback = null) {
    const req = new XMLHttpRequest();
    req.responseType = "arraybuffer";
    req.onload = () => {
      this.createBufferFromData(req.response, callback);
    }
    req.open('GET', this.audioFileUrl, true);
    req.send();
  }

  createBufferFromData(data, callback) {
    this.GameState.Audio.audioContext.decodeAudioData(data, (buffer) => {
      this.buffer = buffer;
      if (this.autoPlay) this.play();
      if (callback) callback();
    });
  }

  play() {
    this.audioNode = this.GameState.Audio.audioContext.createBufferSource();
    this.audioNode.buffer = this.buffer;
    this.audioNode.connect(this.GameState.Audio.masterAudioNode);
    this.audioNode.loop = this.shouldLoop;
    this.audioNode.start();
  }

  stop() {
    this.audioNode.stop(0);
  }
}
