import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  return (
    <nav>
      <div className="logo" onClick={() => navigate("/")}>Skaylo</div>
      {user ? (
        <ProfileDropdown user={user} />
      ) : (
        <button onClick={() => navigate("/login")}>Sign In</button>
      )}
    </nav>
  );
}

export default Navbar;
