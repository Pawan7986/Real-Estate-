import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.sm\\:hidden')
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto py-2 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-xl sm:text-2xl text-white">
          <span className="text-amber-500">HOM</span>
          <span className="text-white">ELAND</span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-1/2 sm:w-1/3 lg:w-1/4 bg-gray-100 px-2 py-1 rounded-md shadow-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 text-amber-500 hover:text-amber-600 text-sm"
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex gap-4 items-center text-white text-sm sm:text-base">
          <Link to="/" className="hover:text-amber-500 transition">Home</Link>
          <Link to="/about" className="hover:text-amber-500 transition">About</Link>
          <Link to="/profile" className="flex items-center gap-1">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover border-2 border-white"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="hover:text-amber-500 transition">Sign in</span>
            )}
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu sm:hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 absolute w-full top-full left-0 shadow-md z-40">
          <ul className="flex flex-col gap-4 items-center">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <li className="hover:text-amber-500">Home</li>
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <li className="hover:text-amber-500">About</li>
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              {currentUser ? (
                <img
                  className="rounded-full h-8 w-8 object-cover border-2 border-white"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="hover:text-amber-500">Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
