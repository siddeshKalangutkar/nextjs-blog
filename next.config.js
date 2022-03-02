module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://ggbsalads.com/:path*',
          },
        ]
      },
  };