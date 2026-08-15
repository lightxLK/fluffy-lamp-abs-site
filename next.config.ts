import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Next randomizes the build ID on every `next build`, which gets embedded in
  // every page's HTML/RSC payload and in the _next/static/<buildId>/ folder
  // path. On a static FTP host that means the deploy step re-uploads nearly
  // every file on every push, even when nothing actually changed. Pinning it
  // keeps unchanged output byte-identical across builds so FTP-Deploy-Action
  // can skip it; actual asset changes still bust cache via their own content
  // hash in the filename (e.g. chunks/*.js).
  generateBuildId: async () => 'abs-static-build',
  allowedDevOrigins: ['192.168.29.110', '192.168.1.18', '127.0.0.1', 'localhost'],
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  // three ships its addons (e.g. GLTFLoader) as ESM-only .js files under
  // node_modules/three/examples/jsm — both Next's bundler and next/jest's
  // Jest transform need this listed to compile those imports.
  transpilePackages: ['three'],
};

// no-op: verifying pinned buildId keeps FTP deploys incremental
export default nextConfig;
