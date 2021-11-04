import { createContext } from "react";

import PropTypes from "prop-types";
import useFireboltProvider from "./hook";

export const FBContext = createContext({});

const FireboltProvider = (props) => {
  const values = useFireboltProvider(props);

  return <FBContext.Provider value={values} {...props} />;
};

FireboltProvider.propTypes = {
  formAccess: PropTypes.shape({
    root: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
  }).isRequired,
  debug: PropTypes.bool,
  requestsMetadata: PropTypes.object,
  stepQueryParam: PropTypes.string,
  children: PropTypes.any,
  withHistory: PropTypes.bool,
  theme: PropTypes.object, // # v3-todo
};

export default FireboltProvider;
