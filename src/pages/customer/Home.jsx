import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPaw,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaShoppingBag,
} from "react-icons/fa";
import { toast } from "sonner";

import productService from "../../services/productService";

import heroPet from "../../assets/home/hero-pet.png";
import heroPetSmall from "../../assets/home/hero-pet-small.png";
import petProducts from "../../assets/home/pet-products.png";
import petCare from "../../assets/home/pet-care.png";
import petLifestyle from "../../assets/home/pet-lifestyle.png";

import "../../styles/customer/Home.css";

const heroSlides = [
  {
    badge: "WELCOME TO PAWCARE",
    title: "Everything Your",
    highlight: "Pet Needs.",
    description:
      "Discover quality pet products and make every moment with your furry friend special.",
    visualTitle: "Happy Pets",
    visualText: "Better care, every day",
    icon: <FaHeart />,
    image: heroPet,
  },
  {
    badge: "QUALITY PET CARE",
    title: "Care That Makes",
    highlight: "Tails Wag.",
    description:
      "From everyday essentials to playful favorites, find carefully selected products for your companion.",
    visualTitle: "Quality Products",
    visualText: "Selected with care",
    icon: <FaShieldAlt />,
    image: petProducts,
  },
  {
    badge: "YOUR PET'S WORLD",
    title: "A Smarter Way To",
    highlight: "Care.",
    description:
      "Everything you need for a happier, healthier pet — conveniently brought together in PawCare.",
    visualTitle: "Easy Shopping",
    visualText: "Everything in one place",
    icon: <FaShoppingBag />,
    image: petLifestyle,
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);

        const data = await productService.getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to load products:", error);

        toast.error("Unable to load products", {
          description:
            error.response?.data?.message ||
            "We couldn't load the products right now. Please try again later.",
        });

        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">
        <div className="hero-grid"></div>

        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>
        <div className="hero-glow hero-glow-three"></div>

        <div className="hero-content">
          <span className="hero-small-title">
            <FaPaw />
            {currentHero.badge}
          </span>

          <div className="hero-title-wrapper">
            <h1>
              {currentHero.title}
              <span>{currentHero.highlight}</span>
            </h1>
          </div>

          <p>{currentHero.description}</p>

          <div className="hero-buttons">
            <Link to="/store" className="hero-primary-btn">
              Explore Pet Store
              <FaArrowRight />
            </Link>
          </div>

          {/* Hero Stats */}

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>100+</strong>
              <span>Pet Products</span>
            </div>

            <div className="hero-stat-divider"></div>

            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Pet Care</span>
            </div>

            <div className="hero-stat-divider"></div>

            <div className="hero-stat">
              <strong>100%</strong>
              <span>Pet First</span>
            </div>
          </div>
        </div>

        {/* ================= HERO VISUAL ================= */}

        <div className="hero-pet">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-circle">
            <div className="hero-pulse"></div>

            <div className="hero-image-wrapper">
              <img
                src={currentHero.image}
                alt="Happy pet"
                className="hero-main-image"
              />
            </div>
          </div>

          {/* Small floating image */}

          <div className="hero-small-image">
            <img src={heroPetSmall} alt="Pet care essentials" />
          </div>

          {/* Floating card */}

          <div className="floating-card card-one">
            <div className="floating-card-icon">{currentHero.icon}</div>

            <div>
              <strong>{currentHero.visualTitle}</strong>
              <span>{currentHero.visualText}</span>
            </div>
          </div>

          <div className="floating-card card-two">
            <div className="floating-card-icon">
              <FaStar />
            </div>

            <div>
              <strong>Pet First</strong>
              <span>Always our priority</span>
            </div>
          </div>

          {/* Decorative paw */}

          <div className="hero-floating-paw paw-top">
            <FaPaw />
          </div>

          <div className="hero-floating-paw paw-bottom">
            <FaPaw />
          </div>
        </div>

        {/* Carousel buttons */}

        <button
          className="carousel-button carousel-left"
          onClick={previousSlide}
          aria-label="Previous hero slide"
        >
          <FaChevronLeft />
        </button>

        <button
          className="carousel-button carousel-right"
          onClick={nextSlide}
          aria-label="Next hero slide"
        >
          <FaChevronRight />
        </button>

        {/* Carousel dots */}

        <div className="carousel-dots">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.badge}
              className={currentSlide === index ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <FaHeart />
          </div>

          <div className="feature-content">
            <h3>Pet First</h3>
            <p>Everything we do is for your pet.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaShieldAlt />
          </div>

          <div className="feature-content">
            <h3>Quality Products</h3>
            <p>Carefully selected products.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaTruck />
          </div>

          <div className="feature-content">
            <h3>Easy Shopping</h3>
            <p>Find what your pet needs easily.</p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="home-products-section">
        <div className="section-heading">
          <div className="section-heading-content">
            <span>OUR PRODUCTS</span>

            <h2>
              Popular Pet
              <strong> Products</strong>
            </h2>

            <p>
              Discover carefully selected products made for happier, healthier
              pets.
            </p>
          </div>
        </div>

        {loadingProducts ? (
          <div className="home-product-grid">
            {[...Array(8)].map((_, index) => (
              <div className="home-product-card skeleton-card" key={index}>
                <div className="skeleton skeleton-image"></div>

                <div className="skeleton-product-info">
                  <div className="skeleton skeleton-small"></div>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-brand"></div>

                  <div className="skeleton-bottom">
                    <div className="skeleton skeleton-price"></div>
                    <div className="skeleton skeleton-button"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="home-product-grid">
            {products.slice(0, 8).map((product) => (
              <div className="home-product-card" key={product.id}>
                <div className="home-product-image">
                  <div className="product-image-glow"></div>

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.productName || "Pet product"}
                    />
                  ) : (
                    <div className="home-no-image">
                      <FaPaw />
                    </div>
                  )}

                  <span className="product-badge">PAWCARE</span>
                </div>

                <div className="home-product-info">
                  <span className="home-product-category">
                    {product.category || "Pet Care"}
                  </span>

                  <h3>{product.productName}</h3>

                  <p className="home-product-brand">
                    {product.brand || "PawCare"}
                  </p>

                  <div className="home-product-bottom">
                    <span className="home-product-price">
                      Rs. {Number(product.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="home-products-empty">
            <div className="empty-icon">
              <FaPaw />
            </div>

            <h3>No products available</h3>

            <p>Our pet store is being updated. Check back soon!</p>

            <Link to="/store" className="empty-store-button">
              Visit Store
              <FaArrowRight />
            </Link>
          </div>
        )}
      </section>

      {/* ================= ADVERTISEMENT ================= */}

      <section className="home-advertisement-section">
        <div className="home-advertisement-grid"></div>

        <div className="home-advertisement-glow"></div>

        <div className="home-advertisement-content">
          <span>
            <FaPaw />
            PAWCARE SPECIAL
          </span>

          <h2>
            Give Your Pet
            <br />
            <strong>The Care They Deserve.</strong>
          </h2>

          <p>
            Explore our collection of quality pet products and bring a little
            more happiness into every day.
          </p>

          <Link to="/store" className="home-advertisement-button">
            Shop Now
            <FaArrowRight />
          </Link>
        </div>

        {/* Advertisement image */}

        <div className="home-advertisement-image">
          <img src={petLifestyle} alt="Pet lifestyle" />
        </div>

        <div className="home-advertisement-circle circle-one"></div>
        <div className="home-advertisement-circle circle-two"></div>
      </section>

      {/* ================= ABOUT PAWCARE ================= */}

      <section className="about-section">
        <div className="about-visual">
          <div className="about-orbit"></div>

          <div className="about-image-wrapper">
            <img src={petCare} alt="Pet care" className="about-image" />
          </div>

          <div className="about-floating-card">
            <FaHeart />

            <span>Made with love</span>
          </div>
        </div>

        <div className="about-content">
          <span>ABOUT PAWCARE</span>

          <h2>
            Caring for pets,
            <br />
            <strong>one step at a time.</strong>
          </h2>

          <p>
            PawCare makes it easier for pet owners to find quality products for
            their beloved companions. From food and grooming products to toys
            and everyday essentials, we're here to make pet care simple.
          </p>

          <div className="about-highlights">
            <div>
              <FaHeart />
              <span>Pet focused</span>
            </div>

            <div>
              <FaShieldAlt />
              <span>Trusted care</span>
            </div>

            <div>
              <FaPaw />
              <span>Made for pets</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
