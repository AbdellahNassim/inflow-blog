/** @type {import('next').NextConfig} */
const nextConfig = {
  images : {
    domains: ['cdn.sanity.io',"lh3.googleusercontent.com"],
  },
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
