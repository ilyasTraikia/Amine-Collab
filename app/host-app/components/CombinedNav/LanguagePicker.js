import { LocalList } from "../../Locales/Locale";
import { LocaleSelect } from "../LocaleSelect";
const LanguagePicker = ({ handlelanguageChange }) => {


  return (
    <LocaleSelect
    defaultLocale={LocalList[0]}
    locales={LocalList}
    onSelectedLocale={handlelanguageChange}
  />
  );
};

export default LanguagePicker;
