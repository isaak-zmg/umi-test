export default {
    dev: {
        '/identity-api': {
            target: 'https://dev-identity-api.sounmate.com',
            changeOrigin: true,
            pathRewrite: { '^/identity-api' : '' },
        },
    },
};
