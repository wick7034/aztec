import React, { useState } from 'react';
import { ColorPalette } from './components/ColorPalette';
import { ColorPicker } from './components/ColorPicker';
import { ActionButtons } from './components/ActionButtons';
import { AztecLogo } from './components/AztecLogo';
import { Sparkles } from 'lucide-react';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [logoColor, setLogoColor] = useState('#1A1400');
  const originalColor = '#1A1400';

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleLogoClick = () => {
    setLogoColor(selectedColor);
  };

  const handleReset = () => {
    setLogoColor(originalColor);
    setSelectedColor('#FF6B6B');
  };

  const handleDownload = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 1170;
      canvas.height = 300;
      
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'aztec-renaissance-logo.png';
        link.href = canvas.toDataURL();
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{
        backgroundImage: 'url(/686c5544398b6b0a750f1de5_image-assets.png)',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white mr-3" />
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Aztec Renaissance
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto px-4">
            Transform the iconic Aztec wordmark with your creative vision. 
            Choose from our curated palette or create custom colors to bring the logo to life.
          </p>
        </header>

        {/* Main content area */}
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Logo section */}
            <div className="mb-6">
              <AztecLogo fillColor={logoColor} onLogoClick={handleLogoClick} />
            </div>

            {/* Action Buttons - Below Logo */}
            <div className="mb-8">
              <ActionButtons
                onDownload={handleDownload}
                onReset={handleReset}
                currentColor={selectedColor}
              />
            </div>

            {/* Color Controls */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Color Palette */}
              <div>
                <ColorPalette 
                  selectedColor={selectedColor} 
                  onColorSelect={handleColorSelect} 
                />
              </div>
              
              {/* Custom Color Picker */}
              <div>
                <ColorPicker 
                  selectedColor={selectedColor}
                  onColorSelect={handleColorSelect}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/20">
          <p className="text-white/60 text-sm">
            Made with ❤️ for creative minds • Aztec Renaissance
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;