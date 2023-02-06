import { Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import About from './components/about/About';
import Dishes from './components/dishes/Dishes';
import Services from './components/services/Services';
import Home from './components/home/Home'
import Login from './components/login/Login'
import Contact from './components/contact/Contact';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile'




function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="348055849817-t4q5a1fc6d6skq22gi7ba2jmkhlcisgv.apps.googleusercontent.com">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/dishes' element={<Dishes />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
