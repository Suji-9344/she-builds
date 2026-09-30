import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">Movie Explorer</Link>
      <span className="nav-text">Search • Explore • Discover</span>
    </header>
  );
}

export default Navbar;