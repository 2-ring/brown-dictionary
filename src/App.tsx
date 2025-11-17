import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { Home } from './pages/home';
import { WordDetail } from './pages/word-detail';
import { Browse } from './pages/browse';
import { SearchResults } from './pages/search-results';
import Auth from './pages/auth';
import Settings from './pages/settings';
import Profile from './pages/profile';
import { AuthProvider, useAuth } from './contexts/auth-context';
import ProtectedRoute from './components/auth/protected-route';
import { Toaster } from 'sonner';
import { Spinner } from './components/common/spinner';

function AuthenticatedApp() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isSettingsPage = location.pathname === '/settings';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && !isSettingsPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<AuthRedirect />} />
          <Route path="/signup" element={<AuthRedirect />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/word/:slug" element={<ProtectedRoute><WordDetail /></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/browse/:letter" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isAuthPage && !isSettingsPage && <Footer />}
    </div>
  );
}

function AuthRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Auth />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthenticatedApp />
        <Toaster position="bottom-right" expand={true} richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
