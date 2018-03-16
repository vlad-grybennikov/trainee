import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,
    Link, NavLink, Redirect}
    from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import News from "./components/News";
import CrossFit from "./components/CrossFit";
import Training from "./components/training";
import Login, {Logout} from "./components/Login";
import SelectTrainer from './components/training/SelectTrainer';
import {excludeProp} from "./utils";


// Компонент который рисует меню
const Menu = (props) => {
    return (
        <div>
            <NavLink to="/home/">home</NavLink>
            <NavLink to="/daily/">daily</NavLink>
            <NavLink to="/statistics/">statistics</NavLink>
            <Link to="/logout/">logout</Link>
        </div>
    )
}

// Обертка для компонентов в которых нужно меню
const Container = (Component) => {
    return () => {
        return (<div className="container">
                    <Menu />
                    <Component />
                </div>)
    }
}


const PrivateRoute = (props) => {
    let logged = localStorage.getItem('logged');
    let wrappedComponent = Container(props.component);
    if (logged){
        return <Route {...excludeProp(props, "component")}
            component={wrappedComponent} />
    } else {
        return <Redirect to="/login" />
    }
}

class App extends Component {
  render() {
    return (
        <div>
            <h2>TRAINEE</h2>

            <Router>
                <div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <PrivateRoute path="/home" component={SelectTrainer} />
                    </Switch>
                </div>
            </Router>

        </div>

    );
  }
};

export default App;
