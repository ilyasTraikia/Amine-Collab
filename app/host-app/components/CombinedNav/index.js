import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCol,
  MDBRow,
  MDBNavbarLink,
} from "mdb-react-ui-kit";

import SearchInput from "./SearchInput";
import NavItem from "./NavItem";
import Dropdown from "./DropDown";
import TopNavBarToggler from "./TopNavBarToggler";
// import LanguagePicker from "./LanguagePicker";
import LogoImg from "./LogoImg";
import SideNavToggler from "./SideNavToggler";
import React, { useState, useEffect } from "react";
import ProfileDropDown from "./ProfileDropDown";
const CombinedNav = ({
  updateSidenav,
  sidenavState,
  navBarState,
  updateNavbar,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopSection, setShowTopSection] = useState(true);
  // Detect scroll to adjust navbar size

  const handlelanguageChange = () => {};
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setShowTopSection(false);
      } else {
        setIsScrolled(false);
        setShowTopSection(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamic styles based on scroll
  const navbarStyle = isScrolled
    ? { height: "80px", transition: "height 0.3s ease" }
    : { height: "156px", transition: "height 0.3s ease" };

  const logoStyle = isScrolled
    ? { width: "140px", transition: "width 0.3s ease" }
    : { width: "240px", transition: "width 0.3s ease", marginTop: "0px" };

  const sidNavBtnStyle = isScrolled
    ? { magrinTop: "0px", transition: "width 0.3s ease" }
    : { marginTop: "60px", transition: "width 0.3s ease" };

  const topSectionStyle = showTopSection
    ? { display: "block", transition: "display 0.3s ease" }
    : { display: "none", transition: "display 0.3s ease" };

  return (
    <>
      <MDBNavbar
      
        expand="lg"
        light
        bgColor="light"
        fixed="top"
        className="m-header-font"
      >
        <MDBCol size="12">
          <MDBRow style={topSectionStyle}  className="m-align-center" >
   
                <MDBRow   >
                  
                  <MDBCol size="6">
                    <SearchInput />
                  </MDBCol>

                  <MDBCol size="6">
                    <SearchInput />
                  </MDBCol>

                </MDBRow>
          
          </MDBRow>
          <MDBRow  className="m-align-center" >
            <MDBCol size="1">
              <SideNavToggler
                updateSidenav={updateSidenav}
                sidenavState={sidenavState}
              />
            </MDBCol>
            <MDBCol size="3">
              <MDBNavbarBrand href="/">
                <img
                  src="http://localhost:3000/resources/images/mazars-logo.png"
                  style={logoStyle}
                  alt="Logo"
                />
              </MDBNavbarBrand>
            
            </MDBCol>
            <MDBCol size="7">
                  <MDBCollapse navbar open={navBarState}>
                  <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                    <NavItem link="/Home" title="Home" />
                    <Dropdown title="Manage Users" />
                    <NavItem link="/Profile" title="Profile" />
                    <MDBNavbarItem>
                      <MDBNavbarLink
                        disabled
                        href="#"
                        tabIndex={-1}
                        aria-disabled="true"
                      >
                        Disabled
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                  </MDBNavbarNav>
                  <ProfileDropDown />
                </MDBCollapse>
            </MDBCol>
            <MDBCol size="1" >
            <MDBRow >
                <TopNavBarToggler
                  updateNavbar={updateNavbar}
                  navBarState={navBarState}
                />
              
              </MDBRow>
            </MDBCol>
          </MDBRow>

          {/* Logo */}

        </MDBCol >

        <main>
        <MDBContainer fluid>
 

        </MDBContainer>
      </main>
      </MDBNavbar>

    </>
  );
};

export default CombinedNav;


