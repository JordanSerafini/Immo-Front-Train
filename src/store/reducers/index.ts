import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./informations";
import userReducer from "./user";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    information: informationsReducer,
    user: userReducer,
};
  
export default reducer;