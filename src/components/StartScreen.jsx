import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StartScreen({ onStart }) {
  // const [type, setType] = useState("general");
  // const [level, setLevel] = useState("easy");

  const handleSubmit = () => {
    onStart("selection");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">🚀 Welcome to the Quiz Game!</h1>
        <p className="text-lg">Choose your topic and level to begin!</p>

        {/* <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Choose Topic:</label>
            <select
              className="text-black p-2 rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="general">General Knowledge</option>
              <option value="coding">Coding</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Choose Difficulty:
            </label>
            <select
              className="text-black p-2 rounded"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div> */}

        <button
          onClick={handleSubmit}
          className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition transform"
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
}
