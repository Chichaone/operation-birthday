const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/operation-birthday';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    // Static export-friendly images
    unoptimized: true
  }
};

export default nextConfig;
