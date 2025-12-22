import FormDemo from "./pages/debug/FormDemo"
import CoreDemo from "./pages/debug/Core"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import "iq-blueberry/dist/styles.css"
import "./darkmode.css"

const App = () => {
  return (
    <Router>
      <div className="container" style={{ fontSize: "30px" }}>
        <Header />
        <div style={{ padding: "20px" }}>
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
                />
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
