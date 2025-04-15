// /js/core.js – Cindara Homebase Core Module

const CindaraCore = {
  state: {
    mode: 'vector',
    activeTool: null,
    speed: 'normal',
    themeIndex: 0
  },

  init() {
    this.loadFromHash();
    CindaraFlame.apply();
    CindaraUI.bind();
    console.log('[CindaraCore] Initialized.');
  },

  switchMode(mode) {
    if (['vector', 'paint', 'animate'].includes(mode)) {
      this.state.mode = mode;
      CindaraUI.updateToggle();
      this.updateHash();
      console.log(`[CindaraCore] Mode: ${mode}`);
    } else {
      console.warn('[CindaraCore] Invalid mode.');
    }
  },

  launchTool(tool) {
    this.state.activeTool = tool;
    document.getElementById('homebase').style.display = tool ? 'none' : 'flex';
    document.getElementById('toolContainer').style.display = tool ? 'block' : 'none';
    if (tool === 'vectorizer') CindaraVectorizer.init();
    this.updateHash();
    console.log(`[CindaraCore] Launched ${tool || 'homebase'}.`);
  },

  updateHash() {
    const { mode, themeIndex, speed } = this.state;
    window.location.hash = `mode=${mode}&theme=${themeIndex}&speed=${speed}`;
    console.log('[CindaraCore] URL hash updated.');
  },

  loadFromHash() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const { colors } = CindaraFlame.styles;
    this.state.mode = params.get('mode') || 'vector';
    this.state.themeIndex = parseInt(params.get('theme')) || 0;
    this.state.speed = params.get('speed') || 'normal';

    if (!['vector', 'paint', 'animate'].includes(this.state.mode)) this.state.mode = 'vector';
    if (this.state.themeIndex >= colors.length) this.state.themeIndex = 0;
    if (!['fast', 'normal', 'glow'].includes(this.state.speed)) this.state.speed = 'normal';

    console.log('[CindaraCore] Loaded state from hash.');
  }
};
