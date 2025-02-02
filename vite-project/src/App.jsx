import Header from './components/navigation/Header';
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
