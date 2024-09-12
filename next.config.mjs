/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ryuqmboitobyfjnayfne.supabase.co',
      },
    ],
  },
};

export default nextConfig;
