import FormDemo from "./pages/debug/FormDemo";
import CoreDemo from "./pages/debug/Core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div>
          <Link to="/debug/core">Core</Link>
          <Link to="/debug/form">Form</Link>
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
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
