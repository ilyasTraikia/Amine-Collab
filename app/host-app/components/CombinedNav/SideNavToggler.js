import {
  MDBNavbarToggler,
  MDBIcon,
} from 'mdb-react-ui-kit';

const SideNavToggler = ({updateSidenav, sidenavState}) => {
    return (
   
      <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          className="d-block large-navbar-toggler"
          onClick={() => updateSidenav(!sidenavState)}
        >
          <MDBIcon icon='bars' fas />

        
        </MDBNavbarToggler>

    );
  };
  
  export default SideNavToggler;
  