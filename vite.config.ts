import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import officeAddin from "vite-plugin-office-addin";
import eslint from "vite-plugin-eslint";

const devCerts = require("office-addin-dev-certs");

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

// https://vitejs.dev/config/
export default defineConfig(async ({mode}) => ({
  plugins: [react(), eslint(), officeAddin({
    devUrl: "https://localhost:3000",
    prodUrl: "https://www.contoso.com/" // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
  })],
  build: {
    rollupOptions: {
      input: {
        "taskpane": "taskpane.html",
        "commands": "commands.html",
      },
    }
  },
  server: mode !== "production" ? { https: await getHttpsOptions() } : {}
}));
