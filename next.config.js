/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Set base path for GitHub Pages (repo name)
  basePath: '/Takunda',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

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
