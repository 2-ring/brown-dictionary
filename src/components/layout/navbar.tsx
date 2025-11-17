import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../common/search-bar';
import { DropdownMenu } from './dropdown-menu';
import { AddDefinitionModal } from '../common/add-definition-modal';
import { useAuth } from '../../contexts/auth-context';
import { toast } from 'sonner';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <>
      <nav className="bg-navbar border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="text-2xl font-bold leading-none flex flex-col justify-center">
              <span className="text-text">ur<span className="text-primary">ban</span></span>
              <div className="text-[9px] text-primary tracking-widest -mt-0.5">DICTIONARY</div>
            </div>
          </Link>

          <SearchBar />

          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <span className="text-sm text-gray-600">
                  {user.displayName || user.email}
                </span>
              </div>
            )}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {user && (
              <button
                onClick={handleSignOut}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-full text-sm font-medium transition-colors"
                title="Sign out"
              >
                Sign Out
              </button>
            )}

            <button
              onClick={toggleMenu}
              className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <DropdownMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AddDefinitionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
};
