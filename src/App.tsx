import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { AppLayout } from './components/layout/AppLayout';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CalendarGrid } from './components/calendar/CalendarGrid';
import { EventModal, type EventData } from './components/calendar/EventModal';
import { useTripManager } from './hooks/useTripManager';


const INITIAL_DATA: EventData[] = [
  { id: '1', day: 1, name: '示例行程', type: 'sightseeing', start: '09:00', end: '11:00', notes: '试着拖动我！' }
];

function App() {
  // --- State ---
  const [events, setEvents] = useState<EventData[]>([]);
  const [totalDays, setTotalDays] = useState(5);
  const [status, setStatus] = useState<'loading' | 'connected' | 'connecting' | 'offline'>('loading');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);

  // --- Room Logic ---
  const getRoomId = () => {
    const params = new URLSearchParams(window.location.search);
    return decodeURIComponent(params.get('room') || 'public-plan');
  };
  const ROOM_ID = getRoomId();

  const { history, cloudRooms, createNewTrip, switchTrip, deleteHistoryTrip, deleteCloudTrip } = useTripManager(db || null, status, ROOM_ID);

  // --- Data Sync ---
  const loadFromLocal = useCallback(() => {
    const saved = localStorage.getItem(`plan_${ROOM_ID}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setEvents(parsed);
        setTotalDays(5);
      } else {
        setEvents(parsed.events || []);
        setTotalDays(parsed.totalDays || 5);
      }
    } else {
      setEvents(INITIAL_DATA);
      setTotalDays(5);
    }
  }, [ROOM_ID]);

  useEffect(() => {
    const firestore = db;
    if (!firestore) {
      setStatus('offline');
      loadFromLocal();
      return;
    }

    setStatus('connecting');
    const unsub = onSnapshot(doc(firestore, "travel_plans", ROOM_ID), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setEvents(data.events || []);
        setTotalDays(data.totalDays || 5);
        setStatus('connected');
      } else {
        // Init new room
        setDoc(doc(firestore, "travel_plans", ROOM_ID), {
          events: INITIAL_DATA,
          totalDays: 5,
          isDeleted: false
        }, { merge: true });

        setEvents(INITIAL_DATA);
        setTotalDays(5);
        setStatus('connected');
      }
    }, (err) => {
      console.error("Sync error:", err);
      setStatus('offline');
      loadFromLocal();
    });

    return () => unsub();
  }, [ROOM_ID, loadFromLocal]);

  const saveData = async (newEvents?: EventData[], newTotalDays?: number) => {
    const finalEvents = newEvents !== undefined ? newEvents : events;
    const finalDays = newTotalDays !== undefined ? newTotalDays : totalDays;
    setEvents(finalEvents);
    setTotalDays(finalDays);

    const dataToSave = {
      events: finalEvents,
      totalDays: finalDays,
      isDeleted: false
    };

    if (db) {
      try {
        await setDoc(doc(db, "travel_plans", ROOM_ID), dataToSave, { merge: true });
      } catch (e) { console.warn("Cloud save failed", e); }
    }
    localStorage.setItem(`plan_${ROOM_ID}`, JSON.stringify(dataToSave));
  };

  // --- Handlers ---
  const handleAddDay = () => saveData(events, totalDays + 1);

  const handleDeleteDay = (dayToDelete: number) => {
    const hasEvents = events.some(e => e.day === dayToDelete);
    if (hasEvents && !confirm(`第 ${dayToDelete} 天还有行程，确定删除？`)) return;
    let newEvents = events.filter(e => e.day !== dayToDelete);
    newEvents = newEvents.map(e => e.day > dayToDelete ? { ...e, day: e.day - 1 } : e);
    saveData(newEvents, totalDays - 1);
  };

  const handleAddEventClick = (day: number) => {
    setEditingEvent(null); // New event
    // Pre-fill day in modal logic if needed, but Modal handles it via props? 
    // Wait, EventModal uses internal state initialized from props.
    // I need to pass the initial day to EventModal if it's new.
    // My EventModal implementation takes `event` prop. If null, it defaults to day 1.
    // I should update EventModal to accept `initialDay` or just pass a partial event object.
    // Let's pass a partial event object as "event" but with empty id to signify new?
    // Or just update EventModal to handle `initialDay`.
    // For now, I'll pass a mock "new" event with the correct day.
    setEditingEvent({
      id: '',
      name: '',
      day,
      start: '09:00',
      end: '11:00',
      type: 'sightseeing',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleEditEventClick = (event: EventData) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: EventData) => {
    let newEvents = [...events];
    if (eventData.id && events.some(e => e.id === eventData.id)) {
      // Edit
      newEvents = newEvents.map(e => e.id === eventData.id ? eventData : e);
    } else {
      // Create
      newEvents.push({ ...eventData, id: Date.now().toString() });
    }
    saveData(newEvents, totalDays);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('删除此项？')) {
      saveData(events.filter(e => e.id !== id), totalDays);
      setIsModalOpen(false);
    }
  };

  const handleEventUpdate = (updatedEvent: EventData) => {
    const newEvents = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
    saveData(newEvents, totalDays);
  };

  const handleReset = () => { if (confirm('重置为默认数据？')) saveData(INITIAL_DATA, 5); };

  const handleExport = () => {
    const dataStr = JSON.stringify({ events, totalDays }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `行程_${ROOM_ID}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (confirm(`确定覆盖当前行程？`)) {
            if (Array.isArray(imported)) saveData(imported, 5);
            else if (imported.events) saveData(imported.events, imported.totalDays || 5);
          }
        } catch (err) { alert("文件格式错误"); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("链接已复制！");
  };

  return (
    <AppLayout
      isMenuOpen={isMenuOpen}
      onMenuClose={() => setIsMenuOpen(false)}
      sidebar={
        <Sidebar
          history={history}
          cloudRooms={cloudRooms}
          currentRoomId={ROOM_ID}
          connectionStatus={status === 'offline' ? 'offline' : 'connected'} // Simplified status mapping
          onSwitchTrip={switchTrip}
          onDeleteHistory={deleteHistoryTrip}
          onDeleteCloud={deleteCloudTrip}
          onCreateTrip={createNewTrip}
          onClose={() => setIsMenuOpen(false)}
        />
      }
      header={
        <Header
          roomId={ROOM_ID}
          status={status === 'offline' ? 'offline' : 'connected'}
          onMenuClick={() => setIsMenuOpen(true)}
          onReset={handleReset}
          onImport={handleImport}
          onExport={handleExport}
          onShare={handleShare}
        />
      }
    >
      <CalendarGrid
        events={events}
        totalDays={totalDays}
        onAddDay={handleAddDay}
        onDeleteDay={handleDeleteDay}
        onAddEvent={handleAddEventClick}
        onEditEvent={handleEditEventClick}
        onEventUpdate={handleEventUpdate}
      />

      <EventModal
        isOpen={isModalOpen}
        event={editingEvent}
        totalDays={totalDays}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </AppLayout>
  );
}

export default App;
