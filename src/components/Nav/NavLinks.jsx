import { NAV_LINKS } from "../../utils/constants";
import NavLinkItem from "./NavLinkItem";

const NavLinks = () => {
  return (
    <ul className="flex xl:gap-4 self-stretch">
      {NAV_LINKS.map((item) => (
        <NavLinkItem key={item.title} navItem={item} />
      ))}
    </ul>
  );
};

export default NavLinks;
