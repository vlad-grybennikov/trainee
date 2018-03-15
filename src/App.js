import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,
    Link, NavLink, Redirect}
    from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import News from "./components/News";
import CrossFit from "./components/CrossFit";
import Training from "./components/training";

const PrivateRoute = (props) => {
  let validate = false;
  if(validate){
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}


class App extends Component {
  render() {
    return (
        <div>
          <h2>TRAINEE</h2>
          <Router>
            <div className="App">
                <div className="nav">
                  <NavLink to="/crossfit/565"
                           activeClassName="active">CrossFit</NavLink>
                  <NavLink to="/news/"
                           activeClassName="active">
                    News</NavLink>
                  <NavLink to="/training/karter" activeClassName="active"
                  >Training</NavLink>
                </div>
                <Switch>
                  <Route path="/crossfit/" component={CrossFit}/>
                  <Route path="/crossfit/:id" component={CrossFit} />
                  <PrivateRoute path="/news/" component={News} />
                  <Route path="/training/:name" component={Training}/>
                  <Redirect from="/" to="/crossfit/"/>
                </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
