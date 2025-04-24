import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import SelectionScreen from "./components/SelectionScreen";
import QuizScreen from "./components/QuizScreen";
import ScoreScreen from "./components/ScoreScreen";
import { quizData } from "./data/quizData";
import Squares from "./ReactBits/Squares/Squares";
import close from "./assets/close.svg";

import ClickSpark from "./ReactBits/ClickSpark/ClickSpark";
// import TextCursor from "./ReactBits/TextCursor/TextCursor";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 10,
};

const renderTime = (dimension, time) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-2xl md:text-3xl">{time}</div>
      <div className="text-sm font-bold">{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
// const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
// const getTimeDays = (time) => (time / daySeconds) | 0;

export default function App() {
  const [step, setStep] = useState("start");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [myAnswer, setMyAnswer] = useState([]);

  const handleStart = () => setStep("selection");

  const handleSelection = (cat, subC, diff) => {
    setCategory(cat);
    setDifficulty(diff);
    setSubCategory(subC);

    const selected = quizData[cat][subC][diff];
    setSelectedQuiz(selected);
    setStep("quiz");
  };

  const handleNext = (isCorrect, selected) => {
    setMyAnswer((prev) => [...prev, selected]);
    // console.log("Selected answer:", currentQuestion, selected);
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
  const handleTimeISUp = () => {
    setStep("score");
    alert("Time is up!");
  };

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 600; //243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <>
      <ClickSpark
        sparkColor="#05df72"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
        className="absolute inset-0 z-0 h-screen w-full"
      >
        {/* Your content here */}

        <div className="min-h-screen z-50 relative text-white flex items-center justify-center ">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="up" // up, down, left, right, diagonal
            borderColor="#05df72"
            hoverFillColor="#fff"
            // className="absolute inset-0 z-0 h-screen w-full"
          />
          {step === "start" && <StartScreen onStart={handleStart} />}
          {step === "selection" && (
            <SelectionScreen onSelect={handleSelection} onClose={handleClose} />
          )}
          {step === "quiz" && (
            <div className="relative w-full max-w-xl p-6 bg-white text-gray-800 rounded-2xl shadow-xl">
              <img
                className="h-10 absolute top-4 right-4 cursor-pointer"
                src={close}
                onClick={() => setStep("selection")}
              />

              <span className=" top-0 right-0 m-4 gap-5 flex items-center justify-center ">
                <CountdownCircleTimer
                  {...timerProps}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[8, 6, 4, 0]}
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat:
                      remainingTime - totalElapsedTime > minuteSeconds,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        "minutes",
                        getTimeMinutes(hourSeconds - elapsedTime)
                      )}
                      {hourSeconds - elapsedTime <= 0
                        ? handleTimeISUp()
                        : console.log(hourSeconds - elapsedTime)}
                    </span>
                  )}
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  duration={minuteSeconds}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[45, 30, 15, 0]}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime("seconds", getTimeSeconds(elapsedTime))}
                    </span>
                  )}
                </CountdownCircleTimer>
              </span>

              <QuizScreen
                questionData={selectedQuiz[currentQuestion]}
                questionIndex={currentQuestion}
                total={selectedQuiz.length}
                onNext={handleNext}
                onPrevious={handlePrevious} // ✅ correctly passed
              />
            </div>
          )}
          {step === "score" && (
            <ScoreScreen
              score={score}
              total={selectedQuiz.length}
              onRestart={handleRestart}
              subCategory={subCategory}
              selectedQuiz={selectedQuiz}
              category={category}
              difficulty={difficulty}
              myAnswer={myAnswer}
              onClose={handleClose}
            />
          )}
        </div>
      </ClickSpark>
    </>
  );
}
