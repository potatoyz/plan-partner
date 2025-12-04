import { History, Cloud, Plus, X, Trash2, EyeOff, LayoutGrid, WifiOff } from 'lucide-react';

interface Trip {
  id: string;
  lastVisited?: number;
}

interface SidebarProps {
  history: Trip[];
  cloudRooms: Trip[];
  currentRoomId: string;
  connectionStatus: 'connected' | 'connecting' | 'offline';
  onSwitchTrip: (id: string) => void;
  onDeleteHistory: (e: React.MouseEvent, id: string) => void;
  onDeleteCloud: (e: React.MouseEvent, id: string) => void;
  onCreateTrip: () => void;
  onClose: () => void;
}

export function Sidebar({
  history,
  cloudRooms,
  currentRoomId,
  connectionStatus,
  onSwitchTrip,
  onDeleteHistory,
  onDeleteCloud,
  onCreateTrip,
  onClose
}: SidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 p-6 pb-0">
        <h2 className="text-xl font-bold flex items-center gap-2"><LayoutGrid size={20} /> 我的行程</h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full md:hidden"><X size={20} /></button>
      </div>

      <div className="px-6">
        <button onClick={onCreateTrip} className="w-full py-3 bg-slate-900 text-white rounded-xl mb-6 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
          <Plus size={18} /> 创建新行程
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar px-6 pb-6">
        {/* Local History */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><History size={12} /> 最近访问</h3>
          <div className="space-y-2">
            {history.map(trip => (
              <div key={trip.id} className={`group w-full relative flex items-center p-3 rounded-xl transition-all ${trip.id === currentRoomId ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'hover:bg-white border border-transparent'}`}>
                <button onClick={() => onSwitchTrip(trip.id)} className="flex-1 text-left truncate font-medium mr-6 focus:outline-none">
                  {trip.id === 'public-plan' ? '公共大厅' : trip.id}
                </button>
                {trip.id === currentRoomId && <span className="w-2 h-2 bg-indigo-500 rounded-full absolute right-3 pointer-events-none"></span>}
                <button onClick={(e) => onDeleteHistory(e, trip.id)} className="absolute right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10" title="删除本地记录">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {history.length === 0 && <p className="text-sm text-slate-400 italic px-2">暂无历史记录</p>}
          </div>
        </div>

        {/* Cloud Rooms */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Cloud size={12} /> 云端所有行程</h3>
          {connectionStatus === 'connected' ? (
            <div className="space-y-2">
              {cloudRooms.map(trip => (
                <div key={trip.id} className={`group w-full relative flex items-center p-3 rounded-xl transition-all ${trip.id === currentRoomId ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'hover:bg-white border border-transparent'}`}>
                  <button onClick={() => onSwitchTrip(trip.id)} className="flex-1 text-left truncate font-medium mr-6 focus:outline-none">
                    {trip.id === 'public-plan' ? '公共大厅' : trip.id}
                  </button>
                  {trip.id === currentRoomId && <span className="w-2 h-2 bg-indigo-500 rounded-full absolute right-3 pointer-events-none"></span>}
                  <button onClick={(e) => onDeleteCloud(e, trip.id)} className="absolute right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10" title="移除云端行程">
                    <EyeOff size={14} />
                  </button>
                </div>
              ))}
              {cloudRooms.length === 0 && <p className="text-sm text-slate-400 italic px-2">云端暂无数据</p>}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic px-2 flex items-center gap-1"><WifiOff size={12} /> 连接后查看云端列表</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="text-xs text-center text-gray-400">
          © 2025 Plan Partner
        </div>
      </div>
    </div>
  );
}
