import Cart from "./pages/Cart";
import Payment from "./pages/PaymentProcessing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import DeliveryAddress from "./pages/DeliveryAddress";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import WishList from "./pages/WishList";



const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/paymentprocessing">
          <Payment />
        </Route>
        <Route path="/deliveryaddress">
          <DeliveryAddress />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/wishlist">
          <WishList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}

        </Route>
      </Switch>
    </Router>
  )
};

export default App;