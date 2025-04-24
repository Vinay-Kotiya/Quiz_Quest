import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { quizData } from "../data/quizData";
import close from "../assets/close.svg";
import Magnet from "../ReactBits/Magnet/Magnet";

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
    {
      level: "easy",
      color: "green",
      emoji: "https://www.svgrepo.com/show/419651/comfortable-easy-emoji.svg",
    },
    {
      level: "medium",
      color: "orange",
      emoji: "https://www.svgrepo.com/show/505370/emote-normal.svg",
    },
    {
      level: "hard",
      color: "red",
      emoji: "https://www.svgrepo.com/show/419643/emoji-emoticon-sweat.svg",
    },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white text-black  p-8  rounded-2xl z-40 shadow-xl h-full w-full max-w-3xl mx-auto"
      >
        <div className="flex justify-around mb-8 items-center">
          <Magnet padding={50} disabled={false} magnetStrength={50}>
            <h2 className="text-3xl font-bold  text-gray-800">
              Select Quiz Preferences
            </h2>
          </Magnet>
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
                {
                  key: "general",
                  label: "General",
                  emoji:
                    "https://cdni.iconscout.com/illustration/premium/thumb/book-idea-illustration-download-in-svg-png-gif-file-formats--creative-knowledge-learning-education-power-pack-school-illustrations-9353779.png?f=webp",
                },
                {
                  key: "coding",
                  label: "Coding",
                  emoji:
                    "https://cdni.iconscout.com/illustration/premium/thumb/coder-working-with-code-optimization-illustration-download-in-svg-png-gif-file-formats--html-coding-web-programming-seo-pack-illustrations-10919625.png?f=webp",
                },
              ].map(({ key, label, emoji }) => (
                <div
                  key={key}
                  onClick={() => setCategory(key)}
                  class={`weather-widget group relative max-w-sm w-full mx-auto rounded-2xl p-6 shadow-xl shadow-teal-600/40 border border-teal-800/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-600/60 hover:scale-105   ${
                    category === key
                      ? "scale-105 shadow-teal-600/60 shadow-2xl   bg-gradient-to-br from-green-700 via-green-500 to-green-800"
                      : " shadow-teal-600/40 bg-gradient-to-br from-gray-900 via-teal-950 to-black "
                  }`}
                >
                  <div class="absolute inset-0 opacity-20 pointer-events-none">
                    <div
                      class={`absolute w-3 h-3  bg-cyan-400 rounded-full blur-md transition-all duration-500 group-hover:scale-150
                         ${
                           category === key
                             ? "group[scale-150] "
                             : "bg-cyan-400 "
                         }
                        `}
                      // style="left:15%; top:20%"
                    ></div>
                    <div
                      class={`absolute w-4 h-4 bg-teal-300 rounded-full blur-lg transition-all duration-500 group-hover:scale-125
                         ${category === key ? "scale-125 " : ""}`}
                      // style="right:25%; bottom:15%"
                    ></div>
                    <div
                      class={`absolute w-2 h-2 bg-yellow-400 rounded-full blur transition-all duration-500 group-hover:scale-175 
                       ${category === key ? "scale-175 " : ""}
                  `}
                      // style="left:40%; top:10%"
                    ></div>
                  </div>

                  <div class="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-500 group-hover:border-teal-500/40">
                    <div class="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent transition-all duration-500 group-hover:w-full"></div>
                  </div>

                  <div class="text-center mb-4 relative z-10">
                    <p class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-500 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                      {label}
                    </p>
                    {/* <p class="text-sm text-gray-400">October 24, 2024</p> */}
                  </div>

                  <div class="text-right">
                    <p class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-600 group-hover:text-5xl group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                      <img className="h-20" src={emoji} />
                    </p>
                  </div>
                </div>
                // <div
                //   key={key}
                //   onClick={() => setCategory(key)}
                //   className={`cursor-pointer px-6 py-4 rounded-xl text-center shadow-md transition-all ${
                //     category === key
                //       ? "bg-green-200 text-black border border-black scale-105"
                //       : "bg-white border border-[#169976] hover:bg-green-100"
                //   }`}
                // >
                //   <div className="text-2xl">{emoji}</div>
                //   <div className="mt-1 font-semibold">{label}</div>
                // </div>
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
                    class={`weather-widget group relative max-w-sm w-full mx-auto rounded-2xl p-2 shadow-xl shadow-teal-600/40 border border-teal-800/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-600/60 hover:scale-105   ${
                      difficulty === level
                        ? "scale-105 shadow-teal-600/60 shadow-2xl   bg-gradient-to-br from-green-700 via-green-500 to-green-800"
                        : " shadow-teal-600/40  bg-gradient-to-br from-gray-900 via-green-800 to-black"
                    }`}
                  >
                    <div class="absolute inset-0 opacity-20 pointer-events-none">
                      <div
                        class={`absolute w-3 h-3  bg-cyan-400 rounded-full blur-md transition-all duration-500 group-hover:scale-150
                         ${
                           difficulty === level
                             ? "group[scale-150] "
                             : "bg-cyan-400 "
                         }
                        `}
                        // style="left:15%; top:20%"
                      ></div>
                      <div
                        class={`absolute w-4 h-4 bg-teal-300 rounded-full blur-lg transition-all duration-500 group-hover:scale-125
                         ${difficulty === level ? "scale-125 " : ""}`}
                        // style="right:25%; bottom:15%"
                      ></div>
                      <div
                        class={`absolute w-2 h-2 bg-yellow-400 rounded-full blur transition-all duration-500 group-hover:scale-175 
                       ${difficulty === level ? "scale-175 " : ""}
                  `}
                        // style="left:40%; top:10%"
                      ></div>
                    </div>

                    <div class="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-500 group-hover:border-teal-500/40">
                      <div class="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent transition-all duration-500 group-hover:w-full"></div>
                    </div>

                    <div class="text-center mb-4 relative z-10">
                      <p class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-500 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </p>
                      {/* <p class="text-sm text-gray-400">October 24, 2024</p> */}
                    </div>

                    <div class="text-right">
                      <p class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-600 group-hover:text-5xl group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                        <img className="h-20" src={emoji} />
                      </p>
                    </div>
                  </div>
                  // <div
                  //   key={level}
                  //   onClick={() => setDifficulty(level)}
                  //   className={`
                  //   cursor-pointer px-5 py-3 rounded-xl text-center shadow-sm transition-all border
                  //   hover:bg-green-100
                  //   ${
                  //     isSelected
                  //       ? `border-black bg-green-200 scale-105`
                  //       : "border-[#169976] bg-white"
                  //   }
                  // `}
                  // >
                  //   <div className="text-3xl">{emoji}</div>
                  //   <div className="capitalize mt-1">{level}</div>
                  // </div>
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
            {subCategoryList.map((item, key) => {
              const isSelected = subCategory === item;
              return (
                <div
                  key={item}
                  onClick={() => setSubCategory(item)}
                  class={`weather-widget group relative max-w-sm w-full mx-auto  rounded-2xl p-6 shadow-xl shadow-teal-600/40 border border-teal-800/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-600/60 hover:scale-105 ${
                    subCategory === item
                      ? "scale-105 shadow-teal-600/60 shadow-2xl   bg-gradient-to-br from-green-700 via-green-500 to-green-800"
                      : " shadow-teal-600/40 bg-gradient-to-br from-gray-900 via-teal-950 to-black "
                  }`}
                >
                  <div class="absolute inset-0 opacity-20 pointer-events-none">
                    <div
                      class="absolute w-3 h-3  bg-cyan-400 rounded-full blur-md transition-all duration-500 group-hover:scale-150"
                      // style="left:15%; top:20%"
                    ></div>
                    <div
                      class="absolute w-4 h-4 bg-teal-300 rounded-full blur-lg transition-all duration-500 group-hover:scale-125"
                      // style="right:25%; bottom:15%"
                    ></div>
                    <div
                      class="absolute w-2 h-2 bg-yellow-400  rounded-full blur transition-all duration-500 group-hover:scale-175"
                      // style="left:40%; top:10%"
                    ></div>
                  </div>

                  <div class="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-500 group-hover:border-teal-500/40">
                    <div class="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent transition-all duration-500 group-hover:w-full"></div>
                  </div>

                  <div class="text-center mb-4 relative z-10">
                    <p class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-500 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </p>
                    {/* <p class="text-sm text-gray-400">October 24, 2024</p> */}
                  </div>

                  <div class="text-right">
                    <p class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-600 group-hover:text-5xl group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                      <motion.img
                        src={logoMap[item.toLowerCase()]}
                        alt={item}
                        className="w-15 h-15 mx-auto "
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      />
                    </p>
                  </div>
                </div>

                // <motion.div
                //   whileTap={{ scale: 0.95 }}
                //   whileHover={{ scale: 1.05 }}
                //   key={index}
                //   onClick={() => setSubCategory(item)}
                //   className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 text-center font-medium shadow-md ${
                //     isSelected
                //       ? "bg-green-200 text-black border-black shadow-lg scale-105"
                //       : "bg-white text-gray-800 hover:bg-green-100 border-[#169976]"
                //   }`}
                // >
                //   <div className="text-2xl mb-1">
                //     <motion.img
                //       src={logoMap[item.toLowerCase()]}
                //       alt={item}
                //       className="w-10 h-10 mx-auto mb-2"
                //       whileHover={{ rotate: 10, scale: 1.1 }}
                //     />
                //   </div>
                //   {item.charAt(0).toUpperCase() + item.slice(1)}
                // </motion.div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        {/* <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full bg-[#1DCD9F] hover:bg-[#169976] text-2xl text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        Start Quiz
      </motion.button> */}
        {/* <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          class="group/button relative w-full inline-flex items-center  text-2xl text-black font-semibold justify-center overflow-hidden rounded-3xl bg-[#1DCD9F] backdrop-blur-lg px-6 py-2   transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-gray-700 border border-black"
        >
          <span class="text-xl">Start Quiz</span>
          <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div class="relative h-full w-10 bg-white/40"></div>
          </div>
        </motion.button> */}
        <div className="w-full flex justify-center items-center">
          <Magnet padding={150} disabled={false} magnetStrength={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              duration={1}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              class="relative inline-flex items-center justify-center gap-4 group"
            >
              <div class="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-green-500 to-red-700 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                onClick={handleSubmit}
                role="button"
                class="group relative inline-flex items-center justify-center text-2xl rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              >
                Start Quiz
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  height="10"
                  width="10"
                  fill="none"
                  class="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                >
                  <path
                    d="M0 5h7"
                    class="transition opacity-0 group-hover:opacity-100"
                  ></path>
                  <path
                    d="M1 1l4 4-4 4"
                    class="transition group-hover:translate-x-[3px]"
                  ></path>
                </svg>
              </a>
            </motion.div>
          </Magnet>
        </div>
      </motion.div>
    </>
  );
};

export default SelectionScreen;
