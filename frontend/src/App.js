import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/auth/Main";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </>
  );
}

export default App;
