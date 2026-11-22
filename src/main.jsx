
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import Layout from "./components/Layout.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import NewArrivals from "./Pages/Sellers/NewArrivals.jsx";
import BestSellers from "./Pages/Sellers/BestSellers.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import GovtExamBooks from "./Pages/GovtExambooks.jsx";
import ExploreCategories from "./Pages/ExploreCategories.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Profile from "./Pages/Profile.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import OrderTracking from "./Pages/OrderTracking.jsx";
import OrderConfirmation from "./Pages/OrderConfirmation.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastProvider } from "./components/Toast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Routes>
                {/* Pages that share the header and footer */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/home" element={<Homepage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/best-sellers" element={<BestSellers />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/govt-exams" element={<GovtExamBooks />} />
                  <Route
                    path="/govt-exams/:category"
                    element={<GovtExamBooks />}
                  />
                  <Route
                    path="/explore-categories"
                    element={<ExploreCategories />}
                  />
                  <Route
                    path="/explore-categories/:category"
                    element={<ExploreCategories />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/order-tracking/:orderId"
                    element={<OrderTracking />}
                  />
                  <Route
                    path="/order-confirmation/:orderId"
                    element={<OrderConfirmation />}
                  />
                </Route>

                {/* Dashboard-style pages keep their own sidebar layout */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:section" element={<Profile />} />
                <Route path="/orders" element={<Profile />} />
                <Route path="/wishlist" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
