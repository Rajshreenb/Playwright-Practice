// @ts-check
import { defineConfig, devices } from '@playwright/test';



  const config=({
  testDir: './tests',
  use: {
   browserName: 'chromium',
   headless: false,
  },
  timeout: 40*1000,
  expect: {
    timeout: 5*1000,
  },
  reporter:'html',
});
module.exports = config;

