import { NavLink } from "react-router-dom";
import { SlGraph } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { MdOutlineDashboard,MdOutlineEventNote } from "react-icons/md";
import { IoSearch } from "react-icons/io5";


const icons = {
  dashboard: <MdOutlineDashboard />,
  question_search: <IoSearch />,
  create_test: <CgNotes />,
  performance: <SlGraph />,
  notes: <MdOutlineEventNote />,
};

const NavLinkItem = ({ navItem, onClick }) => {
  const title = navItem.title.includes("_")
    ? navItem.title.split("_").join(" ")
    : navItem.title;
  return (
    <li className="flex self-stretch items-center">
      <NavLink
        onClick={() => onClick?.()}
        to={navItem.link}
        className={({ isActive }) =>
          isActive
            ? `flex border-b-4 border-primary-200 hover:border-primary-200 self-stretch items-center text-[1.1rem]  px-4 hover:bg-primary-200/20 font-[500] capitalize gap-2`
            : "flex border-b-4 border-transparent hover:border-primary-200 hover:bg-primary-200/20 self-stretch items-center text-[1.1rem] font-[500] px-4 capitalize gap-2"
        }
      >
        <span>{icons[navItem.title]}</span>
        <span>{title}</span>
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
