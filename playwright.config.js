import { defineConfig } from '@playwright/test'

// Runs against the production build (`vite preview`) using the locally
// installed Google Chrome, so no browser download is required.
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  workers: 4,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4317',
    channel: 'chrome',
    headless: true,
  },
  webServer: {
    command: 'npm run build && npx vite preview --port 4317 --strictPort',
    url: 'http://localhost:4317',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
