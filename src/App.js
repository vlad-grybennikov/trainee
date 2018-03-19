import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,
    Link, NavLink, Redirect}
    from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Button from "./components/general/Button";
import News from "./components/News";
import CrossFit from "./components/CrossFit";
import Training from "./components/training";
import Login, {Logout} from "./components/Login";
import SelectTrainer from './components/training/SelectTrainer';
import {getLogged, excludeProp} from "./utils";


// Компонент который рисует меню
const Menu = (props) => {
    return (
        <div>
            <NavLink to="/home/">home</NavLink>
            <NavLink to="/daily/">daily</NavLink>
            <NavLink to="/statistics/">statistics</NavLink>
            <Link to="/logout/"><Button>logout</Button></Link>
        </div>
    )
}

// Обертка для компонентов в которых нужно меню
const Container = (Component) => {
    let WrappedComponent = () => {
        return (
            <div className="container">
                <Menu />
                <Component />
            </div>
        )
    };
    // Должны вернуть функцию, чтобы можно было передать в
    // Route -> component
    return WrappedComponent;
}

const PrivateRoute = (props) => {

    // Новый компонент, который создан с меню
    let wrappedComponent = Container(props.component);

    // Проверяем залогинен ли пользователь
    if (getLogged()){

        // Перенаправляем на закрытый роутинг
        return <Route {...excludeProp(props, "component")}
            component={wrappedComponent} />
    } else {

        // Перенаправляем на страницу логина
        return <Redirect to="/login" />
    }
}

class App extends Component {
  render() {
    return (
        <div>
            <h2>TRAINEE</h2>

            {/* Обертка для всего что использует роутинг */}
            <Router>
                <div>

                    {/* Изменяющаяся часть роутера */}
                    <Switch>

                        {/* В зависимости от пути, отрисует компонент */}
                        <Route path="/login" component={Login} />

                        <Route path="/logout" component={Logout} />

                        {/* Закрытые роуты */}
                        <PrivateRoute path="/home" component={SelectTrainer} />
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </Router>

        </div>

    );
  }
};

export default App;