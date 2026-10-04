import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

export interface SmartAlert {
  id: string;
  tipo:
    | 'vencimiento-soat'
    | 'vencimiento-citv'
    | 'nueva-papeleta'
    | 'vencimiento-gnv'
    | 'cambio-propietario'
    | 'recordatorio-tramite';
  entidad: string;
  placa?: string;
  titulo: string;
  mensaje: string;
  ctaLabel: string;
  ctaUrl: string;
  prioridad: 'alta' | 'media' | 'baja';
  fechaVencim?: string;
  leida: boolean;
  descartada: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
}

export function useAlerts(uid: string | null) {
  const [alerts, setAlerts] = useState<SmartAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', uid, 'alerts'),
      where('descartada', '==', false),
      orderBy('createdAt', 'desc'),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setAlerts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SmartAlert)));
        setLoading(false);
      },
      () => setLoading(false),
    );

    return unsub;
  }, [uid]);

  const unreadCount = alerts.filter((a) => !a.leida).length;

  const markAsRead = async (id: string) => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid, 'alerts', id), { leida: true });
  };

  const markAllRead = async () => {
    if (!uid) return;
    const unread = alerts.filter((a) => !a.leida);
    await Promise.all(
      unread.map((a) =>
        updateDoc(doc(db, 'users', uid!, 'alerts', a.id), { leida: true }),
      ),
    );
  };

  const dismiss = async (id: string) => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid, 'alerts', id), { descartada: true });
  };

  return { alerts, loading, unreadCount, markAsRead, markAllRead, dismiss };
}
