import { MDBBtn } from "mdb-react-ui-kit";
// import useNextHostTranslation from "../../i18n/useNextHostTranslation ";
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
      <MDBBtn className="  m-header-font m-btn " color="primary">{("search")}</MDBBtn>
    </form>
  );
};

export default SearchInput;
