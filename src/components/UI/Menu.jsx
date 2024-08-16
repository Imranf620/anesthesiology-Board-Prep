import { cloneElement, createContext, useContext, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useOutsideClick } from "../../hooks/useOutsideClick";

const MenusContext = createContext();

function Menu({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.width,
      y: rect.height,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return <div>{cloneElement(children, { onClick: handleClick })}</div>;
}

function List({ id, children, className = "" }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);
  if (openId !== id) return null;

  return (
    <ul
      className={`absolute w-[180px] bg-white shadow-md flex flex-col gap-1 bottom-0 translate-y-full right-0  border-2 rounded-md z-20 ${className}`}
      ref={ref}
    >
      {children}
    </ul>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li onClick={handleClick}>
      <div>
        {icon}
        <span>{children}</span>
      </div>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
