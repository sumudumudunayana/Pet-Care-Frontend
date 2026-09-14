import { useContext, useEffect, useMemo, useState } from "react";
import {
  FaShoppingCart,
  FaEye,
  FaPlus,
  FaMinus,
  FaTimes,
  FaSearch,
  FaPaw,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

import productService from "../../services/productService";
import { CartContext } from "../../context/CartContext";
import "../../styles/customer/PetStore.css";

const PetStore = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Quantity selected before adding to cart
  const [quantities, setQuantities] = useState({});

  // Selected product for modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  // Cart Context
  const { cartCount, addToCart } = useContext(CartContext);

  // =========================================
  // LOAD PRODUCTS
  // =========================================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await productService.getProducts();

      setProducts(data);

      const initialQuantities = {};

      data.forEach((product) => {
        initialQuantities[product.id] = 1;
      });

      setQuantities(initialQuantities);
    } catch (error) {
      console.error(error);

      setError("Unable to load products.");

      toast.error("Unable to load products", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================================
  // SEARCH
  // =========================================

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      await loadProducts();
      return;
    }

    try {
      setError("");

      const data = await productService.searchProducts({
        keyword: value,
      });

      setProducts(data);

      const newQuantities = {};

      data.forEach((product) => {
        newQuantities[product.id] = 1;
      });

      setQuantities(newQuantities);
    } catch (error) {
      console.error(error);

      setError("Unable to search products.");

      toast.error("Search failed", {
        description: "Unable to search products. Please try again.",
      });
    }
  };

  // =========================================
  // CATEGORY OPTIONS
  // =========================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter((category) => category),
      ),
    ];

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [products]);

  // =========================================
  // FILTER + SORT PRODUCTS
  // =========================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // CATEGORY FILTER
    if (category !== "all") {
      result = result.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    // SORT
    if (sortBy === "price-low-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "name-a-z") {
      result.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    if (sortBy === "name-z-a") {
      result.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    return result;
  }, [products, category, sortBy]);

  // =========================================
  // PRODUCT QUANTITY
  // =========================================

  const increaseQuantity = (product) => {
    setQuantities((previous) => {
      const currentQuantity = previous[product.id] || 1;

      if (currentQuantity >= product.stockQuantity) {
        return previous;
      }

      return {
        ...previous,
        [product.id]: currentQuantity + 1,
      };
    });
  };

  const decreaseQuantity = (product) => {
    setQuantities((previous) => {
      const currentQuantity = previous[product.id] || 1;

      if (currentQuantity <= 1) {
        return previous;
      }

      return {
        ...previous,
        [product.id]: currentQuantity - 1,
      };
    });
  };

  // =========================================
  // ADD TO CART
  // =========================================

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    // Current available stock
    const currentStock = Number(product.stockQuantity) || 0;

    // Check stock
    if (currentStock <= 0) {
      toast.error("Product unavailable", {
        description: `${product.productName} is currently out of stock.`,
      });

      return;
    }

    // Make sure requested quantity does not exceed stock
    if (quantity > currentStock) {
      toast.error("Not enough stock", {
        description: `Only ${currentStock} item${
          currentStock === 1 ? "" : "s"
        } available.`,
      });

      return;
    }

    // =========================================
    // ADD PRODUCT TO CART
    // =========================================

    addToCart(product, quantity);

    // =========================================
    // REDUCE AVAILABLE STOCK
    // =========================================

    const updatedStock = Math.max(0, currentStock - quantity);

    setProducts((previousProducts) =>
      previousProducts.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stockQuantity: updatedStock,
            }
          : item,
      ),
    );

    // =========================================
    // UPDATE SELECTED PRODUCT IN MODAL
    // =========================================

    setSelectedProduct((previousSelectedProduct) => {
      if (
        previousSelectedProduct &&
        previousSelectedProduct.id === product.id
      ) {
        return {
          ...previousSelectedProduct,
          stockQuantity: updatedStock,
        };
      }

      return previousSelectedProduct;
    });

    // =========================================
    // RESET SELECTED QUANTITY
    // =========================================

    setQuantities((previous) => ({
      ...previous,
      [product.id]: 1,
    }));

    // =========================================
    // SUCCESS MESSAGE
    // =========================================

    toast.success("Added to cart", {
      description: `${quantity} × ${product.productName} added to your cart.`,
    });
  };

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = async () => {
    setSearch("");
    setCategory("all");
    setSortBy("default");

    await loadProducts();

    toast.success("Filters cleared", {
      description: "Showing all available products.",
    });
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <>
        <Toaster position="top-right" richColors closeButton duration={3000} />

        <div className="petstore-loading">
          <div className="petstore-loading-icon">
            <FaPaw />
          </div>
          Loading products...
        </div>
      </>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={3000} />

      <div className="petstore-page">
        {/* Decorative background */}

        <div className="petstore-grid"></div>

        <div className="petstore-glow petstore-glow-one"></div>

        <div className="petstore-glow petstore-glow-two"></div>

        <div className="petstore-content">
          {/* =====================================
              HEADER
          ====================================== */}

          <div className="petstore-header">
            <div className="petstore-heading">
              <span className="petstore-eyebrow">
                <FaPaw />
                PAWCARE STORE
              </span>

              <h1 className="petstore-title">Pet Store</h1>

              <p className="petstore-subtitle">
                Everything your pet needs, all in one place.
              </p>
            </div>

            <div className="petstore-header-actions">
              {/* CART */}

              <button
                className="petstore-cart-button"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart />

                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="petstore-cart-count">{cartCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* =====================================
              FILTERS
          ====================================== */}

          <div className="petstore-filters">
            {/* FILTER LABEL */}

            <div className="petstore-filter-heading">
              <FaFilter />
              <span>Filter & Sort</span>
            </div>

            {/* SEARCH */}

            <div className="petstore-filter-group petstore-filter-search-group">
              <label htmlFor="filterSearch">Search Products</label>

              <div className="petstore-filter-search-wrapper">
                <FaSearch className="petstore-filter-search-icon" />

                <input
                  id="filterSearch"
                  type="text"
                  className="petstore-filter-search-input"
                  placeholder="Search by product name..."
                  value={search}
                  onChange={handleSearch}
                />

                {search && (
                  <button
                    type="button"
                    className="petstore-filter-search-clear"
                    onClick={clearFilters}
                    title="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* CATEGORY */}

            <div className="petstore-filter-group">
              <label htmlFor="category">Category</label>

              <div className="petstore-select-wrapper">
                <FaPaw className="petstore-select-icon" />

                <select
                  id="category"
                  className="petstore-filter-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SORT */}

            <div className="petstore-filter-group">
              <label htmlFor="sortBy">Sort By</label>

              <div className="petstore-select-wrapper">
                <FaSortAmountDown className="petstore-select-icon" />

                <select
                  id="sortBy"
                  className="petstore-filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>

                  <option value="price-low-high">Price: Low to High</option>

                  <option value="price-high-low">Price: High to Low</option>

                  <option value="name-a-z">Name: A - Z</option>

                  <option value="name-z-a">Name: Z - A</option>
                </select>
              </div>
            </div>

            {/* CLEAR */}

            {(category !== "all" || sortBy !== "default" || search) && (
              <button className="petstore-clear-filters" onClick={clearFilters}>
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>

          {/* =====================================
              RESULTS INFO
          ====================================== */}

          <div className="petstore-results-info">
            <span>
              Showing <strong>{filteredProducts.length}</strong>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>

            {(category !== "all" || sortBy !== "default" || search) && (
              <span className="petstore-active-filter">Filters applied</span>
            )}
          </div>

          {/* =====================================
              ERROR
          ====================================== */}

          {error && <p className="petstore-error">{error}</p>}

          {/* =====================================
              PRODUCTS
          ====================================== */}

          {filteredProducts.length === 0 ? (
            <div className="petstore-empty">
              <div className="petstore-empty-icon">
                <FaPaw />
              </div>

              <h3>No products found</h3>

              <p>Try changing your search or filters.</p>

              <button
                className="petstore-empty-clear-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="petstore-product-grid">
              {filteredProducts.map((product) => {
                const quantity = quantities[product.id] || 1;

                const isOutOfStock = Number(product.stockQuantity) <= 0;

                return (
                  <div className="petstore-product-card" key={product.id}>
                    {/* IMAGE */}

                    <div className="petstore-product-image">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="petstore-product-image-img"
                        />
                      ) : (
                        <div className="petstore-no-image">
                          <FaPaw />
                        </div>
                      )}

                      {/* OUT OF STOCK */}

                      {isOutOfStock && (
                        <span className="petstore-stock-badge">
                          Out of Stock
                        </span>
                      )}

                      {/* VIEW DETAILS */}

                      <button
                        className="petstore-eye-button"
                        onClick={() => setSelectedProduct(product)}
                        title="View product details"
                      >
                        <FaEye />
                      </button>
                    </div>

                    {/* PRODUCT INFO */}

                    <div className="petstore-product-info">
                      <span className="petstore-product-category">
                        {product.category}
                      </span>

                      <h2 className="petstore-product-name">
                        {product.productName}
                      </h2>

                      <p className="petstore-product-brand">{product.brand}</p>

                      <p className="petstore-product-price">
                        Rs. {Number(product.price).toLocaleString()}
                      </p>

                      <p className="petstore-product-stock">
                        {isOutOfStock
                          ? "Currently unavailable"
                          : `${product.stockQuantity} available`}
                      </p>

                      {/* QUANTITY */}

                      {!isOutOfStock && (
                        <div className="petstore-quantity-section">
                          <span className="petstore-quantity-label">
                            Quantity
                          </span>

                          <div className="petstore-quantity-control">
                            <button
                              type="button"
                              className="petstore-quantity-btn"
                              onClick={() => decreaseQuantity(product)}
                              disabled={quantity <= 1}
                            >
                              <FaMinus />
                            </button>

                            <span className="petstore-quantity-value">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              className="petstore-quantity-btn"
                              onClick={() => increaseQuantity(product)}
                              disabled={quantity >= product.stockQuantity}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ADD TO CART */}

                      <button
                        className="petstore-add-cart-btn"
                        onClick={() => handleAddToCart(product)}
                        disabled={isOutOfStock}
                      >
                        <FaShoppingCart />

                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =====================================
            PRODUCT DETAILS MODAL
        ====================================== */}

        {selectedProduct && (
          <div
            className="petstore-modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="petstore-product-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}

              <button
                className="petstore-modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                <FaTimes />
              </button>

              {/* IMAGE */}

              <div className="petstore-modal-image">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.productName}
                  />
                ) : (
                  <div className="petstore-modal-no-image">
                    <FaPaw />
                  </div>
                )}
              </div>

              {/* CONTENT */}

              <div className="petstore-modal-content">
                <span className="petstore-modal-category">
                  {selectedProduct.category}
                </span>

                <h2>{selectedProduct.productName}</h2>

                <p className="petstore-modal-brand">{selectedProduct.brand}</p>

                <p className="petstore-modal-price">
                  Rs. {Number(selectedProduct.price).toLocaleString()}
                </p>

                <div className="petstore-modal-divider" />

                <p className="petstore-modal-stock">
                  <strong>Availability:</strong>{" "}
                  {Number(selectedProduct.stockQuantity) > 0
                    ? `${selectedProduct.stockQuantity} available`
                    : "Out of stock"}
                </p>

                {selectedProduct.description && (
                  <div className="petstore-modal-description">
                    <h3>Description</h3>

                    <p>{selectedProduct.description}</p>
                  </div>
                )}

                {/* MODAL ADD TO CART */}

                {Number(selectedProduct.stockQuantity) > 0 && (
                  <button
                    className="petstore-modal-cart-btn"
                    onClick={() => {
                      handleAddToCart(selectedProduct);

                      // Close modal only if product
                      // still has stock after adding
                      const currentStock =
                        Number(selectedProduct.stockQuantity) || 0;

                      const quantity = quantities[selectedProduct.id] || 1;

                      if (quantity >= currentStock) {
                        setSelectedProduct(null);
                      }
                    }}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PetStore;
