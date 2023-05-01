import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Admin from "./pages/Admin";
import ComingSoon from "./pages/ComingSoon";
import Clio from "./pages/Clio";
import Faqs from "./pages/Faqs";
import Pricing from "./pages/Pricing";
import Profile from './pages/Profile';

const ContextWrapper = () => {

  return (
    <BrowserRouter>
      <Layout
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/clio" element={<Clio />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<ComingSoon />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default ContextWrapper;
