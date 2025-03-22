import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userpickup from "./userpickup/userpickup";
import Userpayment from "./userpaymentpage/userpayment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/userpickup" element={<Userpickup />} />
        <Route path="/userpayment" element={<Userpayment />} />
      </Routes>
    </Router>
  );
}

export default App;
