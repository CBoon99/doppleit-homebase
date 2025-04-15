// /js/main.js
// Entry point – loads core and boots Cindara Homebase

window.Cindara = {
    Core: {},
    Flame: {},
    UI: {},
    LogoBurner: {},
    Vectorizer: {},
    Paint: {},
    Animate: {},
    _state: {},
    _utils: {}
};

// Load Core
// Assume you're using <script> includes for now
window.addEventListener('DOMContentLoaded', () => {
    Cindara.Core.init();
});
