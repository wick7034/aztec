import React, { useState } from 'react';
import { Palette, Hash } from 'lucide-react';

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  selectedColor: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect, selectedColor }) => {
  const [hexInput, setHexInput] = useState(selectedColor);
  const [showHexInput, setShowHexInput] = useState(false);

  const handleHexSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHex = hexInput.startsWith('#') ? hexInput : `#${hexInput}`;
    if (/^#[0-9A-F]{6}$/i.test(cleanHex)) {
      onColorSelect(cleanHex);
    }
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value);
    const hslColor = `hsl(${hue}, 70%, 50%)`;
    // Convert HSL to hex for consistency
    const tempDiv = document.createElement('div');
    tempDiv.style.color = hslColor;
    document.body.appendChild(tempDiv);
    const rgbColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    
    const rgb = rgbColor.match(/\d+/g);
    if (rgb) {
      const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
      onColorSelect(hex);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
      <h3 className="text-white text-lg md:text-xl font-bold mb-4 text-center flex items-center justify-center">
        <Palette className="w-5 h-5 mr-2" />
        Custom Colors
      </h3>
      
      {/* Hue Slider */}
      <div className="mb-6">
        <label className="text-white/80 text-xs md:text-sm mb-2 block">Hue Selector</label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="360"
            className="w-full h-6 md:h-8 rounded-lg appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
            }}
            onChange={handleHueChange}
          />
        </div>
      </div>

      {/* Hex Input Toggle */}
      <div className="space-y-3">
        <button
          onClick={() => setShowHexInput(!showHexInput)}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 md:px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm md:text-base"
        >
          <Hash className="w-4 h-4" />
          <span>{showHexInput ? 'Hide' : 'Show'} Hex Input</span>
        </button>

        {showHexInput && (
          <form onSubmit={handleHexSubmit} className="space-y-3">
            <div>
              <label className="text-white/80 text-xs md:text-sm mb-1 block">Hex Color Code</label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#FF6B6B"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                maxLength={7}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-3 md:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              Apply Hex Color
            </button>
          </form>
        )}

        {/* Color Preview */}
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">Preview:</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg border-2 border-white/50 shadow-lg"
                style={{ backgroundColor: selectedColor }}
              ></div>
              <span className="text-white font-mono text-xs">{selectedColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};