import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./informations";
import userReducer from "./user";
import actionsReducer from "./action";
import regexpValidationReducer from "./regexpValidation";
import collaboratorReducer from "./collaborator";
import sectorReducer from "./sector";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    information: informationsReducer,
    user: userReducer,
    action: actionsReducer,
    regexps: regexpValidationReducer,
    collaborator: collaboratorReducer,
    sector: sectorReducer,
};
  
export default reducer;