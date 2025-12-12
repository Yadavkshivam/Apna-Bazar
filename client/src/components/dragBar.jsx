import React, { useRef, useState } from "react";

function DraggableBar() {
  const barRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ mouseX: 0, mouseY: 0, x: 0, y: 0 });

  const [pos, setPos] = useState({ x: 20, y: 120 });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMove = (e) => {
    if (!draggingRef.current) return;

    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startRef.current.mouseX;
    const dy = clientY - startRef.current.mouseY;

    const newX = startRef.current.x + dx;
    const newY = startRef.current.y + dy;

    const el = barRef.current;
    const w = el?.offsetWidth || 60;
    const h = el?.offsetHeight || 60;

    const maxX = window.innerWidth - w - 8;
    const maxY = window.innerHeight - h - 8;

    setPos({
      x: Math.min(Math.max(newX, 8), maxX),
      y: Math.min(Math.max(newY, 8), maxY),
    });
  };

  const handleUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const el = barRef.current;
    const w = el?.offsetWidth || 60;

    const centerX = pos.x + w / 2;
    const snapLeft = centerX < window.innerWidth / 2;
    const targetX = snapLeft ? 12 : window.innerWidth - w - 12;

    setIsAnimating(true);
    setPos((prev) => ({ ...prev, x: targetX }));

    setTimeout(() => setIsAnimating(false), 280);

    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", handleUp);
    window.removeEventListener("touchmove", handleMove);
    window.removeEventListener("touchend", handleUp);
  };

  const handleDown = (e) => {
    e.preventDefault();

    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    draggingRef.current = true;

    startRef.current = { mouseX: clientX, mouseY: clientY, x: pos.x, y: pos.y };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
  };

  return (
    <div
      ref={barRef}
      onMouseDown={handleDown}
      onTouchStart={handleDown}
      style={{
        left: pos.x,
        top: pos.y,
        transition: isAnimating
          ? "left 0.28s cubic-bezier(.22,.99,.36,1)"
          : "none",
      }}
      className="fixed z-[9999] select-none touch-none cursor-grab active:cursor-grabbing
                 bg-gradient-to-b from-orange-400 to-purple-500 text-white
                 shadow-2xl rounded-full px-4 py-3 flex items-center justify-center
                 min-w-[64px] min-h-[48px]"
    >
      Notes
    </div>
  );
}

export default DraggableBar;
