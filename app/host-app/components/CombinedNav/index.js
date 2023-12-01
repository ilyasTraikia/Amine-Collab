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
  MDBIcon,
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
// import useNextHostTranslation from "../../i18n/useNextHostTranslation ";
// import useSwitchLanguage from "../../i18n/useSwitchLanguage ";
const CombinedNav = ({
  updateSidenav,
  sidenavState,
  navBarState,
  updateNavbar,
  currentPath
}) => {
  // const { t } = useNextHostTranslation("next-main");
  // const { switchAllLanguages } = useSwitchLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopSection, setShowTopSection] = useState(true);
  // Detect scroll to adjust navbar size

  const handlelanguageChange = (selectedValue) => {
    // console.log(JSON.stringify(selectedValue));
    // switchAllLanguages(selectedValue.language);
  };
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

  const VerticalCenterStyle = {
    display:'flex',
    alignItems: 'center',
    height: '100%'
  }
  // Dynamic styles based on scroll
  const logoStyle = isScrolled
    ? { width: "140px", transition: "width 0.6s ease" }
    : { width: "300px", transition: "width 0.6s ease" };
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
          {/* First Row */}
          <MDBRow style={topSectionStyle} className="mb-2 ms-2">
            <MDBRow className="g-0">
              <MDBCol size="0" lg="7"></MDBCol>

              <MDBCol size="12" lg="5">
                <MDBRow>
                  <MDBCol size="4" lg="4">
                   <SearchInput />
                  </MDBCol>

                  <MDBCol size="8" lg="8" >
                    <SearchInput />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBRow>

          {/* Second Row */}
          <MDBRow className="ms-1 mt-2  align-items-lg-center align-items-stretch">
            <MDBCol size="2" sm="2" md="2" lg="1"  className="d-flex mt-3 mt-lg-0 justify-content-center align-items-start align-items-lg-stretch">
              <SideNavToggler
                updateSidenav={updateSidenav}
                sidenavState={sidenavState}
              />
            </MDBCol>

  

            <MDBCol size="8" sm="8" md="8" lg="11" >
              <MDBRow style={VerticalCenterStyle} className="align-items-baseline">
                {/* First column (logo) */}
                <MDBCol
                  size="12"
                  lg="5"
          
                >
                 <MDBRow  className="d-flex justify-content-center g-0">
                    <MDBNavbarBrand href="/" className="d-flex justify-content-center" >
                     <img id="logoMazart" src="http://localhost:3000/mazars-logo.png" style={logoStyle} className="logoMazart"   alt="Logo"  />
                     {/* <MDBIcon className='ms-1' icon='camera' size='3x'   /> */}
                     </MDBNavbarBrand>
                  </MDBRow>
                </MDBCol>

                {/* Second column (Nav items) */}
                <MDBCol size="12" lg="7">
                  <MDBCollapse navbar open={navBarState}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                      <NavItem link="/Home" title={("home")}  currentPath={currentPath}/>
                      <NavItem link="/Users" title={("manage_users dsdq")} currentPath={currentPath}/>
                      <NavItem link="/Roles" title={("manage_roles ")} currentPath={currentPath}/>
                    </MDBNavbarNav>

                    <ProfileDropDown />
                  </MDBCollapse>
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol size="2" sm="2" md="2" lg="0" className="d-flex justify-content-center d-lg-none mt-2 mt-lg-0">
              <MDBRow className="mt-2 me-2 mb-2 d-flex justify-content-center align-items-start align-items-lg-stretch">
                <TopNavBarToggler
                  updateNavbar={updateNavbar}
                  navBarState={navBarState}
                />
              </MDBRow>
            </MDBCol>
          </MDBRow>

          {/* Logo */}
        </MDBCol>

        <main>
          <MDBContainer fluid></MDBContainer>
        </main>
      </MDBNavbar>
    </>
  );
};

export default CombinedNav;
