const LogoImg = ({src , id , alt , style }) => {
    return (
        <img
          id="Mazars-logo"
          className="nav-logo-image"
          src={src}
          style={style}
          alt="Mazars Logo"
          draggable="false"
        />
    );
  };
  
  export default LogoImg;
  