/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes (routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },
  /*
  ** Global CSS
  */
  css: [
    {src:'element-ui/lib/theme-chalk/index.css'},    // 1.在 css 中配置 element-ui 的 css 位置
    {src: 'mavon-editor/dist/css/index.css'}
  ],
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
    {src:'~plugins/element-ui', ssr: false},    // 2.在 plugins 中配置刚刚创建好的 plugin,
    {src:'~plugins/mavon-editor', ssr: false}    // 2.在 plugins 中配置刚刚创建好的 plugin
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['element-ui']    // 3.此处配置 build 时带着element-ui
  }
}
