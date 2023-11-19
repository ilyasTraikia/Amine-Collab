import {
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import Link from "next/link";
const Dropdown = ({ title }) => {
  return (
    <MDBNavbarItem>
      <MDBDropdown>
        <MDBDropdownToggle tag="a" className="nav-link" role="button">
          {title}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Action</MDBDropdownItem>
          <MDBDropdownItem link>Another action</MDBDropdownItem>
          <MDBDropdownItem link>Something else here</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarItem>
  );
};

export default Dropdown;
