import Header from './components/navigation/Header';
import HomePage from './pages/HomePage'
import HomeBoutique from './pages/HomeBoutique'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import Footer from './components/navigation/Footer';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Sidebar from './components/navigation/Sidebar';

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
      <PrimeReactProvider>
        <GlobalStyle />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boutique" element={<HomeBoutique />} />
          </Routes>
          <Footer />
        </Router>
      </PrimeReactProvider>
    </>
  )
}

export default App
