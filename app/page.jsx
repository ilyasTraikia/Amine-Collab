'use client'
import React, { useState } from 'react';
import DashboardContainer from './host-app/containers/DashboardContainer';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';


export default function Home() {


  return (
   <> 
           <DashboardContainer>
              <div>HELLO There</div>
           </DashboardContainer>
   </>
  );
}
