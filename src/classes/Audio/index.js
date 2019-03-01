export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.audioContext = null;
    this.masterAudioNode = null;
    this.isInitialized = false;
  }

  init() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioContext = audioContext;

    const master = audioContext.createGain();
    master.gain.value = 0.75;
    master.connect(audioContext.destination);
    this.masterAudioNode = master;

    this.isInitialized = true;
  }

  toggleMute() {
    if(this.audioContext.state === 'running') {
      this.audioContext.suspend();
    } else if(this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
