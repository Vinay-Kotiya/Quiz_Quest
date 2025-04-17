import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function QuizScreen({
  questionData,
  questionIndex,
  total,
  onNext,
}) {
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    setTimer(15);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          if (!selected) {
            setSelected(""); // Mark as unanswered
            setTimeout(() => onNext(false), 1000);
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [questionIndex]);

  const handleSelect = (option) => {
    if (!selected) setSelected(option);
  };

  const handleNext = () => {
    onNext(selected === questionData.answer);
    setSelected(null);
  };

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Question {questionIndex + 1} of {total}
          </h2>
          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">
            ⏱ {timer}s
          </div>
        </div>
        <p className="text-lg font-medium mb-6">{questionData.question}</p>
        <div className="grid gap-4">
          {questionData.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 rounded-xl border text-left transition-all duration-200 ${
                selected === option
                  ? option === questionData.answer
                    ? "bg-green-200 border-green-500"
                    : "bg-red-200 border-red-500"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300"
              }`}
              disabled={!!selected}
            >
              {option}
            </button>
          ))}
        </div>
        {selected && (
          <button
            onClick={handleNext}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:scale-105 transition transform"
          >
            Next
          </button>
        )}
      </div>
    </motion.div>
  );
}
