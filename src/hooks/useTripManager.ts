import { useState, useEffect } from 'react';
import { doc, setDoc, collection, getDocs, Firestore } from 'firebase/firestore';

interface Trip {
    id: string;
    lastVisited?: number;
}

export const useTripManager = (dbInstance: Firestore | null, connectionStatus: string, roomId: string) => {
    const [history, setHistory] = useState<Trip[]>([]);
    const [cloudRooms, setCloudRooms] = useState<Trip[]>([]);

    // 1. Load Local History
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('my_trip_history') || '[]');
            const current = { id: roomId, lastVisited: Date.now() };
            const others = saved.filter((t: Trip) => t.id !== roomId);
            const finalHistory = [current, ...others].slice(0, 20);

            localStorage.setItem('my_trip_history', JSON.stringify(finalHistory));
            setHistory(finalHistory);
        } catch (e) { console.error(e); }
    }, [roomId]);

    // 2. Load Cloud Rooms
    useEffect(() => {
        if (connectionStatus === 'connected' && dbInstance) {
            const fetchRooms = async () => {
                try {
                    const querySnapshot = await getDocs(collection(dbInstance, "travel_plans"));
                    const rooms = querySnapshot.docs
                        .filter(doc => !doc.data().isDeleted)
                        .map(doc => ({ id: doc.id }));

                    setCloudRooms(rooms.sort((a, b) => a.id.localeCompare(b.id)));
                } catch (e) { console.error("获取云端房间失败:", e); }
            };
            fetchRooms();
        }
    }, [dbInstance, connectionStatus]);

    const createNewTrip = () => {
        const name = prompt("请输入新行程的名称：", "我的北京之旅");
        if (name && name.trim()) {
            window.location.href = `?room=${encodeURIComponent(name.trim())}`;
        }
    };

    const switchTrip = (id: string) => {
        window.location.href = `?room=${encodeURIComponent(id)}`;
    };

    const deleteHistoryTrip = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (id === roomId) return alert("无法删除当前正在使用的行程。");
        if (confirm(`确定从本地历史中移除 "${id}" 吗？\n(云端数据不会丢失)`)) {
            const newHistory = history.filter(t => t.id !== id);
            setHistory(newHistory);
            localStorage.setItem('my_trip_history', JSON.stringify(newHistory));
        }
    };

    const deleteCloudTrip = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (id === roomId) return alert("无法删除当前正在使用的行程，请先切换到其他行程。");

        if (confirm(`确定要移除云端行程 "${id}" 吗？\n\n注意：\n1. 这是“软删除”，数据仍保留在数据库中。\n2. 它将从所有人的列表中消失。\n3. 如果您以后再次创建同名行程，旧数据会自动恢复显示。`)) {
            try {
                if (dbInstance) {
                    await setDoc(doc(dbInstance, "travel_plans", id), { isDeleted: true }, { merge: true });
                    setCloudRooms(prev => prev.filter(r => r.id !== id));

                    // Also clean local history
                    const newHistory = history.filter(t => t.id !== id);
                    setHistory(newHistory);
                    localStorage.setItem('my_trip_history', JSON.stringify(newHistory));

                    alert(`行程 "${id}" 已移除。`);
                }
            } catch (err) {
                console.error("Delete failed", err);
                alert("操作失败，可能是权限不足或网络问题。");
            }
        }
    };

    return { history, cloudRooms, createNewTrip, switchTrip, deleteHistoryTrip, deleteCloudTrip };
};
