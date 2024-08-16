import { Outlet } from "react-router-dom";
import Sidebare from "../Sidebare/Sidebare";

import AdminDashboardNav from "../Nav/AdminDashboardNav";
import Avatar from "../UI/Avatar";
import { useLogout } from "../../features/Authentication/useLogout";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

import { useScreen } from "../../hooks/useScreen";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useGetProfile } from "../../features/Authentication/useGetProfile";

const AdminLayout = ({ children }) => {
  const { logout, isLoading } = useLogout();
  const { profile } = useGetProfile();
  const [showSidebar, setShowSidebar] = useState(false);
  const { screen } = useScreen();
  return (
    <div className="flex ">
      {showSidebar && screen <= 990 && (
        <Sidebare onClose={() => setShowSidebar(false)}>
          <div className="flex flex-col gap-5">
            <div className="flex justify-center">
              <img
                src="/logo-white.png"
                className="flex w-[130px] justify-center"
              />
            </div>
            <AdminDashboardNav onClick={() => setShowSidebar(false)} />
          </div>
        </Sidebare>
      )}
      {screen > 990 && (
        <Sidebare onClose={() => setShowSidebar(false)}>
          <div className="flex flex-col gap-5 px-4">
            <div className="mt-5 flex justify-center border-b-2 border-primary-400/30 ">
              <img
                src="/logo-white.png"
                className="flex w-[130px] justify-center"
              />
            </div>
            <AdminDashboardNav />
            <button
              onClick={logout}
              disabled={isLoading}
              className="fixed bottom-5 left-5 z-50 flex cursor-pointer items-center gap-3 rounded-lg  border-2  border-primary-100/10 p-2 text-[1rem] text-primary-100/80 hover:bg-primary-400/20 hover:text-primary-100 disabled:cursor-not-allowed
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
              <span>Logout</span>
            </button>
          </div>
        </Sidebare>
      )}

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0  z-50 flex h-[70px] items-center justify-end bg-white px-4 shadow-md ">
          {screen <= 990 && (
            <div
              className="cursor-pointer text-[1.5rem]"
              onClick={() => setShowSidebar(true)}
            >
              <IoMenuOutline />
            </div>
          )}

          <Avatar className="ml-auto" src={profile?.image ?? "/demo-img.jpg"} />
        </header>

        <main className="main">{<Outlet /> || children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
