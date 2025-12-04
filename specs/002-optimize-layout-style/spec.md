# Feature Specification: 优化布局与样式还原

**Feature Branch**: `002-optimize-layout-style`  
**Created**: 2025-11-28  
**Status**: Draft  
**Input**: User description: "现在这个版本打开之后是白底加文字，排版完全错乱。继续优化实现。仔细阅读我初始的index(3).html"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 全局布局修复 (Priority: P1)

作为用户，我希望看到正常的侧边栏和主内容区域布局，而不是混乱的堆叠，以便正常浏览页面。

**Why this priority**: 当前页面排版完全错乱（白底加文字），不可用，属于严重 UI Bug。

**Independent Test**: 打开应用，侧边栏固定在左侧宽度 64px/256px（响应式），主内容区在右侧自适应占满剩余空间。

**Acceptance Scenarios**:

1. **Given** 页面加载完成, **When** 查看整体结构, **Then** 左侧显示侧边栏，右侧显示日历网格，两者水平排列而非垂直堆叠。
2. **Given** 窗口大小调整, **When** 宽度缩小时, **Then** 布局保持响应式（移动端侧边栏隐藏或变为汉堡菜单）。

---

### User Story 2 - 样式细节还原 (Priority: P2)

作为用户，我希望看到的字体、颜色、圆角和阴影与原始设计（index(3).html）一致，以获得预期的视觉体验。

**Why this priority**: 视觉还原是重构成功的关键指标，当前“白底加文字”说明 Tailwind 样式未正确应用。

**Independent Test**: 对比新旧页面的 EventCard 和 Sidebar 样式，视觉差异肉眼不可见。

**Acceptance Scenarios**:

1. **Given** 查看日历卡片, **When** 观察样式, **Then** 应有圆角、阴影和左侧的彩色边框。
2. **Given** 查看侧边栏, **When** 观察列表项, **Then** 选中项应有高亮背景。
3. **Given** 页面滚动, **When** 滚动日历网格, **Then** 时间轴应固定或跟随滚动（依据原设计）。

### User Story 3 - 图标与静态资源修复 (Priority: P3)

作为用户，我希望看到正确的图标（如 MapPin, Plus, Trash2），而不是缺失或占位符。

**Why this priority**: 图标是 UI 交互的重要提示。

**Independent Test**: 所有按钮和标签旁的图标均正常显示。

**Acceptance Scenarios**:

1. **Given** 侧边栏菜单, **When** 查看图标, **Then** 历史记录旁显示 History 图标，云端旁显示 Cloud 图标。

### Edge Cases

- **Tailwind 配置失效**: 可能是 PostCSS 配置问题导致样式未编译。
- **全局样式覆盖**: 浏览器默认样式可能未被重置（Normalize/Reset）。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统**必须**正确加载并应用 TailwindCSS 样式。
- **FR-002**: 布局组件 (`AppLayout`) **必须**使用 Flexbox 或 Grid 实现左右分栏。
- **FR-003**: 所有 UI 组件 (`Sidebar`, `CalendarGrid`) **必须** 1:1 还原原 HTML 中的 CSS 类名及视觉效果。
- **FR-004**: 全局背景色应为 `#f5f5f7`（原 HTML body bg）。
- **FR-005**: 修复 Lucide 图标引入，确保所有图标正常渲染。

### Key Entities *(include if feature involves data)*

- N/A (纯样式修复)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 页面不再出现原生 HTML 默认样式（Times New Roman, 纯白底）。
- **SC-002**: 侧边栏宽度固定，主内容区自适应。
- **SC-003**: EventCard 样式包含阴影和圆角。
- **SC-004**: 控制台无 CSS/PostCSS 相关报错。