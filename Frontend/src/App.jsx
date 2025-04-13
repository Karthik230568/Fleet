import NavBar from './User/NavBar.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './User/Home.jsx';
import Active from './User/Active.jsx';
import Past from './User/Past.jsx';
import Profile from './User/Profile.jsx';
import Usercarspage from './User/VehicleMain.jsx';
import TermsAndConditions from './User/TermsAndConditions.jsx';
import Userpickup from "./User/userpickup.jsx";
import Userpayment from "./User/userpayment.jsx";
import Mainbody from './Admin/src/adminhome/mainbody.jsx';
import Adminbookingspage from './Admin/src/adminbookings/adminbookings.jsx';
import Admindriverpage from './Admin/src/adddriverpage/fullpage.jsx';
import Admincarspage from './Admin/src/adminvehiclepage/adminvehiclemain.jsx';
import Signin from './signupandsignin/src/Signin.jsx';
import Signup from './signupandsignin/src/Signup.jsx';
import Adminsignin from './signupandsignin/src/Adminsignin.jsx';
import Bookingtype from './User/Bookingtype.jsx';
import Forgot from './signupandsignin/src/forgot.jsx';
import Unauthorized from './Unauthorized.jsx';
import './Admin/src/AdminLayout.css';
import 'bootstrap/dist/css/bootstrap.css';
import './signupandsignin/src/App.css';
import  useAuthStore  from '../store/AuthStore.js';
import  useAdminAuthStore  from '../store/AdminAuthStore.js';
import { Outlet } from 'react-router-dom';
const ProtectedRoute = ({ children, isAdmin }) => {
  const { token: userToken } = useAuthStore();
  const { token: adminToken } = useAdminAuthStore();

  // Check if the user is authenticated
  if (isAdmin && !adminToken) {
    return <Navigate to="/auth/adminsignin" replace />;
  }

  if (!isAdmin && !userToken) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the protected content if authenticated
  return children;
};

// User Layout Component
const UserLayout = () => {
  return (
    <>
      <NavBar isAdmin={false} />
      <div><Outlet /></div>
    </>
  );
};

// Admin Layout Component
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-nav">
        <NavBar isAdmin={true} />
      </div>
      <div className="admin-content"><Outlet /></div>
    </div>
  );
};


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/adminsignin" element={<Adminsignin />} />
        <Route path="/auth/forgotpassword" element={<Forgot />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Mainbody />} />
          <Route path="bookings" element={<Adminbookingspage />} />
          <Route path="drivers/*" element={<Admindriverpage />} />
          <Route path="vehicles/*" element={<Admincarspage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Protected User Routes */}
        <Route
          path="/home/*"
          element={
            <ProtectedRoute isAdmin={false}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="help" element={<Home />} />
          <Route path="active" element={<Active />} />
          <Route path="past" element={<Past />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tandc" element={<TermsAndConditions />} />
          <Route path="userpickup" element={<Userpickup />} />
          <Route path="userpayment" element={<Userpayment />} />
          <Route path="vehicles" element={<Usercarspage />} />
          <Route path="bookingtype" element={<Bookingtype />} />
        </Route>

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/auth/signin" replace />} />
      </Routes>
    </Router>
  );
}


export default App;