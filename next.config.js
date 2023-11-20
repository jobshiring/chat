/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com'
      }
    ]
  },
  env: {
    BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME: process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME,
    BizGPT_CLIENT_API_BASE_ADDRESS: process.env.BizGPT_CLIENT_API_BASE_ADDRESS,
    BizGPT_CLIENT_API_PORT: process.env.BizGPT_CLIENT_API_PORT,
    BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH: process.env.BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH,
    BizGT_CLIENT_API_BOOKMARK_PERSIST_PATH: process.env.BizGT_CLIENT_API_BOOKMARK_PERSIST_PATH,
    BizGT_CLIENT_API_FEEDBACK_PERSIST_PATH: process.env.BizGT_CLIENT_API_FEEDBACK_PERSIST_PATH,
    BizGT_CLIENT_API_FEEDBACK_RETRIEVE_PATH: process.env.BizGT_CLIENT_API_FEEDBACK_RETRIEVE_PATH,
    BizGT_CLIENT_API_MESSAGES_RETRIEVE_PATH: process.env.BizGT_CLIENT_API_MESSAGES_RETRIEVE_PATH,
    BizGT_CLIENT_API_MESSAGES_SUBMIT_PATH: process.env.BizGT_CLIENT_API_MESSAGES_SUBMIT_PATH,
    BizGPT_CLIENT_API_TOKEN_FRONTEND: process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND,
    PERSISTENCE_MODE: process.env.PERSISTENCE_MODE,
    DEBUG_MODE: process.env.DEBUG_MODE,
    TEXT_DIRECTION: process.env.TEXT_DIRECTION
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}
