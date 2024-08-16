import { NavLink } from "react-router-dom";
import { BsDatabase } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { TfiCreditCard } from "react-icons/tfi";
import { GrDocumentStore } from "react-icons/gr";
import { PiCoinsLight } from "react-icons/pi";
import { useLogout } from "../../features/Authentication/useLogout";
import { TbLogout2 } from "react-icons/tb";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useScreen } from "../../hooks/useScreen";
import { FcFeedback } from "react-icons/fc";

const NAV = [
  {
    icon: <HiOutlineUsers className="text-[1.7rem]" />,
    name: "Manage Users",
    link: "/admin/manage-users",
  },
  {
    icon: <BsDatabase />,
    name: "Manage Database",
    link: "/admin/manage-database",
  },
  {
    icon: <TfiCreditCard />,
    name: "Payment Plans",
    link: "/admin/manage-payments",
  },
  {
    icon: <PiCoinsLight />,
    name: "Financials",
    link: "/admin/financials",
  },
  {
    icon: <GrDocumentStore />,
    name: "View Logs",
    link: "/admin/logs",
  },
  {
    icon: <FcFeedback />,
    name: "Feedbacks",
    link: "/admin/manage-feedback",
  },
];

const AdminDashboardNav = ({ onClick }) => {
  const { logout, isLoading } = useLogout();
  const { screen } = useScreen();
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {NAV.map((link) => (
          <li key={link.name}>
            <NavLink
              onClick={() => onClick?.()}
              to={link.link}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-5 rounded-lg border-b-2 border-transparent bg-primary-400/70 px-7  py-3 text-[1.4rem] font-[400] opacity-100"
                  : "flex items-center gap-5 rounded-lg border-b-2 border-transparent px-7 py-3  text-[1.4rem] font-[400] opacity-80 hover:bg-primary-400/70 hover:opacity-100"
              }
            >
              <span className="text-[1.7rem]">{link.icon}</span>
              <span className="text-[1.2rem]">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {screen <= 990 && (
        <button
          onClick={logout}
          disabled={isLoading}
          className="borderpri fixed bottom-5 left-5 z-50 flex cursor-pointer items-center gap-3 rounded-lg border-2  border-primary-100/10 p-2 text-[1rem] text-primary-100/80 hover:bg-primary-400/20 hover:text-primary-100 disabled:cursor-not-allowed
          "
        >
          {!isLoading ? (
            <TbLogout2 className="text-[1.6rem]" />
          ) : (
            <LoadingSpinner
              color="white"
              width="15px"
              height="15px"
              border="2px"
            />
          )}
          <span>Logout </span>
        </button>
      )}
    </nav>
  );
};

export default AdminDashboardNav;
