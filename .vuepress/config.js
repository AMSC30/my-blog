import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import navbar from './navbar'
import series from './series'
export default defineUserConfig({
    title: 'AMSC30',
    description: '笔记',
    logo: '/logo.png',
    base: '/my-blog/',
    theme: recoTheme({
        style: '@vuepress-reco/style-default',
        colorMode: 'light',
        series: series,
        navbar: navbar,
        catalogTitle: '目录'
    })
})
