import React, { useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SideDrawer from './components/SideDrawer/SideDrawer';
import LoadingScreen from './components/common/LoadingScreen';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemePreferenceProvider } from '../src/components/ThemePreferenceContext';
import { lightTheme, darkTheme } from './theme';

const Home = lazy(() => import('./pages/Home/Home'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const UserRegistrationPage = lazy(() => import('./pages/UserRegistrationPage/UserRegistrationPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));
const PaymentPage = lazy(() => import('./components/PaymentPage/PaymentPage'));
const CadastroProduto = lazy(() => import('./pages/CadastroProduto/ProductManagement'));
const OrderConfirmation = lazy(() => import('./components/Order/OrderConfirmation'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light');
  const [pageTransitions, setPageTransitions] = useState(true);

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const handleThemeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('darkMode', newMode === 'dark');
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const togglePageTransitions = () => {
    setPageTransitions(!pageTransitions);
    localStorage.setItem('pageTransitions', !pageTransitions);
  };

  return (
    <ThemePreferenceProvider initialMode={mode} onModeChange={handleThemeChange}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <CssBaseline />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={mode}
            />
            <BrowserRouter>
              <ScrollToTop />
              <Box className="app-container" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header toggleDrawer={toggleDrawer} />
                <SideDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

                <Box 
                  component="main" 
                  sx={{ 
                    flexGrow: 1,
                    width: '100%',
                    pt: { xs: 2, sm: 3 },
                    pb: { xs: 6, sm: 8 },
                    px: { xs: 2, sm: 3, md: 4 },
                    backgroundColor: theme.palette.background.default
                  }}
                >
                  <Suspense fallback={<LoadingScreen />}>
                    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                      <Routes>

                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<UserRegistrationPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/CadastroProduto" element={<CadastroProduto></CadastroProduto>} />
                        <Route path="/profile/*" element={
                          <Profile 
                            onThemeChange={handleThemeChange}
                            onToggleAnimations={togglePageTransitions}
                            animationsEnabled={pageTransitions}
                          />
                        } />
                      
                        <Route path="/admin/products" element={<CadastroProduto />} />
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate replace to="/404" />} />
                      </Routes>
                    </AnimatePresence>
                  </Suspense>
                </Box>
                <Footer />
              </Box>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemePreferenceProvider>
  );
}

export default App;