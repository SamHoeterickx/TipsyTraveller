// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('glb', 'gltf', 'mtl', 'obj');

// Fix for Android platform redirect issue
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    
    // If no platform is specified, try to detect it from user-agent
    if (!url.searchParams.has('platform') && !req.headers['expo-platform']) {
      const userAgent = req.headers['user-agent'] || '';
      if (userAgent.includes('Android') || userAgent.includes('Linux')) {
        url.searchParams.set('platform', 'android');
        req.url = url.pathname + url.search;
      }
    }
    
    middleware(req, res, next);
  };
};

module.exports = config;
    