import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/themeProvider/themeProvider';
import HomePage from './pages/HomePage';
import LoginCallbackPage from './pages/LoginCallbackPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="SVECT-UI-THEME">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="loginCallback" element={<LoginCallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
