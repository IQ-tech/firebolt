import { Link } from "react-router-dom"
import { useDarkMode } from "./hook"
import "./styles.css"
import { Container, Text } from "@consumidor-positivo/aurora"

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const textColor = isDarkMode ? "white" : "common"
  const darkModeStyle = isDarkMode ? "dark" : "light"

  return (
    <div className={`header ${darkModeStyle}`}>
      <Container>
        <div className="header-menu">
          <Link className="header-link" to="/">
            <Text
              as="h4"
              variant="heading-medium"
              variantDesk="display-small"
              color={textColor}
            >
              Debug Lab 🧪
            </Text>
          </Link>
          <div className="header-nav">
            <Link className="header-link" to="/debug/core">
              <Text
                as="p"
                variant="body-medium"
                variantDesk="heading-small"
                weight="semibold"
                color={textColor}
              >
                Core
              </Text>
            </Link>
            <Link className="header-link" to="/debug/form">
              <Text
                as="p"
                variant="body-medium"
                variantDesk="heading-small"
                weight="semibold"
                color={textColor}
              >
                Form
              </Text>
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`dark-mode-toggle ${darkModeStyle}`}
              title={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
