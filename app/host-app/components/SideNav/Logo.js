const Logo = ({}) => {
  return (
    <a
      className="ripple d-flex justify-content-center py-4 mb-3"
      style={{ borderBottom: "2px solid #f5f5f5" }}
      href="#!"
      data-mdb-ripple-color="primary"
    >
      <img
        id="Mazars-logo"
        className="nav-logo-image"
        src="http://localhost:3000/resources/images/mazars-logo.png"
        alt="Mazars Logo"
        draggable="false"
      />
    </a>
  );
};

export default Logo;
