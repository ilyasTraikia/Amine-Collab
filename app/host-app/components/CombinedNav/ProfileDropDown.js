import React, { useState } from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const ProfileDropDown = ({}) => {

  // const { t } = useNextHostTranslation("next-main");
  return (
    <MDBDropdown group className="m-no-card-effect">
        <MDBDropdownToggle
                style={{ cursor: "pointer" }}
                tag="a"
                className="nav-link hidden-arrow  align-items-center"
              >
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                  className="rounded-circle "
                  style={{ height: 55 , boxShadow: 'none' , marginBottom: "20px"}}
                  alt=""
                />
          </MDBDropdownToggle>
          <MDBDropdownMenu className="m-top-header-profile">
            <MDBDropdownItem  link>{("settings")}Settings</MDBDropdownItem>
            <MDBDropdownItem  link>{("profile")}</MDBDropdownItem>
            <MDBDropdownItem  divider />
            <MDBDropdownItem  link>{("logout")}</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
  );
};

export default ProfileDropDown;
