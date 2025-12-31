import { useState, useRef, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // profile icon

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await user.delete();
        navigate("/");
      } catch (err) {
        alert("Re-login required to delete account.");
      }
    }
  };

  return (
    <div className="profile-dropdown-wrapper" ref={dropdownRef}>
      <FaUserCircle
        size={28}
        className="profile-icon"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="profile-dropdown">
          <div className="profile-email">{user.email}</div>
          <button className="dropdown-btn logout" onClick={handleLogout}>
            Logout
          </button>
          <button className="dropdown-btn delete" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}
