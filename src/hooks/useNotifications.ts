import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// Import your shared types
import { type ServerToClientEvents, type ClientToServerEvents } from '../types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000");

export const useNotifications = (userId: string) => {
  const [notification, setNotification] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    socket.emit("join_room", userId);

    socket.on("notification", (data) => {
      console.log("received notification!"+JSON.stringify(data));
      // Use timestamp or random ID to ensure unique state updates
      setNotification({ message: data.message, id: Date.now() });
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  return { notification, setNotification };
};