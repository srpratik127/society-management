import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/auth/Main";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import OtpScreen from "./pages/auth/OtpScreen";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forget" element={<ForgetPassword />} />
          <Route path="get-otp" element={<OtpScreen />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
