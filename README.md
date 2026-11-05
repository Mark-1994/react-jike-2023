# 极客园 · React 内容发布管理系统

基于 React + Ant Design 搭建的内容发布管理后台，包含登录鉴权、文章管理、文章发布/编辑、数据统计等模块。

- **在线预览**：<https://mark-1994.github.io/react-jike-2023/>
- **接口文档**：<http://geek.itheima.net/api.html>

## 项目简介

极客园是一个面向内容创作者的资讯管理后台。项目使用 Create React App（CRACO）作为脚手架，采用 Redux Toolkit 管理全局状态，Axios 统一封装请求并处理 Token 鉴权与 401 失效跳转。

## 功能特性

- **登录鉴权**：手机号 + 验证码登录，Token 持久化，未登录自动跳转登录页
- **路由守卫**：基于 `AuthRoute` 组件拦截未授权访问
- **文章列表**：按状态 / 频道 / 日期筛选，分页展示，支持删除文章
- **文章发布**：富文本编辑、封面上传、频道选择，支持存为草稿
- **文章编辑**：回显文章详情并支持修改保存
- **数据统计**：使用 ECharts 展示图表数据
- **工程化**：路由懒加载 + Suspense、`@` 别名、请求/响应拦截器统一处理

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | React 19 |
| 路由 | React Router 7 |
| 状态管理 | Redux Toolkit + React-Redux |
| UI 组件库 | Ant Design 6 |
| 网络请求 | Axios |
| 富文本编辑器 | react-quill-new |
| 图表 | ECharts 6 |
| 样式 | Sass + normalize.css |
| 构建工具 | Create React App 5 + CRACO |

## 目录结构

```text
react-jike
├── public/                 # 静态资源
├── src/
│   ├── apis/               # 接口封装（article / publish / user）
│   ├── assets/             # 图片等资源
│   ├── components/         # 公共组件（AuthRoute 路由守卫）
│   ├── hooks/              # 自定义 hooks（useChannel）
│   ├── pages/              # 页面
│   │   ├── Article/        # 文章列表
│   │   ├── Home/           # 首页数据统计（含 BarChart）
│   │   ├── Layout/         # 整体布局
│   │   ├── Login/          # 登录
│   │   └── Publish/        # 发布 / 编辑文章
│   ├── router/             # 路由配置
│   ├── store/              # Redux Toolkit 状态管理
│   ├── utils/              # 请求封装、Token 工具
│   ├── App.js
│   └── index.js
├── craco.config.js         # CRACO 配置（@ 别名）
├── jsconfig.json
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 本地启动

```bash
npm start
```

启动后访问 <http://localhost:3000>。

### 生产构建

```bash
npm run build
```

构建产物输出到 `build` 目录。

## 测试账号

| 手机号 | 验证码 |
| --- | --- |
| 13800000002 | 246810 |

## 接口说明

- 接口根地址：`https://geek.itheima.net/v1_0`
- 请求封装位置：`src/utils/request.js`
- 鉴权方式：请求头携带 `Authorization: Bearer <token>`
- Token 失效（401）时会自动清除本地 Token 并跳转登录页
- 图片上传地址：`https://geek.itheima.net/v1_0/upload`

## 部署

项目通过 `package.json` 中的 `homepage` 字段指定 GitHub Pages 部署路径：

```json
"homepage": "https://mark-1994.github.io/react-jike-2023/"
```

执行 `npm run build` 后，将 `build` 目录发布到 `gh-pages` 分支即可。
