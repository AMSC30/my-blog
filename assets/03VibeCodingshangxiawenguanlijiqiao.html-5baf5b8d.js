import{_ as l,p as d,q as t,s,R as n,t as e,Y as i,n as p}from"./framework-e1bed10d.js";const c={},r=i(`<h1 id="vibe-coding-上下文管理技巧" tabindex="-1"><a class="header-anchor" href="#vibe-coding-上下文管理技巧" aria-hidden="true">#</a> Vibe Coding 上下文管理技巧</h1><blockquote><p>让 AI 真正理解你的项目</p></blockquote><p>你好，我是鱼皮。</p><p>在前两篇文章里，我们讲了 Vibe Coding 的核心心法和对话技巧。今天我们要聊一个更底层、但同样重要的话题 —— 上下文管理。</p><p>你可能遇到过这样的情况：刚开始和 AI 对话时，它表现得很聪明，生成的代码也很符合你的要求。但聊了一会儿之后，它开始失忆了，忘记了你之前说过的技术栈、忘记了项目的设计风格，甚至开始用完全不同的方案来实现功能。</p><p>这不是 AI 变笨了，而是它的记忆出了问题。下面我就来教你如何通过 <strong>上下文工程</strong>，给 AI 装上一个可靠的 “记忆补丁”。</p><h2 id="一、什么是上下文工程" tabindex="-1"><a class="header-anchor" href="#一、什么是上下文工程" aria-hidden="true">#</a> 一、什么是上下文工程</h2><p>在讲具体方法之前，我们先要理解什么是上下文。</p><h3 id="上下文就是-ai-的工作记忆" tabindex="-1"><a class="header-anchor" href="#上下文就是-ai-的工作记忆" aria-hidden="true">#</a> 上下文就是 AI 的工作记忆</h3><p>想象一下，你在和一个新同事合作开发项目。如果你每次都要从头解释项目是什么、用的什么技术、有什么规范，那效率会很低。但如果你们有一份共享的项目文档，新同事看一眼就能明白，那合作就会顺畅很多。</p><p>上下文就是这份 “项目文档”。它包含了 AI 需要知道的所有背景信息：</p><ul><li>你的项目是什么</li><li>用的什么技术栈</li><li>有什么设计规范</li><li>已经完成了哪些功能</li><li>当前在做什么</li></ul><p>有了这些信息，AI 才能给出准确、一致的答案。</p><h3 id="上下文的重要性" tabindex="-1"><a class="header-anchor" href="#上下文的重要性" aria-hidden="true">#</a> 上下文的重要性</h3><p>很多人把精力放在 “写好提示词” 上，但其实，<strong>上下文可能比提示词更重要</strong>。</p><p>一个好的提示词能让 AI 理解你当前的需求，但一个好的上下文能让 AI 理解你的整个项目。前者是 &quot;点&quot;，后者是 &quot;面&quot;。</p><p>举个例子，如果你只说 “帮我写一个按钮”，AI 可能会用原生 HTML 写，也可能用 React 写，样式也是它自己决定的。</p><p>但如果你提供了完整的上下文 “项目用 React、Tailwind CSS、设计风格是简约现代、主色调是蓝色”，AI 就能给你一个完全符合项目风格的按钮。这就是上下文的力量。</p><h3 id="上下文的-3-个层次" tabindex="-1"><a class="header-anchor" href="#上下文的-3-个层次" aria-hidden="true">#</a> 上下文的 3 个层次</h3><p>上下文可以分为 3 个层次：</p><ol><li><p>项目级上下文：整个项目的基本信息，比如技术栈、设计规范、目录结构等。</p></li><li><p>功能级上下文：当前正在开发的功能的信息，比如这个功能要做什么、依赖哪些其他功能等。</p></li><li><p>对话级上下文：当前对话中的临时信息，比如刚才讨论的问题、生成的代码片段等。</p></li></ol><p><img src="https://pic.yupi.icu/1/contextlevel大.jpeg" alt=""></p><p>管理好这三个层次的上下文，你就能让 AI 始终 “在状态”。</p><h2 id="二、ai-的短期记忆" tabindex="-1"><a class="header-anchor" href="#二、ai-的短期记忆" aria-hidden="true">#</a> 二、AI 的短期记忆</h2><p>我们先从最基础的开始 —— 如何管理 AI 的短期记忆？</p><h3 id="什么是上下文窗口" tabindex="-1"><a class="header-anchor" href="#什么是上下文窗口" aria-hidden="true">#</a> 什么是上下文窗口？</h3><p>AI 有一个上下文窗口（Context Window），可以理解为它的短期记忆容量。这个窗口是有限的，通常是几千到几十万个 token（大约相当于几千到几十万个单词）。</p><p>当你和 AI 对话时，每条消息都会占用这个窗口的空间。对话越长，窗口就越满。当窗口满了，早期的对话内容就会被遗忘。</p><p>这就是为什么 AI 会失忆，不是它真的忘了，而是早期的信息已经被挤出窗口了。</p><h3 id="一个对话-一个任务" tabindex="-1"><a class="header-anchor" href="#一个对话-一个任务" aria-hidden="true">#</a> 一个对话，一个任务</h3><p>最简单的管理方法就是：<strong>一个对话只做一件事</strong>。</p><p>不要在一个对话里既讨论登录功能，又讨论支付功能，还讨论性能优化。这样会让上下文变得混乱，AI 也容易搞混。</p><p>正确的做法是：</p><ul><li>做登录功能时，开一个新对话</li><li>做完了，测试通过了，再开一个新对话做支付功能</li><li>遇到性能问题，又开一个新对话专门讨论优化</li></ul><p>每个对话都聚焦一个任务，上下文就会保持清晰。</p><p>当然，如果是多个简单的功能，都放在一个对话里也没有问题，灵活一点~</p><h3 id="定期压缩上下文" tabindex="-1"><a class="header-anchor" href="#定期压缩上下文" aria-hidden="true">#</a> 定期压缩上下文</h3><p>如果一个任务确实需要很长的对话，你可以定期压缩上下文。</p><p>具体做法是：当对话进行到一半时，让 AI 总结一下到目前为止的进展。</p><p>有些 AI 编程工具自带了总结上下文的指令，可以直接使用：</p><p><img src="https://pic.yupi.icu/1/image-20260104180238760.png" alt=""></p><p>也可以手动输入提示词来总结：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>请总结一下我们到目前为止做了什么，包括：
1）完成了哪些功能
2）使用了哪些技术方案
3）还有哪些待解决的问题
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，你可以用这个总结开始一个新对话，继续后面的工作。这样就相当于把之前的长对话压缩成了一个简短的总结。</p><h3 id="善用回顾" tabindex="-1"><a class="header-anchor" href="#善用回顾" aria-hidden="true">#</a> 善用回顾</h3><p>在新对话开始时，让 AI 简单回顾一下之前的内容。</p><p>比如：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>我们之前做了一个登录表单，使用了 React Hook Form 和 Zod 验证。现在我想在登录成功后跳转到首页。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样 AI 就能快速回忆起之前的工作，给出连贯的答案。</p><h2 id="三、ai-的长期记忆" tabindex="-1"><a class="header-anchor" href="#三、ai-的长期记忆" aria-hidden="true">#</a> 三、AI 的长期记忆</h2><p>除了对话中的短期记忆，你还需要给项目建立长期记忆，典型的做法是 <strong>提供项目文档</strong>。</p><h3 id="readme-md-项目的身份证" tabindex="-1"><a class="header-anchor" href="#readme-md-项目的身份证" aria-hidden="true">#</a> README.md 项目的身份证</h3><p><code>README.md</code> 是项目最重要的文档，它应该包含：</p><ol><li><p>项目简介：这个项目是做什么的，解决什么问题</p></li><li><p>技术栈：用了哪些技术、框架、库</p></li><li><p>目录结构：主要文件和文件夹的作用</p></li><li><p>开发规范：代码风格、命名规则等</p></li><li><p>如何运行：安装依赖、启动项目的命令</p></li></ol><p>一个好的 <code>README.md</code> 应该让任何人（包括 AI）看一眼就能理解项目的基本情况。</p><p>举个例子：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 我的博客系统</span>

一个简洁的个人博客系统，支持 Markdown 写作和代码高亮。

<span class="token title important"><span class="token punctuation">##</span> 技术栈</span>

<span class="token list punctuation">-</span> 前端：Next.js 14 (App Router) + TypeScript + Tailwind CSS
<span class="token list punctuation">-</span> 后端：Supabase (PostgreSQL + Auth)
<span class="token list punctuation">-</span> 部署：Vercel

<span class="token title important"><span class="token punctuation">##</span> 目录结构</span>

<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/app\`</span> - Next.js 页面和路由
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/components\`</span> - 可复用组件
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/lib\`</span> - 工具函数和配置
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/public\`</span> - 静态资源

<span class="token title important"><span class="token punctuation">##</span> 开发规范</span>

<span class="token list punctuation">-</span> 使用函数式组件，不用 class 组件
<span class="token list punctuation">-</span> 所有组件都要有 TypeScript 类型
<span class="token list punctuation">-</span> 样式使用 Tailwind CSS，不写自定义 CSS
<span class="token list punctuation">-</span> API 调用统一使用 <span class="token code-snippet code keyword">\`/lib/api.ts\`</span> 中的函数

<span class="token title important"><span class="token punctuation">##</span> 如何运行</span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">bash</span>
<span class="token code-block language-bash language-bash language-bash"><span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,57),o=s("code",null,"README.md",-1),u={href:"https://github.com/liyupi/yu-ai-code-mother",target:"_blank",rel:"noopener noreferrer"},v=i(`<p>每次开始新对话时，把 <code>README.md</code> 的内容贴给 AI，它就能快速了解你的项目。</p><h3 id="todo-md-项目的任务清单" tabindex="-1"><a class="header-anchor" href="#todo-md-项目的任务清单" aria-hidden="true">#</a> TODO.md 项目的任务清单</h3><p><code>TODO.md</code> 记录了项目的待办事项和进度，它应该包含：</p><ol><li><p>已完成的功能：哪些功能已经做好了</p></li><li><p>正在开发的功能：当前在做什么</p></li><li><p>待开发的功能：接下来要做什么</p></li><li><p>已知问题：有哪些 bug 或待优化的地方</p></li></ol><p>举个例子：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 开发进度</span>

<span class="token title important"><span class="token punctuation">##</span> 已完成 ✅</span>

<span class="token list punctuation">-</span> [x] 用户注册和登录
<span class="token list punctuation">-</span> [x] 文章列表页
<span class="token list punctuation">-</span> [x] 文章详情页
<span class="token list punctuation">-</span> [x] Markdown 渲染

<span class="token title important"><span class="token punctuation">##</span> 进行中 🚧</span>

<span class="token list punctuation">-</span> [ ] 文章编辑功能
  <span class="token list punctuation">-</span> [x] 编辑器界面
  <span class="token list punctuation">-</span> [ ] 保存草稿
  <span class="token list punctuation">-</span> [ ] 发布文章

<span class="token title important"><span class="token punctuation">##</span> 待开发 📋</span>

<span class="token list punctuation">-</span> [ ] 评论功能
<span class="token list punctuation">-</span> [ ] 搜索功能
<span class="token list punctuation">-</span> [ ] 标签系统

<span class="token title important"><span class="token punctuation">##</span> 已知问题 🐛</span>

<span class="token list punctuation">-</span> 移动端导航栏在某些设备上显示不正常
<span class="token list punctuation">-</span> 代码高亮在暗色主题下对比度不够
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>TODO.md</code> 能让你和 AI 都清楚地知道项目的进度，避免重复工作或遗漏功能。</p><h3 id="及时更新文档" tabindex="-1"><a class="header-anchor" href="#及时更新文档" aria-hidden="true">#</a> 及时更新文档</h3><p>文档最大的问题就是过时。所以，每次完成一个功能或做了重要改动，都要及时更新 <code>README.md</code> 和 <code>TODO.md</code>。</p><p>你可以让 AI 帮你更新：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>我们刚才完成了文章编辑功能。请帮我更新 TODO.md，把 &quot;文章编辑功能&quot; 标记为已完成。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>AI 自然也知道这件事的重要性，所以在我们生成代码时 AI 可能会自动为我们生成这些文档。</p><h2 id="四、ai-编程工具的上下文策略" tabindex="-1"><a class="header-anchor" href="#四、ai-编程工具的上下文策略" aria-hidden="true">#</a> 四、AI 编程工具的上下文策略</h2><p>不同的 AI 工具对上下文的处理方式不同，你需要了解它们的特点。</p><h3 id="cursor-的-cursorrules" tabindex="-1"><a class="header-anchor" href="#cursor-的-cursorrules" aria-hidden="true">#</a> Cursor 的 .cursorrules</h3><p>Cursor 支持在项目根目录创建 <code>.cursorrules</code> 文件，作为项目的系统提示词。</p><p>你可以在这个文件里写上：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>这是一个 Next.js 的博客项目。

技术栈：
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase

代码规范：
- 使用函数式组件
- 所有组件必须有 TypeScript 类型定义
- 样式只用 Tailwind CSS
- 不要使用 any 类型

设计风格：
- 简约、现代
- 主色调：#3B82F6 (蓝色)
- 圆角：8px
- 阴影：subtle

请始终遵循这些规范。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，Cursor 在生成代码时就会自动参考这些规则。</p>`,19),m={href:"https://cursor.com/cn/docs/context/rules",target:"_blank",rel:"noopener noreferrer"},b=i(`<p><img src="https://pic.yupi.icu/1/image-20260104181209687.png" alt=""></p><h3 id="claude-code-的-claude-md" tabindex="-1"><a class="header-anchor" href="#claude-code-的-claude-md" aria-hidden="true">#</a> Claude Code 的 CLAUDE.md</h3><p>Claude Code 会读取项目根目录下的 <code>CLAUDE.md</code> 文件作为上下文。</p><p>你可以在这个文件里放更详细的信息：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 项目上下文</span>

<span class="token title important"><span class="token punctuation">##</span> 项目概述</span>
个人博客系统，支持 Markdown 写作。

<span class="token title important"><span class="token punctuation">##</span> 技术栈</span>
<span class="token list punctuation">-</span> Next.js 16 + TypeScript + Tailwind CSS
<span class="token list punctuation">-</span> Supabase (数据库 + 认证)

<span class="token title important"><span class="token punctuation">##</span> 重要决策</span>
<span class="token list punctuation">1.</span> 为什么选择 Supabase：简单、免费额度够用、自带认证
<span class="token list punctuation">2.</span> 为什么用 App Router：这是 Next.js 的未来方向
<span class="token list punctuation">3.</span> 为什么不用 Redux：项目简单，用 React Context 就够了

<span class="token title important"><span class="token punctuation">##</span> 已知问题</span>
<span class="token list punctuation">-</span> 移动端导航栏需要优化
<span class="token list punctuation">-</span> 代码高亮主题需要调整

<span class="token title important"><span class="token punctuation">##</span> 下一步计划</span>
<span class="token list punctuation">-</span> 实现评论功能
<span class="token list punctuation">-</span> 添加搜索
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件相当于给 AI 的项目手册。</p><h3 id="通用策略-上下文文件夹" tabindex="-1"><a class="header-anchor" href="#通用策略-上下文文件夹" aria-hidden="true">#</a> 通用策略：上下文文件夹</h3><p>如果你用的工具不支持特定的上下文文件，可以创建一个 <code>/docs</code> 文件夹，把所有文档放在里面：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/docs
  - README.md (项目概述)
  - TECH_STACK.md (技术栈详情)
  - DESIGN.md (设计规范)
  - API.md (API 文档)
  - TODO.md (任务清单)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次开始新对话时，把相关文档的内容贴给 AI 就好。</p><h2 id="五、上下文断裂的修复技巧" tabindex="-1"><a class="header-anchor" href="#五、上下文断裂的修复技巧" aria-hidden="true">#</a> 五、上下文断裂的修复技巧</h2><p>即使你做好了上下文管理，有时候 AI 还是会断片儿。这时候，你需要知道如何修复。</p><h3 id="怎么识别断裂" tabindex="-1"><a class="header-anchor" href="#怎么识别断裂" aria-hidden="true">#</a> 怎么识别断裂？</h3><p>上下文断裂一般有这些表现：</p><ul><li>AI 突然用了不同的技术栈（比如你明明用 React，它却给你写 Vue 代码）</li><li>AI 忘记了之前讨论的设计方案</li><li>AI 生成的代码风格和之前的不一致</li><li>AI 重复问你已经回答过的问题</li></ul><p>一旦发现这些信号，就要及时修复。</p><h3 id="修复方法-1、重新提供上下文" tabindex="-1"><a class="header-anchor" href="#修复方法-1、重新提供上下文" aria-hidden="true">#</a> 修复方法 1、重新提供上下文</h3><p>最简单的方法就是重新把上下文贴一遍。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>等等，我们的项目用的是 React 和 TypeScript，不是 Vue。
这是我们的技术栈：【贴上 README.md 的技术栈部分】。请用正确的技术栈重新生成代码。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修复方法-2、引用之前的内容" tabindex="-1"><a class="header-anchor" href="#修复方法-2、引用之前的内容" aria-hidden="true">#</a> 修复方法 2、引用之前的内容</h3><p>如果是忘记了之前讨论的内容，可以引用一下。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>还记得我们之前决定用 Context API 管理状态吗？请继续用这个方案，不要改用 Redux。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修复方法-3、开新对话" tabindex="-1"><a class="header-anchor" href="#修复方法-3、开新对话" aria-hidden="true">#</a> 修复方法 3、开新对话</h3><p>如果上下文已经混乱到无法修复（比如同一个 Bug 多次修复都没有结果），最好的办法就是开一个新对话。</p><p>在新对话中，先提供完整的上下文，然后继续工作。这样虽然要重新开始，但能保证后续的对话质量。</p><h3 id="修复方法-4、回到正轨提示词" tabindex="-1"><a class="header-anchor" href="#修复方法-4、回到正轨提示词" aria-hidden="true">#</a> 修复方法 4、回到正轨提示词</h3><p>有时候，你可以用一个明确的提示让 AI 回到正轨。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>请暂停。我们现在的目标是实现登录功能，使用 React Hook Form 和 Supabase Auth。
请确认你理解了这个目标，然后我们继续。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这相当于给 AI 一个重启的机会。不过鱼皮测试下来，有时这个提示词不一定会生效。</p><h2 id="六、上下文管理的最佳实践" tabindex="-1"><a class="header-anchor" href="#六、上下文管理的最佳实践" aria-hidden="true">#</a> 六、上下文管理的最佳实践</h2><p>基于我的经验和社区的总结，这里是一些上下文管理的最佳实践。</p><h3 id="_1、项目开始时就建立文档" tabindex="-1"><a class="header-anchor" href="#_1、项目开始时就建立文档" aria-hidden="true">#</a> 1、项目开始时就建立文档</h3><p>不要等到项目做到一半才想起来写文档。从第一天就创建 <code>README.md</code> 和 <code>TODO.md</code>，并保持更新。</p><p>这样不仅能帮助 AI，也能帮助你自己理清思路。</p><h3 id="_2、用工具的原生上下文机制" tabindex="-1"><a class="header-anchor" href="#_2、用工具的原生上下文机制" aria-hidden="true">#</a> 2、用工具的原生上下文机制</h3><p>如果你用的工具支持特定的上下文文件（比如 <code>.cursorrules</code>），优先使用这些机制，它们是最高效的。</p><h3 id="_3、保持上下文简洁" tabindex="-1"><a class="header-anchor" href="#_3、保持上下文简洁" aria-hidden="true">#</a> 3、保持上下文简洁</h3><p>上下文不是越多越好。太多的信息反而会让 AI 困惑。</p><p>建议只提供最重要、最相关的信息。如果一个信息对当前任务没用，就不要放进上下文，还会浪费 tokens。</p><h3 id="实践四-用层次化的结构" tabindex="-1"><a class="header-anchor" href="#实践四-用层次化的结构" aria-hidden="true">#</a> 实践四：用层次化的结构</h3><p>建议把上下文分成不同的层次和文件，而不是全部堆在一个文件里。</p><p>比如：</p><ul><li>README.md 放项目概述和基本信息</li><li>TECH_STACK.md 放详细的技术栈说明</li><li>DESIGN.md 放设计规范</li><li>每个功能模块有自己的文档</li></ul><h3 id="实践五-定期回顾和更新" tabindex="-1"><a class="header-anchor" href="#实践五-定期回顾和更新" aria-hidden="true">#</a> 实践五：定期回顾和更新</h3><p>每周或每完成一个大功能，回顾一下文档，看看有没有过时的内容，及时更新。</p><p>你可以让 AI 帮你检查：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>请检查我的 README.md，看看有没有和当前代码不一致的地方。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、用注释增强代码上下文" tabindex="-1"><a class="header-anchor" href="#_6、用注释增强代码上下文" aria-hidden="true">#</a> 6、用注释增强代码上下文</h3><p>在代码里加上有意义的注释，解释 &quot;为什么&quot; 而不只是 &quot;是什么&quot;。</p><p>❌ 不好的注释：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 获取用户数据</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getUser</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>✅ 好的注释：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 从 Supabase 获取用户数据</span>
<span class="token comment">// 注意：这里不包含敏感信息（如密码），只返回公开字段</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getUser</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好的注释能帮助 AI 理解代码的意图，在修改时做出更合理的决策。</p><h2 id="七、实战案例-建立完整的上下文体系" tabindex="-1"><a class="header-anchor" href="#七、实战案例-建立完整的上下文体系" aria-hidden="true">#</a> 七、实战案例：建立完整的上下文体系</h2><p>让我用一个真实的例子，展示如何为项目建立完整的上下文体系。</p><p>假设你要做一个在线笔记应用。</p><h3 id="第一步、创建-readme-md" tabindex="-1"><a class="header-anchor" href="#第一步、创建-readme-md" aria-hidden="true">#</a> 第一步、创建 README.md</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 在线笔记应用</span>

一个简洁的在线笔记应用，支持 Markdown 编辑和实时保存。

<span class="token title important"><span class="token punctuation">##</span> 技术栈</span>

<span class="token list punctuation">-</span> 前端：React 18 + TypeScript + Vite
<span class="token list punctuation">-</span> UI 库：Tailwind CSS + Headless UI
<span class="token list punctuation">-</span> 编辑器：CodeMirror 6
<span class="token list punctuation">-</span> 后端：Supabase (PostgreSQL + Realtime)
<span class="token list punctuation">-</span> 部署：Vercel

<span class="token title important"><span class="token punctuation">##</span> 核心功能</span>

<span class="token list punctuation">1.</span> 用户注册和登录
<span class="token list punctuation">2.</span> 创建、编辑、删除笔记
<span class="token list punctuation">3.</span> Markdown 实时预览
<span class="token list punctuation">4.</span> 笔记自动保存
<span class="token list punctuation">5.</span> 笔记搜索

<span class="token title important"><span class="token punctuation">##</span> 目录结构</span>

<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/src/components\`</span> - React 组件
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/src/pages\`</span> - 页面组件
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/src/lib\`</span> - 工具函数和 API
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/src/hooks\`</span> - 自定义 Hooks
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`/src/types\`</span> - TypeScript 类型定义

<span class="token title important"><span class="token punctuation">##</span> 开发规范</span>

<span class="token list punctuation">-</span> 组件使用函数式组件 + Hooks
<span class="token list punctuation">-</span> 所有组件必须有 TypeScript 类型
<span class="token list punctuation">-</span> 样式只用 Tailwind CSS
<span class="token list punctuation">-</span> API 调用统一使用 <span class="token code-snippet code keyword">\`/src/lib/api\`</span> 中的函数
<span class="token list punctuation">-</span> 状态管理使用 Zustand

<span class="token title important"><span class="token punctuation">##</span> 设计风格</span>

<span class="token list punctuation">-</span> 简约、专业
<span class="token list punctuation">-</span> 主色调：#6366F1 (Indigo)
<span class="token list punctuation">-</span> 圆角：6px
<span class="token list punctuation">-</span> 字体：Inter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第二步、创建-todo-md" tabindex="-1"><a class="header-anchor" href="#第二步、创建-todo-md" aria-hidden="true">#</a> 第二步、创建 TODO.md</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 开发进度</span>

<span class="token title important"><span class="token punctuation">##</span> 已完成 ✅</span>

<span class="token list punctuation">-</span> [x] 项目初始化
<span class="token list punctuation">-</span> [x] Supabase 配置
<span class="token list punctuation">-</span> [x] 用户认证（注册/登录）
<span class="token list punctuation">-</span> [x] 笔记列表页面

<span class="token title important"><span class="token punctuation">##</span> 进行中 🚧</span>

<span class="token list punctuation">-</span> [ ] 笔记编辑器
  <span class="token list punctuation">-</span> [x] CodeMirror 集成
  <span class="token list punctuation">-</span> [x] Markdown 语法高亮
  <span class="token list punctuation">-</span> [ ] 实时预览
  <span class="token list punctuation">-</span> [ ] 自动保存

<span class="token title important"><span class="token punctuation">##</span> 待开发 📋</span>

<span class="token list punctuation">-</span> [ ] 笔记搜索
<span class="token list punctuation">-</span> [ ] 笔记分类/标签
<span class="token list punctuation">-</span> [ ] 导出功能
<span class="token list punctuation">-</span> [ ] 暗色主题

<span class="token title important"><span class="token punctuation">##</span> 已知问题 🐛</span>

<span class="token list punctuation">-</span> 编辑器在移动端性能不佳
<span class="token list punctuation">-</span> 长笔记加载较慢
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三步、创建-rules-规则文件" tabindex="-1"><a class="header-anchor" href="#第三步、创建-rules-规则文件" aria-hidden="true">#</a> 第三步、创建 rules 规则文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>项目：在线笔记应用

技术栈：
- React 18 + TypeScript + Vite
- Tailwind CSS + Headless UI
- CodeMirror 6
- Supabase
- Zustand (状态管理)

代码规范：
- 使用函数式组件
- 所有组件必须有 TypeScript 类型定义
- Props 类型命名：组件名 + Props (如 EditorProps)
- 样式只用 Tailwind CSS
- 不使用 any 类型
- API 调用必须有错误处理

设计规范：
- 主色调：#6366F1
- 圆角：rounded-md (6px)
- 间距：使用 Tailwind 的标准间距 (4, 8, 12, 16...)
- 按钮：px-4 py-2, hover 时变深色
- 输入框：border-gray-300, focus 时 border-indigo-500

命名规范：
- 组件文件：PascalCase (如 NoteEditor.tsx)
- 工具函数：camelCase (如 formatDate.ts)
- 常量：UPPER_SNAKE_CASE (如 API_URL)

请始终遵循这些规范。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第四步、在代码中添加上下文注释" tabindex="-1"><a class="header-anchor" href="#第四步、在代码中添加上下文注释" aria-hidden="true">#</a> 第四步、在代码中添加上下文注释</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/lib/api/notes.ts</span>

<span class="token doc-comment comment">/**
 * 笔记 API 函数集合
 * 
 * 技术选择说明：
 * - 使用 Supabase Client 而不是直接的 SQL
 * - 所有函数都返回 <span class="token punctuation">{</span> data, error <span class="token punctuation">}</span> 格式
 * - 错误统一在这里处理，不抛出异常
 */</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> supabase <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./supabase&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Note <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/types&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个完整的上下文体系，无论你什么时候开始新对话，只要把相关文档贴给 AI，它就能快速进入状态，给出准确的答案。</p><h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2><p>上下文工程是 Vibe Coding 中最容易被忽视，但又极其重要的一环。很多人把精力都放在 “怎么问” 上，却忽略了 “怎么让 AI 记住”。</p><p>让我总结一下本文的要点：</p><ol><li><p>上下文是 AI 的工作记忆：它决定了 AI 能否理解你的项目。</p></li><li><p>管理好三个层次：项目级、功能级、对话级上下文都要照顾到。</p></li><li><p>建立文档体系：README.md、TODO.md、上下文文件缺一不可。</p></li><li><p>利用工具特性：不同工具有不同的上下文机制，要善用它们。</p></li><li><p>及时修复断裂：发现 AI 失忆了，要立刻修复，不要继续往下走。</p></li><li><p>保持简洁和更新：上下文要精炼、准确、及时更新。</p></li></ol><p>掌握了上下文工程，你就能让 AI 始终保持状态，大大提高开发效率。</p><p>下一篇文章，我会讲解调试 AI 幻觉的方法，教你如何应对 AI 出错的情况。</p><p>加油，冲冲冲！💪</p><h2 id="推荐资源" tabindex="-1"><a class="header-anchor" href="#推荐资源" aria-hidden="true">#</a> 推荐资源</h2>`,74),h={href:"https://ai.codefather.cn",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.codefather.cn",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.mianshiya.com",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.laoyujianli.com",target:"_blank",rel:"noopener noreferrer"},A={href:"https://ai.mianshiya.com",target:"_blank",rel:"noopener noreferrer"};function I(w,f){const a=p("ExternalLinkIcon");return d(),t("div",null,[r,s("p",null,[n("鱼皮开源项目的 "),o,n(" 基本都是遵循这种结构化格式的，比如 "),s("a",u,[n("AI 零代码应用生成平台项目"),e(a)]),n("，供大家参考。")]),v,s("p",null,[n("💡 注意，随着 AI 编程工具的更新，这些规则可能会有变化，建议还是多看看 "),s("a",m,[n("官方文档"),e(a)]),n("。")]),b,s("p",null,[n("1）鱼皮 AI 导航网站："),s("a",h,[n("AI 资源大全、最新 AI 资讯、免费 AI 教程"),e(a)])]),s("p",null,[n("2）编程导航学习圈："),s("a",k,[n("学习路线、编程教程、实战项目、求职宝典、交流答疑"),e(a)])]),s("p",null,[n("3）程序员面试八股文："),s("a",g,[n("实习/校招/社招高频考点、企业真题解析"),e(a)])]),s("p",null,[n("4）程序员写简历神器："),s("a",x,[n("专业模板、丰富例句、直通面试"),e(a)])]),s("p",null,[n("5）1 对 1 模拟面试："),s("a",A,[n("实习/校招/社招面试拿 Offer 必备"),e(a)])])])}const S=l(c,[["render",I],["__file","03VibeCodingshangxiawenguanlijiqiao.html.vue"]]);export{S as default};
