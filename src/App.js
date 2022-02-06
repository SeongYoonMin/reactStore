import './App.css';
import { Router, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Router>
  );
}

export default App;
