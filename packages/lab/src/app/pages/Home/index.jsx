import { Container, Text } from "@consumidor-positivo/aurora"
import "./styles.css"

const Home = () => {
  return (
    <Container>
      <div className="home-container">
        <Text variant="heading-large" variantDesk="display-medium">
          Welcome to Firebolt Lab ✨
        </Text>
        <Text variant="body-large" variantDesk="body-big">
          Explore and debug your forms easily!
        </Text>
        <br />
        <a
          href="https://iq-tech.github.io/firebolt-docs/en/package-client/"
          target="_blank"
          rel="noopener noreferrer"
          className="home-link"
        >
          <Text variant="body-medium" weight="semibold">
            Visit the documentation to get started.
          </Text>
        </a>
      </div>
    </Container>
  )
}

export default Home
