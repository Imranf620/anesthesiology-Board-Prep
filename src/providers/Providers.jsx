import { GoogleOAuthProvider } from "@react-oauth/google";
import HelpContextProvider from "../context/HelpContext";
import { QuizContexProvider } from "../context/QuizContext";
import { SearchResultContextProvider } from "../context/SearchResultContext";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ReactQueryProvider>
        <HelpContextProvider>
          <SearchResultContextProvider>
            <QuizContexProvider>{children}</QuizContexProvider>
          </SearchResultContextProvider>
        </HelpContextProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
