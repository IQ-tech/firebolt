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
  version,
  options = [],
  label,
  placeholder,

  hasError,
  errorMessage,
  fieldId,
  disabled = false,

  onChange,
  value
  
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
  
  useEffect(() => {
    if(value) {
      setSelectedValue(value)
      const autofilledLabel = options.find((option) => option.value === value)
      setSelectedLabel(autofilledLabel?.label)
    }
  }, [value])

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
      <div className={classSelect}>
      <div className="ac-select__wrap">
        <div 
          className="ac-select__button" 
          onClick={onClickSelect}
          ref={selectRef}
          id={slug}
        >
          {
            (isOpenSelect && version === "search") ? 
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

        <label htmlFor={slug}>
          {placeholder}
        </label>

        {hasError && errorMessage ? <span
          className="input-error-message"
        >
          {errorMessage}
        </span> : null}
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
                defaultChecked={selectedValue === option.value}
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
