import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaBoxes,
  FaExclamationTriangle,
  FaPlus,
  FaArrowRight,
  FaPaw,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { AuthContext } from "../../context/AuthContext";

import productService from "../../services/productService";
import API from "../../services/api";

import petLifestyle from "../../assets/home/pet-lifestyle.png";

import "../../styles/admin/AdminHome.css";

/* =========================================================
   NUMBER HELPER
   ========================================================= */

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

/* =========================================================
   ADMIN HOME
   ========================================================= */

const AdminHome = () => {
  const { user } = useContext(AuthContext);

  /* =========================================================
     PRODUCT STATE
     ========================================================= */

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     SALES SUMMARY STATE
     ========================================================= */

  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [salesLoading, setSalesLoading] = useState(true);

  /* =========================================================
     LOAD PRODUCTS
     ========================================================= */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =========================================================
     LOAD SALES SUMMARY
     ========================================================= */

  useEffect(() => {
    const loadSalesSummary = async () => {
      try {
        setSalesLoading(true);

        const summaryResponse = await API.get("/sales/summary");

        const summary = summaryResponse.data || {};

        setTotalSales(toNumber(summary.totalSales));
        setTotalOrders(toNumber(summary.totalOrders));
      } catch (error) {
        console.error("Unable to load sales summary:", error);

        setTotalSales(0);
        setTotalOrders(0);
      } finally {
        setSalesLoading(false);
      }
    };

    loadSalesSummary();
  }, []);

  /* =========================================================
     INVENTORY CALCULATIONS
     ========================================================= */

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + toNumber(product.stockQuantity),
    0,
  );

  const lowStockProducts = products.filter((product) => {
    const stock = toNumber(product.stockQuantity);

    return stock > 0 && stock <= 5;
  });

  const outOfStockProducts = products.filter(
    (product) => toNumber(product.stockQuantity) === 0,
  );

  const inStockProducts = products.filter(
    (product) => toNumber(product.stockQuantity) > 5,
  );

  /* =========================================================
     RECENT PRODUCTS
     ========================================================= */

  const recentProducts = [...products].reverse().slice(0, 5);

  /* =========================================================
     INVENTORY CHART DATA
     ========================================================= */

  const inventoryChartData = [
    {
      name: "In Stock",
      value: inStockProducts.length,
    },
    {
      name: "Low Stock",
      value: lowStockProducts.length,
    },
    {
      name: "Out of Stock",
      value: outOfStockProducts.length,
    },
  ];

  /* =========================================================
     INVENTORY HEALTHY COUNT
     ========================================================= */

  const healthyInventoryCount = inStockProducts.length;

  /* =========================================================
     AVERAGE ORDER VALUE
     ========================================================= */

  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  /* =========================================================
     FORMAT CURRENCY
     ========================================================= */

  const formatCurrency = (value) => {
    return `Rs. ${toNumber(value).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <div className="admin-home">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="admin-hero">
        <div className="admin-hero-content">
          <div className="admin-badge">
            <FaPaw />
            PawCare Administration
          </div>

          <h1>
            Welcome back,
            <span> {user?.fullName || "Admin"}!</span>
          </h1>

          <p>
            Manage your PawCare pet store products, inventory, sales, and stock
            from one place.
          </p>

          <div className="admin-hero-actions">
            <Link to="/admin/products" className="admin-primary-btn">
              Manage Products
              <FaArrowRight />
            </Link>

            <Link to="/admin/products/add" className="admin-secondary-btn">
              <FaPlus />
              Add Product
            </Link>
          </div>
        </div>

        <div className="admin-hero-visual">
          <div className="admin-hero-image">
            <img src={petLifestyle} alt="Pets cared for by PawCare" />
          </div>

          <div className="admin-hero-badge">
            <FaPaw />
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <section className="admin-stats">
        {/* TOTAL PRODUCTS */}

        <div className="admin-stat-card">
          <div className="stat-icon">
            <FaBoxOpen />
          </div>

          <div>
            <p>Total Products</p>

            <h2>{loading ? "..." : totalProducts}</h2>

            <span>Products in store</span>
          </div>
        </div>

        {/* TOTAL STOCK */}

        <div className="admin-stat-card">
          <div className="stat-icon">
            <FaBoxes />
          </div>

          <div>
            <p>Total Stock</p>

            <h2>{loading ? "..." : totalStock}</h2>

            <span>Units available</span>
          </div>
        </div>

        {/* LOW STOCK */}

        <div className="admin-stat-card">
          <div className="stat-icon warning">
            <FaExclamationTriangle />
          </div>

          <div>
            <p>Low Stock</p>

            <h2>{loading ? "..." : lowStockProducts.length}</h2>

            <span>Need attention</span>
          </div>
        </div>

        {/* OUT OF STOCK */}

        <div className="admin-stat-card">
          <div className="stat-icon danger">
            <FaExclamationTriangle />
          </div>

          <div>
            <p>Out of Stock</p>

            <h2>{loading ? "..." : outOfStockProducts.length}</h2>

            <span>Unavailable products</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          ANALYTICS
          ===================================================== */}

      <section className="admin-analytics">
        {/* ===================================================
            INVENTORY CHART
            =================================================== */}

        <div className="admin-chart-card">
          <div className="admin-chart-header">
            <div>
              <span>INVENTORY</span>

              <h2>Stock Overview</h2>
            </div>

            <div className="admin-chart-header-icon">
              <FaBoxes />
            </div>
          </div>

          <div className="inventory-chart">
            {loading ? (
              <div className="chart-loading">Loading inventory...</div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={inventoryChartData}
                    cx="50%"
                    cy="48%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip formatter={(value) => [value, "Products"]} />

                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* INVENTORY SUMMARY */}

          <div className="inventory-summary">
            <div className="inventory-summary-item">
              <span className="inventory-dot in-stock"></span>

              <div>
                <strong>{inStockProducts.length}</strong>
                <small>In Stock</small>
              </div>
            </div>

            <div className="inventory-summary-item">
              <span className="inventory-dot low-stock"></span>

              <div>
                <strong>{lowStockProducts.length}</strong>
                <small>Low Stock</small>
              </div>
            </div>

            <div className="inventory-summary-item">
              <span className="inventory-dot out-stock"></span>

              <div>
                <strong>{outOfStockProducts.length}</strong>
                <small>Out of Stock</small>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            INVENTORY ALERTS
            =================================================== */}

        <div className="admin-chart-card pawcare-inventory-alerts-card">
          <div className="admin-chart-header">
            <div>
              <span>INVENTORY ALERTS</span>

              <h2>Stock Attention</h2>
            </div>

            <div className="pawcare-inventory-alerts-header-icon">
              <FaExclamationTriangle />
            </div>
          </div>

          <div className="pawcare-inventory-alerts-content">
            {loading ? (
              <div className="pawcare-inventory-alerts-loading">
                Checking inventory...
              </div>
            ) : lowStockProducts.length === 0 ? (
              <div className="pawcare-inventory-alerts-empty">
                <div className="pawcare-inventory-alerts-success-icon">
                  <FaCheckCircle />
                </div>

                <div>
                  <strong>Inventory Healthy</strong>

                  <p>No products currently need restocking.</p>
                </div>
              </div>
            ) : (
              <>
                {/* LOW STOCK PRODUCTS */}

                <div className="pawcare-inventory-alert-list">
                  {lowStockProducts.map((product) => {
                    const stock = toNumber(product.stockQuantity);

                    return (
                      <div
                        className="pawcare-inventory-alert-item"
                        key={product.id}
                      >
                        <div className="pawcare-inventory-alert-icon">
                          <FaExclamationTriangle />
                        </div>

                        <div className="pawcare-inventory-alert-info">
                          <strong>Low Stock</strong>

                          <span>
                            {product.productName || "Unnamed Product"}
                          </span>

                          <small>
                            {stock} {stock === 1 ? "unit" : "units"} remaining
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* HEALTHY INVENTORY */}

                <div className="pawcare-inventory-healthy">
                  <div className="pawcare-inventory-healthy-icon">
                    <FaCheckCircle />
                  </div>

                  <div className="pawcare-inventory-healthy-info">
                    <strong>Inventory Healthy</strong>

                    <span>
                      {healthyInventoryCount}{" "}
                      {healthyInventoryCount === 1 ? "product" : "products"}{" "}
                      well stocked
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          SALES SUMMARY
          ===================================================== */}

      <section className="sales-summary-section">
        {/* TOTAL REVENUE */}

        <div className="sales-summary-card">
          <div className="sales-summary-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>Total Revenue</span>

            <h3>{salesLoading ? "..." : formatCurrency(totalSales)}</h3>

            <small>All completed orders</small>
          </div>
        </div>

        {/* TOTAL ORDERS */}

        <div className="sales-summary-card">
          <div className="sales-summary-icon">
            <FaShoppingCart />
          </div>

          <div>
            <span>Total Orders</span>

            <h3>{salesLoading ? "..." : totalOrders}</h3>

            <small>Completed orders</small>
          </div>
        </div>

        {/* AVERAGE ORDER */}

        <div className="sales-summary-card">
          <div className="sales-summary-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>Average Order</span>

            <h3>{salesLoading ? "..." : formatCurrency(averageOrderValue)}</h3>

            <small>Average order value</small>
          </div>
        </div>
      </section>

      {/* =====================================================
          RECENT PRODUCTS
          ===================================================== */}

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <span>INVENTORY</span>

            <h2>Recent Products</h2>
          </div>

          <Link to="/admin/products" className="view-all-link">
            View All
            <FaArrowRight />
          </Link>
        </div>

        <div className="recent-products">
          {loading ? (
            <div className="empty-products">Loading products...</div>
          ) : recentProducts.length === 0 ? (
            <div className="empty-products">
              <FaBoxOpen />

              <h3>No Products Yet</h3>

              <p>Start by adding your first PawCare product.</p>

              <Link to="/admin/products/add" className="admin-primary-btn">
                <FaPlus />
                Add Product
              </Link>
            </div>
          ) : (
            recentProducts.map((product) => (
              <div className="recent-product-row" key={product.id}>
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.productName} />
                  ) : (
                    <FaPaw />
                  )}
                </div>

                <div className="product-info">
                  <h3>{product.productName}</h3>

                  <p>{product.brand}</p>
                </div>

                <div className="product-category">{product.category}</div>

                <div className="product-price">Rs. {product.price}</div>

                <div
                  className={`product-stock ${
                    toNumber(product.stockQuantity) === 0
                      ? "out"
                      : toNumber(product.stockQuantity) <= 5
                        ? "low"
                        : ""
                  }`}
                >
                  {product.stockQuantity} in stock
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
