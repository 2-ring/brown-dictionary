import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-64 bg-ud-navy border-l border-ud-border z-50 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-ud-text-muted hover:text-ud-text"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="mt-12 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              Home
            </Link>

            <Link
              to="/add"
              onClick={onClose}
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              Add a Definition
            </Link>

            <a
              href="#"
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              UrbanDictionary.store
            </a>

            <a
              href="#"
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              Blog
            </a>

            <a
              href="#"
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              World
            </a>

            <a
              href="#"
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              Advertise
            </a>

            <div className="border-t border-ud-border my-4" />

            <a
              href="#"
              className="block px-4 py-3 text-ud-text hover:bg-ud-navy-light rounded transition-colors"
            >
              User Settings
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};
