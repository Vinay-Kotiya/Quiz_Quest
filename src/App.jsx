import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import SelectionScreen from "./components/SelectionScreen";
import QuizScreen from "./components/QuizScreen";
import ScoreScreen from "./components/ScoreScreen";
import { quizData } from "./data/quizData";
import Squares from "./ReactBits/Squares/Squares";
// import TextCursor from "./ReactBits/TextCursor/TextCursor";

export default function App() {
  const [step, setStep] = useState("start");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState([]);

  const handleStart = () => setStep("selection");

  const handleSelection = (cat, subC, diff) => {
    setCategory(cat);
    setDifficulty(diff);
    setSubCategory(subC);

    const selected = quizData[cat][subC][diff];
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
  // const handlePrevious = (goBack) => {
  //   if (currentQuestion - goBack >= 0) {
  //     setCurrentQuestion(currentQuestion - goBack);
  //   } else {
  //     alert("This is the first question!");
  //   }
  // };
  const handlePrevious = (goBack) => {
    console.log("Go back by:", goBack);
    if (currentQuestion - goBack >= 0) {
      setCurrentQuestion(currentQuestion - goBack);
    } else {
      alert("This is the first question!");
    }
  };

  const handleRestart = () => {
    setStep("selection");
    setScore(0);
    setCurrentQuestion(0);
    setCategory("");
    setDifficulty("");
    setSelectedQuiz([]);
  };
  const handleClose = () => {
    setStep("start");
    setCategory("");
    setDifficulty("");
    setSelectedQuiz([]);
  };
  return (
    <>
      <div className="absolute inset-0 z-0 h-screen w-full overflow-hidden bg-black">
        <Squares
          speed={0.1}
          squareSize={40}
          direction="up" // up, down, left, right, diagonal
          borderColor="#05df72"
          hoverFillColor="#fff"
          // className="absolute inset-0 z-0 h-screen w-full"
        />
      </div>
      <div className="min-h-screen z-50  text-white flex items-center justify-center ">
        {step === "start" && <StartScreen onStart={handleStart} />}
        {step === "selection" && (
          <SelectionScreen onSelect={handleSelection} onClose={handleClose} />
        )}
        {step === "quiz" && (
          // <QuizScreen
          //   questionData={selectedQuiz[currentQuestion]}
          //   questionIndex={currentQuestion}
          //   total={selectedQuiz.length}
          //   onNext={handleNext}
          //   onPrevious={handlePrevious}
          // />
          <QuizScreen
            questionData={selectedQuiz[currentQuestion]}
            questionIndex={currentQuestion}
            total={selectedQuiz.length}
            onNext={handleNext}
            onPrevious={handlePrevious} // ✅ correctly passed
          />
        )}
        {step === "score" && (
          <ScoreScreen
            score={score}
            total={selectedQuiz.length}
            onRestart={handleRestart}
            subCategory={subCategory}
          />
        )}
      </div>
    </>
  );
}
// import React from "react";
// import Spline from "@splinetool/react-spline";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center p-4">
//       <Spline scene="https://prod.spline.design/ViuE2EdGXDSyikFr/scene.splinecode" />
//     </div>
//   );
// }
