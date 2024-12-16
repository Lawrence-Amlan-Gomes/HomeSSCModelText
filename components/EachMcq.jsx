import { useEffect, useState } from "react";
import CheckCircle from "./CheckCircle";
import EachOption from "./EachOption";

export default function EachMcq({ mcq, isSubmitted, setScore }) {
  const options1 = [
    mcq.wrongAnswer1,
    mcq.wrongAnswer2,
    mcq.wrongAnswer3,
    mcq.correctAns,
  ];
  const options2 = [
    mcq.correctAns,
    mcq.wrongAnswer1,
    mcq.wrongAnswer2,
    mcq.wrongAnswer3,
  ];
  const options3 = [
    mcq.wrongAnswer3,
    mcq.correctAns,
    mcq.wrongAnswer1,
    mcq.wrongAnswer2,
  ];
  const options4 = [
    mcq.wrongAnswer2,
    mcq.wrongAnswer3,
    mcq.correctAns,
    mcq.wrongAnswer1,
  ];

  const [selected, setSelected] = useState("");
  const [activeCircle, setActiveCircle] = useState("");
  const [randomNumber, setRandom] = useState(0);

  useEffect(() => {
    let numbers = [1, 2, 3, 4];
    let randomIndex = Math.floor(Math.random() * numbers.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setRandom(numbers[randomIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      if (mcq.correctAns == activeCircle) {
        setScore((prev) => prev + 1);
      }
    }
  },[isSubmitted]);

  return (
    <div className="w-[96%] border-[#333333] border-[1px] p-[10px] m-[2%] rounded-lg overflow-hidden">
      <div className="w-full float-left text-[20px] mb-[10px]">
        {" "}
        {mcq.id}. {mcq.question}
      </div>
      {randomNumber == 1 ? (
        options1.map((option) => (
          <EachOption
            key={option}
            activeCircle={activeCircle}
            setActiveCircle={setActiveCircle}
            option={option}
            correctAns={mcq.correctAns}
            isSubmitted={isSubmitted}
            setScore={setScore}
          />
        ))
      ) : (
        <></>
      )}
      {randomNumber == 2 ? (
        options2.map((option) => (
          <EachOption
            key={option}
            activeCircle={activeCircle}
            setActiveCircle={setActiveCircle}
            option={option}
            correctAns={mcq.correctAns}
            isSubmitted={isSubmitted}
            setScore={setScore}
          />
        ))
      ) : (
        <></>
      )}
      {randomNumber == 3 ? (
        options3.map((option) => (
          <EachOption
            key={option}
            activeCircle={activeCircle}
            setActiveCircle={setActiveCircle}
            option={option}
            correctAns={mcq.correctAns}
            isSubmitted={isSubmitted}
            setScore={setScore}
          />
        ))
      ) : (
        <></>
      )}
      {randomNumber == 4 ? (
        options4.map((option) => (
          <EachOption
            key={option}
            activeCircle={activeCircle}
            setActiveCircle={setActiveCircle}
            option={option}
            correctAns={mcq.correctAns}
            isSubmitted={isSubmitted}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
