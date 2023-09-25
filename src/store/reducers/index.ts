import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./informations";
import informationReducer from "./information";
import userReducer from "./user";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    information: informationsReducer,
    info: informationReducer,
    user: userReducer,
};
  
export default reducer;