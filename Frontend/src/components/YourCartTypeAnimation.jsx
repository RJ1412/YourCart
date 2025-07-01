import { useEffect, useState } from "react";

export default function YourCartTypingAnimation() {
  const staticPrefix = "YourCart - For ";
  const roles = ["User", "Retailer"];

  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typingRole"); // typingRole | backspaceRole
  const [typingIndex, setTypingIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  const TYPING_SPEED = 80;
  const BACKSPACE_SPEED = 60;
  const PAUSE = 1200;

  useEffect(() => {
    let timer;

    if (phase === "typingRole") {
      const target = staticPrefix + roles[roleIndex];

      if (typingIndex < target.length) {
        timer = setTimeout(() => {
          setText(target.slice(0, typingIndex + 1));
          setTypingIndex(prev => prev + 1);
        }, TYPING_SPEED);
      } else {
        timer = setTimeout(() => setPhase("backspaceRole"), PAUSE);
      }
    }

    else if (phase === "backspaceRole") {
      if (text.length > staticPrefix.length) {
        timer = setTimeout(() => {
          setText(prev => prev.slice(0, -1));
        }, BACKSPACE_SPEED);
      } else {
        // Now *fully reset typing* for next role
        timer = setTimeout(() => {
          setRoleIndex((roleIndex + 1) % roles.length);
          setTypingIndex(staticPrefix.length); // start right after static
          setText(staticPrefix);
          setPhase("typingRole");
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, text, typingIndex, roleIndex]);

  return (
    <span className="text-[#7b3e19] whitespace-nowrap inline-block min-w-[20ch]">
      {text}
    </span>
  );
}
