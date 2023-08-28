/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "storage.googleapis.com",
         },
      ],
   },
};

module.exports = nextConfig;
