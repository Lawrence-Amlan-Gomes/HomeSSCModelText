"use client";
import { useEffect, useState } from "react";
import EachMcq from "./EachMcq";
import hardcodedMcqs from "@/app/mcqdatabase/chemistry";

export default function McqGenerate({ subject }) {
  const [mcqs, setMcqs] = useState([]);
  const [isSubmitted, setIsSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [generateButton, setGenerateButton] = useState("Generate");

  // Function to randomly select 5 MCQs
  const getResponse = () => {
    setGenerateButton("Generating...");
    setTimeout(() => {
      const shuffled = hardcodedMcqs.sort(() => 0.5 - Math.random());
      const selectedMcqs = shuffled.slice(0, 5).map((mcq, index) => ({
        ...mcq,
        id: index + 1, // Reset IDs to 1-5 for display
      }));
      setMcqs(selectedMcqs);
      setGenerateButton("Generated");
      console.log("Selected MCQs:", selectedMcqs);
    }, 500); // Simulate brief loading delay
  };

  useEffect(() => {
    setTotalScore(mcqs.length);
  }, [mcqs]);

  const AnsSubmit = () => {
    if (!isSubmitted) {
      let submitted = confirm(
        "Do you want to submit your answers? You can't submit again."
      );
      if (submitted) {
        setIsSubmited(true);
      }
    }
  };

  const retest = () => {
    setMcqs([]);
    setIsSubmited(false);
    setScore(0);
    setTotalScore(0);
    setGenerateButton("Generate");
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto w-full h-full">
      {generateButton === "Generate" || generateButton === "Generating..." ? (
        <div className="w-full p-5 flex justify-center items-center">
          {generateButton === "Generate" ? (
            <button
              onClick={() => getResponse()}
              className="bg-black h-[50px] w-[100px] m-[10px] rounded-lg text-white ml-2"
            >
              Generate
            </button>
          ) : (
            <button className="bg-black h-[50px] w-[120px] m-[10px] rounded-lg text-white ml-2">
              Generating...
            </button>
          )}
        </div>
      ) : null}

      {mcqs.length > 0 ? (
        mcqs.map((mcq) => (
          <EachMcq
            key={mcq.id}
            mcq={mcq}
            isSubmitted={isSubmitted}
            setScore={setScore}
          />
        ))
      ) : null}

      {!isSubmitted ? (
        <div className="w-full p-5 flex justify-center items-center">
          {generateButton === "Generated" ? (
            <button
              onClick={AnsSubmit}
              className="bg-black h-[50px] w-[100px] m-[10px] rounded-lg text-white ml-2"
            >
              Submit
            </button>
          ) : null}
        </div>
      ) : (
        <div className="w-full pb-[20px] overflow-hidden">
          <div className="bg-blue-500 text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-black">
            Your Score: {score}/{totalScore}
          </div>
          <div className="bg-green-500 text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-black">
            Correct Option
          </div>
          <div className="bg-red-500 text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-black">
            Option You Selected But Wrong
          </div>
          <div
            onClick={() => retest()}
            className="bg-black text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-white"
          >
            Retest
          </div>
        </div>
      )}
    </div>
  );
}