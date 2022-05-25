/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ddragon.leagueoflegends.com"],
  },
  async rewrites() {
    return [
      {
        source: "/riot.txt",
        destination: `http://localhost:5000/api/riot/riot.txt`,
      },
    ];
  },
};

module.exports = nextConfig;
