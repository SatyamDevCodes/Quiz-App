// UserHome.jsx
import React, { useState } from 'react';
import CategorySelect from '../components/CategorySelect';
import StartScreen from '../components/StartScreen';
import Quiz from '../components/Quiz';

const UserHome = ({ onLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => setStarted(true);

  const userName = localStorage.getItem('username') || "Guest";
  const mockStats = {
    quizzesPlayed: 12,
    bestScore: "9/10",
    currentStreak: 3,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-blue-50 relative">
      {/* Logout button */}
      <button
        onClick={onLogout}
        className="absolute top-6 right-6 px-6 py-3 bg-white hover:bg-gray-100 text-red-600 font-semibold rounded-full shadow-md transition-all z-10"
      >
        Logout
      </button>

      {!started ? (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Welcome + Stats */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4">
              Welcome back, {userName}!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Ready to challenge yourself today?
            </p>

            {/* Quick stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
                <p className="text-4xl font-bold text-indigo-600 mb-1">{mockStats.quizzesPlayed}</p>
                <p className="text-gray-600">Quizzes Played</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
                <p className="text-4xl font-bold text-green-600 mb-1">{mockStats.bestScore}</p>
                <p className="text-gray-600">Best Score</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
                <p className="text-4xl font-bold text-orange-600 mb-1">{mockStats.currentStreak} days</p>
                <p className="text-gray-600">Current Streak</p>
              </div>
            </div>
          </div>

          {/* Category & Difficulty Selection */}
          {!selectedDifficulty ? (
            <CategorySelect
              onSelectCategory={setSelectedCategory}
              onSelectDifficulty={setSelectedDifficulty}
            />
          ) : (
            <StartScreen onStart={handleStart} />
          )}
        </div>
      ) : (
        <Quiz
          category={selectedCategory}
          difficulty={selectedDifficulty}
        />
      )}
    </div>
  );
};

export default UserHome;