import logo from '../logo.svg';
import '../App.css';
import FetchUser from './FetchUser';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home/home';
import Nav from './Navbar/appBar';
import Login from './Login/Login';
import NewCompany from './Company/NewCompany';
import AllCompanies from './Company/AllCompanies';

function App() {
  return (
    <div className="App">
      <FetchUser>
      <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/new-company' component={NewCompany} />
          <Route exact path='/all-companies' component={AllCompanies} />
        </Switch>
      </FetchUser>
    </div>
  );
}

export default App;
