import React, { useState } from "react";
import { motion } from "framer-motion";

const SelectionScreen = ({ onSelect }) => {
  const [category, setCategory] = useState("general");
  const [difficulty, setDifficulty] = useState("easy");

  const handleSubmit = () => {
    if (category && difficulty) {
      onSelect(category, difficulty);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-black p-8 rounded-2xl shadow-xl w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select Quiz Preferences
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="general">General Knowledge</option>
          <option value="coding">Coding</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Start Quiz
      </button>
    </motion.div>
  );
};

export default SelectionScreen;
