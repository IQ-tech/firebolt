import { COLOR_BRAND_BLUE_50, COLOR_SUCCESS_30, Spinner } from "@consumidor-positivo/aurora"
import "./styles.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner size={80} color={COLOR_SUCCESS_30} />
      <p className="loader-text">Carregando...</p>
    </div>
  )
}

export default Loader
