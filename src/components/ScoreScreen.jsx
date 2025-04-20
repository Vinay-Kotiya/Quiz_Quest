import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ScoreScreen({ score, total, onRestart }) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="z-50"
    >
      <div className="text-center space-y-6 bg-white text-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">🎉 Quiz Completed!</h1>
        <p className="text-xl">
          You scored{" "}
          <span className="text-green-600 font-bold">
            {score}/{total}
          </span>
        </p>
        <button
          onClick={onRestart}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:scale-105 transition transform"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}
