import Header from './components/navigation/Header';
import HomePage from './pages/HomePage'
import HomeBoutique from './pages/HomeBoutique'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import Footer from './components/navigation/Footer';
import { PrimeReactProvider } from 'primereact/api';
import Payment from './pages/Payment';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import ContactMe from './pages/ContactMe';
import ProfilePage from './pages/ProfilePage';
import Favourites from './pages/Favourites';
import ComingSoon from './pages/ComingSoon';
import Portfolio from './pages/Portfolio';
import { IS_COMING_SOON_MODE } from './config/comingSoon';

const GlobalStyle = createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  html {
    margin: 0;
    padding: 0;
    height: auto;
    overflow-x: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    min-height: 100vh;
    font-family: 'Raleway', sans-serif;
    background-color: #ffffff;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

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
          <AppContainer>
            <Router>
              <Header />
              <MainContent>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/boutique" element={<HomeBoutique />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/contact" element={<ContactMe />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                </Routes>
              </MainContent>
              <Footer />
            </Router>
          </AppContainer>
        </PrimeReactProvider>
      </CartProvider>
    </>
  )
}

export default App
