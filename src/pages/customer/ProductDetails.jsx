import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import productService from "../../services/productService";
import API from "../../services/api";

import "../../styles/customer/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const data = await productService.getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setMessage("");
      setError("");

      await API.post("/cart", {
        productId: product.id,
        quantity: quantity,
      });

      setMessage("Product added to cart successfully!");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Unable to add product to cart.",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="product-details-message">Loading product...</div>;
  }

  if (error && !product) {
    return <div className="product-details-message">{error}</div>;
  }

  if (!product) {
    return <div className="product-details-message">Product not found.</div>;
  }

  const outOfStock = product.stockQuantity <= 0;

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => navigate("/store")}>
        ← Back to Store
      </button>

      <div className="product-details-card">
        {/* Product Image */}

        <div className="details-image-container">
          {product.image ? (
            <img
              src={product.image}
              alt={product.productName}
              className="details-image"
            />
          ) : (
            <div className="details-no-image">🐾</div>
          )}
        </div>

        {/* Product Information */}

        <div className="details-content">
          <span className="details-category">{product.category}</span>

          <h1>{product.productName}</h1>

          <p className="details-brand">Brand: {product.brand}</p>

          <p className="details-description">{product.description}</p>

          <div className="details-price">
            Rs. {Number(product.price).toLocaleString()}
          </div>

          <div className="details-stock">
            {outOfStock
              ? "Out of stock"
              : `${product.stockQuantity} items available`}
          </div>

          {!outOfStock && (
            <>
              <div className="quantity-section">
                <label>Quantity</label>

                <div className="quantity-control">
                  <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stockQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="add-cart-button"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </>
          )}

          {message && <p className="success-message">{message}</p>}

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
