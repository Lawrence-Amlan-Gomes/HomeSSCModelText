"use client";
import { useEffect, useState } from "react";
import response from "@/app/server";

export default function Chat() {
  const [myText, setMyText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const getResponse = async () => {
    // setIsTyping(false);
    const res = await response(myText);
    setAiResponse(res); // Store the response in state to render it on the client side
  };
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await response(myText);
  //     setAiResponse(res); // Store the response in state to render it on the client side
  //   }
  //   if (!isTyping) {
  //     fetchData();
  //   }
  // }, [isTyping, myText, setAiResponse]);

  return (
    <div>
      <input
        className="border-[1px] border-black"
        type="text"
        value={myText}
        onChange={(e) => {
          setMyText(e.target.value);
          setIsTyping(true);
        }}
      />
      <button
        onClick={() => getResponse()}
        className="bg-black h-[30px] w-[50px] text-white ml-2"
      >
        Send
      </button>
      <div>{aiResponse}</div>
    </div>
  );
}
