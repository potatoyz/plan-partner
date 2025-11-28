<!-- Sync Impact Report:
Version Change: 1.2.0 -> 1.3.0
Modified Principles: Principle V (Added explicit Spec File language requirement)
Added Sections: None
Removed Sections: None
Templates Pending: None
TODOs: None
-->
# Plan Partner 项目章程

## 核心原则 (Core Principles)

### I. 组件化架构 (Component-Based Architecture)
应用**必须**使用 React 构建，将原有的单体 HTML 结构彻底分解为可重用、独立的组件。UI 逻辑、状态管理和渲染职责必须解耦，以确保代码的可维护性和可测试性。

### II. Serverless 优先 (Serverless First)
应用**应当**直接通过客户端 SDK 使用 Firebase 提供的后端服务（身份认证 Authentication、数据库 Cloud Firestore、存储 Storage）。除非有特定的安全合规要求或极度复杂的业务逻辑严格需要，否则**明确禁止**引入自定义后端服务器（如 Node.js, Python）。此举旨在降低基础设施维护成本，贯彻“纯前端”架构愿景。

### III. 正规工程标准 (Formal Engineering Standards)
项目**必须**从基于 CDN 的单文件引入模式，过渡到基于包管理（npm/yarn）的现代构建系统（如 Vite）。代码**必须**实现模块化（ES Modules），并**强烈建议**采用静态类型（TypeScript）以提升代码质量和重构过程的安全性。

### IV. 单一数据源 (Single Source of Truth)
状态管理必须具有可预测性。本地组件状态（Local State）仅用于处理 UI 交互细节，而全局应用状态（与 Firebase 实时同步的数据）**必须**作为数据的唯一真实来源。

### V. 文档与注释规范 (Documentation & Comment Standards)
为了确保代码的可读性与维护性，所有开发活动必须遵循以下规范：
1.  **语言统一**：项目内所有的文档（**包括所有的规格说明书 Spec Files、计划文档 Plans、任务文档 Tasks、调研文档 Research**）、代码注释、提交信息（Commit Message）除必要的技术术语外，**必须**使用**中文**编写。
2.  **文件头规范**：每个代码文件的头部**必须**包含注释块，声明文件的用途及变更日志（Changelog）。
3.  **函数注释**：所有公共函数及复杂逻辑块**必须**包含注释，明确说明其功能、参数含义及返回值。

## 技术栈 (Technology Stack)

### 前端 (Frontend)
- **框架**: React (最新稳定版)
- **语言**: TypeScript (推荐) 或 JavaScript (ES6+)
- **构建工具**: Vite
- **样式**: TailwindCSS (保留原有设计风格)

### 后端 (Backend - BaaS)
- **平台**: Firebase
- **数据库**: Cloud Firestore
- **认证**: Firebase Authentication

## 重构策略 (Refactoring Strategy)

### 增量迁移 (Incremental Migration)
重构过程应优先确保与现有 `index (3).html` 的功能对齐。
1.  **环境搭建 (Setup):** 初始化基于 Vite 的现代开发环境。
2.  **逻辑拆解 (Decomposition):** 将原 HTML/Script 中的逻辑区块提取为独立的 React 组件。
3.  **服务集成 (Integration):** 在新的 React 组件生命周期中重新接入 Firebase 逻辑。
4.  **优化打磨 (Optimization):** 优化状态管理逻辑与样式细节。

## 管理机制 (Governance)

### 修订流程 (Amendment Process)
本章程规定了 Plan Partner 项目的架构方向。任何修订均需进行版本升级并提供理由。
- **MAJOR (主版本):** 根本性的架构转变（例如：放弃 Firebase，更换核心框架）。
- **MINOR (次版本):** 新增原则、模块或对现有原则的重要澄清（包括语言本地化）。
- **PATCH (修订版):** 措辞修正、排版调整。

**版本 (Version)**: 1.3.0 | **批准日期 (Ratified)**: 2025-11-28 | **最后修订 (Last Amended)**: 2025-11-28
