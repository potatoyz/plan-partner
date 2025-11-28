# Plan Partner 多人协作行程规划

Plan Partner 是一个基于 React 和 Firebase 构建的现代化多人协作行程规划应用。旨在提供流畅的日历视图和实时协作体验，帮助团队或朋友轻松规划行程。

## 核心特性

- **组件化架构**: 基于 React 的现代化 UI 开发。
- **Serverless 优先**: 直接利用 Firebase (Firestore, Auth) 提供强大的后端能力。
- **类型安全**: 全面采用 TypeScript，确保代码健壮性。
- **现代化构建**: 使用 Vite 极速启动，TailwindCSS 提供高效样式开发。

## 技术栈

- **前端框架**: React 18.x
- **开发语言**: TypeScript 5.x
- **构建工具**: Vite 5.x
- **样式方案**: TailwindCSS 3.x
- **后端服务**: Firebase (Authentication, Cloud Firestore)
- **图标库**: Lucide React

## 开发指南

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 快速开始

1. **安装依赖**

   ```bash
   npm install
   ```

2. **启动开发服务器**

   ```bash
   npm run dev
   ```
   
   访问终端输出的本地地址（通常为 `http://localhost:5173`）。

3. **构建生产版本**

   ```bash
   npm run build
   ```

4. **类型检查**

   ```bash
   npm run type-check
   ```

## 项目结构

```text
src/
├── components/
│   ├── layout/          # 布局组件 (侧边栏, 应用框架)
│   ├── calendar/        # 日历相关组件 (日历网格, 事件卡片)
│   └── common/          # 通用 UI 组件 (按钮, 输入框)
├── lib/
│   └── firebase.ts      # Firebase 初始化配置
├── types/
│   └── index.ts         # 全局类型定义 (用户, 行程事件)
├── styles/
│   └── globals.css      # Tailwind 指令及全局样式
├── App.tsx              # 根组件
└── main.tsx             # 入口文件
```

## 贡献规范

本项目严格遵循宪法 (Constitution) 开发：

1. **语言规范**: 所有文档、代码注释、提交信息必须使用**中文**。
2. **文件头**: 每个代码文件必须包含文件用途说明及变更日志。
3. **单一数据源**: 业务状态以 Firestore 为准，本地状态仅用于 UI 交互。

详细规范请参阅 `.specify/memory/constitution.md`。

## 许可证

[License Name]
