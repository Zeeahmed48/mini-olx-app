import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import Login from './views/login';
import SignUp from './views/signup';
import SellProduct from './views/sellproduct';
import Dashboard from './views/dashboard';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route
            exact
            path={userLoggedIn ? '/dashboard' : '/log-in'}
            component={userLoggedIn ? Dashboard : Login}
          />
          <Route exact path={'/sell-product'} component={SellProduct} />
          <Route exact path={'/sign-up'} component={SignUp} />
          <Route exact path='/'>
            <Redirect to={userLoggedIn ? '/dashboard' : 'log-in'} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
