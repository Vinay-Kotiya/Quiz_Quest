import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import SelectionScreen from "./components/SelectionScreen";
import QuizScreen from "./components/QuizScreen";
import ScoreScreen from "./components/ScoreScreen";
import { quizData } from "./data/quizData";

export default function App() {
  const [step, setStep] = useState("start");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState([]);

  const handleStart = () => setStep("selection");

  const handleSelection = (cat, diff) => {
    setCategory(cat);
    setDifficulty(diff);
    const selected = quizData[cat][diff];
    setSelectedQuiz(selected);
    setStep("quiz");
  };

  const handleNext = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion + 1 < selectedQuiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("score");
    }
  };

  const handleRestart = () => {
    setStep("start");
    setScore(0);
    setCurrentQuestion(0);
    setCategory("");
    setDifficulty("");
    setSelectedQuiz([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center p-4">
      {step === "start" && <StartScreen onStart={handleStart} />}
      {step === "selection" && <SelectionScreen onSelect={handleSelection} />}
      {step === "quiz" && (
        <QuizScreen
          questionData={selectedQuiz[currentQuestion]}
          questionIndex={currentQuestion}
          total={selectedQuiz.length}
          onNext={handleNext}
        />
      )}
      {step === "score" && (
        <ScoreScreen
          score={score}
          total={selectedQuiz.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
