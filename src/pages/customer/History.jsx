import {
  FaPaw,
  FaHeart,
  FaShieldAlt,
  FaUsers,
  FaLeaf,
  FaStethoscope,
  FaShoppingBag,
  FaHome,
} from "react-icons/fa";

import petCare from "../../assets/home/pet-care.png";
import petProducts from "../../assets/home/pet-products.png";
import petLifestyle from "../../assets/home/pet-lifestyle.png";

import "../../styles/customer/History.css";

const History = () => {
  return (
    <div className="history-page">
      {/* ================= HERO SECTION ================= */}

      <section className="history-hero">
        <div className="history-hero-image">
          <img src={petLifestyle} alt="Pets enjoying life with PawCare" />
        </div>

        <div className="history-hero-overlay"></div>

        <div className="history-hero-content">
          <div className="history-paw-icon">
            <FaPaw />
          </div>

          <span className="history-label">OUR JOURNEY</span>

          <h1>
            The Story Behind
            <span> PawCare</span>
          </h1>

          <p>
            From simple pet care needs to a complete digital pet care
            experience, PawCare was created with one purpose — making life
            better for pets and their owners.
          </p>
        </div>

        <div className="hero-paw-decoration">
          <FaPaw />
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}

      <section className="history-intro">
        <div className="history-intro-image">
          <div className="intro-image-wrapper">
            <img
              src={petCare}
              alt="A pet being cared for"
              className="intro-photo"
            />
          </div>

          <div className="intro-floating-badge">
            <FaPaw />
          </div>
        </div>

        <div className="history-intro-content">
          <span className="section-label">WHERE IT STARTED</span>

          <h2>
            Caring for pets,
            <span> made simpler.</span>
          </h2>

          <p>
            PawCare began with a simple idea: pet owners deserve an easier way
            to manage the things their pets need every day.
          </p>

          <p>
            Finding products, keeping track of care, discovering useful services
            and making informed decisions can sometimes become difficult.
            PawCare brings these experiences together in one convenient
            platform.
          </p>

          <div className="intro-highlight">
            <FaHeart />

            <div>
              <strong>Built with care</strong>

              <p>
                Every part of PawCare is designed around the wellbeing of pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}

      <section className="history-timeline-section">
        <div className="section-heading">
          <span className="section-label">OUR JOURNEY</span>

          <h2>Growing together</h2>

          <p>A journey built around better pet care.</p>
        </div>

        <div className="history-timeline">
          {/* 2022 */}

          <div className="timeline-item">
            <div className="timeline-year">2022</div>

            <div className="timeline-dot">
              <FaPaw />
            </div>

            <div className="timeline-card">
              <h3>The Idea Begins</h3>

              <p>
                PawCare started with an idea to create a simpler and more
                organized way for pet owners to manage their pets' needs.
              </p>
            </div>
          </div>

          {/* 2023 */}

          <div className="timeline-item">
            <div className="timeline-year">2023</div>

            <div className="timeline-dot">
              <FaUsers />
            </div>

            <div className="timeline-card">
              <h3>Connecting Pet Owners</h3>

              <p>
                The vision expanded to create a platform where pet owners could
                access useful information and services from one place.
              </p>
            </div>
          </div>

          {/* 2024 */}

          <div className="timeline-item">
            <div className="timeline-year">2024</div>

            <div className="timeline-dot">
              <FaShoppingBag />
            </div>

            <div className="timeline-card">
              <h3>PawCare Pet Store</h3>

              <p>
                The PawCare online store was introduced, giving customers an
                easier way to discover and purchase essential pet products.
              </p>
            </div>
          </div>

          {/* 2025 */}

          <div className="timeline-item">
            <div className="timeline-year">2025</div>

            <div className="timeline-dot">
              <FaStethoscope />
            </div>

            <div className="timeline-card">
              <h3>Expanding Pet Care</h3>

              <p>
                PawCare expanded its vision beyond products by bringing medical,
                grooming and boarding care experiences into the platform.
              </p>
            </div>
          </div>

          {/* Today */}

          <div className="timeline-item">
            <div className="timeline-year">Today</div>

            <div className="timeline-dot">
              <FaHeart />
            </div>

            <div className="timeline-card">
              <h3>A Complete Pet Care Experience</h3>

              <p>
                PawCare continues to grow as a platform focused on making pet
                ownership easier, more organized and more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}

      <section className="history-values">
        <div className="section-heading">
          <span className="section-label">WHAT DRIVES US</span>

          <h2>More than just pet care</h2>

          <p>Our values guide everything we build.</p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <FaHeart />
            </div>

            <h3>Compassion</h3>

            <p>
              We believe every pet deserves kindness, attention and loving care.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaShieldAlt />
            </div>

            <h3>Trust</h3>

            <p>
              We aim to provide a safe and reliable experience for pet owners.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaUsers />
            </div>

            <h3>Community</h3>

            <p>
              Better pet care begins when pet owners and care providers are
              connected.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaLeaf />
            </div>

            <h3>Better Future</h3>

            <p>
              We continuously look for better ways to improve the pet care
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="history-services">
        <div className="services-photo">
          <img src={petProducts} alt="PawCare products and services" />
        </div>

        <div className="services-content">
          <span className="section-label">THE PAWCARE EXPERIENCE</span>

          <h2>
            Everything your pet
            <span> needs, in one place.</span>
          </h2>

          <p>
            PawCare brings together different parts of pet ownership so you can
            spend less time managing things and more time enjoying moments with
            your companion.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-item">
            <FaShoppingBag />

            <div>
              <h3>Pet Store</h3>

              <p>Discover useful pet products.</p>
            </div>
          </div>

          <div className="service-item">
            <FaStethoscope />

            <div>
              <h3>Medical Care</h3>

              <p>Keep track of important care.</p>
            </div>
          </div>

          <div className="service-item">
            <FaPaw />

            <div>
              <h3>Grooming</h3>

              <p>Keep your pets happy and healthy.</p>
            </div>
          </div>

          <div className="service-item">
            <FaHome />

            <div>
              <h3>Boarding</h3>

              <p>Reliable care when you are away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="history-cta">
        <div className="cta-paw">
          <FaPaw />
        </div>

        <h2>Every pet deserves the best care.</h2>

        <p>Welcome to PawCare — where better pet care starts with you.</p>
      </section>
    </div>
  );
};

export default History;
