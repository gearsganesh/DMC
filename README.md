# DMC

Restructured static site for Duraimohan Classics. The visual design and content are preserved while the former monolithic HTML is split into components, CSS, JavaScript modules, and extracted assets.

## Development
Serve the repository root with any static HTTP server. Component loading uses `fetch`, so opening `index.html` directly via `file://` is not supported.

## Build
```bash
npm run build
```
Vercel publishes the generated `dist/` directory.
