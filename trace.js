// trace.js – Vector tracing logic
LuxLabs.Vectorizer.Trace = {
    run: () => {
        if (!LuxLabs._state.vectorizer.image) return console.warn('[LuxLabs.Vectorizer.Trace] No image.');
        const canvas = document.getElementById('vectorizerCanvas');
        const ctx = canvas.getContext('2d');
        const { data: pixels, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        LuxLabs._state.vectorizer.history.push([...LuxLabs._state.vectorizer.layers]);
        LuxLabs._state.vectorizer.layers = [];
        const edges = LuxLabs.Vectorizer.Trace._detectEdges(pixels, width, height);
        const visited = new Set();

        for (let y = 0; y < height; y += LuxLabs._state.speed === 'fast' ? 2 : 1) {
            for (let x = 0; x < width; x += LuxLabs._state.speed === 'fast' ? 2 : 1) {
                const idx = y * width + x;
                if (edges[idx] && !visited.has(idx)) {
                    const path = LuxLabs.Vectorizer.Trace._followEdge(x, y, edges, width, height, visited);
                    if (path.length > 2) {
                        LuxLabs._state.vectorizer.layers.push({
                            id: `layer-${LuxLabs._state.vectorizer.layers.length}`,
                            path: LuxLabs.Vectorizer.Trace._toSVGPath(path),
                            fill: LuxLabs.Flame.styles.colors[LuxLabs._state.themeIndex].primary,
                            opacity: 1,
                            strokeWidth: 0
                        });
                    }
                }
            }
        }

        LuxLabs.Vectorizer.Visual.renderLayers();
        document.getElementById('vectorizerExportBtn').disabled = false;
        document.getElementById('vectorizerResetView').disabled = false;
        document.getElementById('vectorizerUndoBtn').disabled = LuxLabs._state.vectorizer.history.length === 0;
        console.log(`[LuxLabs.Vectorizer.Trace] Created ${LuxLabs._state.vectorizer.layers.length} layers.`);
    },

    undo: () => {
        if (LuxLabs._state.vectorizer.history.length === 0) {
            return console.warn('[LuxLabs.Vectorizer.Trace] No undo history.');
        }
        LuxLabs._state.vectorizer.layers = LuxLabs._state.vectorizer.history.pop();
        LuxLabs.Vectorizer.Visual.renderLayers();
        document.getElementById('vectorizerUndoBtn').disabled = LuxLabs._state.vectorizer.history.length === 0;
        console.log('[LuxLabs.Vectorizer.Trace] Undo applied.');
    },

    _detectEdges: (pixels, width, height) => {
        const edges = new Uint8Array(width * height);
        const threshold = LuxLabs._state.speed === 'fast' ? 30 : 50;
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const idx = (y * width + x) * 4;
                const gray = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
                const right = ((y * width + x + 1) * 4);
                const down = (((y + 1) * width + x) * 4);
                const contrast = Math.abs(gray - (pixels[right] + pixels[right + 1] + pixels[right + 2]) / 3) +
                                Math.abs(gray - (pixels[down] + pixels[down + 1] + pixels[down + 2]) / 3);
                edges[y * width + x] = contrast > threshold ? 1 : 0;
            }
        }
        return edges;
    },

    _followEdge: (x, y, edges, width, height, visited, path = [], dir = 0) => {
        const idx = y * width + x;
        if (visited.has(idx) || x < 0 || x >= width || y < 0 || y >= height || !edges[idx]) return path;
        visited.add(idx);
        path.push([x, y]);
        const dirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        for (let i = 0; i < 8; i++) {
            const nextDir = (dir + i) % 8;
            const [dx, dy] = dirs[nextDir];
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && edges[ny * width + nx] && !visited.has(ny * width + nx)) {
                return LuxLabs.Vectorizer.Trace._followEdge(nx, ny, edges, width, height, visited, path, nextDir);
            }
        }
        return path;
    },

    _toSVGPath: (points) => {
        if (points.length < 2) return '';
        const deduped = [points[0]];
        for (let i = 1; i < points.length; i++) {
            if (points[i][0] !== deduped[deduped.length - 1][0] || 
                points[i][1] !== deduped[deduped.length - 1][1]) {
                deduped.push(points[i]);
            }
        }
        if (deduped.length < 2) return '';
        return `M${deduped[0][0]},${deduped[0][1]}` + 
               deduped.slice(1).reduce((d, [x, y]) => d + ` L${x},${y}`, '') + ' Z';
    }
};