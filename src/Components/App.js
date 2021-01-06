import logo from '../logo.svg';
import '../App.css';
import FetchUser from './FetchUser';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home/home';
import AppBar from './Navbar/AppBar';
import Login from './Login/Login';

function App() {
  return (
    <div className="App">
      <FetchUser>
      <AppBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </FetchUser>
    </div>
  );
}

export default App;
