import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './views/auth/login';
import SignUp from './views/auth/signup';
import SellProduct from './views/sellProduct';
import Dashboard from './views/dashboard';
import Navbar from './components/navbar';
import ProductDetails from './components/productDetail';
import { db } from './config/firebase';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    const usersData = await db.collection('products').get();
    const tempUsers = [];
    try {
      usersData.docs.forEach((product) => {
        tempUsers.push(product.data());
      });
      setAllProducts(tempUsers);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [allProducts]);

  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            {!user ? (
              <Redirect to='/login' />
            ) : (
              <Dashboard products={allProducts} isLoading={isLoading} />
            )}
          </Route>
          <Route exact path='/login'>
            {user ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route exact path={'/signup'}>
            <SignUp />
          </Route>
          <Route exact path={'/sell'} component={SellProduct} />
          <Route exact path={'/product/:id'}>
            <ProductDetails products={allProducts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
