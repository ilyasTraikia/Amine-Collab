import { MDBNavbarItem } from "mdb-react-ui-kit";
import Link from "next/link";
const NavItem = ({ enabled, link, title }) => {
  return (
    <MDBNavbarItem>
      <Link className="nav-link" href={link}>
        {title}
      </Link>
    </MDBNavbarItem>
  );
};

export default NavItem;
