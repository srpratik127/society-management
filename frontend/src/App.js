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
import IncomeTable from "./pages/admin/IncomeTable";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Resident from "./pages/admin/Recident";
import ExpensesTable from "./pages/admin/Expance";
import AddResident from "./components/admin/AddResident";
import AddExpensesDetails from "./components/models/AddExpensesDetails";
import SetMaintenance from "./components/models/SetMaintenance";
import AddMaintenanceDetail from "./components/models/AddMaintenanceDetail";
import CreateOtherIncome from "./components/models/CreateOtherIncome";
import EditOtherIncome from "./components/models/EditOtherIncome";
import ViewMaintenanceDetails from "./components/models/ViewMaintenanceDetails";
import Note from "./pages/admin/Note";

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
          <Route path="income" element={<IncomeTable />} />
          <Route path="resident" element={<Resident />} />
          <Route path="expense" element={<ExpensesTable />} />
          <Route path="note" element={<Note/>} />
          <Route path="add-resident" element={<AddResident />} />
          <Route path="addexpensesdetails" element={<AddExpensesDetails/>}/>
          <Route path="edit-resident" element={<AddResident />} />
           <Route path="/admin/add-expenses" element={<AddExpensesDetails />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
