import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Cart from "./pages/Cart";
import SearchDetail from "./pages/SearchDetail";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
const ContextWrapper = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/search-detail/:id" element={<SearchDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default ContextWrapper;
