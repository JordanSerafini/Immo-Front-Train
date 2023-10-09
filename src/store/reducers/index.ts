import navbarReducer from "./navbar";
import modalReducer from "./modal";
import informationsReducer from "./information";
import actionsReducer from "./action";
import regexpValidationReducer from "./regexpValidation";
import collaboratorReducer from "./collaborator";
import sectorReducer from "./sector";
import avatarReducer from "./avatar";
import statsReducer from "./stats";

const reducer = {
    navbar: navbarReducer,
    modal: modalReducer,
    regexps: regexpValidationReducer,
    
    collaborator: collaboratorReducer,
    information: informationsReducer,
    action: actionsReducer,
    sector: sectorReducer,
    avatar: avatarReducer,
    stats: statsReducer,
};
  
export default reducer;