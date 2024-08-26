import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/user/homePage";
import ProductDetailsPage from "./pages/user/productDetailsPage";
import ComparePage from "./pages/user/comparePage";
import AdminDashboardPage from "./pages/admin/dashboardPage";
import AdminLoginPage from "./pages/admin/loginPage";
import CheckoutPage from "./pages/user/checkoutPage";
import CartPage from "./pages/user/cartPage";
import { isAuthenticated } from "./store/localStore";
import PrivateRouter from "./components/PrivateRouter";
import NotFoundPathPage from "./pages/NotFoundPathPage";

function App() {
  const isAdmin: boolean = isAuthenticated();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/admin-login"
            element={isAdmin ? <Navigate to="/" /> : <AdminLoginPage />}
          />
          <Route
            path="/admin-dashboard"
            element={
              // <PrivateRouter>
              <AdminDashboardPage />
              // </PrivateRouter>
            }
          />
          <Route path="/*" element={<NotFoundPathPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
