import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/UI/ErrorFallback.jsx";
import QuizQuestionIconStata from "./context/QuizQuestionIconContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <QuizQuestionIconStata>

      <App />
      </QuizQuestionIconStata>
    </ErrorBoundary>
  </React.StrictMode>
);
