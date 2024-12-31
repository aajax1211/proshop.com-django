import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";


function App() {
  return (
    <Router>
      <div>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
          <Route path="/" Component={HomeScreen} exact/>
          <Route path="/login" Component={LoginScreen}/>
          <Route path="/Register" Component={RegisterScreen}/>
          <Route path="/profile" Component={ProfileScreen}/>
          <Route path="/shipping" Component={ShippingScreen}/>
          <Route path="/product/:id" Component={ProductScreen}/>
          <Route path="/cart/:id?" Component={CartScreen}/>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
