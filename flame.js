
// flame.js – Theme engine for Cindara Homebase

const CindaraFlame = {
    styles: {
        colors: [
            { primary: '#ff8000', secondary: '#ff9500', name: 'Primary' },
            { primary: '#00ccff', secondary: '#00aaff', name: 'Aqua' },
            { primary: '#ff00cc', secondary: '#cc00ff', name: 'Neon' }
        ],
        gradients: [
            'linear-gradient(45deg, #ff8000, #ff9500)',
            'linear-gradient(45deg, #00ccff, #00aaff)',
            'linear-gradient(45deg, #ff00cc, #cc00ff)'
        ],
        fonts: { primary: 'Arial, sans-serif' },
        states: {
            hover: { transform: 'translateY(-2px)', transition: 'transform 0.2s' },
            active: { transform: 'scale(1.05)', transition: 'transform 0.1s' },
            disabled: { opacity: 0.5, cursor: 'not-allowed' }
        }
    },

    apply: () => {
        const theme = CindaraFlame.styles.colors[CindaraState.themeIndex];
        document.querySelectorAll('.toggle-btn, .tool-btn, .export-btn, .flame-btn, #vectorizerUndoBtn').forEach(el => {
            el.style.fontFamily = CindaraFlame.styles.fonts.primary;
            if (el.classList.contains('toggle-btn') || el.classList.contains('flame-btn')) {
                el.style.background = el.classList.contains('active') ? theme.primary : '#ccc';
            } else if (el.classList.contains('tool-btn') && !el.disabled) {
                el.style.background = CindaraFlame.styles.gradients[CindaraState.themeIndex];
            } else if (el.classList.contains('export-btn') || el.id === 'vectorizerUndoBtn') {
                el.style.background = el.disabled ? '#ccc' : theme.primary;
            }
        });
        document.querySelectorAll('h1, h2, #logoDropZone, #vectorizerDropZone').forEach(el => {
            el.style.color = theme.primary;
        });
        document.querySelectorAll('#logoDropZone, #vectorizerDropZone').forEach(el => {
            el.style.borderColor = theme.primary;
        });
        document.querySelector('.flame-btn[onclick*="toggleSpeed"]').textContent =
            `Speed: ${CindaraState.speed.charAt(0).toUpperCase() + CindaraState.speed.slice(1)}`;
        document.querySelector('.flame-btn[onclick*="cycleTheme"]').textContent =
            `Theme: ${theme.name}`;
        console.log(`[CindaraFlame] Applied theme: ${theme.name}`);
    },

    toggleSpeed: () => {
        const modes = ['normal', 'fast', 'glow'];
        const current = modes.indexOf(CindaraState.speed);
        CindaraState.speed = modes[(current + 1) % modes.length];
        CindaraFlame.apply();
        CindaraCore.updateHash();
        console.log(`[CindaraFlame] Speed mode: ${CindaraState.speed}`);
    },

    cycleTheme: () => {
        CindaraState.themeIndex = (CindaraState.themeIndex + 1) % CindaraFlame.styles.colors.length;
        CindaraFlame.apply();
        CindaraCore.updateHash();
        console.log(`[CindaraFlame] Theme cycled to index ${CindaraState.themeIndex}`);
    },

    cycleColors: (index = 0, colors = CindaraFlame.styles.colors.map(c => c.primary)) => {
        return index < colors.length ? colors[index] : CindaraFlame.cycleColors(index + 1, colors);
    }
};
