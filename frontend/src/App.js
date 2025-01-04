import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import {Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { ProtectedRoute } from "./components/protectedRoute";
import { useSelector } from "react-redux";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";


function App() {
  const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
  return (
    
      <div>
      <Header/>
      
      <main className="py-3">
        <Container>
          <Routes>
          <Route path="/" element={<HomeScreen/>} exact/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/Register" element={<RegisterScreen/>}/>

          <Route element={<ProtectedRoute userInfo={userInfo} />}>
          <Route path="/profile" element={<ProfileScreen/>}/>
          <Route path="/shipping" element={<ShippingScreen/>}/>
          <Route path="/payment" element={<PaymentScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route path="/order/:id" element={<OrderScreen/>}/>
          <Route path="/product/:id" element={<ProductScreen/>}/>

          <Route path="/admin/userlist" element={<UserListScreen/>}/>
          </Route>
          <Route path="/cart/:id?" element={<CartScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
      </div>
    
  );
}

export default App;
