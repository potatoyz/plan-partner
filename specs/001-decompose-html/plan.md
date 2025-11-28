# 实施计划 (Implementation Plan): 拆解 HTML 并构建现代架构

**分支 (Branch)**: `001-decompose-html` | **日期**: 2025-11-28 | **规格说明书**: [spec.md](./spec.md)
**输入**: 来自 `/specs/001-decompose-html/spec.md` 的功能规格说明书

**注意**: 本模板由 `/speckit.plan` 命令填充。

## 摘要 (Summary)

本功能旨在将原有的单体 `index (3).html` 重构为基于 **Vite + React + TypeScript** 的现代前端工程。
核心工作包括：搭建工程环境、集成 TailwindCSS、配置 Firebase SDK，并将原有 UI 拆解为独立的 React 组件（如 Sidebar, CalendarGrid）。
这将为后续的多人协作功能奠定稳固的架构基础，符合“组件化架构”和“正规工程标准”的宪法原则。

## 技术背景 (Technical Context)

**语言/版本**: TypeScript 5.x (Node.js >= 18)
**核心依赖**: React 18.x, ReactDOM 18.x, Firebase SDK 10.x
**构建工具**: Vite 5.x
**样式方案**: TailwindCSS 3.x (postcss, autoprefixer)
**存储**: Firebase Cloud Firestore (客户端直连)
**测试**: Vitest (单元测试), 手动验证 (视觉回归)
**目标平台**: 现代桌面端浏览器 (Chrome/Edge/Safari)
**项目类型**: Single Page Application (SPA)
**性能目标**: 冷启动 < 1000ms (Vite 默认优势)
**约束**: 必须保留原有 UI 设计风格；必须使用中文注释。

## 宪法检查 (Constitution Check)

*关卡: 必须在 Phase 0 研究前通过。*

- [x] **I. 组件化架构**: 使用 React 构建，拆分 Sidebar/Calendar 组件。 (符合)
- [x] **II. Serverless 优先**: 使用 Firebase SDK 直连，无自定义后端。 (符合)
- [x] **III. 正规工程标准**: 使用 Vite + npm + TypeScript。 (符合)
- [x] **IV. 单一数据源**: 状态管理准备对接 Firestore。 (符合)
- [x] **V. 文档与注释规范**: 计划文档及后续代码注释均使用中文。 (符合)

## 项目结构 (Project Structure)

### 文档结构 (本特性)

```text
specs/001-decompose-html/
├── plan.md              # 本文件
├── research.md          # Phase 0 输出 (架构决策)
├── data-model.md        # Phase 1 输出 (数据实体定义)
├── quickstart.md        # Phase 1 输出 (开发启动指南)
├── contracts/           # Phase 1 输出 (Firestore 集合定义)
└── tasks.md             # Phase 2 输出 (任务列表)
```

### 源码结构 (根目录)

```text
src/
├── components/
│   ├── layout/          # 布局组件 (Sidebar, AppLayout)
│   ├── calendar/        # 日历相关组件 (CalendarGrid, EventCard)
│   └── common/          # 通用 UI 组件 (Button, Input)
├── lib/
│   └── firebase.ts      # Firebase 初始化配置
├── types/
│   └── index.ts         # 全局类型定义 (User, PlanEvent)
├── styles/
│   └── globals.css      # Tailwind 指令及全局样式
├── App.tsx              # 根组件
└── main.tsx             # 入口文件
```

**结构决策**: 采用扁平化的 React 单页应用结构。`components` 按功能模块划分，`lib` 存放基础设施配置，`types` 存放共享类型。

## 复杂度追踪 (Complexity Tracking)

> **仅在违反宪法检查且必须通过时填写**

| 违规项 | 为何需要 | 拒绝简单替代方案的原因 |
|--------|----------|------------------------|
| (无)   | (无)     | (无)                   |