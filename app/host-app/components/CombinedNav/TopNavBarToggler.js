import {
    MDBNavbarToggler,
    MDBIcon,
  } from "mdb-react-ui-kit";
  
  const TopNavBarToggler = ({updateNavbar, navBarState}) => {
      return (
        <MDBNavbarToggler
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => updateNavbar(!navBarState)}
      >
        <MDBIcon icon="bars" fas />
      </MDBNavbarToggler>

      );
    };
    
    export default TopNavBarToggler;
    