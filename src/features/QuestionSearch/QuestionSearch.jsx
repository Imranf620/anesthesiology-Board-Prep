import { useQueryClient } from "@tanstack/react-query";
import Button from "../../components/UI/Button";
import DisplayQuestions from "./DisplayQuestions";
import QuestionSearchForm from "./QuestionSearchForm";
import { useSearchResultContext } from "../../context/SearchResultContext";

const QuestionSearch = ({ admin = false }) => {
  const queryClient = useQueryClient();
  const { clearSearchState } = useSearchResultContext();
  const fetchQuestions = () => {
    clearSearchState();
    queryClient.fetchQuery({ queryKey: ["all-questions"] });
  };
  return (
    <div className="w-full bg-white lg:ml-5 border-l- h-full border-gray-300">
      <section className="px-2 bg-slate-200">
        <div className="px-0 md:px-7 py-6 border-b-2 flex items-center gap-3 flex-wrap">
          <div>
            <h5 className="font-[500] text-[1.8rem]">Question Search</h5>
            <p>
              Select questions from multiple searches to create a combined test
            </p>
          </div>
          <div className=" ml-auto">
            <Button onClick={fetchQuestions} variant="dark">
              Refresh Database
            </Button>
          </div>
        </div>
        {/* Question search form */}
        <QuestionSearchForm admin={admin} />
        {/* Result of searched questions to be displayed */}
        <DisplayQuestions admin={admin} />
      </section>
    </div>
  );
};

export default QuestionSearch;
