import "./App.css";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { Login } from "./pages/auth/Login";
import OtpScreen from "./pages/auth/OtpScreen";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <div className="">
      <ResetPassword />
      <OtpScreen />
      <ForgetPassword />
      <Login />
    </div>
  );
}

export default App;
