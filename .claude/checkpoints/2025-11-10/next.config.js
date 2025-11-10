/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empty turbopack config to silence the warning
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|exr)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
