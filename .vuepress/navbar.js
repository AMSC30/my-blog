export default [
    {
        text: '基础',
        icon: '',
        children: [
            { text: 'HTML', link: '/docs/frontend-base/html/html' },
            { text: 'CSS', link: '/docs/frontend-base/css/css' },
            { text: 'Less', link: '/docs/frontend-base/less/introduction' },
            { text: 'JavaScript', link: '/docs/frontend-base/javascript/grammar' },
            { text: 'TypeScript', link: '/docs/frontend-base/typescript/grammar' },
            { text: 'Browser', link: '/docs/frontend-base/browser/architecture' },
            { text: 'RegExp', link: '/docs/frontend-base/regexp/introduction' },
            { text: '《计算机网络》', link: '/docs/frontend-base/net/net' },
        ],
    },
    {
        text: '进阶',
        icon: '',
        children: [
            { text: 'npm/yarn/pnpm', link: '/docs/frontend-advanced/pkg-manage/instruction' },
            { text: 'ESM/CJS', link: '/docs/frontend-advanced/module/module' },
            { text: 'JS概念深入', link: '/docs/frontend-advanced/javascript/function' },
            { text: 'JS手写实现', link: '/docs/frontend-advanced/js-implement/implement' },
            { text: 'ES6', link: '/docs/frontend-advanced/es6/grammar' },
            { text: 'Node.js', link: '/docs/frontend-advanced/node/path' },
            { text: 'Webpack5', link: '/docs/frontend-advanced/webpack/config' },
            {
                text: '前端项目架构',
                link: '/docs/frontend-advanced/project-architecture/introduction',
            },
            { text: '算法', link: '/docs/frontend-advanced/algorithm/Algorithm.md' },
        ],
    },
    {
        text: 'Vue2',
        children: [
            { text: 'Vue源码', link: '/docs/vue2/vue/introduction/introduction.md' },
            { text: 'Router3源码', link: '/docs/vue2/vue-router/introduction.md' },
            { text: 'Vuex源码', link: '/docs/vue2/vuex/introduction.md' },
        ],
    },
    {
        text: 'Vue3',
        children: [
            { text: 'Vue语法', link: '/docs/vue3/vue/grammar.md' },
            { text: 'Router4语法', link: '/docs/vue3/vue-router/grammar.md' },
            { text: 'Pinia语法', link: '/docs/vue3/pinia/grammar.md' },
            { text: 'Vite', link: '/docs/vue3/vite/vite.md' },
        ],
    },
    {
        text: 'React18',
        children: [
            { text: 'React语法', link: '/docs/React18/react/grammar.md' },
            { text: 'Router6语法', link: '/docs/React18/react/router.md' },
            { text: 'Redux语法', link: '/docs/React18/react/redux.md' },
        ],
    },
    {
        text: 'Java',
        children: [{ text: 'java语法基础', link: '/docs/java/java-base/java-grammar-base.md' }],
    },
    {
        text: 'harmonyOS',
        children: [
            { text: '程序包基础', link: '/docs/harmony-os/package/package.md' },
            { text: 'ArkTS语言', link: '/docs/harmony-os/grammar/grammar.md' },
            { text: '开发', link: '/docs/harmony-os/develop/develop.md' },
        ],
    },

    {
        text: '面试',
        children: [
            { text: 'CSS', link: '/docs/interview/css/box.md' },
            { text: 'JavaScript', link: '/docs/interview/javascript/data_type.md' },
            { text: 'TypeScript', link: '/docs/interview/typescript/class.md' },
            { text: 'ES6', link: '/docs/interview/es6/var_let_const.md' },
            { text: 'HTTP', link: '/docs/interview/http/CDN.md' },
            { text: 'Vue', link: '/docs/interview/vue/base.md' },
            { text: 'React', link: '/docs/interview/react/React.md' },
            { text: 'Git', link: '/docs/interview/git/command.md' },
            { text: 'Linux', link: '/docs/interview/linux/linux.md' },
            { text: 'Node', link: '/docs/interview/node/nodejs.md' },
            { text: 'Webpack', link: '/docs/interview/webpack/webpack.md' },
            { text: '设计模式', link: '/docs/interview/design/design.md' },
            { text: '小程序', link: '/docs/interview/applet/applet.md' },
        ],
    },
    {
        text: '价值网站',
        children: [
            {
                text: '代码随想录(算法)',
                link: 'https://programmercarl.com/',
            },
        ],
    },
    {
        text: '工具',
        children: [
            {
                text: '转换工具',
                link: 'https://www.bejson.com/',
            },
            {
                text: '在线流程图',
                link: 'https://app.diagrams.net',
            },
            {
                text: '代码图片生成',
                link: 'https://carbon.now.sh',
            },
        ],
    },
    {
        text: '配置',
        link: 'https://vuepress-theme-reco.recoluan.com/docs/guide/introduce.html',
    },
]
