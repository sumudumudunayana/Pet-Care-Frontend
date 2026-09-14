import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaTag,
  FaLayerGroup,
  FaDollarSign,
  FaBoxes,
  FaCalendarAlt,
  FaImage,
  FaAlignLeft,
  FaPaw,
  FaPlus,
} from "react-icons/fa";

import API from "../../services/api";
import "../../styles/admin/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName.trim() ||
      !formData.category ||
      !formData.price ||
      !formData.stockQuantity ||
      !formData.brand.trim()
    ) {
      toast.error("Missing required fields", {
        description:
          "Please complete the product name, brand, category, price, and stock quantity.",
      });
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Invalid price", {
        description: "Product price must be greater than 0.",
      });
      return;
    }

    if (Number(formData.stockQuantity) < 0) {
      toast.error("Invalid stock quantity", {
        description: "Stock quantity cannot be negative.",
      });
      return;
    }

    try {
      setLoading(true);

      const productData = {
        productName: formData.productName.trim(),
        description: formData.description.trim(),
        category: formData.category,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity),
        image: formData.image.trim(),
        brand: formData.brand.trim(),
        expiryDate: formData.expiryDate || null,
      };

      await API.post("/products", productData);

      toast.success("Product added successfully!", {
        description: `${productData.productName} has been added to the PawCare store.`,
      });

      setFormData({
        productName: "",
        description: "",
        category: "",
        price: "",
        stockQuantity: "",
        image: "",
        brand: "",
        expiryDate: "",
      });
    } catch (error) {
      console.error("Failed to add product:", error);

      toast.error("Failed to add product", {
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pawcare-add-product-page">
      {/* Decorative Paw Icons */}
      <div className="pawcare-add-product-floating-paw pawcare-add-product-paw-one">
        <FaPaw />
      </div>

      <div className="pawcare-add-product-floating-paw pawcare-add-product-paw-two">
        <FaPaw />
      </div>

      <div className="pawcare-add-product-floating-paw pawcare-add-product-paw-three">
        <FaPaw />
      </div>

      {/* Header */}
      <div className="pawcare-add-product-header">
        <div className="pawcare-add-product-header-content">
          <div className="pawcare-add-product-page-icon">
            <FaBoxOpen />
          </div>

          <div>
            <div className="pawcare-add-product-eyebrow">
              <FaPaw />
              PAWCARE ADMIN
            </div>

            <h1>Add New Product</h1>

            <p>
              Expand your PawCare store with a new product for your furry
              customers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="pawcare-add-product-card">
        {/* Card Header */}
        <div className="pawcare-add-product-card-header">
          <div>
            <h2>Product Information</h2>

            <p>Enter the details below to create a new store product.</p>
          </div>

          <div className="pawcare-add-product-required-note">
            <span>*</span> Required fields
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="pawcare-add-product-section">
            <div className="pawcare-add-product-section-heading">
              <div className="pawcare-add-product-section-icon">
                <FaTag />
              </div>

              <div>
                <h3>Basic Information</h3>

                <p>Tell customers about this product</p>
              </div>
            </div>

            <div className="pawcare-add-product-form-grid">
              {/* Product Name */}
              <div className="pawcare-add-product-form-group">
                <label>
                  Product Name <span>*</span>
                </label>

                <div className="pawcare-add-product-input-wrapper">
                  <FaBoxOpen className="pawcare-add-product-input-icon" />

                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g. Premium Dog Food"
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="pawcare-add-product-form-group">
                <label>
                  Brand <span>*</span>
                </label>

                <div className="pawcare-add-product-input-wrapper">
                  <FaTag className="pawcare-add-product-input-icon" />

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Royal Canin"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="pawcare-add-product-form-group">
                <label>
                  Category <span>*</span>
                </label>

                <div className="pawcare-add-product-input-wrapper">
                  <FaLayerGroup className="pawcare-add-product-input-icon" />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
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
              </div>

              {/* Price */}
              <div className="pawcare-add-product-form-group">
                <label>
                  Price <span>*</span>
                </label>

                <div className="pawcare-add-product-input-wrapper">
                  <FaDollarSign className="pawcare-add-product-input-icon" />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    min="0.01"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="pawcare-add-product-form-group">
                <label>
                  Stock Quantity <span>*</span>
                </label>

                <div className="pawcare-add-product-input-wrapper">
                  <FaBoxes className="pawcare-add-product-input-icon" />

                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    min="0"
                  />
                </div>
              </div>

              {/* Expiry */}
              <div className="pawcare-add-product-form-group">
                <label>Expiry Date</label>

                <div className="pawcare-add-product-input-wrapper">
                  <FaCalendarAlt className="pawcare-add-product-input-icon" />

                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="pawcare-add-product-section">
            <div className="pawcare-add-product-section-heading">
              <div className="pawcare-add-product-section-icon">
                <FaImage />
              </div>

              <div>
                <h3>Product Media</h3>

                <p>Add an image to make your product stand out</p>
              </div>
            </div>

            <div className="pawcare-add-product-form-group">
              <label>Image URL</label>

              <div className="pawcare-add-product-input-wrapper">
                <FaImage className="pawcare-add-product-input-icon" />

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product-image.jpg"
                />
              </div>

              <small>
                Use a publicly accessible image URL for the product.
              </small>
            </div>
          </div>

          {/* Description */}
          <div className="pawcare-add-product-section">
            <div className="pawcare-add-product-section-heading">
              <div className="pawcare-add-product-section-icon">
                <FaAlignLeft />
              </div>

              <div>
                <h3>Product Description</h3>

                <p>Give customers more information about this product</p>
              </div>
            </div>

            <div className="pawcare-add-product-form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product, its features, benefits, and suitable pets..."
                rows="5"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pawcare-add-product-form-actions">
            <button
              type="button"
              className="pawcare-add-product-cancel-btn"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="pawcare-add-product-add-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="pawcare-add-product-spinner"></span>
                  Adding Product...
                </>
              ) : (
                <>
                  <FaPlus />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
