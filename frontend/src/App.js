import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div>
      <Header></Header>
      <main className="py-5">
        <Container>
        <h1>Welcome</h1>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
