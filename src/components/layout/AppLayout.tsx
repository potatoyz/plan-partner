import type { ReactNode } from 'react';

interface AppLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

export function AppLayout({ sidebar, header, children, isMenuOpen, onMenuClose }: AppLayoutProps) {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-[#f5f5f7] relative overflow-hidden flex flex-col select-none">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white/90 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebar}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" onClick={onMenuClose}></div>
      )}

      {/* Header */}
      {header}

      {/* Main Content */}
      <main className="flex-1 overflow-x-auto p-4 md:p-8 flex flex-col z-10">
        <div className="bg-white/40 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-white/60 min-w-[1000px] relative overflow-hidden flex flex-col flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
