import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import Footer from './components/Footer/Footer';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Profile from './pages/Profile/Profile';
import { lightTheme, darkTheme } from './theme';

import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage/PaymentPage';
import UserRegistrationPage from '../src/pages/UserRegistrationPage/UserRegistrationPage';
import { Login } from '@mui/icons-material';
import LoginPage from './pages/Login/LoginPage';
import CadastroProduto from '../src/pages/CadastroProduto/ProductManagement';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mode, setMode] = useState(localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light');

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const handleThemeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('darkMode', newMode === 'dark');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <Header toggleDrawer={toggleDrawer} />
          <SideDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

          <main>
            <Routes>
              <Route path="/register" element={<UserRegistrationPage></UserRegistrationPage>} />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile onThemeChange={handleThemeChange} />} />
              <Route path="/payment" element={<PaymentPage></PaymentPage>} />
              <Route path="/checkout" element={<CheckoutPage></CheckoutPage>} />
              <Route path="/login" element={<LoginPage></LoginPage>} />
              <Route path = "CadastroProduto" element={<CadastroProduto></CadastroProduto>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
