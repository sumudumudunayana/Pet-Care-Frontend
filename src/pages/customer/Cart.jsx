import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaArrowLeft,
  FaFileInvoice,
  FaSpinner,
} from "react-icons/fa";
import { toast, Toaster } from "sonner";

import { CartContext } from "../../context/CartContext";
import productService from "../../services/productService";

import "../../styles/customer/Cart.css";

const Cart = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);

  const [checkingOut, setCheckingOut] = useState(false);

  const increaseQuantity = (item) => {
    if (item.quantity >= item.stockQuantity) {
      toast.warning("Maximum quantity reached", {
        description: `Only ${item.stockQuantity} ${item.productName} available.`,
      });

      return;
    }

    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
      return;
    }

    updateQuantity(item.id, item.quantity - 1);
  };

  const getCustomerDetails = () => {
    try {
      const storedUser = localStorage.getItem("pawcareUser");

      if (!storedUser) {
        return {
          customerName: "PawCare Customer",
          customerEmail: "",
          customerPhone: "",
          customerAddress: "",
        };
      }

      const user = JSON.parse(storedUser);

      return {
        customerName: user.fullName || user.name || "PawCare Customer",

        customerEmail: user.email || "",

        customerPhone: user.phone || "",

        customerAddress: user.address || "",
      };
    } catch (error) {
      console.error("Unable to read customer details:", error);

      return {
        customerName: "PawCare Customer",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
      };
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");

      return;
    }

    if (checkingOut) {
      return;
    }

    try {
      setCheckingOut(true);

      toast.info("Processing checkout...", {
        description: "Please wait while we confirm your order.",
      });

      const customer = getCustomerDetails();

      const checkoutData = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),

        customerName: customer.customerName,

        customerEmail: customer.customerEmail,

        customerPhone: customer.customerPhone,

        customerAddress: customer.customerAddress,
      };

      const response = await productService.checkout(checkoutData);

      /*
       * Convert backend PDF response
       * into a downloadable file.
       */
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = downloadUrl;

      link.download = `PawCare-Invoice-${Date.now()}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(downloadUrl);

      /*
       * IMPORTANT:
       * Clear cart only after backend
       * successfully processed checkout.
       */
      clearCart();

      toast.success("Checkout successful!", {
        description: "Your invoice has been downloaded.",
      });
    } catch (error) {
      console.error("Checkout error:", error);

      let message = "Unable to complete checkout.";

      /*
       * Backend sends an error as a Blob
       * because checkout normally returns PDF.
       */
      if (error.response && error.response.data instanceof Blob) {
        try {
          const errorText = await error.response.data.text();

          if (errorText) {
            message = errorText;
          }
        } catch (blobError) {
          console.error("Unable to read backend error:", blobError);
        }
      }

      toast.error("Checkout failed", {
        description: message,
      });
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={4000} />

      <div className="pawcare-cart-page">
        {/* HEADER */}

        <div className="pawcare-cart-header">
          <div>
            <h1>Your Shopping Cart</h1>

            <p>Review your selected products before checkout.</p>
          </div>

          <div className="pawcare-cart-header-icon">
            <FaShoppingCart />
          </div>
        </div>

        {/* EMPTY CART */}

        {cart.length === 0 ? (
          <div className="pawcare-cart-empty">
            <div className="pawcare-cart-empty-icon">
              <FaShoppingCart />
            </div>

            <h2>Your cart is empty</h2>

            <p>You haven't added any products to your cart yet.</p>

            <Link to="/store" className="pawcare-cart-shop-btn">
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="pawcare-cart-layout">
            {/* CART ITEMS */}

            <div className="pawcare-cart-items-section">
              <div className="pawcare-cart-items-header">
                <h2>
                  Cart Items
                  <span>{cartCount}</span>
                </h2>

                <button
                  className="pawcare-cart-clear-btn"
                  onClick={clearCart}
                  disabled={checkingOut}
                >
                  Clear Cart
                </button>
              </div>

              <div className="pawcare-cart-items">
                {cart.map((item) => {
                  const stockUnavailable = item.stockQuantity <= 0;

                  const exceedsStock = item.quantity > item.stockQuantity;

                  return (
                    <div className="pawcare-cart-item" key={item.id}>
                      {/* IMAGE */}

                      <div className="pawcare-cart-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.productName} />
                        ) : (
                          <div className="pawcare-cart-no-image">🐾</div>
                        )}
                      </div>

                      {/* PRODUCT DETAILS */}

                      <div className="pawcare-cart-item-details">
                        <span className="pawcare-cart-category">
                          {item.category}
                        </span>

                        <h3>{item.productName}</h3>

                        <p className="pawcare-cart-brand">{item.brand}</p>

                        <p className="pawcare-cart-unit-price">
                          Rs. {Number(item.price).toLocaleString()} per item
                        </p>

                        {exceedsStock && (
                          <p
                            style={{
                              color: "#dc2626",
                              fontSize: "12px",
                              marginTop: "6px",
                              fontWeight: "600",
                            }}
                          >
                            Stock availability has changed. Please reduce the
                            quantity.
                          </p>
                        )}
                      </div>

                      {/* QUANTITY */}

                      <div className="pawcare-cart-quantity">
                        <span>Quantity</span>

                        <div className="pawcare-cart-quantity-control">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item)}
                            disabled={checkingOut}
                          >
                            <FaMinus />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item)}
                            disabled={
                              checkingOut || item.quantity >= item.stockQuantity
                            }
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>

                      {/* TOTAL + REMOVE */}

                      <div className="pawcare-cart-item-total">
                        <strong>
                          Rs.{" "}
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString()}
                        </strong>

                        <button
                          className="pawcare-cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          disabled={checkingOut}
                          title="Remove product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONTINUE SHOPPING */}

              <Link to="/store" className="pawcare-cart-continue-btn">
                <FaArrowLeft />
                Continue Shopping
              </Link>
            </div>

            {/* ORDER SUMMARY */}

            <div className="pawcare-cart-summary">
              <h2>Order Summary</h2>

              <div className="pawcare-cart-summary-row">
                <span>Items</span>

                <span>{cartCount}</span>
              </div>

              <div className="pawcare-cart-summary-row">
                <span>Subtotal</span>

                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>

              <div className="pawcare-cart-summary-row">
                <span>Delivery</span>

                <span>Free</span>
              </div>

              <div className="pawcare-cart-summary-divider" />

              <div className="pawcare-cart-summary-total">
                <span>Total</span>

                <strong>Rs. {cartTotal.toLocaleString()}</strong>
              </div>

              {/* CHECKOUT */}

              <button
                className="pawcare-cart-checkout-btn"
                onClick={handleCheckout}
                disabled={checkingOut}
              >
                {checkingOut ? (
                  <>
                    <FaSpinner className="pawcare-checkout-spinner" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaFileInvoice />
                    Proceed to Checkout
                  </>
                )}
              </button>

              <p
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "#64748b",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                Your stock will be confirmed against the latest database
                inventory during checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
