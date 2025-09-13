import React from 'react';

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#FF7675', '#00B894', '#0984E3', '#00CEC9', '#FDCB6E', '#E17055',
  '#A29BFE', '#6C5CE7', '#FD79A8', '#E84393', '#2D3436', '#636E72',
  '#74B9FF', '#00B894', '#00CEC9', '#55A3FF', '#FF7675', '#FD79A8'
];

export const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
      <h3 className="text-white text-lg md:text-xl font-bold mb-4 text-center">Color Palette</h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 md:gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 transition-all duration-300 transform hover:scale-110 shadow-lg ${
              selectedColor === color 
                ? 'border-white shadow-2xl scale-110' 
                : 'border-white/30 hover:border-white/60'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};