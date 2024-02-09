import React, { useState, useRef, useEffect } from "react"
import FieldHolder from "../../FieldHolder"
import classNames from "classnames"

import IconSlash from "./icons/IconSlash.svg"
import IconChevronDown from "./icons/icon-chevron-down.svg"
import IconChevronUp from "./icons/icon-chevron-up.svg"
import IconCheck from "./icons/icon-check.svg"

import "./styles.scss"

const SelectWidget = ({
  slug,
  options = [],
  label,
  placeholder,

  hasError,
  errorMessage,
  value = "",
  fieldId,
  isRequired,
  disabled = false,
  optional = false,

  onChange,
  onBlur,
  onFocus,
}) => {
  const selectRef = useRef(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const [selectedLabel, setSelectedLabel] = useState("Selecione")

  const [optionsState, setOptionsState] = useState(options)

  const backupOptions = options

  function onClickSelect() {
    setIsOpenSelect((prevState) => !prevState)
    setOptionsState(backupOptions)
  }

  function onClickOption(e) {
    if (disabled) return
    const valueSelected = e.currentTarget.value
    const labelSelected = e.currentTarget.dataset.label
    setSelectedValue((prevState) => valueSelected ?? prevState)
    setSelectedLabel((prevState) => labelSelected ?? prevState)
    onChange(valueSelected)

    const pointerType = e.nativeEvent.pointerType
    const codeType = e.nativeEvent.code
    if (
      ["mouse", "touch"].includes(pointerType) ||
      ["Enter", "Space"].includes(codeType)
    ) {
      selectRef.current?.click()
    }
  }

  function removeAccents(value) {
    const valueWithoutAccents = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

    return valueWithoutAccents
  }

  function filterOptions(value) {
    if (value !== "") {
      const newOptions = options.filter((option) => {
        return removeAccents(option.label).toLowerCase().includes(removeAccents(value).toLowerCase())
      })

      setOptionsState(newOptions)
    } else {
      setOptionsState(backupOptions)
    }
  }

  const classSelect = classNames("ac-select", {
    "is-open": isOpenSelect,
  })

  return (
    <FieldHolder label={label}>
      {/* <h3>{ label }</h3> */}

      <div className={classSelect}>
      <div className="ac-select__wrap">
        {/* <label htmlFor="option-selected" className="ac-select__label">
          {label}
        </label> */}

        {/* <input
          type="checkbox"
          id="option-selected"
          className="ac-select__field"
        /> */}  

        <label htmlFor={slug} className="float-label">
          {placeholder}
        </label>

        <div 
          className="ac-select__button" 
          onClick={onClickSelect}
          ref={selectRef}
          id={slug}
        >
          {
            isOpenSelect ? 
            <input 
              type="text" 
              placeholder="Digite ou selecione" 
              className="input__search" 
              autoFocus
              onChange={(e) => filterOptions(e.target.value)}
            /> :
            <div className="ac-select__selected-value">{selectedLabel}</div>}

          <div className="ac-select__icons">
            {isOpenSelect ? <img src={IconChevronUp} /> : <img src={IconChevronDown} />}
          </div>
        </div>

        
      </div>

      {isOpenSelect ? 
        <div className="ac-select__options">
          {optionsState.map((option) => (
            <div className="ac-select__option" key={option.value}>
              <input
                type="radio"
                name={fieldId}
                className="ac--select__item"
                value={option.value}
                data-label={option.label}
                onClick={onClickOption}
                onKeyDown={onClickOption}
              />

              <span className="ac-select__option-label">{option.label}</span>
              {selectedValue === option.value ? <img src={IconCheck} /> : null}
            </div>
          ))}
        </div> : null
      }
    </div>
  </FieldHolder>)
}

export default SelectWidget
