import { defineUserConfig, defaultTheme } from 'vuepress'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'AMSC30的笔记',
    description: '这是我记录笔记的地方',
    base: '/my-blog/',
    theme: defaultTheme({
        Locale: {
            colorMode: 'light',
            colorModeSwitch: true
        },
        navbar: [
            {
                text: '前端基础',
                activeMatch: '^/frontend-base/',
                children: [
                    { text: 'HTML', link: '../frontend-base/HTML' },
                    { text: 'CSS', link: '../frontend-base/CSS' },
                    { text: 'JavaScript', link: '../frontend-base/JavaScript' }
                ]
            }
        ]
    }),
    plugins: [backToTopPlugin()]
})
