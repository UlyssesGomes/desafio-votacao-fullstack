import { defineConfig } from "cypress";

export default defineConfig({
  expose: {
    apiUrl: 'http://localhost:8080/api/v1'
  },
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 6000,
    retries: {
      runMode: 2,   // tenta de novo no modo headless (CI)
      openMode: 0   // sem retry ao desenvolver
    }
  },
});
