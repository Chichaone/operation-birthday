const normalizeBasePath = (value) => {
  if (!value || !value.trim()) {
    return '/operation-birthday';
  }

  const trimmed = value.trim();

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

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
