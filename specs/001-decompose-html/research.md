# 研究报告 (Research): 架构迁移策略

**特性**: 001-decompose-html
**日期**: 2025-11-28

## 决策汇总

### 1. 构建工具选择：Vite
- **决策**: 使用 Vite 作为构建工具。
- **理由**: 宪法要求“正规工程标准”。Vite 相比 CRA (Create React App) 启动更快，配置更少，且原生支持 TypeScript。
- **替代方案**: Webpack (配置复杂，太重), CRA (已废弃)。

### 2. 样式迁移策略：TailwindCSS
- **决策**: 保留原有 CSS 逻辑，但通过 TailwindCSS 实现。
- **理由**: 原 HTML 使用了 Tailwind CDN。迁移时应安装本地 PostCSS 依赖，通过 `tailwind.config.js` 配置扫描路径，确保 Tree-shaking 生效。
- **实施**: 
  - 原 `<style>` 标签中的自定义滚动条样式 (`.custom-scrollbar`) 移至 `src/styles/globals.css`。
  - 内联类名直接迁移到 JSX `className`。

### 3. 组件拆解粒度
- **决策**: 
  - **AppLayout**: 包含 Sidebar 和 Main Content 容器。
  - **Sidebar**: 左侧导航与日期选择。
  - **CalendarGrid**: 右侧主要时间轴视图。
  - **EventCard**: 单个日程卡片。
- **理由**: 符合“组件化架构”原则。分离布局与内容，便于后续独立维护 Sidebar 逻辑。

### 4. 状态管理初步方案
- **决策**: 既然暂不实现复杂交互，第一阶段使用 Mock Data + React Context 或简单的 Props Drilling 验证渲染。
- **理由**: 避免过度工程化。Firebase 集成在 Phase 3 (User Story 3) 接入，此前先保证 UI 还原。

## 待解决问题 (已解决)
- **Q**: Lucide 图标如何迁移？
- **A**: 使用 `lucide-react` 库，替换原有的 CDN 引入。
