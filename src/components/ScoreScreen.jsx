import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
// import { useSound } from "use-sound";
import winningSound from "../assets/winning.mp3"; // Adjust the path as necessary
import lose from "../assets/lose.mp3"; // Adjust the path as necessary
import close from "../assets/close.svg";
export default function ScoreScreen({
  score,
  total,
  onRestart,
  subCategory,
  selectedQuiz,
  category,
  difficulty,
  myAnswer,
  onClose,
}) {
  const [step, setStep] = useState("scoreScreen");
  useEffect(() => {
    // console.log(selectedQuiz, category, difficulty, myAnswer);

    const audio = new Audio(score >= 3 ? winningSound : lose);
    audio.volume = score >= 7 ? 0.8 : 0.4;
    audio.loop = false; // Set loop to false
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    }); // Play the audio when the component mounts
    // Play confetti animation based on score
    if (score <= 1) {
      confetti({
        particleCount: 0,
        spread: 0,
        origin: { y: 0.6 },
      });
    } else if (score <= 2) {
      confetti({
        particleCount: 20,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (score <= 3) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (score <= 6) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (score <= 9) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (score == 10) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, []);

  return (
    <div className="h-full z-50 ">
      {step === "scoreScreen" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-50"
        >
          <div className="text-center space-y-6 bg-white text-gray-800 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold">
              🎉{subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}{" "}
              Quiz Completed!
            </h1>
            <p className="text-xl">
              You scored{" "}
              <span className="text-green-600 font-bold">
                {score}/{total}
              </span>
            </p>
            <p className="text-green-600 text-7xl text-shadow-md   text-shadow-black font-bold">
              {(score / total) * 100}%
            </p>
            <p className="text-lg text-gray-600 text-center mt-4">
              {score / total >= 0.8
                ? "Outstanding! You're a quiz master! 🧠🔥"
                : score / total >= 0.5
                ? "Great job! You're doing well! 🎉"
                : score / total >= 0.3
                ? "Not bad, but you can do better! 💪"
                : "Keep practicing! You'll get there! 🌱"}
            </p>
            {/* <button
              onClick={() => setStep("questionsScreen")}
              className="m-4 bg-[#1DCD9F] border-1 border-black text-black md:text-xl px-6 py-2 rounded-full hover:scale-105 transition transform"
            >
              Check Answers
            </button> */}
            <button
              onClick={() => setStep("questionsScreen")}
              class="group/button relative inline-flex items-center m-3 justify-center overflow-hidden rounded-3xl bg-[#1DCD9F] backdrop-blur-lg px-6 py-2  font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-700 border border-black"
            >
              <span class="md:text-2xl text-xl">Check your Answers</span>
              <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div class="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
            {/* <button
              onClick={onRestart}
              className="m-4 bg-[#1DCD9F] border-1 border-black text-black md:text-xl px-6 py-2 rounded-full hover:scale-105 transition transform"
            >
              Play Again
            </button> */}
            <button
              onClick={onRestart}
              class="group/button relative inline-flex items-center justify-center m-3 overflow-hidden rounded-3xl bg-[#1DCD9F] backdrop-blur-lg px-6 py-2  font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-700 border border-black"
            >
              <span class="md:text-2xl text-xl">Play Again</span>
              <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div class="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </div>
        </motion.div>
      )}
      {step === "questionsScreen" && (
        <div className="text-center h-full w-full  items-center flex justify-center flex-col space-y-6 bg-transparent text-gray-800 md:p-8 p-2 rounded-2xl z-50 shadow-lg">
          <div className="text-center md:w-[70%] space-y-6 bg-white text-gray-800 md:p-8 p-2 rounded-2xl shadow-lg">
            <div className="relative flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}{" "}
                Quiz Questions
              </h1>
              <img
                className="h-10 "
                src={close}
                onClick={() => setStep("scoreScreen")}
              />
            </div>

            <div className="text-lg text-gray-600 w-full border-1 border-green-200 p-4 rounded text-center mt-4">
              {selectedQuiz.map((question, index) => (
                <div key={index} className="mb-4 ">
                  <p className="font-bold md:text-3xl text-xl  text-left ">{`Q${
                    index + 1
                  }: ${question.question}`}</p>
                  <div className="grid md:text-2xl mt-2 gap-4">
                    {question.options.map((option, idx) => (
                      <button
                        key={idx}
                        // onClick={() => handleSelect(option)}
                        className={`px-4 py-2 rounded-xl border text-left transition-all duration-200
                ${
                  option === question.answer
                    ? "bg-green-200 border-green-500"
                    : myAnswer[index] !== question.answer
                    ? myAnswer[index] === option
                      ? "bg-red-100  border-red-300"
                      : "bg-gray-100 border-gray-300"
                    : "bg-gray-100 border-gray-500"
                }
              `}
                        // disabled={!!selected}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {/* <p className="text-gray-500">{`Your Answer: ${myAnswer[index]}`}</p>
                <p className="text-green-500">{`Correct Answer: ${question.answer}`}</p> */}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep("scoreScreen")}
              class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-3xl bg-[#1DCD9F] backdrop-blur-lg px-6 py-2 text-2xl font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-700 border border-black"
            >
              <span class="md:text-3xl text-2xl">Close</span>
              <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div class="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
            {/* <button
              onClick={() => setStep("scoreScreen")}
              className="m-4 bg-[#1DCD9F] border-1 border-black text-black md:text-xl px-6 py-2 rounded-full hover:scale-105 transition transform"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
