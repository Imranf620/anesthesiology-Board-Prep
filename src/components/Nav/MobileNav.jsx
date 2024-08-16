import { IoClose } from 'react-icons/io5';

import { NAV_LINKS } from '../../utils/constants';
import NavLinkItem from './NavLinkItem';

const MobileNav = ({ onClose }) => {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
      ></div>
      <div className="slide fixed bottom-0 right-0 z-[9999] h-[100dvh] w-[350px] bg-white shadow-lg">
        <ul className="flex flex-col items-center justify-center gap-6 px-16 py-12">
          <div
            onClick={onClose}
            className="absolute right-[1rem] top-[1rem] cursor-pointer rounded-full bg-gray-200 px-2 py-2 text-[1.3rem] text-gray-500 transition-all hover:scale-110 hover:text-gray-900"
          >
            <IoClose />
          </div>
          <img src="/logo-green.png" className="h-[100px]" />
          {NAV_LINKS.map(item => (
            <NavLinkItem onClick={onClose} key={item.title} navItem={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileNav;
