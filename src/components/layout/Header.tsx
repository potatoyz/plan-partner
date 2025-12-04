import { Menu, Wifi, WifiOff, RotateCcw, Upload, Download, Share2 } from 'lucide-react';

interface HeaderProps {
  roomId: string;
  status: 'connected' | 'connecting' | 'offline';
  onMenuClick: () => void;
  onReset: () => void;
  onImport: () => void;
  onExport: () => void;
  onShare: () => void;
}

export function Header({ roomId, status, onMenuClick, onReset, onImport, onExport, onShare }: HeaderProps) {
  return (
    <header className="px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row justify-between items-center z-20 sticky top-0 gap-3 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <button onClick={onMenuClick} className="p-2 -ml-2 hover:bg-white/50 rounded-lg transition-colors text-slate-600">
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {roomId === 'public-plan' ? '公共大厅' : roomId}
          </h1>
          <div className="flex items-center gap-2">
            {status === 'connected' ? (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <Wifi size={10} /> 在线同步
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1">
                <WifiOff size={10} /> 离线模式
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex bg-slate-100/50 rounded-full p-1 border border-white/50">
          <button onClick={onReset} title="重置" className="p-2 text-slate-500 hover:text-red-500 hover:bg-white rounded-full transition-all">
            <RotateCcw size={16} />
          </button>
          <button onClick={onImport} title="导入JSON" className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
            <Upload size={16} />
          </button>
          <button onClick={onExport} title="导出JSON" className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
            <Download size={16} />
          </button>
        </div>
        <div className="w-px h-6 bg-slate-300/50 mx-1"></div>
        <button onClick={onShare} className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full border border-indigo-200 transition-all">
          <Share2 size={18} />
        </button>
      </div>
    </header>
  );
}
