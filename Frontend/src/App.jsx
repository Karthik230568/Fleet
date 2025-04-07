import NavBar from './User/NavBar.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './User/Home.jsx';
import Active from './User/Active.jsx';
import Past from './User/Past.jsx';
import Profile from './User/Profile.jsx';
import Usercarspage from './User/VehicleMain.jsx';
import TermsAndConditions from './User/TermsAndConditions.jsx';
import Userpickup from "./User/userpickup.jsx";
import Userpayment from "./User/userpayment.jsx";
import Nav from './Admin/src/navbar/nav.jsx';
import Mainbody from './Admin/src/adminhome/mainbody.jsx';
import Adminbookingspage from './Admin/src/adminbookings/adminbookings.jsx';
import Admindriverpage from './Admin/src/adddriverpage/fullpage.jsx';
import Admincarspage from './Admin/src/adminvehiclepage/adminvehiclemain.jsx';
import AddDriver from './Admin/src/adddriverdetails/adddriver.jsx';
import Signin from './signupandsignin/src/Signin.jsx';
import Signup from './signupandsignin/src/Signup.jsx';
import Adminsignin from './signupandsignin/src/Adminsignin.jsx';
import Bookingtype from './User/Bookingtype.jsx';
import Forgot from './signupandsignin/src/forgot.jsx';
import './Admin/src/AdminLayout.css';
import 'bootstrap/dist/css/bootstrap.css';
import './signupandsignin/src/App.css';

import { useEffect } from 'react';
import useAuthStore from '../store/AuthStore';
import useAdminAuthStore from '../store/AdminAuthStore'; // ✅ Added

// User Layout Component
const UserLayout = () => {
  return (
    <>
      <NavBar isAdmin={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='help' element={<Home />} />
        <Route path='active' element={<Active />} />
        <Route path='past' element={<Past />} />
        <Route path='profile' element={<Profile />} />
        <Route path='tandc' element={<TermsAndConditions />} />
        <Route path='userpickup' element={<Userpickup />} />
        <Route path='userpayment' element={<Userpayment />} />
        <Route path='vehicles/*' element={<Usercarspage />} />
        <Route path='bookingtype' element={<Bookingtype />} />
      </Routes>
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
      <div className="admin-content">
        <Routes>
          <Route index element={<Mainbody />} />
          <Route path='bookings' element={<Adminbookingspage />} />
          <Route path='drivers/*' element={<Admindriverpage />} />
          <Route path='vehicles/*' element={<Admincarspage />} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

// Auth Layout Component
const AuthLayout = () => {
  return (
    <Routes>
      <Route index element={<Signin />} />
      <Route path='signin' element={<Signin />} />
      <Route path='signup' element={<Signup />} />
      <Route path='adminsignin' element={<Adminsignin />} />
      <Route path='forgotpassword' element={<Forgot />} />
    </Routes>
  );
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { token: userToken } = useAuthStore();
  const { token: adminToken } = useAdminAuthStore();

  // ✅ Redirect users/admins if unauthenticated and trying to access private routes
  useEffect(() => {
    const publicRoutes = [
      '/auth/signin',
      '/auth/signup',
      '/auth/forgotpassword',
      '/auth/adminsignin'
    ];

    const currentPath = location.pathname;
    const isPublic = publicRoutes.includes(currentPath);
    const isAdminRoute = currentPath.startsWith('/admin');
    const isUserRoute = currentPath.startsWith('/home');

    if (!isPublic) {
      if (isAdminRoute && !adminToken) {
        window.history.replaceState(null, '', '/auth/adminsignin');
        window.location.href = '/auth/adminsignin';
      } else if (isUserRoute && !userToken) {
        window.history.replaceState(null, '', '/auth/signin');
        window.location.href = '/auth/signin';
      }
    }
  }, [location.pathname, userToken, adminToken]);

  // ✅ Prevent back navigation if unauthenticated
  useEffect(() => {
    const preventBackNavigation = () => {
      const currentPath = location.pathname;
      const isAdminRoute = currentPath.startsWith('/admin');
      const isUserRoute = currentPath.startsWith('/home');

      if ((isAdminRoute && !adminToken) || (isUserRoute && !userToken)) {
        window.history.forward();
        window.location.href = isAdminRoute ? '/auth/adminsignin' : '/auth/signin';
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventBackNavigation);
    window.addEventListener('beforeunload', preventBackNavigation);
    window.addEventListener('load', () => {
      window.history.pushState(null, '', window.location.href);
    });

    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
      window.removeEventListener('beforeunload', preventBackNavigation);
    };
  }, [userToken, adminToken, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path='/auth/*' element={<AuthLayout />} />
      <Route path='/admin/*' element={<AdminLayout />} />
      <Route path='/home/*' element={<UserLayout />} />
    </Routes>
  );
}

export default App;
