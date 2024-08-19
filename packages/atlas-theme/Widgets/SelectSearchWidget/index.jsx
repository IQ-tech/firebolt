import React, { useState, useRef, useEffect } from "react"
import FieldHolder from "../../FieldHolder"
import classNames from "classnames"

import IconChevronDown from "./icons/icon-chevron-down.svg"
import IconChevronUp from "./icons/icon-chevron-up.svg"
import IconCheck from "./icons/icon-check.svg"

import "./styles.scss"

const SelectSearchWidget = ({
  slug,
  version = "search",
  options = [],
  label,
  sublabel,
  placeholder,

  hasError,
  errorMessage,
  fieldId,
  disabled = false,

  onChange,
  value,
}) => {
  const selectRef = useRef(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [optionsState, setOptionsState] = useState(options)
  const [selectedOption, setSelectedOption] = useState(null)

  const backupOptions = options

  function onClickSelect() {
    setIsOpenSelect((prevState) => !prevState)
    setOptionsState(backupOptions)
  }

  const escPress = (e) => {
    if (isOpenSelect && e.key === "Escape") {
      setIsOpenSelect(!isOpenSelect)
    }
  }

  const outsideClick = (e) => {
    if (
      isOpenSelect &&
      selectRef.current &&
      !selectRef.current.contains(e.target)
    ) {
      setIsOpenSelect(!isOpenSelect)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escPress, false)
    document.addEventListener("click", outsideClick)

    return () => {
      document.removeEventListener("keydown", escPress, false)
      document.removeEventListener("click", outsideClick)
    }
  }, [escPress, outsideClick])

  useEffect(() => {
    if (value) {
      const optionSelected = options.find(
        (option) => option.value.toString() === value
      )
      setSelectedOption(optionSelected)
    }
  }, [value])

  function onClickOption(e) {
    if (disabled) return
    const valueSelected = e.currentTarget.value
    const labelSelected = e.currentTarget.dataset.label
    setSelectedOption({ value: valueSelected, label: labelSelected })
    onChange(valueSelected)

    selectRef.current.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  }

  function removeAccents(value) {
    const valueWithoutAccents = value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    return valueWithoutAccents
  }

  function filterOptions(value) {
    if (value !== "") {
      const newOptions = options.filter((option) => {
        return removeAccents(option.label)
          .toLowerCase()
          .includes(removeAccents(value).toLowerCase())
      })

      setOptionsState(newOptions)
    } else {
      setOptionsState(backupOptions)
    }
  }

  const classSelect = classNames("ac-select", {
    "is-open": isOpenSelect,
  })

  const valueClass = classNames("ac-select__selected-value", {
    "value-placeholder": !selectedOption?.label,
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
            {isOpenSelect && version === "search" ? (
              <input
                type="text"
                placeholder={
                  selectedOption?.label || placeholder || "Digite ou selecione"
                }
                className="input__search"
                autoFocus
                onChange={(e) => filterOptions(e.target.value)}
              />
            ) : (
              <div className={valueClass}>
                {selectedOption?.label || placeholder}
              </div>
            )}

            <div className="ac-select__icons">
              {isOpenSelect ? (
                <img src={IconChevronUp} />
              ) : (
                <img src={IconChevronDown} />
              )}
            </div>
          </div>

          <label htmlFor={slug}>{sublabel}</label>

          {hasError && errorMessage ? (
            <span className="input-error-message">{errorMessage}</span>
          ) : null}
        </div>

        {isOpenSelect ? (
          <div className="ac-select__options">
            {optionsState.length === 0 ? (
              <div className="ac-select__option">
                <span className="ac-select__option-label">
                  Nenhum resultado encontrado
                </span>
              </div>
            ) : null}

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
                  defaultChecked={selectedOption?.value === option.value}
                />

                <span className="ac-select__option-label">{option.label}</span>
                {selectedOption?.value === option.value ? (
                  <img src={IconCheck} />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </FieldHolder>
  )
}

export default SelectSearchWidget
