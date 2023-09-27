import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./informations";
import informationReducer from "./information";
import userReducer from "./user";
import actionsReducer from "./action";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    information: informationsReducer,
    info: informationReducer,
    user: userReducer,
    actions: actionsReducer
};
  
export default reducer;