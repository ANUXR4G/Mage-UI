import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: "export" line
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['mageui.live'], // Add domains for your images
  },
};

export default withContentlayer(nextConfig);