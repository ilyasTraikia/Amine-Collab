import { MDBNavbarItem } from "mdb-react-ui-kit";
import Link from "next/link";
const NavItem = ({ enabled, link, title , currentPath}) => {

  const activeStyle = {
    color: "#081F8F",
  };

  const inactiveStyle = {};
  const isActive = currentPath === link;

  const style = isActive ? activeStyle : inactiveStyle;
  return (
    <MDBNavbarItem>
      <Link className="nav-link" href={link} style={style}>
        {title}
      </Link>
    </MDBNavbarItem>
  );
};

export default NavItem;
