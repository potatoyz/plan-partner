---
description: "Task list template for feature implementation"
---

# Tasks: 拆解 HTML 并构建现代架构

**输入**: Design documents from `/specs/001-decompose-html/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 在根目录初始化 Vite React TypeScript 项目
- [ ] T002 [P] 安装 TailwindCSS 及相关依赖 (postcss, autoprefixer)
- [ ] T003 [P] 配置 tailwind.config.js 和 src/styles/globals.css
- [ ] T004 [P] 安装 Lucide React 图标库
- [ ] T005 [P] 安装 Firebase SDK

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 创建项目目录结构 (components/, lib/, types/, styles/)
- [ ] T007 [P] 创建全局类型定义 src/types/index.ts (User, PlanEvent)
- [ ] T008 设置主入口文件 src/main.tsx 和 src/App.tsx 存根

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 工程初始化与环境搭建 (Priority: P1) 🎯 MVP

**Goal**: 配置好的 Vite + React + TypeScript + TailwindCSS 开发环境

**Independent Test**: 运行 `npm run dev` 能成功启动开发服务器，并看到加载了 Tailwind 样式的页面。

### Implementation for User Story 1

- [ ] T009 [US1] 验证 Vite 开发服务器可通过 npm run dev 启动
- [ ] T010 [US1] 在 src/App.tsx 中创建一个使用 Tailwind 类的测试页面以验证样式
- [ ] T011 [US1] 在 package.json 中配置构建脚本并验证 npm run build 是否正常工作

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 核心布局组件化 (Priority: P2)

**Goal**: 将原 HTML 中的整体布局拆解为独立的 React 组件

**Independent Test**: 页面视觉效果与原 `index (3).html` 基本一致，但通过 React 组件树渲染。

### Implementation for User Story 2

- [ ] T012 [US2] 创建 Sidebar 组件 src/components/layout/Sidebar.tsx
- [ ] T013 [US2] 创建 CalendarGrid 组件 src/components/calendar/CalendarGrid.tsx
- [ ] T014 [US2] 创建 EventCard 组件 src/components/calendar/EventCard.tsx
- [ ] T015 [US2] 创建 Mock 数据 src/mocks/events.ts (PlanEvent[])
- [ ] T016 [US2] 组装 AppLayout 组件 src/components/layout/AppLayout.tsx
- [ ] T017 [US2] 将组件集成到 src/App.tsx 中以复现原有 UI

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 基础数据模型与 Firebase 连接 (Priority: P3)

**Goal**: 定义 TypeScript 接口并配置 Firebase SDK

**Independent Test**: 应用能成功导入 Firebase 实例，且 TypeScript 类型检查通过。

### Implementation for User Story 3

- [ ] T018 [US3] 在 src/lib/firebase.ts 中初始化 Firebase 应用
- [ ] T019 [US3] 更新 src/types/index.ts 以匹配 Firestore schema（如果需要）
- [ ] T020 [US3] 在 src/App.tsx 中验证 Firebase 连接（仅控制台日志）

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T021 清理 src/App.tsx 测试代码
- [ ] T022 确保所有文件均符合宪法要求包含中文文件头
- [ ] T023 运行类型检查并修复任何严格模式错误

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
