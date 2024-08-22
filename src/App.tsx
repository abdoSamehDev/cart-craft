import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/user/homePage";
import ProductDetailsPage from "./pages/user/productDetailsPage";
import ComparePage from "./pages/user/comparePage";
import AdminDashboardPage from "./pages/admin/dashboardPage";
import AdminLoginPage from "./pages/admin/loginPage";
import CheckoutPage from "./pages/user/checkoutPage";
import CartPage from "./pages/user/cartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
