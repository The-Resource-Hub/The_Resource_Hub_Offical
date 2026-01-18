
import React, { useState, Suspense, lazy, memo, useEffect, useCallback } from 'react'; 
import Navbar from './components/layout/Navbar.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import Footer from './components/layout/Footer.tsx';
import ComponentLoader from './components/ui/ComponentLoader.tsx';
import StorePage from './features/store/StorePage.tsx'; 
import { Product } from './types/index.ts';

// Remaining features lazy loaded with explicit extensions
const ProductDetailsPage = lazy(() => import('./features/store/ProductDetailsPage.tsx'));
const WalletPage = lazy(() => import('./features/wallet/WalletPage.tsx'));       
const OrdersPage = lazy(() => import('./features/orders/OrdersPage.tsx'));       
const ReferralPage = lazy(() => import('./features/refferal/ReferralPage.tsx')); 
const ShortlinkPage = lazy(() => import('./features/shortlink/ShortlinkPage.tsx'));
const ShortlinkStorePage = lazy(() => import('./features/shortlink/ShortlinkStorePage.tsx'));
const ShreeGenPage = lazy(() => import('./features/ai/ShreeGenPage.tsx'));
const AdminLoginPage = lazy(() => import('./features/admin/AdminLoginPage.tsx'));
const AdminDashboardPage = lazy(() => import('./features/admin/AdminDashboardPage.tsx'));
const PremiumPage = lazy(() => import('./features/primium/PremiumPage.tsx'));
const GamingPage = lazy(() => import('./features/gaming/GamingPage.tsx'));
const ShreeGenApiPage = lazy(() => import('./features/api/ShreeGenAiPage.tsx'));
const ShreeGenApiGuidePage = lazy(() => import('./features/api/ShreeGenApiGuidePage.tsx'));
const SupportPage = lazy(() => import('./features/support/SupportPage.tsx'));
const AuthPage = lazy(() => import('./features/auth/AuthPage.tsx'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    (window as any).dispatchView = (view: string) => setCurrentView(view);
    const adminToken = sessionStorage.getItem('admin_session_token');
    if (adminToken === 'active_session') {
      setIsAdminAuth(true);
    }
    const userToken = localStorage.getItem('user_session');
    if (userToken) setUserAuth(true);
  }, []);

  const handleUserAuthSuccess = useCallback(() => {
    localStorage.setItem('user_session', 'active');
    setUserAuth(true);
    setCurrentView('home');
  }, []);

  const handleAdminLogin = useCallback(() => {
    sessionStorage.setItem('admin_session_token', 'active_session');
    setIsAdminAuth(true);
    setShowAdminLogin(false);
    setCurrentView('admin-dashboard');
  }, []);

  const handleAdminLogout = useCallback(() => {
    sessionStorage.removeItem('admin_session_token');
    setIsAdminAuth(false);
    setCurrentView('home');
  }, []);

  const navigateToProduct = useCallback((product: Product) => {
    setActiveProduct(product);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <StorePage onAdminTrigger={() => setShowAdminLogin(true)} onViewProduct={navigateToProduct} onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'product-details':
        return activeProduct ? <ProductDetailsPage product={activeProduct} onBack={() => setCurrentView('home')} /> : <StorePage onAdminTrigger={() => setShowAdminLogin(true)} onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'wallet':
        return <WalletPage balance={balance} />;
      case 'orders':
        return <OrdersPage />;
      case 'referral':
        return <ReferralPage />;
      case 'shortlink':
        return <ShortlinkPage balance={balance} updateBalance={setBalance} onWalletClick={() => setCurrentView('wallet')} onViewRewards={() => setCurrentView('shortlink-store')} />;
      case 'shortlink-store':
        return <ShortlinkStorePage balance={balance} updateBalance={setBalance} onBack={() => setCurrentView('shortlink')} onWalletClick={() => setCurrentView('wallet')} />;
      case 'shree-gen':
        return <ShreeGenPage onBack={() => setCurrentView('home')} />;
      case 'premium':
        return <PremiumPage onBack={() => setCurrentView('home')} />;
      case 'gaming':
        return <GamingPage balance={balance} onBack={() => setCurrentView('home')} onMenuClick={() => setIsSidebarOpen(true)} onWalletClick={() => setCurrentView('wallet')} />;
      case 'support':
        return <SupportPage onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'auth':
        return <AuthPage onBack={() => setCurrentView('home')} onSuccess={handleUserAuthSuccess} />;
      case 'shree-gen-api':
        return <ShreeGenApiPage onBack={() => setCurrentView('home')} onMenuClick={() => setIsSidebarOpen(true)} onGuideClick={() => setCurrentView('shree-gen-api-guide')} />;
      case 'shree-gen-api-guide':
        return <ShreeGenApiGuidePage onBack={() => setCurrentView('shree-gen-api')} />;
      case 'admin-dashboard':
        return isAdminAuth ? <AdminDashboardPage onLogout={handleAdminLogout} /> : <AdminLoginPage onLoginSuccess={handleAdminLogin} onClose={() => setCurrentView('home')} />;
      default:
        return <StorePage onAdminTrigger={() => setShowAdminLogin(true)} onMenuClick={() => setIsSidebarOpen(true)} onViewProduct={navigateToProduct} />;
    }
  };

  const isFullPage = ['admin-dashboard', 'shree-gen', 'premium', 'gaming', 'product-details', 'shree-gen-api', 'shree-gen-api-guide', 'support', 'auth'].includes(currentView);

  return (
    <div className="min-h-screen flex flex-col bg-[#020202]">
      {!isFullPage && <Navbar onMenuClick={() => setIsSidebarOpen(true)} />}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={(view) => setCurrentView(view)}
      />

      <main className={`flex-1 ${!isFullPage ? 'max-w-7xl mx-auto px-4 w-full' : ''}`}>
        <Suspense fallback={<ComponentLoader message="Initializing Core..." />}>
          {renderContent()}
        </Suspense>
      </main>

      {!isFullPage && <Footer />}

      {showAdminLogin && (
        <Suspense fallback={null}>
          <AdminLoginPage onLoginSuccess={handleAdminLogin} onClose={() => setShowAdminLogin(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
