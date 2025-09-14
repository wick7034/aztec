import React from 'react';
import { Download, Share, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onDownload: () => void;
  onReset: () => void;
  currentColor: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onDownload, 
  onReset, 
  currentColor 
}) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 max-w-md mx-auto">
      
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Download Button */}
        <button
          onClick={onDownload}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download Logo</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Original</span>
        </button>
      </div>

      {/* Current Color Display */}
      <div className="mt-2 p-2 bg-white/10 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">Current Color:</span>
          <div className="flex items-center space-x-2">
            <div 
              className="w-5 h-5 rounded-full border-2 border-white/50 shadow-lg"
              style={{ backgroundColor: currentColor }}
            ></div>
            <span className="text-white font-mono text-xs">{currentColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};