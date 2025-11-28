# Feature Specification: 拆解 HTML 并构建现代架构

**Feature Branch**: `001-decompose-html`  
**Created**: 2025-11-28  
**Status**: Draft  
**Input**: User description: "开始拆解html，生成项目架构"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 工程初始化与环境搭建 (Priority: P1)

作为开发者，我需要一个配置好的 Vite + React + TypeScript + TailwindCSS 开发环境，以便开始组件迁移。

**Why this priority**: 这是所有后续开发的基础，必须首先完成。

**Independent Test**: 运行 `npm run dev` 能成功启动开发服务器，并看到加载了 Tailwind 样式的页面。

**Acceptance Scenarios**:

1. **Given** 一个空文件夹, **When** 执行初始化脚本, **Then** 生成标准的 Vite 项目结构。
2. **Given** 项目已初始化, **When** 运行开发命令, **Then** 浏览器显示应用首页，且无控制台错误。
3. **Given** 项目配置中, **When** 检查 `tailwind.config.js`, **Then** 包含正确的路径配置。

---

### User Story 2 - 核心布局组件化 (Priority: P2)

作为开发者，我需要将原 HTML 中的整体布局（侧边栏、日历视图、事件列表）拆解为独立的 React 组件，以实现代码解耦。

**Why this priority**: 验证原有 HTML/CSS 能在 React 环境下正确渲染，是重构的第一步可见成果。

**Independent Test**: 页面视觉效果与原 `index (3).html` 基本一致，但通过 React 组件树渲染。

**Acceptance Scenarios**:

1. **Given** 原始 HTML 的侧边栏代码, **When** 封装为 `<Sidebar />` 组件, **Then** 在页面左侧正确显示。
2. **Given** 原始 HTML 的日历网格, **When** 封装为 `<CalendarGrid />` 组件, **Then** 能够渲染出时间轴和网格线。
3. **Given** 组件化后的页面, **When** 调整浏览器窗口大小, **Then** 响应式布局表现与原版一致。

---

### User Story 3 - 基础数据模型与 Firebase 连接 (Priority: P3)

作为开发者，我需要定义 TypeScript 接口并配置 Firebase SDK，以便后续接入真实数据。

**Why this priority**: 确立“单一数据源”原则，为逻辑迁移做准备。

**Independent Test**: 应用能成功导入 Firebase 实例，且 TypeScript 类型检查通过。

**Acceptance Scenarios**:

1. **Given** Firebase 配置信息, **When** 应用启动, **Then** 控制台无连接错误。
2. **Given** 定义了 `Event` 接口, **When** 在组件中使用该接口, **Then** IDE 提供正确的类型提示。

### Edge Cases

- **样式冲突**: 原生 CSS 类名可能与 Tailwind 默认样式冲突。
- **资源丢失**: 迁移过程中图片或图标（Lucide）引用路径可能失效。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统**必须**使用 Vite 构建，且支持 TypeScript (TSX)。
- **FR-002**: 系统**必须**集成 TailwindCSS，并迁移原 HTML 中的内联样式或 `<style>` 块。
- **FR-003**: 页面**必须**被拆分为至少 3 个主要层级组件（如 `AppLayout`, `Sidebar`, `Calendar`）。
- **FR-004**: 所有组件文件**必须**包含中文头部注释（遵循宪法 v1.2.0）。
- **FR-005**: 系统**必须**初始化 Firebase App 实例（即使暂不进行读写）。
- **FR-006**: 原有的交互逻辑（如拖拽）在此阶段**可选**迁移，优先保证视觉还原。

### Key Entities *(include if feature involves data)*

- **User (用户)**: 代表当前登录的操作者。
- **PlanEvent (行程事件)**: 包含标题、时间、参与者等信息的核心数据实体。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 开发服务器冷启动时间小于 1000ms。
- **SC-002**: 首页视觉还原度达到 95%（与原 HTML 对比）。
- **SC-003**: TypeScript 类型检查通过率 100%（无 `any` 类型滥用）。
- **SC-004**: 成功将单体 HTML 文件拆分为至少 5 个独立的 `.tsx` 组件文件。