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
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'Origin, Content-Type, X-Auth-Token'
              }
            ],
          },
        ]
      }
  };