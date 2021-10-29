import FormDemo from "./pages/FormDemo";
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
