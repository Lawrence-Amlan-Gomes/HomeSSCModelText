import { useEffect, useState } from "react";
import CheckCircle from "./CheckCircle";

export default function EachOption({
  option,
  activeCircle,
  setActiveCircle,
  correctAns,
  isSubmitted,
}) {
  const [selected, setSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  useEffect(() => {
    if (isSubmitted) {
      if (option == correctAns) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      if (option == activeCircle) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }else{
        
    }
  }, [activeCircle, correctAns, isSubmitted, option]);
  return (
    <>
      <div className="float-left sm:w-[5%] w-[10%] flex justify-end items-center pr-2 h-[31px]">
        <CheckCircle
          activeCircle={activeCircle}
          setActiveCircle={setActiveCircle}
          id={option}
          isSubmitted = {isSubmitted}
        />
      </div>
      <div
        className={`${isCorrect && selected ? "bg-green-600" : ""} ${
          selected && !isCorrect ? "bg-red-500" : ""
        } sm:w-[45%] w-[90%] float-left text-[18px] p-[2px] pl-2 rounded-lg`}
      >
        {option}
      </div>
    </>
  );
}
