// StartScreen.jsx
import React from 'react';

const StartScreen = ({ onStart, onLogout }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-red-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
    
      {/* Main content */}
      <div className="text-center z-10 max-w-md w-full">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight mb-8">
          <span className="bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
             Quiz App 
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-lg text-gray-700 font-medium mb-12">
          Test your knowledge • Beat your friends • Have fun!
        </p>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="group relative px-13 py-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Start Quiz
            {/* <span className="text-4xl group-hover:rotate-12 transition-transform">🚀</span> */}
          </span>

          </button>

        {/* Small footer text */}
        <p className="mt-10 text-sm text-gray-500">
          Challenge yourself • No pressure • Just vibes 
        </p>
      </div>
    </div>
  );
};

export default StartScreen;