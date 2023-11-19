import React, { useState } from "react";
import Sidenav from "../components/SideNav";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { MDBContainer } from 'mdb-react-ui-kit';
import Head from "next/head"
import CombinedNav from "../components/CombinedNav";
// import useNextHostTranslation from "../i18n/useNextHostTranslation ";

 const DashboardContainer = (props) => {
  // const { t } = useNextHostTranslation("next-main");
  const [NavbarOpen, setNavbarOpen] = useState(true);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    <>
       <Head>
       <title>{("app_name")}</title>
       <link rel="icon" href="/favicon.ico" sizes="any" />
      
      </Head>
      
      <main>
      <header>
        <CombinedNav updateSidenav={setSideNavOpen} sidenavState={sideNavOpen} updateNavbar={setNavbarOpen} navBarState={NavbarOpen} />
        <Sidenav isOpen={sideNavOpen} setIsOpen={setSideNavOpen} />
      </header>
      <MDBContainer fluid className="m-margin-top">
      {props.children}
      </MDBContainer>
      </main>
      <footer className="mt-5"></footer>
    </>

  );
};
export default DashboardContainer ;


