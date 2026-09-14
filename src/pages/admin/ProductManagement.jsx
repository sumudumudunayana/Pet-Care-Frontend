import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaBox,
  FaTimes,
  FaFilter,
  FaChevronDown,
  FaSortAmountDown,
  FaPlus,
} from "react-icons/fa";
import { toast } from "sonner";

import API from "../../services/api";
import "../../styles/admin/ProductManagement.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [showStockModal, setShowStockModal] = useState(false);
  const [stockProduct, setStockProduct] = useState(null);
  const [newStock, setNewStock] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [stockLoading, setStockLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    stockQuantity: "",
    image: "",
    brand: "",
    expiryDate: "",
  });

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await API.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);

      toast.error("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================================================
  // FORM INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // EDIT PRODUCT
  // =========================================================

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setFormData({
      productName: product.productName || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price ?? "",
      stockQuantity: product.stockQuantity ?? "",
      image: product.image || "",
      brand: product.brand || "",
      expiryDate: product.expiryDate
        ? String(product.expiryDate).split("T")[0]
        : "",
    });

    setShowForm(true);
  };

  // =========================================================
  // UPDATE PRODUCT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingProduct) {
      return;
    }

    if (
      !formData.productName.trim() ||
      !formData.category ||
      !formData.brand.trim() ||
      formData.price === "" ||
      formData.stockQuantity === ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setFormLoading(true);

      const productData = {
        productName: formData.productName.trim(),
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity),
        image: formData.image,
        brand: formData.brand.trim(),
        expiryDate: formData.expiryDate || null,
      };

      await API.put(`/products/${editingProduct.id}`, productData);

      toast.success("Product updated successfully.");

      setShowForm(false);
      setEditingProduct(null);

      await loadProducts();
    } catch (error) {
      console.error("Failed to update product:", error);

      const message =
        error.response?.data?.message || "Unable to update product.";

      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  const handleDeleteProduct = (product) => {
    toast.warning(`Delete "${product.productName}"?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await API.delete(`/products/${product.id}`);

            toast.success("Product deleted successfully.");

            await loadProducts();
          } catch (error) {
            console.error("Failed to delete product:", error);

            toast.error("Unable to delete product.");
          }
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  // =========================================================
  // OPEN STOCK MODAL
  // =========================================================

  const handleUpdateStock = (product) => {
    setStockProduct(product);
    setNewStock(String(product.stockQuantity));
    setShowStockModal(true);
  };

  // =========================================================
  // SAVE STOCK
  // =========================================================

  const handleSaveStock = async (e) => {
    e.preventDefault();

    const stockQuantity = Number(newStock);

    if (
      newStock === "" ||
      !Number.isInteger(stockQuantity) ||
      stockQuantity < 0
    ) {
      toast.error("Please enter a valid stock quantity.");
      return;
    }

    try {
      setStockLoading(true);

      await API.patch(`/products/${stockProduct.id}/stock`, {
        stockQuantity,
      });

      toast.success("Stock quantity updated successfully.");

      setShowStockModal(false);
      setStockProduct(null);
      setNewStock("");

      await loadProducts();
    } catch (error) {
      console.error("Failed to update stock:", error);

      const message =
        error.response?.data?.message || "Unable to update stock.";

      toast.error(message);
    } finally {
      setStockLoading(false);
    }
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // =========================================================
  // CLOSE STOCK MODAL
  // =========================================================

  const closeStockModal = () => {
    setShowStockModal(false);
    setStockProduct(null);
    setNewStock("");
  };

  // =========================================================
  // GET CATEGORIES
  // =========================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ];

    return uniqueCategories.sort();
  }, [products]);

  // =========================================================
  // FILTER + SEARCH + SORT
  // =========================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();

      result = result.filter((product) => {
        return (
          product.productName?.toLowerCase().includes(keyword) ||
          product.brand?.toLowerCase().includes(keyword) ||
          product.category?.toLowerCase().includes(keyword) ||
          String(product.id).toLowerCase().includes(keyword)
        );
      });
    }

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter((product) => product.category === categoryFilter);
    }

    // Stock filter
    if (stockFilter !== "All") {
      result = result.filter((product) => {
        const stock = Number(product.stockQuantity);

        if (stockFilter === "In Stock") {
          return stock > 5;
        }

        if (stockFilter === "Low Stock") {
          return stock > 0 && stock <= 5;
        }

        if (stockFilter === "Out of Stock") {
          return stock === 0;
        }

        return true;
      });
    }

    // Sorting
    if (sortOption === "name-asc") {
      result.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    if (sortOption === "name-desc") {
      result.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    if (sortOption === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortOption === "stock-low") {
      result.sort((a, b) => Number(a.stockQuantity) - Number(b.stockQuantity));
    }

    if (sortOption === "stock-high") {
      result.sort((a, b) => Number(b.stockQuantity) - Number(a.stockQuantity));
    }

    return result;
  }, [products, searchKeyword, categoryFilter, stockFilter, sortOption]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearchKeyword("");
    setCategoryFilter("All");
    setStockFilter("All");
    setSortOption("default");
  };

  const hasActiveFilters =
    searchKeyword.trim() !== "" ||
    categoryFilter !== "All" ||
    stockFilter !== "All" ||
    sortOption !== "default";

  // =========================================================
  // STOCK STATUS
  // =========================================================

  const getStockClass = (stock) => {
    const quantity = Number(stock);

    if (quantity === 0) {
      return "pawcare-admin-products-stock-badge pawcare-admin-products-stock-out";
    }

    if (quantity <= 5) {
      return "pawcare-admin-products-stock-badge pawcare-admin-products-stock-low";
    }

    return "pawcare-admin-products-stock-badge pawcare-admin-products-stock-good";
  };

  return (
    <div className="pawcare-admin-products-page">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="pawcare-admin-products-header">
        <div className="pawcare-admin-products-heading">
          <span className="pawcare-admin-products-label">PAWCARE ADMIN</span>

          <h1>Product Management</h1>

          <p>Manage PawCare products, prices and inventory.</p>
        </div>

        <button
          className="pawcare-admin-products-add-btn"
          onClick={() => {
            window.location.href = "/admin/products/add";
          }}
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <div className="pawcare-admin-products-toolbar">
        <div className="pawcare-admin-products-search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search by product, brand, category or ID..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          {searchKeyword && (
            <button
              className="pawcare-admin-products-clear-search"
              onClick={() => setSearchKeyword("")}
            >
              <FaTimes />
            </button>
          )}
        </div>

        <button
          className={`pawcare-admin-products-filter-toggle ${
            showFilters ? "pawcare-admin-products-filter-active" : ""
          }`}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <FaFilter />
          Filters
          <FaChevronDown />
        </button>

        <div className="pawcare-admin-products-count">
          <FaBox />

          <span>
            {filteredProducts.length} of {products.length} Products
          </span>
        </div>
      </div>

      {/* =====================================================
          FILTER PANEL
      ====================================================== */}

      {showFilters && (
        <div className="pawcare-admin-products-filter-panel">
          <div className="pawcare-admin-products-filter-item">
            <label>Category</label>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pawcare-admin-products-filter-select"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="pawcare-admin-products-filter-item">
            <label>Stock Status</label>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="pawcare-admin-products-filter-select"
            >
              <option value="All">All Stock</option>

              <option value="In Stock">In Stock</option>

              <option value="Low Stock">Low Stock</option>

              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="pawcare-admin-products-filter-item">
            <label>Sort By</label>

            <div className="pawcare-admin-products-sort-wrapper">
              <FaSortAmountDown />

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="pawcare-admin-products-filter-select"
              >
                <option value="default">Default Order</option>

                <option value="name-asc">Name: A → Z</option>

                <option value="name-desc">Name: Z → A</option>

                <option value="price-low">Price: Low → High</option>

                <option value="price-high">Price: High → Low</option>

                <option value="stock-low">Stock: Low → High</option>

                <option value="stock-high">Stock: High → Low</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              className="pawcare-admin-products-clear-filters"
              onClick={clearFilters}
            >
              <FaTimes />
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* =====================================================
          ACTIVE FILTERS
      ====================================================== */}

      {hasActiveFilters && (
        <div className="pawcare-admin-products-active-filters">
          <span>Active filters:</span>

          {searchKeyword && (
            <span className="pawcare-admin-products-filter-chip">
              Search: "{searchKeyword}"
              <button onClick={() => setSearchKeyword("")}>
                <FaTimes />
              </button>
            </span>
          )}

          {categoryFilter !== "All" && (
            <span className="pawcare-admin-products-filter-chip">
              Category: {categoryFilter}
              <button onClick={() => setCategoryFilter("All")}>
                <FaTimes />
              </button>
            </span>
          )}

          {stockFilter !== "All" && (
            <span className="pawcare-admin-products-filter-chip">
              Stock: {stockFilter}
              <button onClick={() => setStockFilter("All")}>
                <FaTimes />
              </button>
            </span>
          )}
        </div>
      )}

      {/* =====================================================
          TABLE
      ====================================================== */}

      <div className="pawcare-admin-products-table-container">
        {loading ? (
          <div className="pawcare-admin-products-loading">
            <div className="pawcare-admin-products-spinner"></div>
            <span>Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="pawcare-admin-products-empty">
            <div className="pawcare-admin-products-empty-icon">
              <FaBox />
            </div>

            <h3>
              {hasActiveFilters ? "No matching products" : "No products found"}
            </h3>

            <p>
              {hasActiveFilters
                ? "Try changing your search or filters."
                : "There are currently no products available."}
            </p>

            {hasActiveFilters && (
              <button
                className="pawcare-admin-products-empty-clear"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <table className="pawcare-admin-products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="pawcare-admin-products-info">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="pawcare-admin-products-image"
                        />
                      ) : (
                        <div className="pawcare-admin-products-image-placeholder">
                          🐾
                        </div>
                      )}

                      <div>
                        <strong>{product.productName}</strong>

                        <small>ID: #{product.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="pawcare-admin-products-category-badge">
                      {product.category}
                    </span>
                  </td>

                  <td>{product.brand}</td>

                  <td className="pawcare-admin-products-price">
                    Rs. {Number(product.price).toFixed(2)}
                  </td>

                  <td>
                    <button
                      className={getStockClass(product.stockQuantity)}
                      onClick={() => handleUpdateStock(product)}
                      title="Click to update stock"
                    >
                      {product.stockQuantity}
                    </button>
                  </td>

                  <td>
                    {product.expiryDate
                      ? String(product.expiryDate).split("T")[0]
                      : "—"}
                  </td>

                  <td>
                    <div className="pawcare-admin-products-actions">
                      <button
                        className="pawcare-admin-products-edit-btn"
                        onClick={() => handleEditProduct(product)}
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="pawcare-admin-products-delete-btn"
                        onClick={() => handleDeleteProduct(product)}
                        title="Delete product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* =====================================================
          EDIT PRODUCT MODAL
      ====================================================== */}

      {showForm && (
        <div
          className="pawcare-admin-products-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div className="pawcare-admin-products-modal">
            <div className="pawcare-admin-products-modal-header">
              <div>
                <span>PAWCARE PRODUCT</span>

                <h2>Edit Product</h2>
              </div>

              <button
                className="pawcare-admin-products-close-btn"
                onClick={closeForm}
              >
                <FaTimes />
              </button>
            </div>

            <form
              className="pawcare-admin-products-form"
              onSubmit={handleSubmit}
            >
              <div className="pawcare-admin-products-form-group">
                <label>
                  Product Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="pawcare-admin-products-form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                />
              </div>

              <div className="pawcare-admin-products-form-row">
                <div className="pawcare-admin-products-form-group">
                  <label>
                    Category
                    <span>*</span>
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="pawcare-admin-products-form-select"
                  >
                    <option value="">Select category</option>

                    <option value="Food">Food</option>

                    <option value="Toys">Toys</option>

                    <option value="Accessories">Accessories</option>

                    <option value="Grooming">Grooming</option>

                    <option value="Healthcare">Healthcare</option>

                    <option value="Beds">Beds</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="pawcare-admin-products-form-group">
                  <label>
                    Brand
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Royal Canin"
                    required
                  />
                </div>
              </div>

              <div className="pawcare-admin-products-form-row">
                <div className="pawcare-admin-products-form-group">
                  <label>
                    Price
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <div className="pawcare-admin-products-form-group">
                  <label>
                    Stock Quantity
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="pawcare-admin-products-form-group">
                <label>Product Image URL</label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="pawcare-admin-products-form-group">
                <label>Expiry Date</label>

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="pawcare-admin-products-form-actions">
                <button
                  type="button"
                  className="pawcare-admin-products-cancel-btn"
                  onClick={closeForm}
                  disabled={formLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="pawcare-admin-products-save-btn"
                  disabled={formLoading}
                >
                  {formLoading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          STOCK MODAL
      ====================================================== */}

      {showStockModal && stockProduct && (
        <div
          className="pawcare-admin-products-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeStockModal();
            }
          }}
        >
          <div className="pawcare-admin-products-stock-modal">
            <div className="pawcare-admin-products-stock-modal-icon">
              <FaBox />
            </div>

            <div className="pawcare-admin-products-stock-modal-heading">
              <span>INVENTORY UPDATE</span>

              <h2>Update Stock</h2>

              <p>
                Update the available stock for{" "}
                <strong>{stockProduct.productName}</strong>.
              </p>
            </div>

            <form onSubmit={handleSaveStock}>
              <div className="pawcare-admin-products-stock-input-group">
                <label>New Stock Quantity</label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="pawcare-admin-products-stock-actions">
                <button
                  type="button"
                  className="pawcare-admin-products-cancel-btn"
                  onClick={closeStockModal}
                  disabled={stockLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="pawcare-admin-products-save-btn"
                  disabled={stockLoading}
                >
                  {stockLoading ? "Updating..." : "Update Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
