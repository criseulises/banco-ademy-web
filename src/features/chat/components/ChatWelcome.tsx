// features/chat/components/ChatWelcome.tsx

import React, { useEffect, useState, useCallback, useMemo } from "react";

interface ChatWelcomeProps {
  userName: string;
  hasMessages: boolean;
}

export const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  userName,
  hasMessages
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Memoizar las partes del texto
  const textParts = useMemo(() => {
    return {
      line1Parts: {
        beforeName: "¡Hola, ",
        name: userName,
        afterName: "! Soy tu asistente inteligente"
      },
      line2: "¿En qué puedo ayudarte?"
    };
  }, [userName]);

  // Calcular textos completos
  const getFullTexts = useCallback(() => [
    `${textParts.line1Parts.beforeName}${textParts.line1Parts.name}${textParts.line1Parts.afterName}`,
    textParts.line2
  ], [textParts]);

  // Efecto principal para la animación de escritura
  useEffect(() => {
    if (hasMessages) {
      return;
    }

    const fullTexts = getFullTexts();
    const currentFullText = fullTexts[currentLine];
    
    if (!currentFullText || displayedText.length >= currentFullText.length) {
      // Cuando se completa una línea, pasar a la siguiente después de una pausa
      if (currentLine < fullTexts.length - 1) {
        const timeout = setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setDisplayedText("");
        }, 1000);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
      return;
    }

    // Añadir un carácter cada cierto tiempo
    const timeout = setTimeout(() => {
      setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
    }, 50);

    return () => clearTimeout(timeout);
  }, [displayedText, currentLine, hasMessages, getFullTexts]);

  // Efecto para reiniciar cuando no hay mensajes
  useEffect(() => {
    if (!hasMessages) {
      // Usar un timeout para evitar la actualización síncrona
      const timer = setTimeout(() => {
        setDisplayedText("");
        setCurrentLine(0);
        setIsTyping(true);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [hasMessages]);

  // Efecto para resetear cuando userName cambia
  useEffect(() => {
    if (!hasMessages) {
      const timer = setTimeout(() => {
        setDisplayedText("");
        setCurrentLine(0);
        setIsTyping(true);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [userName, hasMessages]);

  if (hasMessages) {
    return null;
  }

  const fullTexts = getFullTexts();

  // Función para renderizar la primera línea con el nombre en color
  const renderFirstLine = () => {
    const currentFullText = fullTexts[0];
    const displayedLength = displayedText.length;
    
    if (currentLine === 0) {
      // Durante la escritura de la primera línea
      const beforeName = textParts.line1Parts.beforeName;
      const name = textParts.line1Parts.name;
      const afterName = textParts.line1Parts.afterName;
      
      // Calcular qué parte estamos mostrando
      if (displayedLength <= beforeName.length) {
        // Mostrando solo "¡Hola, "
        return (
          <p className="text-xs font-medium font-montserrat leading-relaxed">
            {displayedText}
            {isTyping && displayedLength < currentFullText.length && (
              <span className="animate-pulse">▊</span>
            )}
          </p>
        );
      } else if (displayedLength <= beforeName.length + name.length) {
        // Mostrando "¡Hola, " + parte del nombre
        const displayedName = name.substring(0, displayedLength - beforeName.length);
        return (
          <p className="text-xs font-medium font-montserrat leading-relaxed">
            {beforeName}
            <span className="text-[#0095A9] font-semibold">{displayedName}</span>
            {isTyping && displayedLength < currentFullText.length && (
              <span className="animate-pulse">▊</span>
            )}
          </p>
        );
      } else {
        // Mostrando "¡Hola, " + nombre completo + parte del resto
        const displayedAfterName = afterName.substring(
          0, 
          displayedLength - beforeName.length - name.length
        );
        return (
          <p className="text-xs font-medium font-montserrat leading-relaxed">
            {beforeName}
            <span className="text-[#0095A9] font-semibold">{name}</span>
            {displayedAfterName}
            {isTyping && displayedLength < currentFullText.length && (
              <span className="animate-pulse">▊</span>
            )}
          </p>
        );
      }
    } else if (currentLine >= 1) {
      // Cuando la primera línea está completa
      return (
        <p className="text-xs font-medium font-montserrat leading-relaxed">
          {textParts.line1Parts.beforeName}
          <span className="text-[#0095A9] font-semibold">{textParts.line1Parts.name}</span>
          {textParts.line1Parts.afterName}
        </p>
      );
    }
    return null;
  };

  // Función para renderizar la segunda línea
  const renderSecondLine = () => {
    if (currentLine === 1) {
      return (
        <h2 className="text-2xl font-bold font-montserrat text-gray-900 leading-tight">
          {displayedText}
          {isTyping && displayedText.length < fullTexts[1].length && (
            <span className="animate-pulse">▊</span>
          )}
        </h2>
      );
    } else if (currentLine > 1) {
      return (
        <h2 className="text-2xl font-bold font-montserrat text-gray-900 leading-tight">
          {fullTexts[1]}
        </h2>
      );
    }
    return null;
  };

  return (
    <div className="shrink-0 px-3 pb-4">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-20 space-y-3">
          {/* Primera línea */}
          {renderFirstLine()}
          
          {/* Segunda línea */}
          {renderSecondLine()}
        </div>
      </div>
    </div>
  );
};