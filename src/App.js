import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Transaction from "./pages/transaction/transactionList";
import OrderProduct from "./pages/transaction/orderProduct";
import Login from "./pages/login/Login";

function App() {

  const admin = localStorage.getItem("persist:root") != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.isAdmin || false : false;
  
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin ? <>
          <Topbar />
          <div className="container">
            <Sidebar />

            <Route exact path="/">
              {admin ? <Home /> : <Login />}

            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/transaction">
              <Transaction />
            </Route>
            <Route path="/orderproduct/:productId">
              <OrderProduct />
            </Route>

          </div></>: <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
