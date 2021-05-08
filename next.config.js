module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  env: {
    // The THEME variable needs to be available on the client and server side, and this is the Next.JS way of doing that
    THEME: process.env.THEME,
  },
};
