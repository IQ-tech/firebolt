import React, { Fragment } from "react"
import PropTypes from "prop-types"

const Insert = ({ before, after, render }) => {
  return <Fragment>{render}</Fragment>
}

const FormCoordinateShape = PropTypes.shape({
  fieldSlug: PropTypes.string,
})

const FormplaceDefinedSpot = PropTypes.oneOf(["first", "last"])

const FormPlaceShape = PropTypes.oneOfType([
  FormCoordinateShape,
  FormplaceDefinedSpot,
])

Insert.propTypes = {
  before: FormPlaceShape,
  after: FormPlaceShape,
}

export default Insert
