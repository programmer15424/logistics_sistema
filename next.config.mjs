/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/logistics_sistema',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
