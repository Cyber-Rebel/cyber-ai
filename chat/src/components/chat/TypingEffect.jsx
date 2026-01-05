import { useEffect, useState } from "react";

export default function TypingEffect({ text = "" }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplay((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <p>{display}</p>;
}
