/**
 * 文件名: src/types/index.ts
 * 描述: 全局类型定义
 * 变更日志:
 * 2025-11-28: 初始化 User 和 PlanEvent 接口
 * 2025-11-28: 补充 User.createdAt 字段
 */

export interface User {
  uid: string;          // Firebase Auth UID
  displayName: string;  // 显示名称
  email: string;        // 邮箱地址
  photoURL?: string;    // 头像 URL
  createdAt?: Date;     // 创建时间
}

export interface PlanEvent {
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

export interface EventData {
  id: string;
  name: string;
  day: number;
  start: string;
  end: string;
  type: string;
  notes: string;
}