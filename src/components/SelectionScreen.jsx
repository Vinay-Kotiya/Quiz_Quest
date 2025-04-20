import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { quizData } from "../data/quizData";
const SelectionScreen = ({ onSelect }) => {
  const [category, setCategory] = useState("general");
  const [subCategory, setSubCategory] = useState("history");
  const [difficulty, setDifficulty] = useState("easy");
  const [subCategoryList, setSubCategoryList] = useState([]);

  function handleSubmit() {
    if (category && subCategory && difficulty) {
      onSelect(category, subCategory, difficulty);
    }
  }

  useEffect(() => {
    if (quizData[category]) {
      const subCategoryList = Object.keys(quizData[category]);
      setSubCategoryList(subCategoryList);
    }
  }, [category]); // also run this when `category` changes
  // console.log("SubCategoryLIst ", subCategoryList);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white text-black p-8 rounded-2xl z-50 shadow-xl w-full max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Select Quiz Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="general">General Knowledge</option>
            <option value="coding">Coding</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Subcategory Cards */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3 text-gray-700">
          Subcategory:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {subCategoryList.map((item, index) => {
            const isSelected = subCategory === item;
            return (
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                key={index}
                onClick={() => setSubCategory(item)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 text-center font-medium shadow-md ${
                  isSelected
                    ? "bg-green-500 text-white border-green-600 shadow-lg"
                    : "bg-white text-gray-800 hover:bg-green-100 border-gray-200"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
};

export default SelectionScreen;
