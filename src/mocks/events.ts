/**
 * 文件名: src/mocks/events.ts
 * 描述: 模拟行程数据
 * 变更日志:
 * 2025-11-28: 初始化模拟数据，用于 UI 开发
 */

import type { PlanEvent } from '../types';

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const createDate = (hour: number, minute: number) => {
  const date = new Date(TODAY);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const MOCK_EVENTS: PlanEvent[] = [
  {
    id: '1',
    title: '示例行程',
    startTime: createDate(9, 0),
    endTime: createDate(11, 0),
    creatorId: 'user1',
    participants: ['user1'],
    type: 'meeting', // 对应 HTML 中的 sightseeing (暂时映射到 meeting 或修改类型定义)
    description: '试着拖动我！',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: '2',
    title: '午餐时间',
    startTime: createDate(12, 0),
    endTime: createDate(13, 30),
    creatorId: 'user1',
    participants: ['user1'],
    type: 'meal',
    description: '尝试当地美食',
    color: 'bg-orange-100 text-orange-700'
  }
];
