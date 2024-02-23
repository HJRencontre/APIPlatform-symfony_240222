/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  sw: "sw.js",
  scope: "/"
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  customWorkerSrc: '/',
  customWorkerPrefix: 'sw',
}

module.exports = withPWA({nextConfig});
