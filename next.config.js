module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://ggbsalads.com/:path*',
          },
        ]
      },
      async headers() {
        return [
          {
            source: '/api/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*'
              }
            ],
          },
        ]
      }
  };