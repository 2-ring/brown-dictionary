import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { Home } from './pages/home';
import { WordDetail } from './pages/word-detail';
import { Browse } from './pages/browse';
import { SearchResults } from './pages/search-results';
import { AddDefinition } from './pages/add-definition';
import Auth from './pages/auth';
import { AuthProvider, useAuth } from './contexts/auth-context';
import ProtectedRoute from './components/auth/protected-route';
import { Toaster } from 'sonner';
import { Spinner } from './components/common/spinner';

function AuthenticatedApp() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<AuthRedirect />} />
          <Route path="/signup" element={<AuthRedirect />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/word/:slug" element={<ProtectedRoute><WordDetail /></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/browse/:letter" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddDefinition /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
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
