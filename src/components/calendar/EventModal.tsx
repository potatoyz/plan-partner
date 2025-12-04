import { X, Trash2, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface EventData {
    id: string;
    name: string;
    day: number;
    start: string;
    end: string;
    type: string;
    notes: string;
}

interface EventModalProps {
    isOpen: boolean;
    event: EventData | null;
    totalDays: number;
    onClose: () => void;
    onSave: (event: EventData) => void;
    onDelete: (id: string) => void;
}

const EVENT_TYPES = {
    sightseeing: { label: '景点' },
    transport: { label: '交通' },
    food: { label: '餐饮' },
    rest: { label: '休息' },
};

export function EventModal({ isOpen, event, totalDays, onClose, onSave, onDelete }: EventModalProps) {
    const [formData, setFormData] = useState<EventData>({
        id: '',
        name: '',
        day: 1,
        start: '09:00',
        end: '11:00',
        type: 'sightseeing',
        notes: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (event) {
                setFormData({ ...event });
            } else {
                setFormData({
                    id: Date.now().toString(),
                    name: '',
                    day: 1,
                    start: '09:00',
                    end: '11:00',
                    type: 'sightseeing',
                    notes: ''
                });
            }
        }
    }, [isOpen, event]);

    if (!isOpen) return null;

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">{event ? '编辑' : '新建'}</h3>
                    <button onClick={onClose}><X size={18} className="text-slate-400 hover:text-slate-600" /></button>
                </div>
                <div className="p-5 space-y-4">
                    <input
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none text-sm font-medium"
                        placeholder="行程名称"
                        autoFocus
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm"
                        >
                            {Object.entries(EVENT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                        <div className="relative">
                            <select
                                value={formData.day}
                                onChange={e => setFormData({ ...formData, day: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm appearance-none"
                            >
                                {daysArray.map(d => <option key={d} value={d}>第{d}天</option>)}
                            </select>
                            <Calendar size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="time"
                            value={formData.start}
                            onChange={e => setFormData({ ...formData, start: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm font-mono"
                        />
                        <input
                            type="time"
                            value={formData.end}
                            onChange={e => setFormData({ ...formData, end: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm font-mono"
                        />
                    </div>
                    <textarea
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm h-20 resize-none"
                        placeholder="备注..."
                    />
                </div>
                <div className="px-5 py-4 border-t border-slate-100 flex justify-between bg-slate-50/50">
                    {event ? (
                        <button onClick={() => onDelete(event.id)} className="text-red-500 text-sm hover:bg-red-50 px-2 py-1 rounded">
                            <Trash2 size={16} />
                        </button>
                    ) : <div />}
                    <div className="flex gap-2">
                        <button onClick={onClose} className="px-4 py-1.5 text-slate-500 text-sm font-medium hover:bg-slate-100 rounded-lg">取消</button>
                        <button
                            onClick={() => {
                                if (!formData.name) return alert("请输入名称");
                                onSave(formData);
                            }}
                            className="px-5 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                        >
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
