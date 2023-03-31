import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
    title: 'AMSC30',
    description: '笔记',
    base: '/my-blog/',
    theme: recoTheme({
        style: '@vuepress-reco/style-default',
        colorMode: 'dark',
        series: {
            '/docs/Browser/': ['construct', 'strategy']
        },
        navbar: [
            {
                text: '前端基础',
                icon: 'Document',
                children: [
                    { text: 'HTML', link: '/blogs/HTML/html' },
                    { text: 'CSS', link: '/blogs/CSS/css' },
                    { text: 'JavaScript', link: '/blogs/JavaScript/javascript' },
                    { text: '浏览器', link: '/docs/Browser/construct' }
                ]
            },
            {
                text: 'Vue2',
                icon: 'Logo Vue',
                children: [
                    { text: 'Vue文档', link: 'https://v2.cn.vuejs.org/v2/guide/index.html' },
                    // { text: 'Vue源码', link: '/blogs/CSS/css' },
                    { text: 'Vuex文档', link: 'https://v3.vuex.vuejs.org/zh/' },
                    // { text: 'Vuex源码', link: '/blogs/JavaScript/guide' },
                    { text: 'Vue-Router文档', link: 'https://v3.router.vuejs.org/zh/' }
                    // { text: 'Vue-Router源码', link: '/blogs/JavaScript/guide' }
                ]
            },
            {
                text: 'Vue3',
                children: [
                    { text: 'Vue文档', link: 'https://cn.vuejs.org/' },
                    // { text: 'Vue源码', link: '/blogs/CSS/css' },
                    { text: 'Vuex文档', link: 'https://vuex.vuejs.org/zh/' },
                    // { text: 'Vuex源码', link: '/blogs/JavaScript/guide' },
                    { text: 'Vue-Router文档', link: 'https://router.vuejs.org/zh/' }
                    // { text: 'Vue-Router源码', link: '/blogs/JavaScript/guide' }
                ]
            },
            {
                text: '配置',
                link: 'http://v2.vuepress-reco.recoluan.com/docs/theme/series.html'
            }
        ]
    })
})
