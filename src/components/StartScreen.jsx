import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
// import Squares from "../ReactBits/Squares/Squares";

export default function StartScreen({ onStart }) {
  const handleSubmit = () => {
    onStart("selection");
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const splineUrl =
    "https://prod.spline.design/ViuE2EdGXDSyikFr/scene.splinecode";

  useEffect(() => {
    fetch(splineUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Spline file not found");
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("3D Model cannot be fetched", err);
        setHasError(true);
      });
  }, []);

  if (hasError || !isLoaded) return null; // Don't render anything if not loaded

  return (
    <>
      {/* <div className="absolute inset-0 z-0 h-screen w-full overflow-hidden bg-black">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="up" // up, down, left, right, diagonal
          borderColor="#05df72"
          hoverFillColor="#fff"
          // className="absolute inset-0 z-0 h-screen w-full"
        />
      </div> */}

      <div className="h-screen w-full flex absolute items-center justify-center bg-transparent text-white px-6">
        {/* Overlay Background */}
        {/* <div className="absolute inset-0 bg-black opacity-40 z-10"></div> */}

        {/* Content Container */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full">
          {/* Left Side Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 text-center md:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome to the Quiz Game!
            </h1>
            <p className="text-lg md:text-xl">
              Test your knowledge and learn something new every round.
            </p>
            {/* <p className="text-base md:text-lg text-gray-200">
              Whether you're a trivia master or just here for fun, this
              interactive quiz will challenge your brain across a variety of
              topics. Choose your favorite category, select your difficulty
              level, and race against the clock to answer each question.
            </p> */}
            <p className="text-base md:text-lg text-gray-200">
              💡 Learn interesting facts
              <br />
              🧠 Sharpen your mind
              <br />
              🏆 Track your score and aim for the top!
            </p>
            <p className="text-base md:text-lg text-gray-200">
              Ready to begin your journey of curiosity and discovery?
            </p>
            <button
              onClick={handleSubmit}
              className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition transform"
            >
              Start Quiz
            </button>
          </motion.div>

          {/* Right Side 3D Lightbulb */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[700px] flex justify-center bg-transparent items-center">
            <Spline className="bg-transparent" scene={splineUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
