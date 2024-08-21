import { useSearchResultContext } from "../../context/SearchResultContext";
const DisplayQuestionsItem = ({ question, handleSelectQuestion, checked }) => {
  const { state } = useSearchResultContext();
  const isSelected = checked !== undefined ? checked : state.selectedDataIds.includes(question?.id);

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
