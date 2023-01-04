import React from "react"

import Img from "../../Img"

import "./style.styl"

const TakePictureButton = ({ onClick, showLargeButton }) => {
  return showLargeButton
    ? (
      <button className="app-camera-button -large" onClick={onClick}>
        Continuar
        <Img src="images/camera-white-icon.svg" />
      </button>
    )
    : (<button className="app-camera-button" onClick={onClick}>
        <svg
          width="37"
          height="29"
          viewBox="0 0 37 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.5179 6.10291H28.3118C27.7335 6.10291 27.1105 5.65471 26.9294 5.10531L25.8415 1.8434C25.6581 1.2943 25.0366 0.846207 24.4584 0.846207H12.5416C11.9633 0.846207 11.3403 1.29431 11.1589 1.84381L10.0709 5.10571C9.88794 5.65511 9.26684 6.10331 8.68824 6.10331H4.48204C2.55534 6.10331 0.977539 7.68111 0.977539 9.60781V25.3776C0.977539 27.3043 2.55534 28.8821 4.48204 28.8821H32.5179C34.4446 28.8821 36.0224 27.3043 36.0224 25.3776V9.60741C36.0224 7.68071 34.4446 6.10291 32.5179 6.10291ZM18.5 25.3776C13.6607 25.3776 9.73884 21.4557 9.73884 16.6164C9.73884 11.779 13.6607 7.85511 18.5 7.85511C23.3373 7.85511 27.2612 11.779 27.2612 16.6164C27.2612 21.4557 23.3373 25.3776 18.5 25.3776ZM31.291 12.1805C30.5476 12.1805 29.9413 11.5761 29.9413 10.8308C29.9413 10.0871 30.5476 9.48321 31.291 9.48321C32.0363 9.48321 32.6406 10.0875 32.6406 10.8308C32.6406 11.5761 32.0363 12.1805 31.291 12.1805Z"
            fill="black"
          />
        </svg>
    </button>)
}

export default TakePictureButton
