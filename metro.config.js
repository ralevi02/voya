const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Redirect zustand's ESM files to CJS to avoid import.meta.env
// which causes "Cannot use import.meta outside a module" in the browser.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web") {
    const zustandEsmMap = {
      "zustand": "zustand/index.js",
      "zustand/middleware": "zustand/middleware.js",
    };
    if (zustandEsmMap[moduleName]) {
      const zustandBase = path.dirname(
        require.resolve("zustand/package.json")
      );
      const cjsPath = path.join(
        zustandBase,
        zustandEsmMap[moduleName].replace("zustand/", "")
      );
      return { type: "sourceFile", filePath: cjsPath };
    }
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
