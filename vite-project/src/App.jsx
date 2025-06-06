import Header from './components/navigation/Header';
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import Footer from './components/navigation/Footer';

const GlobalStyle = createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  body {
    font-family: 'Raleway', sans-serif;
  }`;

function App() {

  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Router>
      
    </>
  )
}

export default App
