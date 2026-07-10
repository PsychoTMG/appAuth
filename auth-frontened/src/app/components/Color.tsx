'use client'
import { useState } from "react";

const arr = Array.from({ length: 450 });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export default function Color() {
  const [colors, setColors] = useState<{ [key: number]: string }>({});

  const handleHover = (index: number) => {
    const newColor = getRandomHexColor();
    setColors(prev => ({ ...prev, [index]: newColor }));

    setTimeout(() => {
      setColors(prev => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    }, 3000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-[-1]">
      <div className="grid grid-cols-10 lg:grid-cols-30 gap-2 p-4">
        {arr.map((_, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(index)}
            className="bg-[#fefaf6] rounded-[3px] m-auto shadow-2xs w-[30px] h-[35px]"
            style={{
              backgroundColor: colors[index] || '#ffffff',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}