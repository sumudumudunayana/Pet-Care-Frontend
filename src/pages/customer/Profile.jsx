import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
  FaEdit,
  FaPaw,
} from "react-icons/fa";

import userService from "../../services/userService";

import "../../styles/customer/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();

        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);

        setError("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <FaPaw />
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* ================= PROFILE HEADER ================= */}

      <section className="profile-header">
        <div className="profile-avatar">
          <FaUser />
        </div>

        <div className="profile-header-info">
          <span>MY PROFILE</span>

          <h1>{profile.fullName}</h1>

          <p>Manage your PawCare account information.</p>
        </div>
      </section>

      {/* ================= PROFILE CONTENT ================= */}

      <section className="profile-content">
        <div className="profile-card">
          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>

              <p>Your account information</p>
            </div>

            <button className="profile-edit-btn">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          <div className="profile-fields">
            {/* FULL NAME */}

            <div className="profile-field">
              <div className="profile-field-icon">
                <FaUser />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{profile.fullName}</strong>
              </div>
            </div>

            {/* EMAIL */}

            <div className="profile-field">
              <div className="profile-field-icon">
                <FaEnvelope />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{profile.email}</strong>
              </div>
            </div>

            {/* PHONE */}

            <div className="profile-field">
              <div className="profile-field-icon">
                <FaPhone />
              </div>

              <div>
                <span>Phone Number</span>
                <strong>{profile.phone || "Not provided"}</strong>
              </div>
            </div>

            {/* ADDRESS */}

            <div className="profile-field">
              <div className="profile-field-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>Address</span>
                <strong>{profile.address || "Not provided"}</strong>
              </div>
            </div>

            {/* ROLE */}

            <div className="profile-field">
              <div className="profile-field-icon">
                <FaUserShield />
              </div>

              <div>
                <span>Account Type</span>
                <strong>{profile.role}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAWCARE CARD ================= */}

        <div className="profile-pawcare-card">
          <div className="profile-paw-icon">
            <FaPaw />
          </div>

          <h2>Welcome to PawCare!</h2>

          <p>We're here to help you take better care of your beloved pets.</p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
