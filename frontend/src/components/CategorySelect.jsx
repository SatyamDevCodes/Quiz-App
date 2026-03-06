import React, { useState } from 'react';


const CategorySelect = ({ onSelectCategory, onSelectDifficulty, onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    onSelectCategory(cat);
  };

  const handleDifficulty = (diff) => {
    setSelectedDifficulty(diff);
    onSelectDifficulty(diff);
  };

  const categories = [
    { name: 'Web Dev', emoji: '💻', color: 'indigo' },
    { name: 'Math',    emoji: '📐', color: 'purple' },
    { name: 'GK',      emoji: '🌍', color: 'teal'   },
  ];

  const difficulties = [
    { name: 'Easy',   emoji: '😊', color: 'green'  },
    { name: 'Medium', emoji: '😐', color: 'yellow' },
    { name: 'Hard',   emoji: '😤', color: 'red'    },
  ];

  const isReady = selectedCategory && selectedDifficulty;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-2">Quiz Challenge</h1>
        <p className="text-lg text-gray-600">Pick your category & difficulty — let's go!</p>
      </div>


      {/* Category Cards */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">Select Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategory(cat.name)}
                className={`relative flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg transition-all duration-300 border-2 
                  ${isSelected 
                    ? `border-\( {cat.color}-500 bg- \){cat.color}-600 text-white scale-105 ring-4 ring-${cat.color}-300/50 shadow-2xl` 
                    : `border-transparent bg-white hover:shadow-xl hover:scale-102 hover:border-${cat.color}-200`}`}
              >
                <span className="text-6xl mb-4">{cat.emoji}</span>
                <span className="text-xl font-bold">{cat.name}</span>

                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-xl font-bold">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Cards */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">Select Difficulty</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff.name;
            const textColor = isSelected ? 'text-white' : `text-${diff.color}-800`;
            return (
              <button
                key={diff.name}
                onClick={() => handleDifficulty(diff.name)}
                className={`relative flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg transition-all duration-300 border-2 
                  ${isSelected 
                    ? `border-\( {diff.color}-500 bg- \){diff.color}-600 \( {textColor} scale-105 ring-4 ring- \){diff.color}-300/50 shadow-2xl` 
                    : `border-transparent bg-\( {diff.color}-50 hover:bg- \){diff.color}-100 hover:shadow-xl hover:scale-102 hover:border-${diff.color}-200`}`}
              >
                <span className="text-6xl mb-4">{diff.emoji}</span>
                <span className={`text-xl font-bold ${textColor}`}>{diff.name}</span>

                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-xl font-bold">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Button - only when ready */}
      {isReady && (
        <button
          onClick={onStart}
          className="px-12 py-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          Start Quiz Now →
        </button>
      )}
    </div>
  );
};

export default CategorySelect;