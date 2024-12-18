import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/" Component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
