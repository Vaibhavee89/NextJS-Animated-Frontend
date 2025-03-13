'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermission(permission);
    }
  };

  const sendNotification = () => {
    if (permission === 'granted') {
      const notification = new Notification('¡Hola!', {
        body: 'Lorem ipsum dolor sit amet.',
        icon: '/icon-192x192.png',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } else {
      requestPermission();
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 w-full max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-12">Hola!</h1>
        
        <div className="relative mb-16 pt-8">
          <motion.div
            className="notification-ring w-24 h-24 mx-auto relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer relative z-20"
              onClick={sendNotification}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-4"
        >
          Lorem Ipsum...
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8"
        >
          Lorem ipsum dolor sit amet.
        </motion.p>

        <motion.button
          onClick={sendNotification}
          className="button-gradient text-white font-semibold py-3 px-6 rounded-full w-full max-w-xs shadow-lg transform transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Notification
        </motion.button>
      </motion.div>
    </main>
  );
}