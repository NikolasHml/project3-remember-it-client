import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WhatIsThisPage from './pages/WhatIsthisPage';
import ProfilePage from './pages/ProfilePage';
import MemoryListPage from './pages/MemoryListPage';
import AddMemoryPage from './pages/AddMemoryPage';
import MemoryDetailsPage from "./pages/MemoryDetailsPage";
import EditMemoryPage from './pages/EditMemoryPage';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/whatisthis" element={ <WhatIsThisPage />} />
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/memory" element={ <MemoryListPage />} />
        <Route path="/addmemory" element={ <AddMemoryPage />} />
        <Route path="/memory/:memoryId" element={ <MemoryDetailsPage />} />
        <Route path="/memory/edit/:memoryId" element={ <EditMemoryPage />} />
      </Routes>

    </div>
  );
}

export default App;

