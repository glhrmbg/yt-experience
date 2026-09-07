import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: "YT Experience",
  description: "Toggleable customizations to make YouTube more pleasant to use.",
  version: pkg.version,
  icons: {
    16: "src/icons/icon16.png",
    48: "src/icons/icon48.png",
    128: "src/icons/icon128.png",
  },
  action: {
    default_popup: "src/popup/index.html",
    default_icon: {
      16: "src/icons/icon16.png",
      48: "src/icons/icon48.png",
      128: "src/icons/icon128.png",
    },
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  permissions: ["storage"],
  host_permissions: ["*://*.youtube.com/*", "*://*.google.com/search*"],
  content_scripts: [
    {
      matches: ["*://*.youtube.com/*", "*://*.google.com/search*"],
      js: ["src/content/main.ts"],
      run_at: "document_start",
    },
  ],
});
