/** @type {import('next').NextConfig} */
const config = {
  // ১. মেমোরি খরচ কমাতে বিল্ড টাইপ চেকিং এবং লিন্টিং বন্ধ
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // ২. সোর্স ম্যাপ বন্ধ (এটি র‍্যামের ওপর চাপ অনেক কমায়)
  productionBrowserSourceMaps: false,

  experimental: {
    // ৩. ওয়েবপ্যাক মেমোরি অপ্টিমাইজেশন অন
    webpackMemoryOptimizations: true,

    // ৪. সব পেজ একসাথে লোড না করে শুধু যা প্রয়োজন তা লোড করবে
    optimizePackageImports: ['lucide-react', 'icons', '@headlessui/react', '@radix-ui/react-icons'],

    // ৫. টার্মাক্সের জন্য মাল্টি-থ্রেডিং কমিয়ে আনা (র‍্যাম বাঁচায়)
    workerThreads: false,
    cpus: 1,
  },

  // ৬. ওয়েবপ্যাক ক্যাশ কনফিগারেশন (মেমোরির বদলে ফাইলে ক্যাশ রাখবে)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: false,
      };
    }
    return config;
  },
};

export default config;

