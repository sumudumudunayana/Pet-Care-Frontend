import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaw,
  FaPaperPlane,
} from "react-icons/fa";

import "../../styles/customer/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting PawCare! We will get back to you soon.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="hero-paw">
            <FaPaw />
          </div>

          <h1>
            Contact <span>PawCare</span>
          </h1>

          <p>
            We're here to help you and your furry friends. Have a question,
            suggestion, or need assistance? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="contact-info-card">
          <div className="contact-icon">
            <FaPhone />
          </div>

          <h3>Call Us</h3>

          <p>+94 11 234 5678</p>
          <p>+94 77 123 4567</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-icon">
            <FaEnvelope />
          </div>

          <h3>Email Us</h3>

          <p>support@pawcare.com</p>
          <p>info@pawcare.com</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-icon">
            <FaMapMarkerAlt />
          </div>

          <h3>Visit Us</h3>

          <p>123 Pet Care Avenue</p>
          <p>Colombo, Sri Lanka</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-icon">
            <FaClock />
          </div>

          <h3>Working Hours</h3>

          <p>Monday - Friday</p>
          <p>8:00 AM - 6:00 PM</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main">
        {/* Left Side */}
        <div className="contact-about">
          <div className="section-label">
            <FaPaw />
            <span>GET IN TOUCH</span>
          </div>

          <h2>
            We'd Love To
            <span> Hear From You</span>
          </h2>

          <p>
            Whether you have a question about our products, need help with your
            account, or simply want to share your feedback, the PawCare team is
            always ready to help.
          </p>

          <p>
            Your pets deserve the best care, and we're here to make managing
            their needs easier and more convenient.
          </p>

          <div className="contact-highlight">
            <div className="highlight-icon">
              <FaPaw />
            </div>

            <div>
              <h4>Pet Care With Love</h4>

              <p>
                Everything we do is focused on making life better for you and
                your beloved pets.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>

          <p>Fill out the form below and our team will get back to you.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="What can we help you with?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Message</label>

              <textarea
                name="message"
                placeholder="Write your message here..."
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="send-message-btn">
              <span>Send Message</span>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="contact-bottom">
        <div className="bottom-paw">
          <FaPaw />
        </div>

        <h2>We're Here For You & Your Pets</h2>

        <p>
          Your pet's happiness and wellbeing are always at the heart of PawCare.
        </p>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          Contact Us Today
        </button>
      </section>
    </div>
  );
};

export default ContactUs;
