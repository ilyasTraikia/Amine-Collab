import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const SearchInput = ({}) => {

  // const { t } = useNextHostTranslation("next-main");
  return (
    <form className="d-flex input-group w-auto">
      <input
        type="search"
        className="form-control m-header-font"
        placeholder={("type_query")}
        aria-label="Search"
      />
      <MDBBtn className="m-btn-normal  m-header-font ">
        <MDBIcon icon="search" />
      </MDBBtn>
    </form>
  );
};

export default SearchInput;
