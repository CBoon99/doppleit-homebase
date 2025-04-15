CINDARA HOMEBASE – README (TXT VERSION)

Overview: Cindara Homebase is a unified creative interface designed to empower independent makers with powerful browser-based tools for image processing, vectorization, logo styling, and eventual animation—without relying on big tech or bloated software. It’s ultra-light, modular, and built entirely in native HTML, CSS, and JavaScript.

Features:

Instant Preview on File Drop

Vectorizer auto-traces immediately after image upload or drop.

Logo Burner shows stylized preview on load.

No clicks needed to preview—just drop and go.

Return to Homebase Button

Top of tool panel has a dark button with left arrow.

Returns you to the main menu instantly.

Fits the Flame aesthetic with smooth hover animation.

Flame Speed Modes

Modes: Normal, Fast, Glow.

Fast: Skips pixels and lowers edge threshold for speed.

Glow: Adds a shadow effect to vector and logo output.

Toggle via the “Speed” button.

Live Flame Theme Picker

Themes: Primary (orange), Aqua (blue), Neon (magenta).

Changes buttons, drop zones, headers, and more.

Toggle via the “Theme” button.

Tiny File Size Optimizer

Removes empty paths.

Deduplicates SVG points.

Keeps file lean and optimized.

URL Upload Support

Paste image URLs into input fields in both tools.

Load button fetches and previews the image.

Built-in loading spinner (theme colored).

How to Use:

Open index.html in your browser.

On the Homebase screen:

Choose "Vectorizer" or use "Logo Burner".

Paint and Animate are disabled (coming soon).

Use Flame Controls to switch speed or theme.

In tools:

Drop images or paste URLs.

See previews and start editing.

Adjust layer styles, reorder, export.

Return to Homebase any time with the back arrow.

Testing Tips:

Use small images for fast vector tracing (e.g. logos).

Switch to Fast mode to test speed/quality balance.

Try Glow mode to see vector glow effects.

Paste public image URLs to test fetch and render.

Export your vectors to SVG and compare file size.

Use the console to track logs (e.g. tracing, theme changes).

Logs for Debugging:

[LuxLabs.Core] Homebase initialized.

[LuxLabs.Vectorizer.Image] Loaded and traced.

[LuxLabs.Flame] Theme cycled to index X.

[LuxLabs.Flame] Speed mode: fast/glow/normal.

[LuxLabs.Vectorizer.Visual] SVG drawn.

Potential Extensions:

More animated themes.

Adjustable Fast Mode settings.

Full undo/redo history engine.

CORS proxy for broader URL image support.

