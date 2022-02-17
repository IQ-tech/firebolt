import FormDemo from "./pages/debug/FormDemo"
import CoreDemo from "./pages/debug/Core"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "iq-blueberry/dist/styles.css"

const App = () => {
  return (
    <Router>
      <div className="container" style={{ fontSize: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "20px",
            border: "2px solid",
            alignItems: "center"
          }}
        >
          <h1>Debug Lab</h1>
          <Link style={{ textDecoration: "none" }} to="/debug/core">
            Core{" "}
          </Link>
          <Link style={{ textDecoration: "none" }} to="/debug/form">
            Form
          </Link>
        </div>
        <div>
          <Switch>
            <Route path="/debug/form">
              <FormDemo />
            </Route>
            <Route path="/debug/core">
              <CoreDemo />
            </Route>
            <Route exact path="/">
              <p>home</p>
            </Route>
            <Route exact path="*">
              <h1
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                &#128540;&#128514;
                <p style={{ fontSize: "100px" }}>&#129300;404&#128579;</p>
              </h1>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
