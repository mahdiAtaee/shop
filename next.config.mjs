/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", 'loremflickr.com', "api.gravatar.com", 'www.gravatar.com']
  }
};

export default nextConfig;
