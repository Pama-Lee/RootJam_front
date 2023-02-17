module.exports = {

    //将baseUrl：'/api',改为baseUrl：'/'
    baseUrl: '/',
    devServer: {
        '/api': {
            target: 'http://apis.juhe.cn/',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }

        }
    }
}