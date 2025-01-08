import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="loginCallback" element={<LoginCallbackPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
