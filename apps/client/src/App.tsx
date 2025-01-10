import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginCallbackPage from './pages/LoginCallbackPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="loginCallback" element={<LoginCallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
