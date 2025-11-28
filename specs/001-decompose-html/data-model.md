# 数据模型 (Data Model)

**特性**: 001-decompose-html
**日期**: 2025-11-28

## 实体定义 (Entities)

### User (用户)
代表系统中的操作用户。

```typescript
interface User {
  uid: string;          // Firebase Auth UID
  displayName: string;  // 显示名称
  email: string;        // 邮箱地址
  photoURL?: string;    // 头像 URL
}
```

### PlanEvent (行程事件)
代表日历上的一个时间块。

```typescript
interface PlanEvent {
  id: string;           // 唯一标识符 (Firestore Document ID)
  title: string;        // 事件标题
  startTime: Date;      // 开始时间 (ISO 8601 string in DB, Date obj in App)
  endTime: Date;        // 结束时间
  location?: string;    // 地点 (可选)
  description?: string; // 备注 (可选)
  
  // 参与者相关
  creatorId: string;    // 创建者 UID
  participants: string[]; // 参与者 UID 列表
  
  // 样式/元数据
  color?: string;       // 显示颜色 (Tailwind class 或 hex)
  type: 'meeting' | 'travel' | 'meal' | 'other'; // 事件类型
}
```

## 状态管理 (State Management)

在重构第一阶段（本特性），数据流向如下：

1. **Mock Data**: 在 `src/mocks/events.ts` 中定义静态的 `PlanEvent[]` 数据。
2. **Render**: `CalendarGrid` 组件接收事件数组，计算其在时间轴上的位置并渲染。

## 数据库映射 (Firestore)

虽然本阶段仅做读取准备，但需预定义 Firestore 结构：

- 集合 `users`: 存储用户信息
- 集合 `events`: 存储所有行程事件
  - 索引: 需要按 `startTime` 查询范围。
