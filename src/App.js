import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './context/AuthContext';
import Header from './components/Header';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';

function App() {

  return (
    <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
