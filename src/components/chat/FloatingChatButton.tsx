'use client';

import React from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

interface FloatingChatButtonProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onClick,
  hasUnreadMessages = false,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      style={{
        backgroundColor: '#ffffff', // Fondo blanco
      }}
      aria-label="Abrir asistente de chat"
    >
      {/* Chat Icon */}
      <div className="relative">
        <Image
          src="/icon/use-app/chat-smile.svg"
          alt="Chat"
          width={32}
          height={32}
          className="group-hover:scale-110 transition-transform duration-300"
        />

        {/* Notification Badge */}
        {hasUnreadMessages && (
          <div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: colors.error }}
          />
        )}
      </div>

      {/* Pulse Animation */}
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-20"
        style={{
          backgroundColor: '#ffffff', // Fondo blanco para el efecto de pulsación
        }}
      />
    </button>
  );
};