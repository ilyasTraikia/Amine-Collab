import React, { useState } from "react";
import { MDBSideNavItem, MDBSideNavLink, MDBIcon } from "mdb-react-ui-kit";
import Link from "next/link";


const SideNavItem = ({ link, title, icon }) => {



  return (
    <MDBSideNavItem >
      <Link className="nav-link" href={link} passHref >
        <MDBSideNavLink  >
          <MDBIcon  icon={icon} className="fas fa-fw me-3" />
          {title}
        </MDBSideNavLink>
      </Link>
    </MDBSideNavItem>
  );
};

export default SideNavItem;
