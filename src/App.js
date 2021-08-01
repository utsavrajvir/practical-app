import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage"
import {RegistrationPage} from "./pages/RegistrationPage"
import {UserListPage} from "./pages/UserListPage"
import {InformationPage} from "./pages/InformationPage"
import {Page404} from "./pages/page404"

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={LoginPage} exact />
        <Route path='/registration' component={RegistrationPage} exact />
        <Route path='/information' component={InformationPage} exact />
        <Route path='/' component={UserListPage} exact />
        <Route path='*' component={Page404} exact />
      </Switch>
    </Router>
  );
}

export default App;
