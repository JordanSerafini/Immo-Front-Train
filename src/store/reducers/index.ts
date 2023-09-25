import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./informations";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    information: informationsReducer,
};
  
export default reducer;