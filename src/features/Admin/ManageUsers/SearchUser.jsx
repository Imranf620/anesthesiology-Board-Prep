import { useState } from "react";
import Button from "../../../components/UI/Button";
import Select from "../../../components/UI/Select";
import SimpleInput from "../../../components/UI/SimpleInput";

const SearchUser = ({ onHandleSearch }) => {
  const [category, setCategory] = useState("Name");
  const [searchValue, setSearchValue] = useState("");

  // Handle categoray changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue === "") return;
    onHandleSearch(category, searchValue);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-4 my-3"
    >
      <div>
        <SimpleInput
          onChange={(e) => {
            onHandleSearch(category, e.target.value);
            setSearchValue(e.target.value);
          }}
          placeholder="Search here..."
        />
      </div>
      <div>
        <Select
          onChange={handleCategoryChange}
          value={category}
          className="py-2 px-3 bg-transparent text-gray-500"
        >
          <option value="Name">Name</option>
          <option value="Email">Email</option>
          <option value="Status">Status</option>
        </Select>
      </div>
      <Button variant="dark" type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchUser;
