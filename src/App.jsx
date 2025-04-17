import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ScoreScreen from "./components/ScoreScreen";
import { quizData } from "./data/quizData";

export default function App() {
  const [step, setStep] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => setStep("quiz");

  const handleNext = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("score");
    }
  };

  const handleRestart = () => {
    setStep("start");
    setScore(0);
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center p-4">
      {step === "start" && <StartScreen onStart={handleStart} />}
      {step === "quiz" && (
        <QuizScreen
          questionData={quizData[currentQuestion]}
          questionIndex={currentQuestion}
          total={quizData.length}
          onNext={handleNext}
        />
      )}
      {step === "score" && (
        <ScoreScreen
          score={score}
          total={quizData.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
