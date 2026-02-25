import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        
        <span className="logo-chain">Honora</span>
      </Link>
      <div className="nav-right">
        <div className="nav-status">
          <span className="status-dot" />
          <span>System Online</span>
        </div>
        {user && (
          <>
            <span className="nav-user">⊙ {user.username} · {user.role}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
