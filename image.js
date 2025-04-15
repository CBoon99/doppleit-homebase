// image.js – Handles image loading and processing for vectorizer
LuxLabs.Vectorizer.Image = {
    load: (file) => {
        if (!file) return console.warn('[LuxLabs.Vectorizer.Image] No image.');
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                LuxLabs._state.vectorizer.image = img;
                const canvas = document.getElementById('vectorizerCanvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                document.getElementById('vectorizerTraceBtn').disabled = false;
                document.getElementById('urlInputs').style.display = 'flex';
                LuxLabs.Vectorizer.Trace.run();
                console.log('[LuxLabs.Vectorizer.Image] Loaded and traced.');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    loadUrl: () => {
        const url = document.getElementById('vectorizerUrlInput').value;
        if (!url) return console.warn('[LuxLabs.Vectorizer.Image] No URL.');
        const loader = document.getElementById('vectorizerUrlLoader');
        loader.style.display = 'inline-block';
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                LuxLabs.Vectorizer.Image.load(blob);
                loader.style.display = 'none';
                console.log('[LuxLabs.Vectorizer.Image] URL loaded.');
            })
            .catch(err => {
                console.warn('[LuxLabs.Vectorizer.Image] URL fetch failed:', err);
                loader.style.display = 'none';
            });
    }
};