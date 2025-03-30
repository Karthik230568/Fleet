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
import './Admin/src/AdminLayout.css';
import 'bootstrap/dist/css/bootstrap.css';
import './signupandsignin/src/App.css';

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
        <Route path='vehicles' element={<Usercarspage />} />
        <Route path='bookingtype' element={<Bookingtype />}></Route>
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
    </Routes>
  );
};

function App() {
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
