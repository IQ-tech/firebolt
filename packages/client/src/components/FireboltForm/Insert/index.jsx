import PropTypes from "prop-types";

// @ts-ignore
import classes from "../style.module.css";

const Insert = ({ before, after, render }) => {
  return <div className={classes["insert-wrapper"]}>{render}</div>;
};

const FormCoordinateShape = PropTypes.shape({
  fieldSlug: PropTypes.string,
});

const FormplaceDefinedSpot = PropTypes.oneOf(["first", "last"]);

const FormPlaceShape = PropTypes.oneOfType([
  FormCoordinateShape,
  FormplaceDefinedSpot,
]);

Insert.propTypes = {
  before: FormPlaceShape,
  after: FormPlaceShape,
};

export default Insert;
