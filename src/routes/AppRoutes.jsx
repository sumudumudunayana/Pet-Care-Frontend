import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/customer/Home";
import PetStore from "../pages/customer/PetStore";
import ProductDetails from "../pages/customer/ProductDetails";
import Profile from "../pages/customer/Profile";
import History from "../pages/customer/History";
import ContactUs from "../pages/customer/ContactUs";

import AdminHome from "../pages/admin/AdminHome";
import ProductManagement from "../pages/admin/ProductManagement";
import AddProduct from "../pages/admin/AddProduct";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/common/Layout";

import Cart from "../pages/customer/Cart";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/store"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <PetStore />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <ProductDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <History />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <ContactUs />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout>
                <AdminHome />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout>
                <ProductManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout>
                <AddProduct />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Layout>
                <Cart />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
