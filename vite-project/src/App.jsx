import Header from './components/navigation/Header';
import HomePage from './pages/HomePage'
import HomeBoutique from './pages/HomeBoutique'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import Footer from './components/navigation/Footer';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Payment from './pages/Payment';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';

const GlobalStyle = createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  body {
    font-family: 'Raleway', sans-serif;
    background-color: #ffffff;
  }`;

function App() {


  return (
    <>
      <CartProvider>
        <PrimeReactProvider>
          <GlobalStyle />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/boutique" element={<HomeBoutique />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
            <Footer />
          </Router>
        </PrimeReactProvider>
      </CartProvider>
    </>
  )
}

export default App
