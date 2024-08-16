import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const QuizTimer = ({ time, onTimeEnd, onTimeChange, isLoading }) => {
  const [hour, minutes, secs] = time.split(":").map((num) => Number(num));

  const [seconds, setSeconds] = useState(hour * 3600 + minutes * 60 + secs);
  // Format seconds into minutes:seconds format
  const formattedHours = Math.floor(seconds / (60 * 60))
    .toString()
    .padStart(2, "0");
  const formattedMinutes = Math.floor((seconds / 60) % 60)
    .toString()
    .padStart(2, "0");
  const formattedSeconds = (seconds % 60).toString().padStart(2, "0");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          // Handle timer completion here, for example, show time's up message or trigger a function
          onTimeEnd();
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
    // eslint-disable-next-line
  }, [minutes, onTimeEnd]);

  useEffect(() => {
    onTimeChange(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
  }, [formattedMinutes, formattedSeconds, formattedHours]);

  return (
    <div>
      {!isLoading && (
        <h2 className="flex items-center gap-2">
          <span>Time Remaining: </span>

          <div
            className={`font-[500] ${
              seconds < 4 ? "text-red-500" : "text-black"
            }`}
          >
            <span>{formattedHours}:</span>
            <span>{formattedMinutes}:</span>
            <span
              className={`${seconds < 4 && seconds > 0 ? "animate-fade" : ""}`}
            >
              {formattedSeconds}
            </span>
          </div>
        </h2>
      )}
      {isLoading && (
        <div className="flex items-center gap-2">
          <span>Test Submitting</span>
          <span>
            <LoadingSpinner border="3px" width="20px" height="20px" />
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizTimer;
