import { useEffect, useState } from "react";

export default function CheckCircle({
  activeCircle,
  setActiveCircle,
  id,
  isSubmitted,
}) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    if (!isSubmitted) {
      setActiveCircle(id);
      setClicked((prev) => !prev);
    }
  };
  useEffect(() => {
    if (activeCircle == id) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [activeCircle, id]);

  return (
    <div
      onClick={handleClick}
      className={`h-[20px] w-[20px] rounded-full border-[1px] border-black ${
        clicked ? "bg-blue-700" : "bg-slate-50"
      }`}
    ></div>
  );
}
