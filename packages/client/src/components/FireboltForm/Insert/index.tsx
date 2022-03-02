import React from "react"
import PropTypes from "prop-types";

// @ts-ignore
import classes from "../style.module.css";

export interface IInsert {
  before?: IFormCoordinateShape | "first" | "last"
  after?: IFormCoordinateShape | "first" | "last"
  render: any
}
interface IFormCoordinateShape {
  fieldSlug: string
}

const Insert = ({ before, after, render }: IInsert): JSX.Element => {
  return <div className={classes["insert-wrapper"]}>{render}</div>;
};


// const FormCoordinateShape = PropTypes.shape({
//   fieldSlug: PropTypes.string,
// });

// const FormplaceDefinedSpot = PropTypes.oneOf(["first", "last"]);

// const FormPlaceShape = PropTypes.oneOfType([
//   FormCoordinateShape,
//   FormplaceDefinedSpot,
// ]);

// Insert.propTypes = {
//   before: FormPlaceShape,
//   after: FormPlaceShape,
// };

export default Insert;
