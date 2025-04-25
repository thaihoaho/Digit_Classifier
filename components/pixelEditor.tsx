import React, { useState } from "react";

const SIZE = 28;
const BRUSH_SIZE = 2;

export default function PixelEditor({ setFeatures }: { setFeatures: (features: number[]) => void }) {
  const [grid, setGrid] = useState(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  );

  const [isDrawing, setIsDrawing] = useState(false);

  const drawPixel = (x: number, y: number) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      const radius = Math.floor(BRUSH_SIZE / 2);
      const sigma = BRUSH_SIZE / 2; // dùng để tính gaussian blur

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE) {
            const distanceSq = dx * dx + dy * dy;
            const intensity = 255 * Math.exp(-distanceSq / (2 * sigma * sigma));
            newGrid[ny][nx] = Math.min(255, newGrid[ny][nx] + Math.floor(intensity));
          }
        }
      }
      return newGrid;
    });
  };


  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const target = e.target as HTMLElement;
    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);
    if (!isNaN(x) && !isNaN(y)) {
      drawPixel(x, y);
    }
  };


  const getFeatures = () => {
    const features = grid.flat().map(cell => (cell ? 255 : 0));
    setFeatures(features);
  };


  return (
    <div
      className="flex justify-center items-center w-fit h-fit border border-gray-300 border-1"
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => { setIsDrawing(false); getFeatures(); }}
      onMouseLeave={() => setIsDrawing(false)}
    >
      <div
        className="grid select-none"
        style={{
          gridTemplateColumns: `repeat(${SIZE}, 10px)`,
          gridTemplateRows: `repeat(${SIZE}, 10px)`,
        }}
        onMouseMove={handleMouseMove}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              data-x={x}
              data-y={y}
              onMouseDown={() => drawPixel(x, y)}
              className="w-[10px] h-[10px] cursor-crosshair"
              style={{
                backgroundColor: `rgb(${255 - grid[y][x]}, ${255 - grid[y][x]}, ${255 - grid[y][x]})`,
              }}
            />

          ))
        )}
      </div>
    </div>
  );
}
