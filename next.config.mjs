import createMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Import the JSON file
const docsData = await import('./configs/docs.json', {
  with: { type: 'json' }
}).then(module => module.default);
// import dataArray from './configs/docs';

const { dataArray } = docsData;

const chConfig = {
  components: { code: 'PreCode' },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    jsx: true,
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    json: true,
    serverActions: true,
    mdxRs: true,
  },
  typescript: {
    ignoreBuildErrors: false
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/ecemgo/mini-samples-great-tricks/assets/**',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'img.freepik.com',
      },
      {
        hostname: 'assets.codepen.io',
      },
    ],
  },
  // Add other Next.js config options here
};

export default withMDX(nextConfig);

