import { defineConfig } from 'umi';
import * as proxy from './src/config/proxy';

var isDevHost = process.env.NODE_ENV === "development";
var apiPrefix = isDevHost ? 'dev' : ''

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    styles: [
        `#root{height:100%;}`
    ],
    routes: [
        { path: "/login", component: '@/pages/Login/index' },
        {
            path: '/',
            component: '@/layouts/index',
            // wrappers: [
            //     '@/wrappers/auth',
            // ],
            routes: [
                {
                    path:"/users/:id",
                    component: "@/pages/Users/UserDetails"
                },
                {
                    path: "/users",
                    component: "@/pages/Users/index"
                },
                // {
                //     path: "/mates",
                //     component: "@/pages/Mates/index"
                // },
                {
                    path: '/',
                    exact: true,
                    component: '@/pages/index',
                },
            ]

        },
    ],
    proxy: {
        '/identity-api': {
            target: 'https://dev-identity-api.sounmate.com',
            changeOrigin: true,
            pathRewrite: { '^/identity-api': '' },
        },
        '/content-api': {
            target: 'https://dev-content-api.sounmate.com',
            changeOrigin: true,
            pathRewrite: { '^/content-api': '' }
        },
        "/member-api": {
            target: 'https://dev-member-api.sounmate.com',
            changeOrigin: true,
            pathRewrite: { '^/member-api': '' }
        }
    },
});
