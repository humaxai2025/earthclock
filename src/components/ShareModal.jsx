import React from 'react';

const ShareModal = ({ showShareModal, setShowShareModal, shareToSocial, copyToClipboard, isDarkMode }) => {
  if (!showShareModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full rounded-3xl p-8 shadow-2xl border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 text-white' 
          : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50 text-gray-800'
      }`}>
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          🌍 Share Your Climate Impact
        </h3>
        <p className="text-sm opacity-80 mb-6">
          Help spread awareness about our planet's current state and inspire others to take action!
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => shareToSocial('twitter')}
            className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🐦 Twitter
          </button>
          <button
            onClick={() => shareToSocial('facebook')}
            className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            📘 Facebook
          </button>
          <button
            onClick={() => shareToSocial('linkedin')}
            className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            💼 LinkedIn
          </button>
          <button
            onClick={() => shareToSocial('whatsapp')}
            className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            💬 WhatsApp
          </button>
        </div>
        
        <button
          onClick={copyToClipboard}
          className={`w-full p-4 rounded-xl mb-4 transition-all duration-300 hover:scale-105 shadow-lg ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white' 
              : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800'
          }`}
        >
          📋 Copy Data to Clipboard
        </button>
        
        <button
          onClick={() => setShowShareModal(false)}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;