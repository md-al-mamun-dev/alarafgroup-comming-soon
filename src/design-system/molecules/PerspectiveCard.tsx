"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

export interface PerspectiveCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
}

export function PerspectiveCard({
  children,
  maxTilt = 7,
  perspective = 1000,
  className = "",
  as: Component = "div",
  disabled = false,
}: PerspectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (disabled) {
      setTransform("rotateX(0deg) rotateY(0deg)");
    }
  }, [disabled]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Calculate tilt angles: inverted Y for tilt up/down, standard X for tilt left/right
      const tiltX = (0.5 - y) * maxTilt * 2;
      const tiltY = (x - 0.5) * maxTilt * 2;

      setTransform(`rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`);
    },
    [disabled, isTouchDevice, maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
  }, [disabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    setTransform("rotateX(0deg) rotateY(0deg)");
  }, [isTouchDevice]);

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative [transform-style:preserve-3d] will-change-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transform: transform,
        transition: isHovered
          ? "transform 100ms ease-out"
          : "transform 600ms cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      {children}
    </Component>
  );
}

