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

  setMute(mute) {
    if (mute) {
      this.audioContext.suspend();
    } else {
      this.audioContext.resume();
    }

    this.GameState.isMuted = mute;
  }

  toggleMute() {
    if (!this.GameState.isMuted) {
      this.audioContext.suspend();
      this.GameState.isMuted = true;
    } else {
      this.audioContext.resume();
      this.GameState.isMuted = false;
    }
  }
}
