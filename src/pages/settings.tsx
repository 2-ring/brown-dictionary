import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative" style={{ backgroundColor: '#134FE6' }}>
      {/* Close button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white/10 transition-colors flex items-center justify-center"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2">
        <h1 className="text-white text-xl sm:text-2xl font-bold border-b-2 sm:border-b-4 border-white pb-1">
          HELLO
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md bg-white p-6 sm:p-12 mt-12 sm:mt-0">
        <div className="space-y-4">
          {/* Change handle */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.info('Change handle functionality coming soon');
            }}
            className="block text-blue-600 hover:underline text-base sm:text-lg"
          >
            Click here to change your handle
          </a>

          {/* See definitions */}
          <div className="text-gray-800 text-base sm:text-lg">
            See all of your{' '}
            <button
              onClick={() => {
                const username = user?.displayName || user?.email?.split('@')[0] || 'user';
                navigate(`/profile/${username}`);
              }}
              className="text-blue-600 hover:underline"
            >
              definitions
            </button>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="text-blue-600 hover:underline text-base sm:text-lg text-left"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
