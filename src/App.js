import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Importing Components
import Navigation from './components/Navigation/Navigation'
import Cart from './components/Cart/Cart'
import ProductsList from './components/ProductsList/ProductsList'
import DefaultPage from './components/DefaultPage/DefaultPage'
import AddProduct from './components/AddProduct/AddProduct';

//Importing Context
import GlobalProvider from './context/GlobalState'


const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={ProductsList}/>
          <Route path="/cart" exact component={Cart}/>
          <Route path="/addproduct" exact component={AddProduct}/>
          <Route component={DefaultPage}/>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
