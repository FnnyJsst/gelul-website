import Header from './components/navigation/Header';
import HomePage from './pages/HomePage'
import HomeBoutique from './pages/HomeBoutique'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import Footer from './components/navigation/Footer';
import { PrimeReactProvider } from 'primereact/api';
import Payment from './pages/Payment';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import ContactMe from './pages/ContactMe';
import ProfilePage from './pages/ProfilePage';
import ComingSoon from './pages/ComingSoon';
import { IS_COMING_SOON_MODE } from './config/comingSoon';

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
  // Si le mode "en construction" est activé, afficher uniquement cette page
  if (IS_COMING_SOON_MODE) {
    return (
      <>
        <PrimeReactProvider>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </Router>
        </PrimeReactProvider>
      </>
    );
  }

  // Sinon, afficher le site complet
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
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
          </Router>
        </PrimeReactProvider>
      </CartProvider>
    </>
  )
}

export default App
