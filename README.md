# Duraimohan Classics

The production website lives in `frontend/`. The root Vercel configuration installs and builds that React application, then serves `frontend/build` with an SPA fallback for `/admin`.

## Development
```bash
yarn --cwd frontend start
```

## Production build
```bash
yarn build
```

Vercel must use the repository root, the `main` branch, and the checked-in `vercel.json`.
