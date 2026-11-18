import{_ as l,p as d,q as t,s as e,R as n,t as a,Y as s,n as r}from"./framework-e1bed10d.js";const p={},c=s(`<h1 id="vibe-coding-项目开发流程" tabindex="-1"><a class="header-anchor" href="#vibe-coding-项目开发流程" aria-hidden="true">#</a> Vibe Coding 项目开发流程</h1><blockquote><p>从想法到产品的完整 Vibe Coding 工作流</p></blockquote><p>你好，我是鱼皮。</p><p>在快速上手阶段，我们已经做过一个简单的网页应用了。那个项目很简单，直接和 AI 对话就能做出来。但现在，让我们来解决一个更实际的问题：如果要做一个完整的、商业级的项目，应该怎么做？</p><p>很多同学刚开始用 AI 做项目时，都会犯同一个错误：打开 AI 编程工具后，直接就开始和 AI 聊天，让它生成代码。对于小项目来说，这样做是没问题的。但如果你想做一个完整的商业级项目，这样就会出问题。一开始可能还挺顺利，但很快就会发现 AI 生成的代码越来越乱，完全不是自己想要的。改来改去、左右脑互搏，最后不得不推倒重来，浪费了大量时间。</p><p>这是为什么呢？因为你跳过了最重要的一步 —— <strong>规划</strong>。</p><p>在 Vibe Coding 时代，虽然 AI 可以帮你写代码，但好的规划依然是项目成功的关键。甚至可以说，规划比以前更重要了。</p><p>下面我就来分享一套经过验证的 5 步开发流程，帮你避开这些坑。</p><h2 id="为什么需要标准流程" tabindex="-1"><a class="header-anchor" href="#为什么需要标准流程" aria-hidden="true">#</a> 为什么需要标准流程？</h2><p>在传统编程中，如果你对项目规划不清楚，最多就是写出来的代码质量不高，但至少你知道自己在写什么。</p><p>但在 Vibe Coding 中，情况就完全不同了。如果你对项目规划不清楚，AI 就会 “自由发挥”，生成一堆你看不懂、也不需要的代码。</p><p>AI 不是魔法，它只是一个非常强大的执行者。你告诉它做什么，它就做什么。如果你自己都不知道要做什么，AI 自然也无法帮你做出理想的产品。</p><p>所以，一套清晰的开发流程，可以帮助你：</p><ol><li>明确项目目标和需求</li><li>让 AI 理解你的意图</li><li>避免项目失控</li><li>提高开发效率</li><li>做出真正有用的产品</li></ol><h2 id="完整的-5-步工作流" tabindex="-1"><a class="header-anchor" href="#完整的-5-步工作流" aria-hidden="true">#</a> 完整的 5 步工作流</h2><p>这套流程是我在实践中总结出来的，也参考了很多优秀开发者的经验。</p><p>它包括 5 个步骤：</p><ol><li>需求研究（Research）</li><li>产品需求文档（PRD）</li><li>技术设计文档（Tech Design）</li><li>AI 代理指令（AGENTS.md）</li><li>实现和迭代（Build）</li></ol><p>看起来好像很复杂？别担心，我会用最简单的方式 “喂饭” 给你。</p><p><img src="https://pic.yupi.icu/1/vibecodingworkflow大.jpeg" alt=""></p><h2 id="步骤一、需求研究-research" tabindex="-1"><a class="header-anchor" href="#步骤一、需求研究-research" aria-hidden="true">#</a> 步骤一、需求研究（Research）</h2><p>了解完整体流程后，让我们从第一步开始，详细讲解每个步骤该怎么做。</p><p>在动手之前，先搞清楚：我到底要做什么？为什么要做？有没有人做过类似的东西？</p><p>很多同学会跳过这一步，直接开始写需求文档。但我的经验是，花 30 分钟做调研，可以避免走很多弯路。</p><p>具体怎么做？</p><p>1）明确你的目标</p><p>先问自己几个问题：我想解决什么问题？这个问题真的值得解决吗？我希望做出来的东西是什么样的？</p><p>比如你想做一个记账应用，那就要想清楚：是给自己用还是给别人用？主要记录哪些类型的账目？需要哪些核心功能？</p><p>2）调研类似产品</p><p>去看看市面上有没有类似的产品，它们是怎么做的？有什么优点和缺点？</p><p>你可以搜索相关的应用或网站，看看别人的开源项目，或者直接问 AI：“有哪些好用的记账应用？它们有什么特点？”</p><p>这一步很重要，可以帮你避免重复造轮子，也能给你提供灵感和参考。</p><p>3）记录你的发现</p><p>把你的想法和调研结果记录下来，可以用一个简单的文档，比如 <code>RESEARCH.md</code>。这个文档不需要很正式，就像写日记一样，记录你的想法和发现就行。</p><p>举个例子，假设你想做一个记账应用。你先调研了市面上的几款记账应用，发现它们功能都太复杂了，你只需要一个简单的工具。然后你记录下自己的想法， <code>RESEARCH.md</code> 可能是这样的：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 记账应用需求研究</span>

<span class="token title important"><span class="token punctuation">##</span> 目标</span>

做一个简单易用的个人记账应用，帮助自己养成记账习惯。

<span class="token title important"><span class="token punctuation">##</span> 调研发现</span>

<span class="token list punctuation">-</span> 市面上的记账应用功能都太复杂了
<span class="token list punctuation">-</span> 我只需要快速记录收入和支出
<span class="token list punctuation">-</span> 最好能看到每月的统计数据

<span class="token title important"><span class="token punctuation">##</span> 核心需求</span>

<span class="token list punctuation">1.</span> 快速添加收支记录
<span class="token list punctuation">2.</span> 按日期查看记录
<span class="token list punctuation">3.</span> 查看月度统计
<span class="token list punctuation">4.</span> 数据本地存储
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="步骤二、产品需求文档-prd" tabindex="-1"><a class="header-anchor" href="#步骤二、产品需求文档-prd" aria-hidden="true">#</a> 步骤二、产品需求文档（PRD）</h2><p>完成需求研究后，你应该对要做的东西有了清晰的认识。接下来，我们要把这些想法整理成一份正式的文档。明确要做哪些功能，不做哪些功能。</p><p>这是整个流程中最重要的一步，一份好的 PRD 可以让 AI 准确理解你的意图，生成高质量的代码。</p><h3 id="怎么写出高质量的-prd" tabindex="-1"><a class="header-anchor" href="#怎么写出高质量的-prd" aria-hidden="true">#</a> 怎么写出高质量的 PRD？</h3><p>我的建议是，先自己写一个简单的需求描述，然后让 AI 帮你扩展成完整的 PRD。</p><p>比如，你可以先写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>我要做一个记账应用，能快速记录收支，查看每月统计。
要简单易用，不要复杂的功能。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后把这段话发给 AI 大模型，比如 Gemini 或 DeepSeek：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请帮我把这个需求扩展成完整的产品需求文档（PRD），
要包含：
1. 产品概述和目标用户
2. 详细的功能列表
3. 功能优先级（MVP 和后续版本）
4. 界面设计要求
5. 技术栈建议
6. 非功能性需求（性能、安全等）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AI 会帮你生成一份结构化的 PRD，然后你再根据自己的需求修改和完善。</p><h3 id="prd-应该包含什么" tabindex="-1"><a class="header-anchor" href="#prd-应该包含什么" aria-hidden="true">#</a> PRD 应该包含什么？</h3><p>一份完整的 PRD 通常包含：</p><ul><li>产品概述（简单介绍这个产品是什么）</li><li>目标用户（谁会用这个产品）</li><li>核心功能（列出所有要做的功能）</li><li>功能优先级（哪些是必须做的，哪些是可以后续添加的）</li><li>界面设计（简单描述界面应该是什么样的）</li><li>技术栈建议</li><li>代码风格和架构模式</li><li>限制条件和边界场景</li></ul><p>举个例子：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 记账应用 PRD</span>

<span class="token title important"><span class="token punctuation">##</span> 产品概述</span>

一个简单的个人记账应用，帮助用户快速记录日常收支。

<span class="token title important"><span class="token punctuation">##</span> 目标用户</span>

需要记账但不想用复杂应用的个人用户。

<span class="token title important"><span class="token punctuation">##</span> 核心功能</span>

<span class="token title important"><span class="token punctuation">###</span> 必须做（MVP）</span>

<span class="token list punctuation">1.</span> 添加收支记录
    <span class="token list punctuation">-</span> 输入金额
    <span class="token list punctuation">-</span> 选择类型（收入/支出）
    <span class="token list punctuation">-</span> 选择分类（餐饮、交通、工资等）
    <span class="token list punctuation">-</span> 添加备注（可选）
    <span class="token list punctuation">-</span> 选择日期

<span class="token list punctuation">2.</span> 查看记录列表
    <span class="token list punctuation">-</span> 按日期倒序显示
    <span class="token list punctuation">-</span> 显示金额、类型、分类、备注
    <span class="token list punctuation">-</span> 可以删除记录

<span class="token list punctuation">3.</span> 月度统计
    <span class="token list punctuation">-</span> 显示当月总收入
    <span class="token list punctuation">-</span> 显示当月总支出
    <span class="token list punctuation">-</span> 显示当月结余

<span class="token title important"><span class="token punctuation">###</span> 后续可以做</span>

<span class="token list punctuation">-</span> 数据导出
<span class="token list punctuation">-</span> 图表展示
<span class="token list punctuation">-</span> 预算设置
<span class="token list punctuation">-</span> 多账户管理

<span class="token title important"><span class="token punctuation">##</span> 界面设计</span>

<span class="token list punctuation">-</span> 首页：显示记录列表和添加按钮
<span class="token list punctuation">-</span> 添加页面：表单输入
<span class="token list punctuation">-</span> 统计页面：展示月度数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="步骤三、技术设计文档-tech-design" tabindex="-1"><a class="header-anchor" href="#步骤三、技术设计文档-tech-design" aria-hidden="true">#</a> 步骤三、技术设计文档（Tech Design）</h2><p>有了清晰的 PRD 后，我们就知道要做什么了。</p><p>下一步，就是确定用什么技术来实现这些功能，以及大致的技术架构。</p><p>创建一个 <code>TECH_DESIGN.md</code> 文件，包含：</p><ul><li>技术栈选择（前端用什么、后端用什么、数据库用什么）</li><li>项目结构（代码怎么组织）</li><li>数据模型（需要存储哪些数据）</li><li>关键技术点（有哪些技术难点需要注意）</li></ul><p>还是以记账应用为例。根据 PRD 中的需求，你决定用 React 来做前端，因为它生态成熟、AI 支持好。数据存储用 LocalStorage 就够了，因为是个人工具，不需要后端。技术设计文档可能是这样的：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 记账应用技术设计</span>

<span class="token title important"><span class="token punctuation">##</span> 技术栈</span>

<span class="token list punctuation">-</span> 前端：React + TypeScript + Vite
<span class="token list punctuation">-</span> 样式：Tailwind CSS
<span class="token list punctuation">-</span> 数据存储：LocalStorage
<span class="token list punctuation">-</span> 部署：Vercel

<span class="token title important"><span class="token punctuation">##</span> 项目结构</span>

src/ components/ # 组件 pages/ # 页面 hooks/ # 自定义 Hooks utils/ # 工具函数 types/ # 类型定义

<span class="token title important"><span class="token punctuation">##</span> 数据模型</span>

<span class="token title important"><span class="token punctuation">###</span> Transaction（交易记录）</span>

<span class="token list punctuation">-</span> id: string
<span class="token list punctuation">-</span> amount: number
<span class="token list punctuation">-</span> type: &#39;income&#39; | &#39;expense&#39;
<span class="token list punctuation">-</span> category: string
<span class="token list punctuation">-</span> note: string
<span class="token list punctuation">-</span> date: string

<span class="token title important"><span class="token punctuation">##</span> 关键技术点</span>

<span class="token list punctuation">1.</span> 使用 LocalStorage 存储数据
<span class="token list punctuation">2.</span> 使用 React Hooks 管理状态
<span class="token list punctuation">3.</span> 使用日期库处理日期（date-fns）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你不熟悉技术选型，可以问 AI：“我要做一个记账应用，应该用什么技术栈？”</p><p>AI 会给你推荐合适的技术。</p><h2 id="步骤四、ai-代理指令-agents-md" tabindex="-1"><a class="header-anchor" href="#步骤四、ai-代理指令-agents-md" aria-hidden="true">#</a> 步骤四、AI 代理指令（AGENTS.md）</h2><p>PRD 和技术设计都准备好了，现在我们要创建一个专门给 AI 看的指令文件，告诉 AI 在这个项目中应该遵循什么规则。</p><p>这个文件你可以随便取名，比如 <code>AI_RULES.md</code>、<code>INSTRUCTIONS.md</code> 等。但我推荐使用 <code>AGENTS.md</code> 这个名称，因为这是一个新兴的社区标准。</p>`,63),u={href:"https://agents.md/",target:"_blank",rel:"noopener noreferrer"},o=s(`<p><img src="https://pic.yupi.icu/1/image-20260109161639565.png" alt=""></p><p>那 AGENTS.md 应该包含什么内容呢？</p><p>一般包含项目概述、开发规范、测试要求、代码风格、注意事项等。</p><p>继续用记账应用来举例。根据前面的 PRD 和技术设计，你可以创建这样一个 AGENTS.md 文件：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 记账应用 AI 开发指令</span>

<span class="token title important"><span class="token punctuation">##</span> 项目概述</span>

这是一个简单的个人记账应用，使用 React + TypeScript 开发。

<span class="token title important"><span class="token punctuation">##</span> 开发规范</span>

<span class="token list punctuation">-</span> 使用 TypeScript，确保类型安全
<span class="token list punctuation">-</span> 组件使用函数式组件 + Hooks
<span class="token list punctuation">-</span> 使用 Tailwind CSS 编写样式
<span class="token list punctuation">-</span> 所有数据存储在 LocalStorage

<span class="token title important"><span class="token punctuation">##</span> 代码风格</span>

<span class="token list punctuation">-</span> 使用 ESLint 和 Prettier
<span class="token list punctuation">-</span> 组件名使用 PascalCase
<span class="token list punctuation">-</span> 函数名使用 camelCase
<span class="token list punctuation">-</span> 常量使用 UPPER_SNAKE_CASE

<span class="token title important"><span class="token punctuation">##</span> 测试要求</span>

<span class="token list punctuation">-</span> 每个功能完成后手动测试
<span class="token list punctuation">-</span> 确保数据正确存储和读取
<span class="token list punctuation">-</span> 测试各种边界情况

<span class="token title important"><span class="token punctuation">##</span> 注意事项</span>

<span class="token list punctuation">-</span> 保持代码简洁，避免过度设计
<span class="token list punctuation">-</span> 优先实现核心功能
<span class="token list punctuation">-</span> 确保移动端适配
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个文件，AI 就知道在这个项目中应该遵循什么规则，生成的代码会更加规范和一致。</p><h2 id="步骤五、实现和迭代-build" tabindex="-1"><a class="header-anchor" href="#步骤五、实现和迭代-build" aria-hidden="true">#</a> 步骤五、实现和迭代（Build）</h2><p>前面 4 步都是准备工作，现在终于可以开始写代码了！</p><p>但不是一口气写完，而是小步迭代。</p><h3 id="分步迭代策略" tabindex="-1"><a class="header-anchor" href="#分步迭代策略" aria-hidden="true">#</a> 分步迭代策略</h3><p>对于复杂的项目，想一步到位是不现实的。我推荐采用 3 步走的策略：</p><h4 id="_1、生成基础框架" tabindex="-1"><a class="header-anchor" href="#_1、生成基础框架" aria-hidden="true">#</a> 1、生成基础框架</h4><p>先让 AI 生成基础项目框架，暂时不管功能好不好用，确保能够运行项目即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请根据 PRD.md、TECH_DESIGN.md 和 AGENTS.md 的要求，
初始化项目并创建基本的项目结构，包括：
1. 安装必要的依赖
2. 创建目录结构
3. 配置开发环境
4. 创建基础的路由和页面框架
确保项目能够正常启动。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于有编程基础的同学，其实有更简单的方法。你可以使用脚手架或者项目模板来快速生成基础框架。</p><p>脚手架就像是一个自动化工具，帮你生成项目的基本结构和配置文件，比如 <code>create-react-app</code>、<code>create-vite</code> 等。</p><p>项目模板则是一个预先配置好的项目示例，你可以直接复制使用。</p><p>使用这些工具，几分钟就能搭好基础框架，不需要从零开始。</p><h4 id="_2、逐步实现核心功能" tabindex="-1"><a class="header-anchor" href="#_2、逐步实现核心功能" aria-hidden="true">#</a> 2、逐步实现核心功能</h4><p>框架搭好后，就可以开始实现具体功能了。这一步的关键是 <strong>先跑通核心业务流程、实现核心功能</strong> ，而不是一开始就追求完美。建议把项目拆分成多个小功能，一个一个来实现。</p><p>比如记账应用可以这样拆分：</p><ol><li>实现数据模型和存储</li><li>实现添加记录功能</li><li>实现记录列表显示</li><li>实现删除功能</li><li>实现月度统计</li></ol><p>对于每个功能，你可以这样和 AI 对话：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>我要实现添加记录功能，请根据 PRD.md 和 TECH_DESIGN.md 中的要求，
创建一个 AddTransaction 组件，包含表单输入和提交功能。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每完成一个功能，就测试一下：功能是否正常工作？有没有 Bug？界面是否符合预期？</p><p>如果有问题，就继续和 AI 对话，让它修改。</p><h4 id="_3、优化实现细节" tabindex="-1"><a class="header-anchor" href="#_3、优化实现细节" aria-hidden="true">#</a> 3、优化实现细节</h4><p>核心功能都实现后，就可以打磨细节了。在 <strong>保证不影响功能的前提下</strong>，优化性能、改进用户体验、美化界面等。</p><p>打磨完细节后，你的 MVP 最小可行产品就完成了。之后就可以根据用户反馈和自己的想法，扩展更多功能了。</p><p>另外，跑通核心功能后，强烈建议用 Git 来管理代码。每完成一个功能就提交一次，这样即使后面出问题，也能快速回退。</p>`,30),v={href:"https://www.codefather.cn/course/1789189862986850306/section/1789190804671012866",target:"_blank",rel:"noopener noreferrer"},m=s(`<h3 id="避免-ai-失控的关键技巧" tabindex="-1"><a class="header-anchor" href="#避免-ai-失控的关键技巧" aria-hidden="true">#</a> 避免 AI 失控的关键技巧</h3><p>在实际开发中，你可能会遇到这些问题：</p><ul><li>AI 输出的内容驴头不对马嘴</li><li>成了一个新功能后原来的功能就不能用了</li><li>改了一个 Bug 又来 3 个 Bug</li></ul><p>这些问题很常见，但都有解决办法。</p><h4 id="_1、项目模块化" tabindex="-1"><a class="header-anchor" href="#_1、项目模块化" aria-hidden="true">#</a> 1、项目模块化</h4><p>由于 AI 的上下文是有限的，随着项目信息量不断增大，它可能忘记之前的信息，导致生成的代码错误。所以我们要把项目的功能尽可能隔离开，把一个大项目分割成多个小模块。</p><p>举个例子，开发一个电商系统，可以把商品管理模块独立出来。当需要 AI 生成添加商品功能的代码时，只需要提供商品表的字段设计、添加商品的业务逻辑规则，不需要把支付结算、用户会员等关联不大的功能作为上下文提供给 AI。</p><h4 id="_2、限定修改范围" tabindex="-1"><a class="header-anchor" href="#_2、限定修改范围" aria-hidden="true">#</a> 2、限定修改范围</h4><p>AI 生成的代码没有那么可控，经常改 A 功能的同时把 B 功能也顺带修改了。这个问题很好解决，只要在提示词中限定修改范围即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>仅修改 components/AddTransaction.tsx 文件：
1. 添加表单验证功能
2. 保持现有的样式和布局
3. 不要改动其他文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、抽象和复用" tabindex="-1"><a class="header-anchor" href="#_3、抽象和复用" aria-hidden="true">#</a> 3、抽象和复用</h4><p>假如我们要让 AI 生成 2 个布局一模一样的页面，它有时会很死板，生成完页面 A 之后，复制一遍页面 A 的代码来生成页面 B。这样非常不利于大项目的维护，以后 AI 改了页面 A，说不定页面 B 就忘了改。所以我们需要主动告诉 AI：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请帮我抽象这个页面为可复用的组件，
让其他页面可以通过传入不同的参数来使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样也能减少整个项目的代码量，减轻 AI 上下文记忆的负担，让生成结果更准确。</p><h4 id="_4、版本控制" tabindex="-1"><a class="header-anchor" href="#_4、版本控制" aria-hidden="true">#</a> 4、版本控制</h4><p>强烈建议使用 Git 版本控制工具。每正确生成一个功能后都提交一次版本，在每次 AI 生成新代码之后人工对比一下改动的文件，出了问题也能快速还原到之前的版本，防止代码丢失。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>每完成一个功能后，提交代码：
git add .
git commit -m &quot;实现添加记录功能&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cursor 自带了 Git 对比功能，可以很方便地查看代码变化。</p><h4 id="_5、人工控制" tabindex="-1"><a class="header-anchor" href="#_5、人工控制" aria-hidden="true">#</a> 5、人工控制</h4><p>AI 有时会因缺乏关键上下文信息、或者自身能力的不足而陷入循环。比如改来改去总是出现同样的错误，或者一直在做无用功。这时就有必要人工介入了。</p><p>可以尝试手动指定上下文、更换 Prompt 换个角度描述问题、清空对话历史重新开始，甚至手动修改部分代码给 AI 一个正确的方向。</p><p>这时候，学编程的好处就体现出来了。如果你有一些编程基础，就能更好地对 Vibe Coding 进行把控和干预。你能看懂 AI 生成的代码，知道哪里出了问题，能够手动修正关键部分，引导 AI 往正确的方向走。这也是为什么我建议大家在学习 Vibe Coding 的同时，也要了解一些编程基础知识。</p><h4 id="_6、多元-ai-协作" tabindex="-1"><a class="header-anchor" href="#_6、多元-ai-协作" aria-hidden="true">#</a> 6、多元 AI 协作</h4><p>不同 AI 大模型擅长不同任务。如果单一大模型无法正常完成工作，可以利用其他大模型生成 “教 AI 做事的方法和指令”。</p><p>比如，你在 Cursor 中使用 GPT 生成的代码有问题，你可以：</p><ol><li>把代码和错误信息复制给 Claude 或 Gemini</li><li>让它分析问题并给出修改建议</li><li>把修改建议再告诉 GPT，让它修改代码</li></ol><p>这种多模型协作的方式，可以大大增加解决问题的可能性。</p><h2 id="反面教材-需求不清导致项目翻车" tabindex="-1"><a class="header-anchor" href="#反面教材-需求不清导致项目翻车" aria-hidden="true">#</a> 反面教材 - 需求不清导致项目翻车</h2><p>在这套 Vibe Coding 教程的项目实战板块，我会分享大量的成功项目案例，大家之后可以挑感兴趣的学习。这里我只举一个反面案例，让你看看不按流程做会出现什么问题。</p><p>小阿巴想做一个待办事项应用，他直接打开 AI 编程工具，输入：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>帮我做一个待办事项应用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>AI 生成了一个应用，看起来还不错。但小阿巴很快发现了问题：没有分类功能、没有优先级设置、界面风格也不喜欢。</p><p>于是他继续对话：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>加上分类功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>AI 添加了分类，但破坏了原有的布局。小阿巴又说：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>修复布局问题
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>AI 修复了布局，但又引入了新的 Bug。就这样改来改去，最后代码变成了一团糟，小阿巴不得不放弃这个项目。</p><p>问题出在哪里？</p><p>首先，一开始没有明确需求，导致 AI 只能按照自己的理解生成代码。其次，每次修改都是 “头痛医头，脚痛医脚”，没有整体规划。最后，由于没有文档记录，AI 根本不知道项目的整体设计。</p><p>如果小阿巴一开始就按照 5 步流程来做，写清楚 PRD 和技术设计，就不会出现这些问题了。</p><h2 id="实战技巧、让-ai-生成的代码更准确" tabindex="-1"><a class="header-anchor" href="#实战技巧、让-ai-生成的代码更准确" aria-hidden="true">#</a> 实战技巧、让 AI 生成的代码更准确</h2><p>掌握了完整的开发流程后，我再分享一些实战技巧，让 AI 生成的代码更准确、更符合你的预期。这些技巧是我在实践中总结出来的，非常实用。</p><p>更多的经验技巧可以在本套 Vibe Coding 教程的【经验技巧】板块查看，这里我只列举几个我觉得至关重要的。</p><h3 id="_1、优化你的-prompt" tabindex="-1"><a class="header-anchor" href="#_1、优化你的-prompt" aria-hidden="true">#</a> 1、优化你的 Prompt</h3><p>Prompt 的质量直接决定了 AI 生成代码的准确性。一个好的 Prompt 应该包含三个要素：明确 AI 的角色、提供具体的细节要求、拆解复杂任务。</p><p>比如，你可以先告诉 AI 它的角色：“你是一个经验丰富的前端开发工程师，擅长使用 React 和 TypeScript 开发现代化的 Web 应用。”</p><p>这样 AI 就知道应该以什么视角来工作，然后再提供具体的细节要求。</p><p>❌ 不好的 Prompt：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>帮我做一个按钮
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>✅ 好的 Prompt：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>创建一个主要操作按钮组件：
- 使用 Tailwind CSS
- 支持 primary、secondary、danger 三种样式
- 支持 loading 状态（显示加载动画）
- 支持 disabled 状态
- 点击时有反馈动画
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还要学会拆解复杂任务。不要让 AI 一次性完成复杂的任务，而是拆解成多个小任务：</p><p>❌ 不好的 Prompt：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>实现用户管理功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>✅ 好的 Prompt：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>第一步：创建用户数据模型和类型定义
第二步：实现用户注册接口
第三步：实现用户登录接口
第四步：实现用户信息查询接口

现在请先完成第一步。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有参考的代码或设计，也可以提供给 AI：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>参考这个登录页面的设计风格：[截图或链接]，创建一个注册页面，保持风格一致。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、注意操作系统差异" tabindex="-1"><a class="header-anchor" href="#_2、注意操作系统差异" aria-hidden="true">#</a> 2、注意操作系统差异</h3><p>AI 更熟悉 Linux 或 Mac 系统的终端命令。如果你使用 Windows 系统，有两个选择：安装 WSL（Windows Subsystem for Linux）使用 Linux 环境开发，或者明确告诉 AI 你在使用 Windows 系统。</p><p>在 AGENTS.md 中明确说明：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> 开发环境</span>

<span class="token list punctuation">-</span> 操作系统：Windows
<span class="token list punctuation">-</span> 终端：PowerShell
<span class="token list punctuation">-</span> 请使用 Windows 兼容的命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者在对话时明确说明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>我使用的是 Windows 系统，请提供 Windows 兼容的命令。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、处理-ai-陷入循环的情况" tabindex="-1"><a class="header-anchor" href="#_3、处理-ai-陷入循环的情况" aria-hidden="true">#</a> 3、处理 AI 陷入循环的情况</h3><p>有时 AI 会陷入循环，反复做同样的事情，或者一直无法解决某个问题。这时可以尝试几种方法。</p><p>1）清空上下文。在 Cursor 中清空当前对话重新开始，但是要先保存重要的信息。</p><p>2）换个角度提问，不要重复同样的问题。</p><p>举个例子，原来的问题很简单：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>为什么登录功能不工作？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>换个角度：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请检查登录流程的每一步：
1. 前端是否正确发送了请求？
2. 后端是否收到了请求？
3. 数据库查询是否正确？
4. 返回的数据格式是否正确？

请逐步排查并告诉我哪一步出了问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）提供更多上下文。AI 可能缺少关键信息，不妨把相关的文件、错误信息、日志等都提供给它：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>我遇到了登录问题，相关信息如下：

1. 前端代码：[粘贴代码]
2. 后端代码：[粘贴代码]
3. 错误信息：[粘贴错误]
4. 网络请求：[粘贴请求和响应]

请帮我分析问题出在哪里。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果实在解决不了，可以寻求其他 AI 的帮助。把代码和问题复制给 Claude 或 ChatGPT，让它们分析，它们可能会给出不同的解决方案。</p><h3 id="_4、让-ai-帮你优化-prompt" tabindex="-1"><a class="header-anchor" href="#_4、让-ai-帮你优化-prompt" aria-hidden="true">#</a> 4、让 AI 帮你优化 Prompt</h3><p>如果你不确定自己的 Prompt 是否够好，可以让 AI 帮你优化。这是一个很实用的技巧：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>我想让 AI 帮我实现用户登录功能。
我现在的 Prompt 是：&quot;实现登录功能&quot;
请帮我优化这个 Prompt，让它更详细、更准确，
让 AI 能生成高质量的代码。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AI 会给你一个优化后的 Prompt，包含更多的细节和要求。</p><h3 id="_5、利用-ai-的代码审查能力" tabindex="-1"><a class="header-anchor" href="#_5、利用-ai-的代码审查能力" aria-hidden="true">#</a> 5、利用 AI 的代码审查能力</h3><p>完成功能后，可以让 AI 帮你审查代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请审查我的登录功能代码，检查：
1. 是否有安全问题（如密码明文传输）
2. 是否有性能问题
3. 代码是否符合最佳实践
4. 是否有潜在的 Bug
5. 用户体验是否可以改进

请给出具体的改进建议。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AI 的审查往往能发现一些你没注意到的问题。对于核心功能，还可以让多个不同的 AI 大模型同时审查，交叉验证。</p><h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2><p>看到这里，你可能会觉得：这个流程好像有点复杂啊，真的有必要吗？</p><p>我的回答是：绝对有必要！</p><p>我自己至少用 Vibe Coding 做了 30 多个项目，从简单的工具到复杂的全栈应用都有涉及。在我的实践中，那些一开始就做好规划的项目，开发过程都非常顺利，最后也都成功上线了。而那些 “想到哪做到哪” 的项目，大多数都半途而废了。Planning is Everything，这是 Vibe Coding 的第一心法。</p><p>虽然前期需要花时间写文档，但后期开发会非常顺利，AI 生成的代码质量也更高。</p><p>而且好的规划不会限制你的创造力，反而会让你更加自由。因为你知道自己在做什么，知道每一步要往哪里走。</p><p>当然，这个流程也不是死板的。随着你的经验增加，你会找到适合自己的节奏。但在一开始，强烈建议你按照这个流程来做，养成好的习惯。</p><p>最后，再次强调一下这几个关键点：规划比代码更重要、文档是 AI 的指南针、小步迭代不失控、模块化是大项目的关键、版本控制是你的后悔药。</p><p>现在，你已经掌握了完整的项目开发流程。在下一篇文章中，我会带你用这套流程做 5 个实用的个人工具项目，让你体验到这套流程的威力。</p><h2 id="推荐资源" tabindex="-1"><a class="header-anchor" href="#推荐资源" aria-hidden="true">#</a> 推荐资源</h2>`,93),b={href:"https://ai.codefather.cn",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.codefather.cn",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.mianshiya.com",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.laoyujianli.com",target:"_blank",rel:"noopener noreferrer"},x={href:"https://ai.mianshiya.com",target:"_blank",rel:"noopener noreferrer"};function A(I,_){const i=r("ExternalLinkIcon");return d(),t("div",null,[c,e("p",null,[e("a",u,[n("AGENTS.md"),a(i)]),n(" 是一个标准化的文件格式，用来指导 AI 编程工具如何工作。它就像是给 AI 的 “工作手册”。这个标准由 OpenAI、Anthropic、Google 等公司共同推动，目前已经有超过 8 万个开源项目在使用。主流的 AI 编程工具，比如 Cursor、Windsurf、Claude Code、Gemini CLI、GitHub Copilot 等都支持自动读取 AGENTS.md 文件。")]),o,e("p",null,[n("如果你还不会 Git，可以看看 "),e("a",v,[n("鱼皮的 Git 学习路线"),a(i)]),n(" ，很快就能上手。")]),m,e("p",null,[n("1）鱼皮 AI 导航网站："),e("a",b,[n("AI 资源大全、最新 AI 资讯、免费 AI 教程"),a(i)])]),e("p",null,[n("2）编程导航学习圈："),e("a",h,[n("学习路线、编程教程、实战项目、求职宝典、交流答疑"),a(i)])]),e("p",null,[n("3）程序员面试八股文："),e("a",g,[n("实习/校招/社招高频考点、企业真题解析"),a(i)])]),e("p",null,[n("4）程序员写简历神器："),e("a",k,[n("专业模板、丰富例句、直通面试"),a(i)])]),e("p",null,[n("5）1 对 1 模拟面试："),e("a",x,[n("实习/校招/社招面试拿 Offer 必备"),a(i)])])])}const P=l(p,[["render",A],["__file","practise.html.vue"]]);export{P as default};
