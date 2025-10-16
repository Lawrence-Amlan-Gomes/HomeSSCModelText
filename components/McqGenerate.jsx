"use client";
import { useEffect, useState } from "react";
import EachMcq from "./EachMcq";
import { response } from "@/app/server";
import chemistry from "@/app/mcqdatabase/chemistry";

export default function McqGenerate({subject}) {
  const [aiResponse, setAiResponse] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [isSubmitted, setIsSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [generateButton, setGenerateButton] = useState("Generate");

  const getResponse = async () => {
    setGenerateButton("Generating...");
    const res = await response(
      chemistry.chapter1 +
        ' [ generate 5 mcq from this paragraph outside of these bracket in a javascript array of objects style string. ' +
        'In the object there will 6 key and values, id, question, correctAns, wrongAnswer1, wrongAnswer2, wrongAnswer3]. Give me only the array. I repeat give me only the array and don\'t need to write anything before and after the array'
    );
    if (res) {
      setGenerateButton("Generated");
      setAiResponse(res);
    }
  };

  useEffect(() => {
    if (aiResponse) {
      const start = aiResponse.indexOf("[");
      const end = aiResponse.lastIndexOf("]") + 1;
      if (start !== -1 && end > start) {
        let cleanStr = aiResponse.slice(start, end);
        cleanStr = cleanStr
          .replace(/[\n\r]/g, "")
          .replace(/\s{2,}/g, " ")
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]");
        try {
          const result = JSON.parse(cleanStr);
          const updatedArray = result.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          setMcqs(updatedArray);
          console.log(updatedArray);
        } catch (e) {
          console.error("JSON parse error:", e);
        }
      } else {
        console.error("Could not find array in response");
      }
    }
  }, [aiResponse]);

  const getResponse2 = () => {
    setGenerateButton("Generating...");
    let str2 = `[ { "id": 1, "question": "What branch of science is chemistry?", "correctAns": "Natural Science", "wrongAnswer1": "Social Science", "wrongAnswer2": "Humanities", "wrongAnswer3": "Applied Science" }, 
    { "id": 2, "question": "What does chemistry discuss?", "correctAns": "Structure, properties, and changes of matter", "wrongAnswer1": "Origin of life", "wrongAnswer2": "Motion of Earth", "wrongAnswer3": "Social issues" }, 
     { "id": 3, "question": "What was the practice of chemistry called in ancient times?", "correctAns": "Alchemy", "wrongAnswer1": "Astronomy", "wrongAnswer2": "Geology", "wrongAnswer3": "Biology" }, { "id": 4, "question": "Why is raw mango sour?", "correctAns": "Presence of intense acids", "wrongAnswer1": "Presence of sugars", "wrongAnswer2": "Lack of water", "wrongAnswer3": "Excess fructose" }, { "id": 5, "question": "Why is ripe mango sweet?", "correctAns": "Chemical change in acids produces sugars and fructose", "wrongAnswer1": "Increase in acid amount", "wrongAnswer2": "Increase in water amount", "wrongAnswer3": "No change occurs" },  
       ]`;
    setGenerateButton("Generated");
    let cleanedData = str2
      .replace(/[\n\r]/g, "") // Remove newlines
      .replace(/\s{2,}/g, " ") // Remove extra spaces
      .replace(/,\s*}/g, "}") // Remove trailing commas before closing braces
      .replace(/,\s*]/g, "]"); // Remove trailing commas before closing brackets
    try {
      const result = JSON.parse(cleanedData);
      const updatedArray = result.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setMcqs(updatedArray);
      console.log(updatedArray);
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  };

  const AnsSubmit = () => {
    if (!isSubmitted) {
      let submitted = confirm(
        "Do you want to submit yours answers surely? You can't submit again."
      );
      if (submitted) {
        setIsSubmited(true);
      }
    }
  };

  useEffect(() => {
    let k = 0;
    for (let i in mcqs) {
      k++;
    }
    setTotalScore(k);
  }, [mcqs]);

  const retest = () => {
    setAiResponse("");
    setMcqs([]);
    setIsSubmited(false);
    setScore(0);
    setTotalScore(0);
    setGenerateButton("Generate");
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto w-full h-full ">
      {generateButton == "Generate" || generateButton == "Generating..." ? (
        <div className="w-full p-5 flex justify-center items-center">
          {generateButton == "Generate" ? (
            <button
              onClick={() => getResponse()}
              className="bg-black h-[50px] w-[100px] m-[10px] rounded-lg text-white ml-2"
            >
              Generate
            </button>
          ) : (
            <></>
          )}
          {generateButton == "Generating..." ? (
            <button className="bg-black h-[50px] w-[120px] m-[10px] rounded-lg text-white ml-2">
              Generating...
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      {mcqs ? (
        mcqs.map((mcq) => (
          <EachMcq
            key={mcq.id}
            mcq={mcq}
            isSubmitted={isSubmitted}
            setScore={setScore}
          />
        ))
      ) : (
        <></>
      )}
      {!isSubmitted ? (
        <div className="w-full p-5 flex justify-center items-center">
          {generateButton == "Generated" ? (
            <button
              onClick={AnsSubmit}
              className="bg-black h-[50px] w-[100px] m-[10px] rounded-lg text-white ml-2"
            >
              Submit
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="w-full pb-[20px] overflow-hidden">
          <div className="bg-blue-500 text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-black">
            Your Score : {score}/{totalScore}
          </div>
          <div className="bg-green-500 text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-black">
            Correct Option
          </div>
          <div className="bg-red-500 text-center h-[50px] sm:w-[21%] m-[2%] w-[46%] float-left flex justify-center items-center rounded-lg text-black">
            Option that you selected but incorrect
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