import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Vite defaults to 5173; change here if you run dev server on another port
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    video: false,
  },
});
