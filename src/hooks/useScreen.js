import { useEffect, useState } from "react";

export const useScreen = () => {
  const [screen, setScreen] = useState(
    window.innerWidth || document.documentElement.clientWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth || document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { screen };
};
