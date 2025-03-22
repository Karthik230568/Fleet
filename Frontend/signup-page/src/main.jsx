import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup.jsx'

createRoot(document.getElementById('root')).render(
  <main >
    <header className='header'>
      <img src="/public/Fleet Logo.png" alt="Fleet Logo" />
      <h1 >FLEET</h1>
    </header>
    <div className='mainsnippet'>
      <App />
      <Signup/>
    </div>
  </main>
  
)
