import React from "react";
import { motion } from "framer-motion";

export default function StartScreen({ onStart }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">🚀 Welcome to the Quiz Game!</h1>
        <p className="text-lg">Test your knowledge with 10 fun questions!</p>
        <button
          onClick={onStart}
          className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition transform"
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
}
