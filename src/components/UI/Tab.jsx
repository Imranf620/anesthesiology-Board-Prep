import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "react-router-dom";

function Tab({ tabs, setSelectedTab, url, defaultValue, onDeleteValues }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();

  const last = +searchParams.get("last") || defaultValue;

  // For Simple tab
  const handleTabClick = (index) => {
    startTransition(() => {
      setActiveTab(index);
      setSelectedTab(tabs[index]);
    });
  };

  // For url tab
  // Handle Days
  const handleLast = (value) => {
    searchParams.set("last", value);

    onDeleteValues?.map((value) => searchParams.delete(value));
    setSearchParams(searchParams);
  };

  if (url)
    return (
      <div className="flex items-center gap-1 rounded-md bg-primary-100 px-3 py-[0.2rem]">
        {tabs?.map((tab, i) => (
          <button
            key={i}
            onClick={() => handleLast(tab)}
            className={`rounded-md px-3 py-[0.2rem] text-[0.9rem] hover:bg-primary-400 hover:text-white ${last === +tab ? "bg-primary-400 text-white" : "bg-transparent"}`}
          >
            Last {tab} days{" "}
          </button>
        ))}
      </div>
    );

  return (
    <div className="flex w-max items-center gap-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`flex cursor-pointer items-center self-stretch border-b-4 border-transparent px-3 pb-2 text-[1rem] font-[500] capitalize hover:border-b-primary-500  ${
            activeTab === index && "border-b-primary-500"
          }`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tab;
