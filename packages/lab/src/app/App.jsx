import FormDemo from "./pages/debug/FormDemo"
import CoreDemo from "./pages/debug/Core"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import "iq-blueberry/dist/styles.css"
import "./darkmode.css"
import { NotFound } from "./components/NotFound"
import Home from "./pages/Home"

const App = () => {
  return (
    <Router>
      <div className="container" style={{ fontSize: "30px" }}>
        <Header />
        <Switch>
          <Route path="/debug/form">
            <FormDemo />
          </Route>
          <Route path="/debug/core">
            <CoreDemo />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
