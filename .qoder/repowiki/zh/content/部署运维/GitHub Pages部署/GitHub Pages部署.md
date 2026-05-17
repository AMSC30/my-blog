# GitHub Pages部署

<cite>
**本文档引用的文件**
- [publish.sh](file://publish.sh)
- [.github/workflows/deploy.yml](file://.github/workflows/deploy.yml)
- [package.json](file://package.json)
- [.vuepress/config.js](file://.vuepress/config.js)
- [.vuepress/navbar.js](file://.vuepress/navbar.js)
- [.gitignore](file://.gitignore)
- [README.md](file://README.md)
</cite>

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构概览](#架构概览)
5. [详细组件分析](#详细组件分析)
6. [部署流程详解](#部署流程详解)
7. [分支管理策略](#分支管理策略)
8. [手动部署操作指南](#手动部署操作指南)
9. [自动部署配置指南](#自动部署配置指南)
10. [高级配置选项](#高级配置选项)
11. [性能考虑](#性能考虑)
12. [故障排除指南](#故障排除指南)
13. [结论](#结论)

## 简介

本项目是一个基于VuePress构建的静态博客网站，采用GitHub Pages进行自动化部署。项目实现了两种部署方式：手动部署脚本和GitHub Actions自动化部署工作流。通过精心设计的配置，确保了高效的开发体验和可靠的发布流程。

## 项目结构

该项目采用标准的VuePress项目结构，主要包含以下关键目录和文件：

```mermaid
graph TB
subgraph "项目根目录"
A[publish.sh] --> B[发布脚本]
C[package.json] --> D[NPM脚本配置]
E[README.md] --> F[项目说明]
G[.gitignore] --> H[Git忽略规则]
end
subgraph ".vuepress目录"
I[config.js] --> J[VuePress配置]
K[navbar.js] --> L[导航栏配置]
M[public/] --> N[公共资源]
O[styles/] --> P[样式文件]
end
subgraph ".github/workflows"
Q[deploy.yml] --> R[CI/CD工作流]
end
subgraph "文档内容"
S[docs/] --> T[Markdown文档]
U[backend-base/] --> V[后端基础]
W[frontend-base/] --> X[前端基础]
Y[interview/] --> Z[面试题库]
end
```

**图表来源**
- [publish.sh:1-20](file://publish.sh#L1-L20)
- [.github/workflows/deploy.yml:1-36](file://.github/workflows/deploy.yml#L1-L36)
- [.vuepress/config.js:1-18](file://.vuepress/config.js#L1-L18)

**章节来源**
- [publish.sh:1-20](file://publish.sh#L1-L20)
- [.github/workflows/deploy.yml:1-36](file://.github/workflows/deploy.yml#L1-L36)
- [.vuepress/config.js:1-18](file://.vuepress/config.js#L1-L18)

## 核心组件

### 发布脚本组件

发布脚本是手动部署的核心组件，提供了完整的构建和发布流程：

```mermaid
flowchart TD
A[开始] --> B[执行npm run build]
B --> C[切换到dist目录]
C --> D[初始化Git仓库]
D --> E[添加所有文件]
E --> F[提交到本地仓库]
F --> G[强制推送到page分支]
G --> H[返回主目录]
H --> I[添加更改]
I --> J[提交更新]
J --> K[推送到master分支]
K --> L[结束]
```

**图表来源**
- [publish.sh:4-20](file://publish.sh#L4-L20)

### GitHub Actions工作流

自动化部署工作流提供了CI/CD集成，确保代码变更能够自动构建和部署：

```mermaid
sequenceDiagram
participant Dev as 开发者
participant Repo as GitHub仓库
participant Actions as GitHub Actions
participant Pages as GitHub Pages
Dev->>Repo : 推送代码到master分支
Repo->>Actions : 触发工作流
Actions->>Actions : 检出代码
Actions->>Actions : 设置Node.js环境
Actions->>Actions : 安装依赖
Actions->>Actions : 构建项目
Actions->>Pages : 部署到page分支
Pages-->>Dev : 网站更新完成
```

**图表来源**
- [.github/workflows/deploy.yml:3-36](file://.github/workflows/deploy.yml#L3-L36)

**章节来源**
- [publish.sh:1-20](file://publish.sh#L1-L20)
- [.github/workflows/deploy.yml:1-36](file://.github/workflows/deploy.yml#L1-L36)

## 架构概览

项目采用了混合部署架构，结合了手动和自动两种部署方式：

```mermaid
graph TB
subgraph "开发环境"
A[开发者本地]
B[Git仓库]
end
subgraph "部署架构"
C[手动部署]
D[自动部署]
end
subgraph "发布目标"
E[GitHub Pages]
F[page分支]
end
A --> C
A --> D
B --> C
B --> D
C --> E
D --> E
E --> F
```

**图表来源**
- [publish.sh:14](file://publish.sh#L14)
- [.github/workflows/deploy.yml:27-35](file://.github/workflows/deploy.yml#L27-L35)

## 详细组件分析

### VuePress配置组件

VuePress配置文件定义了站点的基本设置和主题配置：

```mermaid
classDiagram
class VuePressConfig {
+string title
+string description
+string logo
+string base
+Theme theme
+Navbar navbar
+Series series
+string catalogTitle
}
class Theme {
+string style
+string colorMode
+boolean darkMode
}
class Navbar {
+NavItem[] items
}
class NavItem {
+string text
+string link
+NavItem[] children
}
VuePressConfig --> Theme
VuePressConfig --> Navbar
Navbar --> NavItem
```

**图表来源**
- [.vuepress/config.js:5-17](file://.vuepress/config.js#L5-L17)
- [.vuepress/navbar.js:1-142](file://.vuepress/navbar.js#L1-L142)

### NPM脚本组件

项目使用NPM脚本管理构建流程，提供了简洁的命令接口：

```mermaid
flowchart LR
A[dev命令] --> B[vuepress dev .]
C[start命令] --> D[vuepress dev .]
E[build命令] --> F[vuepress build .]
subgraph "脚本特点"
G[开发模式]
H[生产模式]
I[热重载]
J[静态生成]
end
B --> G
D --> G
F --> H
```

**图表来源**
- [package.json:8-12](file://package.json#L8-L12)

**章节来源**
- [.vuepress/config.js:1-18](file://.vuepress/config.js#L1-L18)
- [.vuepress/navbar.js:1-142](file://.vuepress/navbar.js#L1-L142)
- [package.json:1-17](file://package.json#L1-L17)

## 部署流程详解

### 手动部署流程

手动部署提供了完全的控制权，适合需要精确控制部署过程的场景：

```mermaid
sequenceDiagram
participant User as 用户
participant Script as 发布脚本
participant Git as Git仓库
participant GitHub as GitHub Pages
User->>Script : 执行publish.sh
Script->>Script : npm run build
Script->>Git : 初始化本地仓库
Script->>Git : 添加构建文件
Script->>Git : 提交到本地
Script->>GitHub : 强制推送到page分支
Script->>Git : 返回主目录
Script->>Git : 添加源码变更
Script->>Git : 提交并推送到master
GitHub-->>User : 部署完成
```

**图表来源**
- [publish.sh:4-20](file://publish.sh#L4-L20)

### 自动部署流程

自动部署通过GitHub Actions实现，提供了无服务器的CI/CD解决方案：

```mermaid
flowchart TD
A[代码推送] --> B{触发条件}
B --> |master分支推送| C[启动工作流]
B --> |其他分支| D[忽略]
C --> E[检出代码]
E --> F[设置Node.js环境]
F --> G[安装依赖]
G --> H[构建项目]
H --> I[部署到GitHub Pages]
I --> J[更新网站]
K[paths-ignore配置] --> L[README.md变更]
L --> M[不触发部署]
```

**图表来源**
- [.github/workflows/deploy.yml:3-36](file://.github/workflows/deploy.yml#L3-L36)

**章节来源**
- [publish.sh:1-20](file://publish.sh#L1-L20)
- [.github/workflows/deploy.yml:1-36](file://.github/workflows/deploy.yml#L1-L36)

## 分支管理策略

项目采用了多分支协作策略，确保开发和发布的分离：

```mermaid
graph TB
subgraph "分支策略"
A[master分支] --> B[开发主分支]
C[page分支] --> D[GitHub Pages分支]
E[开发分支] --> F[功能开发]
end
subgraph "推送策略"
G[手动部署] --> H[强制推送到page分支]
I[自动部署] --> J[监听master分支]
K[源码管理] --> L[推送到master分支]
end
H --> D
J --> D
L --> A
```

**图表来源**
- [publish.sh:14](file://publish.sh#L14)
- [.github/workflows/deploy.yml:5](file://.github/workflows/deploy.yml#L5)

### 分支职责划分

| 分支类型 | 主要用途 | 推送策略 | 保护规则 |
|---------|----------|----------|----------|
| master | 开发主分支 | 推送触发自动部署 | 保护分支 |
| page | GitHub Pages发布 | 手动强制推送 | 不适用 |
| 功能分支 | 新功能开发 | 合并到master | 代码审查 |

**章节来源**
- [publish.sh:14](file://publish.sh#L14)
- [.github/workflows/deploy.yml:5](file://.github/workflows/deploy.yml#L5)

## 手动部署操作指南

### 环境准备

1. **安装依赖**
   ```bash
   npm install
   ```

2. **验证Node.js版本**
   - 确保使用Node.js 16.x版本
   - 检查npm版本兼容性

### 执行部署步骤

1. **构建项目**
   ```bash
   npm run build
   ```

2. **运行发布脚本**
   ```bash
   ./publish.sh
   ```

3. **验证部署结果**
   - 访问GitHub Pages URL
   - 检查页面加载状态
   - 验证导航链接

### 部署脚本详解

发布脚本包含以下关键步骤：

1. **构建阶段**：执行VuePress构建命令生成静态文件
2. **Git初始化**：在dist目录中初始化Git仓库
3. **文件提交**：添加所有构建文件并提交
4. **强制推送**：将构建结果推送到page分支
5. **源码同步**：将源码变更推送到master分支

**章节来源**
- [publish.sh:1-20](file://publish.sh#L1-L20)
- [package.json:8-12](file://package.json#L8-L12)

## 自动部署配置指南

### GitHub Actions配置详解

自动部署工作流配置包含以下关键要素：

```mermaid
flowchart LR
A[触发条件] --> B[push事件]
B --> C[master分支]
C --> D[paths-ignore配置]
E[构建步骤] --> F[Checkout代码]
F --> G[Setup Node.js]
G --> H[Install dependencies]
H --> I[Build project]
J[部署步骤] --> K[peaceiris/actions-gh-pages]
K --> L[配置发布目录]
L --> M[设置GitHub Token]
M --> N[指定目标分支]
```

**图表来源**
- [.github/workflows/deploy.yml:3-36](file://.github/workflows/deploy.yml#L3-L36)

### 必需的环境变量

自动部署需要以下GitHub Secrets配置：

| 秘密名称 | 用途 | 示例值 |
|---------|------|--------|
| ACCESS_TOKEN | GitHub访问令牌 | ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| MY_USER_NAME | Git用户名 | GitHub用户名 |
| MY_USER_EMAIL | Git用户邮箱 | user@email.com |

### 工作流触发条件

工作流配置支持多种触发方式：

1. **分支推送触发**
   - 监听master分支的推送事件
   - 支持路径过滤，避免不必要的触发

2. **手动触发**
   - 可通过GitHub界面手动启动工作流
   - 适用于测试和调试场景

**章节来源**
- [.github/workflows/deploy.yml:1-36](file://.github/workflows/deploy.yml#L1-L36)

## 高级配置选项

### VuePress基础配置

项目使用VuePress 2.0构建，配置了特定的基础路径：

```mermaid
classDiagram
class BaseConfig {
+string title = "AMSC30"
+string description = "笔记"
+string logo = "/logo.png"
+string base = "/my-blog/"
+Theme theme
}
class ThemeConfig {
+string style = "@vuepress-reco/style-default"
+string colorMode = "light"
+boolean darkMode
+Navbar navbar
+Series series
+string catalogTitle = "目录"
}
BaseConfig --> ThemeConfig
```

**图表来源**
- [.vuepress/config.js:5-17](file://.vuepress/config.js#L5-L17)

### 导航栏配置

导航栏采用多层次结构，支持复杂的文档分类：

```mermaid
graph TB
subgraph "导航结构"
A[软件基础] --> B[操作系统]
A --> C[计算机网络]
D[前端基础] --> E[HTML]
D --> F[CSS]
D --> G[JavaScript]
H[Vue2] --> I[Vue源码]
H --> J[Router3源码]
K[Vue3] --> L[Vue语法]
K --> M[Router4语法]
end
```

**图表来源**
- [.vuepress/navbar.js:1-142](file://.vuepress/navbar.js#L1-L142)

### Git忽略配置

项目使用.gitignore排除不需要提交的文件：

| 忽略模式 | 文件类型 | 用途 |
|---------|----------|------|
| `.vuepress/.cache` | 缓存文件 | 开发缓存 |
| `.vuepress/.temp` | 临时文件 | 构建临时文件 |
| `.vuepress/dist/` | 构建产物 | 静态文件 |
| `node_modules` | 依赖包 | NPM包 |
| `/.idea/` | IDE配置 | 开发工具配置 |

**章节来源**
- [.vuepress/config.js:1-18](file://.vuepress/config.js#L1-L18)
- [.vuepress/navbar.js:1-142](file://.vuepress/navbar.js#L1-L142)
- [.gitignore:1-8](file://.gitignore#L1-L8)

## 性能考虑

### 构建优化

1. **增量构建**
   - 利用VuePress的缓存机制
   - 避免重复的依赖安装

2. **资源优化**
   - 图片压缩和懒加载
   - CSS和JavaScript压缩
   - CDN资源使用

### 部署性能

1. **分支选择**
   - page分支专门用于静态文件
   - 避免源码和构建产物混合

2. **工作流优化**
   - 并行执行构建任务
   - 缓存依赖包
   - 选择合适的运行器

## 故障排除指南

### 常见问题及解决方案

#### 1. GitHub Pages部署失败

**症状**：页面无法访问或显示错误

**排查步骤**：
1. 检查page分支是否存在
2. 验证GitHub Pages设置
3. 确认构建日志
4. 检查CNAME文件配置

#### 2. 自动部署工作流失败

**症状**：Actions工作流显示失败

**排查步骤**：
1. 检查GitHub Secrets配置
2. 验证Node.js版本兼容性
3. 查看构建日志
4. 确认依赖安装成功

#### 3. 手动部署脚本错误

**症状**：publish.sh执行失败

**排查步骤**：
1. 检查Git配置
2. 验证SSH密钥
3. 确认权限设置
4. 查看具体错误信息

### 调试技巧

1. **启用详细日志**
   ```bash
   set -x  # 在脚本开头添加
   ```

2. **逐步执行**
   - 分别执行每个命令
   - 检查每步的输出
   - 验证中间状态

3. **环境检查**
   - 验证Node.js版本
   - 检查npm依赖
   - 确认Git配置

### 最佳实践

1. **备份策略**
   - 定期备份page分支
   - 保留最近的构建产物
   - 维护部署历史

2. **监控设置**
   - 设置部署通知
   - 监控构建时间
   - 跟踪访问统计

3. **回滚机制**
   - 保存版本标签
   - 准备回滚脚本
   - 测试回滚流程

**章节来源**
- [publish.sh:1-20](file://publish.sh#L1-L20)
- [.github/workflows/deploy.yml:1-36](file://.github/workflows/deploy.yml#L1-L36)

## 结论

本项目提供了一个完整的GitHub Pages部署解决方案，结合了手动和自动两种部署方式，满足不同场景的需求。通过合理的分支管理、完善的配置和详细的故障排除指南，确保了部署流程的可靠性和可维护性。

关键优势包括：
- **灵活性**：支持手动和自动两种部署方式
- **可靠性**：完善的错误处理和回滚机制
- **可维护性**：清晰的配置结构和文档
- **效率性**：优化的构建和部署流程

建议根据团队规模和需求选择合适的部署方式，并建立相应的监控和维护流程，确保网站的稳定运行。