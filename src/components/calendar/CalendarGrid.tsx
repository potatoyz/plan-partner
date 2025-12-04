import { useRef, useEffect } from 'react';
import { Plus, MinusCircle, MapPin, Bus, Coffee, Bed, CirclePlus } from 'lucide-react';
import type { EventData } from '../../types';

interface CalendarGridProps {
  events: EventData[];
  totalDays: number;
  onAddDay: () => void;
  onDeleteDay: (day: number) => void;
  onAddEvent: (day: number) => void;
  onEditEvent: (event: EventData) => void;
  onEventUpdate: (event: EventData) => void;
}

const START_HOUR = 5;
const END_HOUR = 24;
const TOTAL_HOURS = END_HOUR - START_HOUR;

const EVENT_TYPES: Record<string, { label: string; gradient: string; shadow: string; icon: any }> = {
  sightseeing: { label: '景点', gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-indigo-500/30', icon: MapPin },
  transport: { label: '交通', gradient: 'from-slate-500 to-zinc-600', shadow: 'shadow-slate-500/30', icon: Bus },
  food: { label: '餐饮', gradient: 'from-orange-400 to-pink-500', shadow: 'shadow-orange-500/30', icon: Coffee },
  rest: { label: '休息', gradient: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/30', icon: Bed },
};

export function CalendarGrid({ events, totalDays, onAddDay, onDeleteDay, onAddEvent, onEditEvent, onEventUpdate }: CalendarGridProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLElement | null>(null);
  const dragInfoRef = useRef<any>(null);

  const timeMarkers = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const timeToMinutes = (t: string) => { if (!t) return 0; const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const minutesToTime = (m: number) => {
    const h = Math.floor(m / 60);
    const min = Math.floor(m % 60);
    return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
  };

  // --- Drag Logic ---
  const handleMouseDown = (e: React.MouseEvent, event: EventData) => {
    e.stopPropagation(); // Prevent triggering add event on row
    const targetEl = e.currentTarget as HTMLElement;
    const rect = targetEl.getBoundingClientRect();

    dragInfoRef.current = {
      isDragging: false,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      eventData: event,
      originalEl: targetEl,
      startMin: timeToMinutes(event.start),
      endMin: timeToMinutes(event.end)
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    const info = dragInfoRef.current;
    if (!info) return;

    if (!info.isDragging) {
      const dist = Math.sqrt(Math.pow(e.clientX - info.startX, 2) + Math.pow(e.clientY - info.startY, 2));
      if (dist < 5) return;

      info.isDragging = true;
      info.originalEl.classList.add('event-dragging-placeholder');

      const ghost = info.originalEl.cloneNode(true) as HTMLElement;
      ghost.classList.add('ghost-event');
      ghost.classList.remove('cursor-grab', 'active:cursor-grabbing');
      ghost.style.width = `${info.width}px`;
      ghost.style.height = `${info.height}px`;
      ghost.style.left = `${e.clientX - info.offsetX}px`;
      ghost.style.top = `${e.clientY - info.offsetY}px`;
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    }

    const ghost = ghostRef.current;
    if (ghost) {
      ghost.style.left = `${e.clientX - info.offsetX}px`;
      ghost.style.top = `${e.clientY - info.offsetY}px`;
      calculateDragPreview(e.clientX, e.clientY);
    }
  };

  const calculateDragPreview = (mouseX: number, mouseY: number) => {
    if (!timelineRef.current || !ghostRef.current || !dragInfoRef.current) return;

    const elementsBelow = document.elementsFromPoint(mouseX, mouseY);
    const dayRow = elementsBelow.find(el => el.getAttribute('data-day'));
    let newDay = dragInfoRef.current.eventData.day;
    if (dayRow) { newDay = Number(dayRow.getAttribute('data-day')); }

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const totalMinutes = TOTAL_HOURS * 60;
    const ghostLeftX = mouseX - dragInfoRef.current.offsetX;
    const relativeX = ghostLeftX - timelineRect.left;

    let newStartMin = Math.round((relativeX / timelineRect.width) * totalMinutes) + (START_HOUR * 60);
    const duration = dragInfoRef.current.endMin - dragInfoRef.current.startMin;
    if (newStartMin < START_HOUR * 60) newStartMin = START_HOUR * 60;
    if (newStartMin + duration > END_HOUR * 60) newStartMin = (END_HOUR * 60) - duration;
    const newEndMin = newStartMin + duration;

    dragInfoRef.current.newDay = newDay;
    dragInfoRef.current.newStart = minutesToTime(newStartMin);
    dragInfoRef.current.newEnd = minutesToTime(newEndMin);

    const timeDiv = ghostRef.current.querySelector('.time-text');
    if (timeDiv) (timeDiv as HTMLElement).innerText = `${minutesToTime(newStartMin)}-${minutesToTime(newEndMin)}`;
  };

  const handleGlobalMouseUp = () => {
    const info = dragInfoRef.current;
    document.removeEventListener('mousemove', handleGlobalMouseMove);
    document.removeEventListener('mouseup', handleGlobalMouseUp);

    if (info && info.isDragging && ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
      info.originalEl.classList.remove('event-dragging-placeholder');

      if (info.newDay !== undefined && info.newStart) {
        const updatedEvent = { ...info.eventData, day: info.newDay, start: info.newStart, end: info.newEnd };
        onEventUpdate(updatedEvent);
      }
    } else if (info && !info.isDragging) {
      onEditEvent(info.eventData);
    }
    dragInfoRef.current = null;
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <>
      {/* Timeline Header */}
      <div className="flex bg-white/40 border-b border-white/30 h-12 sticky top-0 z-10 flex-shrink-0">
        <div className="w-24 border-r border-white/30 flex items-center justify-center text-xs font-bold text-slate-400 bg-white/10">日期</div>
        <div className="flex-1 relative" ref={timelineRef}>
          {timeMarkers.map(h => (
            <div key={h} className="absolute top-0 bottom-0 border-l border-slate-300/20 text-[10px] text-slate-400 pl-1 pt-3" style={{ left: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%` }}>{h}:00</div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="divide-y divide-slate-200/30 flex-1 overflow-y-auto custom-scrollbar">
        {daysArray.map(day => (
          <div key={day} className="flex h-36 hover:bg-white/20 transition-colors relative group day-row" data-day={day}>
            <div className="w-24 border-r border-white/30 flex flex-col items-center justify-center p-2 z-10 bg-white/5 backdrop-blur-[1px] relative">
              {totalDays > 1 && (
                <button onClick={(e) => { e.stopPropagation(); onDeleteDay(day); }} className="absolute top-2 left-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="删除这一天"><MinusCircle size={14} /></button>
              )}
              <span className="text-2xl font-bold text-slate-800/60 font-mono mt-1">{String(day).padStart(2, '0')}</span>
              <button onClick={() => onAddEvent(day)} className="mt-2 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-sm"><Plus size={14} /></button>
            </div>
            <div className="flex-1 relative">
              {timeMarkers.map(h => <div key={h} className="absolute inset-y-0 border-l border-slate-200/20 pointer-events-none" style={{ left: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%` }} />)}
              {events.filter(e => e.day === day).map(event => {
                const style = {
                  left: `${Math.max(0, ((timeToMinutes(event.start) - START_HOUR * 60) / (TOTAL_HOURS * 60)) * 100)}%`,
                  width: `${Math.min(100, ((timeToMinutes(event.end) - timeToMinutes(event.start)) / (TOTAL_HOURS * 60)) * 100)}%`
                };
                const typeCfg = EVENT_TYPES[event.type] || EVENT_TYPES.sightseeing;
                const Icon = typeCfg.icon;

                return (
                  <div
                    key={event.id}
                    onMouseDown={(e) => handleMouseDown(e, event)}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-2 bottom-2 rounded-xl cursor-grab active:cursor-grabbing bg-gradient-to-br ${typeCfg.gradient} ${typeCfg.shadow} text-white border border-white/20 shadow-md hover:shadow-lg hover:z-20 transition-all px-2 flex flex-col justify-center overflow-hidden ring-1 ring-black/5`}
                    style={style}
                  >
                    <div className="flex items-center gap-1 font-bold text-xs truncate pointer-events-none">
                      <Icon size={12} className="opacity-80 flex-shrink-0" />
                      <span className="truncate">{event.name}</span>
                    </div>
                    <div className="time-text text-[10px] opacity-90 truncate mt-0.5 pointer-events-none">{event.start}-{event.end}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="p-4 flex justify-center bg-white/10 hover:bg-white/20 transition-colors border-t border-white/20 cursor-pointer" onClick={onAddDay}>
          <button className="flex items-center gap-2 text-slate-500 font-medium hover:text-indigo-600 transition-colors">
            <CirclePlus size={20} />
            <span>添加一天 (第 {totalDays + 1} 天)</span>
          </button>
        </div>
      </div>
    </>
  );
}
