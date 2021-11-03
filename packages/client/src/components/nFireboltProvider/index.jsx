import PropTypes from "prop-types"
import useFireboltProvider from "./hook"

const FireboltProvider = () => {

  useFireboltProvider()


  return <p></p>

}



FireboltProvider.propTypes = {
  formAccess: PropTypes.shape({
    root: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
  }).isRequired,
  debug: PropTypes.bool,
  theme: Proptypes.object, // # v3-todo
}

export default FireboltProvider