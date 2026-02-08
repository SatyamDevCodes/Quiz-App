import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";




const Quiz = ({ category, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/quiz?category=${category}&difficulty=${difficulty}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    const shuffledQ = res.data.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQ);
    shuffleOptions(shuffledQ[0]?.options || []);
  };


  const shuffleOptions = (opts) => {
    setOptions([...opts].sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (opt) => {
    if (selectedAnswer) return; // prevent multiple clicks

    setSelectedAnswer(opt);

    const correct = opt === questions[currentIndex].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    // Wait 1.2 seconds → next question
    setTimeout(() => {
      const next = currentIndex + 1;
      if (next < questions.length) {
        setCurrentIndex(next);
        shuffleOptions(questions[next].options || []);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1200);
  };

  if (!questions.length) return <p className="text-center text-xl mt-20">Loading questions...</p>;

  if (showScore) {
    return (
      <div className="text-center mt-20 px-4 bg-white h-screen">
        <h2 className="text-5xl font-bold text-indigo-700 mb-6">
          🎉 Your Score: {score} / {questions.length}
        </h2>
        <p className="text-2xl text-gray-700 mb-10">
          {score === questions.length
            ? "Perfect! You're a genius 🔥"
            : score >= questions.length * 0.7
            ? "Great job! Keep practicing 💪"
            : "Good effort! Try again soon 😊"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-xl hover:scale-105 transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        
        {/* Progress */}
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* Question */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {options.map((opt, i) => {
            let bg = "bg-gray-100 hover:bg-gray-200";
            let border = "border-transparent";
            let text = "text-gray-800";

            if (selectedAnswer === opt) {
              if (isCorrect) {
                bg = "bg-green-500";
                border = "border-green-600";
                text = "text-white font-bold";
              } else {
                bg = "bg-red-500";
                border = "border-red-600";
                text = "text-white font-bold";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selectedAnswer}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 transform
                  ${bg} ${border} ${text}
                  hover:scale-[1.02] hover:shadow-md
                  disabled:opacity-70 disabled:cursor-not-allowed
                  flex items-center gap-4 text-lg md:text-xl font-medium`}
              >
                <span className="font-bold min-w-8 text-center">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}

                {/* Feedback icons */}
                {selectedAnswer === opt && (
                  <span className="ml-auto text-2xl">
                    {isCorrect ? <TiTick/> : <RxCross2/>}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current score indicator */}
        <div className="text-center mt-10 text-gray-600 text-lg">
          Score: <span className="font-bold text-indigo-700">{score}</span> • 
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default Quiz;