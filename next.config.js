/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
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
    BizGT_CLIENT_API_ADMIN_EMBEDDING_INSERT_TEXT: process.env.BizGT_CLIENT_API_ADMIN_EMBEDDING_INSERT_TEXT,
    BizGT_CLIENT_API_ADMIN_RETRIEVE_VECTOR_LOG: process.env.BizGT_CLIENT_API_ADMIN_RETRIEVE_VECTOR_LOG,
    BizGPT_CLIENT_API_TOKEN_FRONTEND: process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND,
    BizGT_CLIENT_API_ADMIN_MARKDOWN_INSERT: process.env.BizGT_CLIENT_API_ADMIN_MARKDOWN_INSERT,
    BIZGPT_ORGANIZATION: process.env.BIZGPT_ORGANIZATION,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    PERSISTENCE_MODE: process.env.PERSISTENCE_MODE,
    DEBUG_MODE: process.env.DEBUG_MODE,
    TEXT_DIRECTION: process.env.TEXT_DIRECTION,
    BIZGPT_ORGANIZATION_PASSWORD: process.env.BIZGPT_ORGANIZATION_PASSWORD,
    BIZGPT_IFRAME_MODE: process.env.BIZGPT_IFRAME_MODE,
    IFRAME_AUTH_API_BASE_URL: process.env.IFRAME_AUTH_API_BASE_URL,
    IFRAME_AUTH_API_PATH_URL: process.env.IFRAME_AUTH_API_PATH_URL,
    BIZGPT_FRONTEND_LANGUAGE: process.env.BIZGPT_FRONTEND_LANGUAGE
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ]
      }
    ]
  }
}
