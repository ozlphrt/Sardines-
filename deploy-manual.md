# Manual GitHub Pages Deployment

If the automatic GitHub Actions deployment fails, follow these steps:

## Option 1: Manual gh-pages Branch Creation

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add this to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build the project
npm run build

# Deploy to gh-pages branch
npm run deploy
```

## Option 2: Manual File Upload

1. Run `npm run build` locally
2. Go to repository Settings → Pages
3. Select "Upload files" as source
4. Upload the contents of the `dist` folder

## Option 3: Use GitHub CLI

```bash
# Install GitHub CLI
# Then run:
gh repo deploy-source
```

## Current Status
- Repository: https://github.com/ozlphrt/Sardines-
- Expected URL: https://ozlphrt.github.io/Sardines-/
- Build Status: Check Actions tab
