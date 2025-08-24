# Setup Guide - Sardines Flock Simulation

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 20.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+
- **GPU**: WebGL 2.0 compatible graphics card

### Installation Steps
```bash
# 1. Clone or download the project
git clone <repository-url>
cd sardines-flock-simulation

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Start development server
npm run dev
# or
yarn dev
# or
pnpm dev

# 4. Open browser
# Navigate to http://localhost:5173
```

---

## 📋 System Requirements

### Minimum Requirements
- **CPU**: Dual-core 2.0 GHz
- **RAM**: 4 GB
- **GPU**: Integrated graphics with WebGL 2.0
- **Storage**: 100 MB free space
- **Browser**: Modern browser with WebGL support

### Recommended Requirements
- **CPU**: Quad-core 3.0 GHz or higher
- **RAM**: 8 GB or more
- **GPU**: Dedicated graphics card (GTX 1060 or equivalent)
- **Storage**: 500 MB free space
- **Browser**: Chrome 100+ or Firefox 100+

### Performance Expectations
| Hardware | Fish Count | Expected FPS |
|----------|------------|--------------|
| Low-end | 100-200 | 30-45 fps |
| Mid-range | 300-500 | 45-60 fps |
| High-end | 500-1000 | 60+ fps |

---

## 🛠️ Development Environment

### Required Tools
1. **Code Editor**: VS Code (recommended)
2. **Browser Dev Tools**: Chrome DevTools or Firefox Developer Tools
3. **Git**: Version control
4. **Node.js**: Runtime environment

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Environment Variables
Create `.env.local` file:
```env
# Development settings
VITE_DEV_MODE=true
VITE_ENABLE_STATS=true
VITE_LOG_LEVEL=info

# Performance settings
VITE_MAX_FISH_COUNT=1000
VITE_ENABLE_POST_PROCESSING=true

# Debug settings
VITE_ENABLE_DEBUG_UI=true
VITE_SHOW_PERFORMANCE_MONITOR=true
```

---

## 📦 Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.158.0",
    "@types/three": "^0.158.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### Installation Commands
```bash
# Install all dependencies
npm install

# Install specific dependency
npm install three @types/three

# Install dev dependency
npm install --save-dev @playwright/test

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 🔧 Configuration

### TypeScript Configuration
`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vite Configuration
`vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true
  },
  optimizeDeps: {
    include: ['three']
  }
});
```

### Tailwind Configuration
`tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg0': '#0B0B0C',
        'bg1': '#121214',
        'bg2': '#18181B',
        'hairline': '#2A2A2E',
        'text': '#E5E7EB',
        'muted': '#9CA3AF',
        'accent': '#7DD3FC',
        'danger': '#F87171',
        'success': '#34D399',
        'warning': '#F59E0B'
      }
    },
  },
  plugins: [],
}
```

---

## 🚀 Available Scripts

### Development Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in UI mode
npm run test:ui

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### Build Scripts
```bash
# Development build
npm run build:dev

# Production build
npm run build:prod

# Analyze bundle
npm run build:analyze

# Generate performance report
npm run build:perf
```

### Testing Scripts
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run Playwright tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

---

## 🧪 Testing Setup

### Playwright Configuration
`playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Test Structure
```
tests/
├── e2e/
│   ├── basic.spec.ts
│   ├── performance.spec.ts
│   └── accessibility.spec.ts
├── unit/
│   ├── flocking.spec.ts
│   └── rendering.spec.ts
└── fixtures/
    └── test-data.json
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. WebGL Not Supported
**Error**: "WebGL not supported"
**Solution**:
- Update graphics drivers
- Enable hardware acceleration in browser
- Check browser WebGL support at `chrome://gpu`

#### 2. Performance Issues
**Symptoms**: Low FPS, stuttering
**Solutions**:
- Reduce fish count in settings
- Disable post-processing effects
- Update graphics drivers
- Close other GPU-intensive applications

#### 3. Asset Loading Errors
**Error**: "Failed to load model"
**Solutions**:
- Check file paths in `assets/` directory
- Verify CORS settings for local development
- Ensure all asset files are present

#### 4. TypeScript Errors
**Error**: "Module not found"
**Solutions**:
- Run `npm install` to install dependencies
- Check import paths
- Restart TypeScript server in VS Code

### Performance Optimization

#### Browser Settings
1. **Chrome**:
   - Enable hardware acceleration
   - Disable extensions temporarily
   - Use incognito mode for testing

2. **Firefox**:
   - Enable WebGL 2.0
   - Disable content blocking
   - Update to latest version

#### System Settings
1. **Windows**:
   - Update graphics drivers
   - Set power plan to "High performance"
   - Disable unnecessary background processes

2. **macOS**:
   - Update to latest OS version
   - Check graphics card compatibility
   - Disable transparency effects

---

## 📚 Additional Resources

### Documentation
- [Three.js Documentation](https://threejs.org/docs/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Performance Tools
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Three.js Editor](https://threejs.org/editor/)
- [WebGL Inspector](https://github.com/benvanik/WebGL-Inspector)

### Community Resources
- [Three.js Forum](https://discourse.threejs.org/)
- [React Community](https://reactjs.org/community/support.html)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/three.js)

---

## 🆘 Getting Help

### Support Channels
1. **GitHub Issues**: Report bugs and feature requests
2. **Documentation**: Check this guide and other docs
3. **Community**: Ask questions on forums
4. **Email**: Contact for direct support

### Debug Information
When reporting issues, include:
- Browser version and OS
- Console errors and warnings
- Performance metrics (FPS, memory usage)
- Steps to reproduce the issue
- Expected vs actual behavior

---

## 📝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes following coding standards
4. Add tests for new features
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for functions
- Include unit tests for new features

---
*This guide should help you get started with the Sardines Flock Simulation project. For additional help, check the documentation or community resources.*
