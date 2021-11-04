import { createContext } from "react";

import PropTypes from "prop-types";
import useFireboltProvider from "./hook";

export const FBContext = createContext();

const FireboltProvider = (props) => {
  const {} = useFireboltProvider(props);

  return <FBContext.Provider value={{ test: "cenoura" }} {...props} />;
};

FireboltProvider.propTypes = {
  formAccess: PropTypes.shape({
    root: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
  }).isRequired,
  debug: PropTypes.bool,
  withHistory: PropTypes.bool,
  theme: PropTypes.object, // # v3-todo
};

export default FireboltProvider;
