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
            alignItems: "center",
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
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAuhF8WgdyUkYM7UtRzt0ZbiwWbN_SlShhUuOX766kRAKtgXKKwmuZUO5eFCBIXC5VcXM&usqp=CAU"
                  alt="Algo de errado não está certo."
                />{" "}
                {/* &#128540;&#128514;
                <img src="https://pa1.narvii.com/6326/5c4a1bb861089e73828287285446e268c69e1012_00.gif" alt="Algo de errado não está certo." /> */}
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
