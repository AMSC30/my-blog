import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import navbar from './navbar'
import browser from './series/interview/browser'
import vue from './series/interview/vue'
import css from './series/interview/css'
import js from './series/interview/js'

export default defineUserConfig({
    title: 'AMSC30',
    description: '笔记',
    logo: '/logo.png',
    base: '/my-blog/',
    theme: recoTheme({
        style: '@vuepress-reco/style-default',
        colorMode: 'dark',
        series: {
            '/docs/Browser/': browser,
            '/docs/interview/vue/': vue,
            '/docs/interview/css/': css,
            '/docs/interview/JavaScript/': js
        },
        navbar: navbar
    })
})
