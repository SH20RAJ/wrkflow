import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'recharts',
    ],
  },
  serverExternalPackages: ["@libsql/client"],
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config: Record<string, unknown>, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.externals = config.externals || [];
      (config.externals as string[]).push('@libsql/client');
    }
    return config;
  },
};

export default nextConfig;
