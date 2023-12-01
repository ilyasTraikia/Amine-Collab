import { MDBSideNav, MDBSideNavMenu } from "mdb-react-ui-kit";
import SideNavItem from "./SideNavItem";
import Logo from "./Logo";

// import useNextHostTranslation from "../../i18n/useNextHostTranslation ";
export default function SideNav({ isOpen, setIsOpen }) {
  // const { t } = useNextHostTranslation("next-main");

  return (
    <>
      <MDBSideNav
        small
        open={isOpen}
        fixed
        getOpenState={(e) => setIsOpen(e)}
      >
        <Logo />
        <MDBSideNavMenu>
          <SideNavItem link="/" title={("home")} icon="house" />
          <span className="sidenav-subheading text-muted">{("manage_users")}</span>
          <SideNavItem link="/Users" title={("users")} icon="users" />
          <SideNavItem link="/Roles" title={("manage_roles")} icon="shield" />
          <span className="sidenav-subheading text-muted">{("settings")}</span>
          <SideNavItem link="/Profile" title={("profile")} icon="user" />
          <SideNavItem link="/Settings" title={("settings")} icon="gear" />
        </MDBSideNavMenu>
      </MDBSideNav>
    </>
  );
}
