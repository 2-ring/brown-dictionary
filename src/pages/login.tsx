import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Signed in successfully!');
      navigate('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      const errorMessage = error.code
        ? error.code.replace('auth/', '').replace(/-/g, ' ')
        : 'Authentication failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative" style={{ backgroundColor: '#134FE6' }}>
      {/* Sign In Header */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2">
        <h1 className="text-white text-xl sm:text-2xl font-bold border-b-2 sm:border-b-4 border-white pb-1">SIGN IN</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md bg-white p-6 sm:p-12 mt-12 sm:mt-0">
        {/* Cute face */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-black">(づ ◕‿◕ )づ</div>
          <p className="text-gray-800 text-sm sm:text-base font-serif">
            Please sign in to vote and post new definitions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          {/* Username field styled like Facebook button */}
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white placeholder-white/90 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center font-medium text-sm sm:text-base"
              required
              placeholder="Username"
            />
          </div>

          {/* Password field styled like Gmail button */}
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white placeholder-white/90 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center font-medium text-sm sm:text-base"
              required
              placeholder="Password"
              minLength={6}
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>

      {/* Create account link - outside white box at bottom */}
      <div className="absolute bottom-4 sm:bottom-8 text-center px-4">
        <p className="text-white text-sm sm:text-base">
          Don't have an account?
        </p>
        <a href="#" className="text-white text-sm sm:text-base hover:underline font-medium">
          Create one now &gt;
        </a>
      </div>
    </div>
  );
}
