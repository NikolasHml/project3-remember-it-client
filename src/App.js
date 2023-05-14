// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={ <LoginPage />} />
      </Routes>
      
      {/* <LoginPage /> */}

    </div>
  );
}

export default App;

