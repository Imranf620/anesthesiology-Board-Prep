import { useLogout } from '../../features/Authentication/useLogout';
import NavLinks from '../Nav/NavLinks';
import Menu from '../UI/Menu';
import Button from '../UI/Button';
import { useScreen } from '../../hooks/useScreen';
import MobileNav from '../Nav/MobileNav';
import { useState } from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiCreditCard, BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import { TfiHelpAlt } from 'react-icons/tfi';
import { useHelpContext } from '../../context/HelpContext';
import { useGetProfile } from '../../features/Authentication/useGetProfile';
import Avatar from '../UI/Avatar';

const Header = ({ onOpenSidebar, quizTrack }) => {
  const { profile } = useGetProfile();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { handleShowHelp } = useHelpContext();
  const { logout, isLoading } = useLogout();
  const { screen } = useScreen();
  return (
    <header className=" sticky top-0 z-10 flex h-[70px] items-center justify-between bg-white pl-4 shadow-md lg:px-6 xl:px-10 2xl:px-16">
      {screen > 990 ? (
        // Desktop nav
        <NavLinks />
      ) : showMobileNav ? (
        // Mobile Nav
        <MobileNav onClose={() => setShowMobileNav(false)} />
      ) : null}
      {screen <= 990 && (
        <div className="flex items-center gap-3">
          <Button onClick={onOpenSidebar} variant="dark">
            {!quizTrack ? 'Create quick test' : 'Question navigator'}
          </Button>
        </div>
      )}

      {/* User menu */}
      <div className="flex items-center">
        <div className="relative">
          <Menu>
            <Menu.Toggle id="avatar">
              <div className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full">
                {/* <img
                  src={profile?.image ?? "/demo-img.jpg"}
                  width="100%"
                  height="100%"
                /> */}

                <Avatar />
              </div>
            </Menu.Toggle>
            <Menu.List id="avatar">
              <li>
                <Link
                  to="/payment-plan"
                  className="flex cursor-pointer items-center gap-3 px-5 py-2 text-[1.2rem] hover:bg-gray-200"
                >
                  <span>
                    <BiCreditCard />
                  </span>
                  <span>Get a plan</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex cursor-pointer items-center gap-3 px-5 py-2 text-[1.2rem] hover:bg-gray-200"
                >
                  <span>
                    <IoSettingsOutline />
                  </span>
                  <span>Account Settings</span>
                </Link>
              </li>
              <li>
                <div
                  className="flex cursor-pointer items-center gap-3 px-5 py-2 text-[1.2rem] hover:bg-gray-200"
                  onClick={handleShowHelp}
                >
                  <span>
                    <TfiHelpAlt />
                  </span>
                  <span>Help</span>
                </div>
              </li>
              <li
                onClick={logout}
                className="flex cursor-pointer items-center gap-3 px-5 py-2 text-[1.2rem] hover:bg-gray-200"
              >
                {isLoading ? (
                  <LoadingSpinner width="15px" height="15px" border="2px" />
                ) : (
                  <span>
                    <BiLogOut />
                  </span>
                )}
                <span>Logout</span>
              </li>
            </Menu.List>
          </Menu>
        </div>
        {screen <= 990 && (
          <div
            className="flex cursor-pointer items-center gap-3 px-5"
            onClick={() => setShowMobileNav(true)}
          >
            <IoMenuSharp className="text-[1.3rem]" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
