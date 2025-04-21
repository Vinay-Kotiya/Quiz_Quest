import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { quizData } from "../data/quizData";
import close from "../assets/close.svg";

const SelectionScreen = ({ onSelect, onClose }) => {
  const [category, setCategory] = useState("general");
  const [subCategory, setSubCategory] = useState("history");
  const [difficulty, setDifficulty] = useState("easy");
  const [subCategoryList, setSubCategoryList] = useState([]);

  function handleSubmit() {
    if (category && subCategory && difficulty) {
      onSelect(category, subCategory, difficulty);
    }
  }
  function handleClose() {
    onClose(false);
  }

  useEffect(() => {
    if (quizData[category]) {
      const subCategoryList = Object.keys(quizData[category]);
      setSubCategoryList(subCategoryList);
    }
  }, [category]); // also run this when `category` changes
  // console.log("SubCategoryLIst ", subCategoryList);

  const logoMap = {
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    javascript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    reactjs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    mernstack:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", // You can show MERN stack with 4 icons if needed
    algorithms: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png", // Brain-like icon
    datastructures: "https://cdn-icons-png.flaticon.com/512/9118/9118438.png", // Folder structure icon
    history: "https://static.thenounproject.com/png/3634890-200.png",
    geography: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    politics: "https://static.thenounproject.com/png/955295-200.png",
    currentaffairs:
      "https://www.svgrepo.com/show/418366/current-global-international.svg",
    sports:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sports_and_games.svg",
  };
  const levels = [
    { level: "easy", color: "green", emoji: "🐣" },
    { level: "medium", color: "orange", emoji: "🤔" },
    { level: "hard", color: "red", emoji: "💀" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white text-black p-8 rounded-2xl z-50 shadow-xl w-full max-w-3xl mx-auto"
    >
      <div className="flex justify-around mb-8 items-center">
        <h2 className="text-3xl font-bold  text-gray-800">
          Select Quiz Preferences
        </h2>
        <span
          onClick={handleClose}
          className="text-3xl font-bold   text-gray-800"
        >
          <img className="h-10" src={close} />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Category:
          </label>
          <div className="flex gap-4">
            {[
              { key: "general", label: "General", emoji: "🌍" },
              { key: "coding", label: "Coding", emoji: "💻" },
            ].map(({ key, label, emoji }) => (
              <div
                key={key}
                onClick={() => setCategory(key)}
                className={`cursor-pointer px-6 py-4 rounded-xl text-center shadow-md transition-all ${
                  category === key
                    ? "bg-green-200 text-black border border-black scale-105"
                    : "bg-white border border-[#169976] hover:bg-green-100"
                }`}
              >
                <div className="text-2xl">{emoji}</div>
                <div className="mt-1 font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Difficulty:
          </label>
          <div className="flex gap-4">
            {levels.map(({ level, color, emoji }) => {
              const isSelected = difficulty === level;

              return (
                <div
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`
                    cursor-pointer px-5 py-3 rounded-xl text-center shadow-sm transition-all border
                    hover:bg-green-100
                    ${
                      isSelected
                        ? `border-black bg-green-200 scale-105`
                        : "border-[#169976] bg-white"
                    }
                  `}
                >
                  <div className="text-3xl">{emoji}</div>
                  <div className="capitalize mt-1">{level}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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
                whileHover={{ scale: 1.05 }}
                key={index}
                onClick={() => setSubCategory(item)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 text-center font-medium shadow-md ${
                  isSelected
                    ? "bg-green-200 text-black border-black shadow-lg scale-105"
                    : "bg-white text-gray-800 hover:bg-green-100 border-[#169976]"
                }`}
              >
                <div className="text-2xl mb-1">
                  <motion.img
                    src={logoMap[item.toLowerCase()]}
                    alt={item}
                    className="w-10 h-10 mx-auto mb-2"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  />
                </div>
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
        className="w-full bg-[#1DCD9F] hover:bg-[#169976] text-2xl text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
};

export default SelectionScreen;
