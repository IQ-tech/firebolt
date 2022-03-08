import React from "react"
import FireboltContext from "../../context";

import PropTypes from "prop-types";
import useFireboltProvider from "./hook";

const FireboltProvider = (props) => {
  const values = useFireboltProvider(props);

  return <FireboltContext.Provider value={values} {...props} />;
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
  theme: PropTypes.object, // # v2-todo
  addons: PropTypes.object,
  firstStepPreRender: PropTypes.object
};

export default FireboltProvider;
