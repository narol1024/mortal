/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "y0fijnbbkk5rglsk.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
