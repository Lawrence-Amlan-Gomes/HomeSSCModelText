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
        ' [ generate 10 mcq from this paragraph outside of these bracket in a javascript array of objects style string. ' +
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
    let str2 = `[ { "id": 1, "question": "রসায়নের কোন শাখায় পদার্থের গঠন, ধর্ম এবং পরিবর্তন নিয়ে আলোচনা করা হয়?", "correctAns": "প্রাকৃতিক বিজ্ঞান", "wrongAnswer1": "পদার্থবিজ্ঞান", "wrongAnswer2": "জীববিজ্ঞান", "wrongAnswer3": "গণিত" }, { "id": 2, "question": "প্রাচীনকালে রসায়নের চর্চাকে কী বলা হতো?", "correctAns": "আলকেমি", "wrongAnswer1": "রসায়নবিদ্যা", "wrongAnswer2": "পদার্থবিজ্ঞান", "wrongAnswer3": "জ্যোতির্বিজ্ঞান" }, { "id": 3, "question": "কাঁচা আম টক কেন?", "correctAns": "কারণ কাঁচা আমে বিভিন্ন ধরনের তীব্র এসিড থাকে", "wrongAnswer1": "কারণ কাঁচা আমে শর্করা থাকে", "wrongAnswer2": "কারণ কাঁচা আমে ফ্রুক্টোজ থাকে", "wrongAnswer3": "কারণ কাঁচা আমে পানি থাকে" }, { "id": 4, "question": "পাকা আম মিষ্টি কেন?", "correctAns": "কারণ পাকা আমে এসিডের রাসায়নিক পরিবর্তন ঘটে শর্করা ও ফ্রুক্টোজ সৃষ্টি হয়", "wrongAnswer1": "কারণ পাকা আমে এসিডের পরিমাণ বেড়ে যায়", "wrongAnswer2": "কারণ পাকা আমে পানির পরিমাণ বেড়ে যায়", "wrongAnswer3": "কারণ পাকা আমে কোন পরিবর্তন হয় না" }, { "id": 5, "question": "পেটের অ্যাসিডিটির সমস্যা কীভাবে নিরপেক্ষ করা হয়?", "correctAns": "অ্যান্টাসিডের সাহায্যে", "wrongAnswer1": "অ্যাসিডের সাহায্যে", "wrongAnswer2": "ক্ষারের সাহায্যে", "wrongAnswer3": "পানির সাহায্যে" }, { "id": 6, "question": "কীটনাশকের অতিরিক্ত ব্যবহারের ফলে কী হয়?", "correctAns": "পরিবেশ দূষিত হয়", "wrongAnswer1": "পরিবেশের কোন ক্ষতি হয় না", "wrongAnswer2": "পরিবেশের উন্নতি হয়", "wrongAnswer3": "পরিবেশের উপর কোন প্রভাব পড়ে না" }, { "id": 7, "question": "রসায়নের সাথে কোন বিজ্ঞানের গভীর সম্পর্ক রয়েছে?", "correctAns": "সকল প্রাকৃতিক বিজ্ঞানের সাথে", "wrongAnswer1": "শুধুমাত্র পদার্থবিজ্ঞানের সাথে", "wrongAnswer2": "শুধুমাত্র জীববিজ্ঞানের সাথে", "wrongAnswer3": "শুধুমাত্র গণিতের সাথে" }, { "id": 8, "question": "সালোকসংশ্লেষণ কী ধরণের বিক্রিয়া?", "correctAns": "রাসায়নিক বিক্রিয়া", "wrongAnswer1": "পদার্থবিদ্যাগত বিক্রিয়া", "wrongAnswer2": "জৈবিক বিক্রিয়া", "wrongAnswer3": "গাণিতিক বিক্রিয়া" }, { "id": 9, "question": "রসায়ন পরীক্ষাগারে কী ধরণের সতর্কতা অবলম্বন করা প্রয়োজন?", "correctAns": "রাসায়নিক দ্রব্যের সঠিক ব্যবহার ও সুরক্ষা", "wrongAnswer1": "কোন সতর্কতা প্রয়োজন নেই", "wrongAnswer2": "শুধুমাত্র আগুন থেকে সাবধানতা", "wrongAnswer3": "শুধুমাত্র বিষাক্ত পদার্থ থেকে সাবধানতা" }, { "id": 10, "question": "GHS (Globally Harmonized System) কী?", "correctAns": "রাসায়নিক লেবেলে ঝুঁকি ও সতর্কতামূলক তথ্য প্রদর্শনের একটি নিয়ম", "wrongAnswer1": "রাসায়নিক পদার্থের নামকরণের একটি পদ্ধতি", "wrongAnswer2": "রাসায়নিক পরীক্ষার একটি পদ্ধতি", "wrongAnswer3": "রাসায়নিক বিক্রিয়ার একটি ধরণ" } ]`;
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
            Option that you selected
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