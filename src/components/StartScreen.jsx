import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import BlurText from "../ReactBits/BlurText/BlurText";
import GradientText from "../ReactBits/GradientText/GradientText";
import TrueFocus from "../ReactBits/TrueFocus/TrueFocus";
import bgMusic from "../assets/background.mp3";
import { a } from "@react-spring/web";
import Magnet from "../ReactBits/Magnet/Magnet";
// import Squares from "../ReactBits/Squares/Squares";

export default function StartScreen({ onStart }) {
  const handleSubmit = () => {
    onStart("selection");
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
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

  const handleSoundClick = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgMusic); // replace with your audio
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    if (!isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.error("Error playing:", e));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  if (hasError || !isLoaded) return null; // Don't render anything if not loaded

  return (
    <>
      <div className="h-screen w-full flex absolute flex-col items-center justify-center bg-transparent text-white px-6">
        {/* Overlay Background */}
        {/* <div className="absolute inset-0 bg-black opacity-40 z-10"></div> */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          duration={1}
          transition={{ delay: 0.5 }}
          className="w-full flex top-5 absolute justify-around items-center"
        >
          <h1 className="text-xl  font-bold text-white">
            <TrueFocus
              sentence="Quiz Game"
              manualMode={false}
              blurAmount={5}
              borderColor="lightgreen"
              animationDuration={2}
              pauseBetweenAnimations={1}
              glowColor="rgba(0, 255, 0, 0.6)"
            />
          </h1>

          <motion.span
            // ref={audioRef}
            animate={isPlaying ? { rotate: 3600 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { repeat: Infinity, ease: "linear", duration: 60 }
                : { duration: 0 }
            }
            className="h-10 md:h-20 transition hover:scale-110 cursor-pointer"
            onClick={handleSoundClick}
          >
            <Magnet padding={100} disabled={false} magnetStrength={9}>
              <img
                className="md:h-20 h-10 transition hover:scale-110"
                src="https://cdn-icons-png.freepik.com/512/240/240301.png"
                alt="Sound Icon"
              />
            </Magnet>
          </motion.span>
        </motion.div>

        {/* Content Container */}
        <div className="relative  z-20 flex mt-10 flex-col md:flex-row items-center justify-between max-w-6xl w-full">
          {/* Left Side Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-1/2 text-center md:text-left space-y-6"
          >
            <BlurText
              text="Welcome to the Quiz Game!"
              delay={120}
              animateBy="words"
              direction="top"
              // onAnimationComplete={handleAnimationComplete}
              className="text-4xl md:text-5xl font-bold  backdrop-blur rounded-2xl p-2 border-green-400 border"
            />

            <BlurText
              text="Test your knowledge and learn something new every round."
              delay={100}
              animateBy="words"
              direction="top"
              // onAnimationComplete={handleAnimationComplete}
              className="text-lg md:text-xl  backdrop-blur rounded-2xl p-2 border-green-400 border"
            />

            <p className="text-base font-bold  backdrop-blur rounded-2xl p-2 border-green-400 border md:text-lg text-gray-200">
              <BlurText
                text="Learn interesting facts"
                delay={100}
                animateBy="words"
                direction="top"
                // onAnimationComplete={handleAnimationComplete}
              />
              <br />

              <BlurText
                text="Sharpen your mind"
                delay={100}
                animateBy="words"
                direction="right"
                // onAnimationComplete={handleAnimationComplete}
                // className="text-lg md:text-xl"
              />
              <br />
              <BlurText
                text="Track your score and aim for the top!"
                delay={100}
                animateBy="words"
                direction="left"
                // onAnimationComplete={handleAnimationComplete}
                // className="text-lg md:text-xl"
              />
            </p>

            <BlurText
              text="Ready to begin your journey of curiosity and discovery?"
              delay={100}
              animateBy="words"
              direction="left"
              // onAnimationComplete={handleAnimationComplete}
              className="text-base md:text-lg text-gray-200  backdrop-blur rounded-2xl p-2 border-green-400 border"
            />
            <Magnet padding={150} disabled={false} magnetStrength={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                duration={1}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center gap-4 group"
              >
                <div class="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                <a
                  onClick={handleSubmit}
                  role="button"
                  className="group relative inline-flex items-center justify-center text-2xl rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                >
                  Start Quiz
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="10"
                    width="10"
                    fill="none"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </a>
              </motion.div>
            </Magnet>
          </motion.div>

          {/* Right Side 3D Lightbulb */}
          <div className="w-full md:w-1/2  md:h-[700px] h-[400px] hidden md:flex justify-center bg-transparent items-center">
            <Spline className="bg-transparent" scene={splineUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
