# 移动电商平台

基于 Vue 3 + Vant 的移动端电商项目

## 项目简介
一个完整的移动端电商解决方案，包含：
- 用户登录/注册
- 商品分类展示
- 商品搜索功能
- 购物车管理
- 个人中心
- 商品详情查看

## 技术栈
- 前端框架：Vue 3
- UI组件库：Vant 4
- 路由管理：Vue Router 4
- 状态管理：Pinia
- 构建工具：Vite
- 网络请求：Axios
- 移动适配：amfe-flexible

## 快速开始

### 安装依赖
```bash
pnpm install

moblile-demo/
├── src/
│   ├── api/          # 接口模块
│   ├── assets/       # 静态资源
│   ├── components/   # 公共组件
│   ├── router/       # 路由配置
│   ├── utils/        # 工具函数
│   ├── views/        # 页面组件
│   ├── App.vue       # 根组件
│   └── main.js       # 入口文件
├── vite.config.js    # Vite配置
└── jsconfig.json     # 路径别名配置
