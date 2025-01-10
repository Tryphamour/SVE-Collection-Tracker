import { Route, Routes } from "react-router-dom";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="loginCallback" element={<LoginCallbackPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
