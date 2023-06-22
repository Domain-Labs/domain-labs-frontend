import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Clio from './pages/Clio';
import Faqs from './pages/Faqs';
import Home from './pages/Home';
import Layout from './Layout';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';
import Team from './pages/Team';
import { toast } from 'react-toastify';
import { useDapp } from './contexts/dapp';

function PrivateRoute(props: any) {
  const { isConnected } = useDapp();
  if (!isConnected) {
    toast.warning('Connect your wallet to proceed');
    return <Navigate to="/" />;
  }
  return props.children;
}

const ContextWrapper = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pricing"
            element={
              // <PrivateRoute>
              <Pricing />
              // </PrivateRoute>
            }
          />
          <Route
            path="/search-result"
            element={
              // <PrivateRoute>
              <SearchResult />
              // </PrivateRoute>
            }
          />
          <Route
            path="/clio"
            element={
              // <PrivateRoute>
              <Clio />
              // </PrivateRoute>
            }
          />
          <Route
            path="/faqs"
            element={
              // <PrivateRoute>
              <Faqs />
              // </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/team" element={<Team />} />
          <Route path="/" element={<Navigate to={'/'} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default ContextWrapper;
