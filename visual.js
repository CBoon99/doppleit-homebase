
// Cindara Visual Module – Layer Rendering & Interaction

Cindara.Visual = {
    renderLayers: () => {
        const container = document.getElementById('vectorizerLayerList');
        container.innerHTML = '';
        Cindara._state.vectorizer.layers.forEach((layer, i) => {
            const div = document.createElement('div');
            div.className = 'layer-item';
            div.draggable = true;
            div.dataset.index = i;

            div.innerHTML = \`
                <strong>Layer \${i + 1}</strong><br>
                <input type="color" value="\${layer.fill}" onchange="Cindara.Visual.setColor(\${i}, this.value)">
                <input type="range" min="0" max="1" step="0.1" value="\${layer.opacity}" onchange="Cindara.Visual.setOpacity(\${i}, this.value)">
                <input type="range" min="0" max="10" step="1" value="\${layer.strokeWidth}" onchange="Cindara.Visual.setStrokeWidth(\${i}, this.value)">
            \`;

            container.appendChild(div);
        });

        Cindara.Visual.draw();
        console.log('[Cindara.Visual] Layers rendered.');
    },

    draw: () => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', 500);
        svg.setAttribute('height', 500);

        Cindara._state.vectorizer.layers.forEach((layer, i) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', layer.path);
            path.setAttribute('fill', layer.fill);
            path.setAttribute('fill-opacity', layer.opacity);
            if (layer.strokeWidth > 0) {
                path.setAttribute('stroke', layer.fill);
                path.setAttribute('stroke-width', layer.strokeWidth);
            }
            path.classList.add('layer-path');
            path.style.animationDelay = \`\${i * 0.1}s\`;
            svg.appendChild(path);
        });

        const output = document.getElementById('vectorizerSvgOutput');
        output.innerHTML = '';
        output.appendChild(svg);
    },

    setColor: (index, color) => {
        if (Cindara._state.vectorizer.layers[index]) {
            Cindara._state.vectorizer.layers[index].fill = color;
            Cindara.Visual.draw();
        }
    },

    setOpacity: (index, value) => {
        if (Cindara._state.vectorizer.layers[index]) {
            Cindara._state.vectorizer.layers[index].opacity = parseFloat(value);
            Cindara.Visual.draw();
        }
    },

    setStrokeWidth: (index, value) => {
        if (Cindara._state.vectorizer.layers[index]) {
            Cindara._state.vectorizer.layers[index].strokeWidth = parseFloat(value);
            Cindara.Visual.draw();
        }
    }
};
