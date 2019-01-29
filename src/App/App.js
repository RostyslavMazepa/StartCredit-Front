import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
