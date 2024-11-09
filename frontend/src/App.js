import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/auth/Main";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import OtpScreen from "./pages/auth/OtpScreen";
import ResetPassword from "./pages/auth/ResetPassword";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import Income from "./pages/admin/Income";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Resident from "./pages/admin/Recident";
import ExpensesTable from "./pages/admin/Expance";
import AddResident from "./components/admin/AddResident";
import AddExpensesDetails from "./components/models/AddExpensesDetails";
import Note from "./pages/admin/Note";
import CreateComplaint from "./pages/admin/CreateComplaint";
import RequestTracking from "./pages/admin/RequestTracking";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute><Main /></PublicRoute>}>
          <Route path="/" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="forget" element={<PublicRoute><ForgetPassword /></PublicRoute>} />
          <Route path="get-otp" element={<PublicRoute><OtpScreen /></PublicRoute>} />
          <Route path="reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        </Route> 

        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="income" element={<Income/>} />
          <Route path="resident" element={<Resident />} />
          <Route path="expense" element={<ExpensesTable />} />
          <Route path="note" element={<Note/>} />
          <Route path="add-resident" element={<AddResident />} />
          <Route path="addexpensesdetails" element={<AddExpensesDetails/>}/>
          <Route path="edit-resident" element={<AddResident />} />
          <Route path="create-complaint" element={<CreateComplaint/>}/>
          <Route path="request-tracking" element={<RequestTracking/>}/>

        </Route>
ઇ        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
