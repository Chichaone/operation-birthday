const normalizeBasePath = (value) => {
  if (!value || value === '/') return '';

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;

  return withLeadingSlash.replace(/\/+$/, '');
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
