import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { toast } from 'sonner';

export default function Auth() {
  const location = useLocation();
  const isSignup = location.pathname === '/signup';

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        await signUp(emailOrUsername, password, displayName);
      } else {
        await signIn(emailOrUsername, password);
      }
      navigate('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      const errorMessage = error.code
        ? error.code.replace('auth/', '').replace(/-/g, ' ')
        : isSignup ? 'Failed to create account' : 'Authentication failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative" style={{ backgroundColor: '#134FE6' }}>
      {/* Header */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2">
        <h1 className="text-white text-xl sm:text-2xl font-bold border-b-2 sm:border-b-4 border-white pb-1">
          {isSignup ? 'SIGN UP' : 'SIGN IN'}
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md bg-white p-6 sm:p-12 mt-12 sm:mt-0">
        {/* Cute face */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-black">(づ ◕‿◕ )づ</div>
          <p className="text-gray-800 text-sm sm:text-base font-serif">
            {isSignup
              ? 'Create an account to vote and post new definitions'
              : 'Please sign in to vote and post new definitions'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          {/* Display Name field - only for signup */}
          {isSignup && (
            <div>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-500 text-white placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-gray-400 text-center font-serif text-sm sm:text-base shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
                required
                placeholder="Display Name"
              />
            </div>
          )}

          {/* Email or Username field */}
          <div>
            <input
              id="email"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-500 text-white placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-gray-400 text-center font-serif text-sm sm:text-base shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
              required
              placeholder={isSignup ? 'Email' : 'Email or Username'}
            />
          </div>

          {/* Password field */}
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-500 text-white placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-gray-400 text-center font-serif text-sm sm:text-base shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
              required
              placeholder="Password"
              minLength={6}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-serif transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
          >
            {loading
              ? (isSignup ? 'Creating account...' : 'Signing in...')
              : (isSignup ? 'Create Account' : 'Sign in')
            }
          </button>
        </form>
      </div>

      {/* Toggle link - outside white box at bottom */}
      <div className="absolute bottom-4 sm:bottom-8 text-center px-4">
        <p className="text-white text-sm sm:text-base">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
        </p>
        <a
          href={isSignup ? '/login' : '/signup'}
          className="text-white text-sm sm:text-base hover:underline font-medium"
        >
          {isSignup ? 'Sign in now >' : 'Create one now >'}
        </a>
      </div>
    </div>
  );
}
