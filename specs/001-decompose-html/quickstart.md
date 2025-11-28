# 快速开始 (Quickstart)

**特性**: 001-decompose-html
**适用**: 开发者

本指南介绍如何启动重构后的 Plan Partner 前端项目。

## 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

## 安装依赖

在项目根目录下运行：

```bash
npm install
```

此命令将安装 React, Vite, TailwindCSS, Firebase SDK 等核心依赖。

## 启动开发服务器

```bash
npm run dev
```

启动后，访问控制台输出的本地地址（通常为 `http://localhost:5173`）。
你应该能看到重构后的首页，视觉上应与原 HTML 版本基本一致。

## 构建生产版本

```bash
npm run build
```

构建产物将输出至 `dist/` 目录。

## 常见问题

**Q: 样式未加载？**
A: 检查 `tailwind.config.js` 的 `content` 路径是否正确覆盖了你的组件文件 (`./src/**/*.{ts,tsx}`)。确保 `src/styles/globals.css` 已在 `main.tsx` 中引入。

**Q: TypeScript 报错？**
A: 运行 `npm run type-check` (需在 package.json 中配置 `tsc --noEmit`) 查看具体类型错误。本阶段要求零 `any` 类型。
