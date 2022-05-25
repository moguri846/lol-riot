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
        destination: `https://server-searchmyname.herokuapp.com/api/riot/riot.txt`,
      },
    ];
  },
};

module.exports = nextConfig;
