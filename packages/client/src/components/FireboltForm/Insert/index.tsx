import React from "react"

// @ts-ignore
import classes from "../style.module.css";

interface IFormCoordinateShape {
  fieldSlug: string
}

type FormplaceDefinedSpot =  "first" | "last"
export interface IInsert {
  before?: IFormCoordinateShape | FormplaceDefinedSpot
  after?: IFormCoordinateShape | FormplaceDefinedSpot
  render: any
}

const Insert = ({ before, after, render }: IInsert) => {
  return <div className={classes["insert-wrapper"]}>{render}</div>;
};

export default Insert;
