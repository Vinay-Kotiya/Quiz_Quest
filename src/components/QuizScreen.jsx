import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};
export default function QuizScreen({
  questionData,
  questionIndex,
  total,
  onNext,
  onPrevious,
}) {
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(60); // Set initial timer value

  useEffect(() => {
    setTimer(60);
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
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === null) {
      alert("Please select an answer before proceeding.");
    } else {
      onNext(selected === questionData.answer, selected); // Pass the selected answer to the parent component
      setSelected(null);
    }
  };
  const handlePrevious = () => {
    // alert("This is the first question!");
    const goBack = 1;
    onPrevious(true);
  };
  // const handleRestart = () => {
  //   setSelected(null);
  //   setTimer(15);
  //   onNext(false); // Reset the quiz or navigate to the start screen
  // };

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-50"
    >
      <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold  ">
            Question {questionIndex + 1} of {total}
          </h2>
          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">
            {/* ⏱ {timer}s */}
            {/* <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer> */}
          </div>
        </div>
        <p className="text-xl md:text-3xl font-medium mb-6">
          {questionData.question}
        </p>
        <div className="grid md:text-2xl gap-4">
          {questionData.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 rounded-xl border text-left transition-all duration-200
                ${
                  selected === option
                    ? "bg-green-200 border-green-500"
                    : "bg-gray-200 hover:bg-gray-300 border-gray-400"
                }
              `}
              // disabled={!!selected}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex md:text-2xl justify-between mt-6">
          {/* <button
            onClick={handlePrevious}
            className="mt-6 bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:scale-105 transition transform"
          >
            Previous
          </button> */}
          <button
            onClick={handlePrevious}
            disabled={questionIndex === 0}
            className={`mt-6 px-6 py-2 rounded-full transition transform ${
              questionIndex === 0
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 text-gray-700 hover:scale-105"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="mt-6 bg-[#1DCD9F] text-white px-6 py-2 rounded-full hover:scale-105 transition transform"
          >
            Next
          </button>
        </div>
      </div>
      {/* <button onClick={handleRestart}>Restart</button> */}
    </motion.div>
  );
}
