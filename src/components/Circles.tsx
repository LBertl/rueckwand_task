import { useState } from "react";

interface CircleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  onChange: (id: number, x: number, y: number) => void;
}

export function CircleInfo({ id, x, y, onChange }: CircleProps) {
  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, Number(e.target.value), y);
  };

  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, x, Number(e.target.value));
  };

  return (
    <>
      <div
        style={{
          margin: "0 0 0 20px",
          padding: "0 10px",
          width: "fit-content",
          textAlign: "center",
          backgroundColor: "rgb(234, 234, 234)",
          color: "rgb(86, 86, 86)",
          borderRadius: "5px 5px 0 0",
        }}
      >
        Position Circle {id + 1}
      </div>
      <div
        className="input-group mb-3"
        style={{
          margin: "0 0 10px 0",
        }}
      >
        <span className="input-group-text">X</span>
        <input type="number" className="form-control" value={x} onChange={handleXChange} />
        <span className="input-group-text">Y</span>
        <input type="number" className="form-control" value={y} onChange={handleYChange} />
      </div>
    </>
  );
}

export function CircleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function Circle({ id, x, y, size, onChange }: CircleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - x,
      y: e.clientY - y,
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    onChange(id, newX, newY);
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  return (
    <div
      style={{
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "rgb(224, 42, 42)",
        backgroundColor: "transparent",
        width: `${size}px`,
        height: `${size}px`,
        position: "absolute",
        left: `${x - size * 0.5}px`,
        top: `${y - size * 0.5}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
