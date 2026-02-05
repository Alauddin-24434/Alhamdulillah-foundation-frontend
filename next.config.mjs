/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix Turbopack warning
  // experimental: {
  //   turbopack: false,
  // },
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBase) {
      throw new Error(
        "❌ NEXT_PUBLIC_API_BASE_URL is not defined! Add it in your .env file."
      );
    }
    return [
      {
        source: '/:path*',
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
