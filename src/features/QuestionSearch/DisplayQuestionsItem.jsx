import { useSearchResultContext } from "../../context/SearchResultContext";

const DisplayQuestionsItem = ({ question, handleSelectQuestion }) => {
  const { state } = useSearchResultContext();
  const isSelected = state.selectedDataIds.includes(question.id);

  return (
    <input
      className="accent-primary-500 w-4 h-4 mr-3 cursor-pointer"
      type="checkbox"
      checked={isSelected}
      onChange={(e) => handleSelectQuestion(e, question)}
    />
  );
};

export default DisplayQuestionsItem;
