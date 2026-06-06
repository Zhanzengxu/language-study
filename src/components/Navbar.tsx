import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/hooks/useStore';
import { BookOpen, Home, MessageCircle, Trophy, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LinguaLearn</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
              <BookOpen className="h-4 w-4 mr-1" /> Courses
            </Link>
            <Link to="/progress" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
              <Trophy className="h-4 w-4 mr-1" /> Progress
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" /> Community
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  <User className="h-4 w-4 inline mr-1" /> {user?.username || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Home</Link>
            <Link to="/courses" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Courses</Link>
            <Link to="/progress" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Progress</Link>
            <Link to="/community" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Community</Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/auth/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Login</Link>
                <Link to="/auth/register" className="block px-3 py-2 text-blue-600 hover:bg-gray-50">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
