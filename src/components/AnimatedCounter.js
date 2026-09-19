"use client";

import { useState, useEffect } from "react";

export default function AnimatedCounter({ end, duration = 2000, isDecimal = false, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      // Easing function (easeOutExpo) for a smoother animation
      const rawProgress = (timestamp - startTimestamp) / duration;
      const progress = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress);
      
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      const currentCount = clampedProgress * end;
      
      setCount(currentCount);
      
      if (rawProgress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  const displayCount = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString();
  return <span>{displayCount}{suffix}</span>;
}
