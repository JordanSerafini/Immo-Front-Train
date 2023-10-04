import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./information";
import actionsReducer from "./action";
import regexpValidationReducer from "./regexpValidation";
import collaboratorReducer from "./collaborator";
import sectorReducer from "./sector";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    regexps: regexpValidationReducer,
    
    collaborator: collaboratorReducer,
    information: informationsReducer,
    action: actionsReducer,
    sector: sectorReducer,
};
  
export default reducer;