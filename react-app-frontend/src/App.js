import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./views/UploadView/UploadView";
import ResultView from "./views/ResultView/ResultView";

function App() {
  return (
    <Router>
      <nav>
          <ul>
            <li>
              <Link to="/">upload page</Link>
            </li>
            <li>
              <Link to="/result">list of files</Link>
            </li>

          </ul>
        </nav>

      <Switch>
        <Route path="/result">
            <ResultView />
        </Route>
        <Route path="/">
          <div className="container" style={{ width: "600px" }}>
          <FileUpload />
          </div>
        </Route>

      </Switch>
    </Router>


  );
}

export default App;
