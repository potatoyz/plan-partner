/**
 * 文件名: src/components/calendar/EventCard.tsx
 * 描述: 单个行程卡片组件
 * 变更日志:
 * 2025-11-28: 初始化组件
 */

import type { PlanEvent } from '../../types';

interface EventCardProps {
  event: PlanEvent;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function EventCard({ event, style, onClick }: EventCardProps) {
  return (
    <div 
      className={`absolute left-14 right-2 rounded-lg p-2 text-xs shadow-sm border-l-4 cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all overflow-hidden ${event.color || 'bg-gray-100 border-gray-400 text-gray-700'}`}
      style={style}
      onClick={onClick}
    >
      <div className="font-bold truncate">{event.title}</div>
      {event.description && (
        <div className="opacity-80 truncate scale-90 origin-top-left mt-0.5">
          {event.description}
        </div>
      )}
      <div className="absolute bottom-1 right-1 text-[10px] opacity-60">
        {event.startTime.getHours().toString().padStart(2, '0')}:
        {event.startTime.getMinutes().toString().padStart(2, '0')}
      </div>
    </div>
  );
}
