import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  duration?: number;
  autostart?: boolean;
  className?: string;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  duration = 1.5, 
  autostart = true,
  className 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        isScramblingRef.current = false;
      }

      iteration += text.length / (duration * 60);
    }, 1000 / 60);
  }, [text, duration]);

  useEffect(() => {
    if (autostart) {
      scramble();
    }
  }, []); // Only run once on mount

  return (
    <span 
      className={className}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};
