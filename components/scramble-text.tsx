"use client";

import { useEffect, useState, useCallback } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  delay?: number;
}

const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function ScrambleText({
  text,
  className = "",
  scrambleOnHover = false,
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, isScrambling]);

  useEffect(() => {
    const timer = setTimeout(scramble, delay);
    return () => clearTimeout(timer);
  }, [delay, scramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      scramble();
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {displayText}
    </span>
  );
}
