import React, { useState, useEffect } from 'react';
import UndertaleStartScreen from './components/UndertaleStartScreen';
import Navbar from './components/Navbar';
import MainEsportsHero from './components/MainEsportsHero';
import GameCards from './components/GameCards';
import ParticipantsSection from './components/ParticipantsSection';
import ComingSoonPage from './components/ComingSoonPage';
import LoadingTransition from './components/LoadingTransition';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import AdminPanel from './components/AdminPanel';
import PaymentPage from './components/PaymentPage';
import PendingPaymentBanner from './components/PendingPaymentBanner';
import { getRegistrationById } from './lib/storage';

function App() {
  // Helper to extract Payment UUID from pathname (/pago/:id) or query params
  const getPaymentIdFromLocation = () => {
    try {
      const path = window.location.pathname;
      if (path.includes('/pago/')) {
        const parts = path.split('/pago/');
        const id = parts[1]?.split('/')[0]?.split('?')[0];
        if (id) return id;
      }
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'pago') {
        return params.get('id') || '';
      }
      if (params.get('pago')) {
        return params.get('pago') || '';
      }
      return '';
    } catch {
      return '';
    }
  };

  const initialPaymentId = getPaymentIdFromLocation();

  // Check if admin panel was requested in URL (/admin, ?page=admin, ?admin=true, #/admin)
  const initialIsAdmin = (() => {
    try {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/') || path.includes('admin')) return true;
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'admin' || params.has('admin')) return true;
      if (window.location.hash.toLowerCase().includes('admin')) return true;
      return false;
    } catch {
      return false;
    }
  })();

  // Determine initial page from URL (?page=brackets, cronograma, participantes, pago or /pago/:id or /admin)
  const initialPage = (() => {
    try {
      if (initialIsAdmin) return 'admin';
      if (initialPaymentId) return 'pago';
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      if (['brackets', 'cronograma', 'participantes', 'pago', 'admin'].includes(page)) {
        return page;
      }
      return 'inicio';
    } catch {
      return 'inicio';
    }
  })();

  // Saved gamer tag in local storage
  const [playerName, setPlayerName] = useState(() => {
    try {
      return localStorage.getItem('compu_league_gamertag') || '';
    } catch {
      return '';
    }
  });

  // State: Has the player entered the portal?
  // Direct subpage links, payment links, and admin skip the Undertale start screen
  const [hasEnteredGame, setHasEnteredGame] = useState(() => {
    return initialPage !== 'inicio' || Boolean(initialPaymentId) || initialIsAdmin;
  });

  // Active view and navigation state
  const [currentView, setCurrentView] = useState(initialPage);
  const [activeSection, setActiveSection] = useState(initialPage);
  const [activePaymentId, setActivePaymentId] = useState(initialPaymentId);

  // Loading transition state (retro Undertale "cargando..." screen)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetView, setTargetView] = useState(null);

  // Modal dialog states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedGameForModal, setSelectedGameForModal] = useState('valorant');
  const [editingRegistration, setEditingRegistration] = useState(null);

  // Pending Payment on this device state
  const [pendingPayment, setPendingPayment] = useState(null);
  const [isPendingPaymentDismissed, setIsPendingPaymentDismissed] = useState(false);

  // Check if there is an unpaid registration on this device
  useEffect(() => {
    let isMounted = true;
    const checkPendingPayment = async () => {
      if (currentView === 'pago') return;

      try {
        const saved = localStorage.getItem('compu_league_pending_payment');
        if (!saved) return;
        const parsed = JSON.parse(saved);
        if (!parsed || !parsed.id) return;

        // Verify status from database or local storage
        const reg = await getRegistrationById(parsed.id);
        if (reg) {
          if (reg.payment_status === 'paid' || reg.status === 'approved') {
            // Already paid, clear reminder
            localStorage.removeItem('compu_league_pending_payment');
            if (isMounted) setPendingPayment(null);
            return;
          }
          if (isMounted) {
            setPendingPayment({ ...parsed, ...reg });
          }
        } else {
          if (isMounted) setPendingPayment(parsed);
        }
      } catch (err) {
        console.warn('Error checking pending payment on device:', err);
      }
    };

    checkPendingPayment();
    return () => { isMounted = false; };
  }, [currentView]);

  // Handle browser back and forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.toLowerCase();
        if (path === '/admin' || path.startsWith('/admin/') || path.includes('admin')) {
          setCurrentView('admin');
          return;
        }
        const payId = getPaymentIdFromLocation();
        if (payId) {
          setActivePaymentId(payId);
          setCurrentView('pago');
          setActiveSection('pago');
          return;
        }
        const params = new URLSearchParams(window.location.search);
        if (params.get('page') === 'admin' || params.has('admin')) {
          setCurrentView('admin');
          return;
        }
        const page = params.get('page') || 'inicio';
        setCurrentView(page);
        setActiveSection(page);
      } catch {
        setCurrentView('inicio');
        setActiveSection('inicio');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Instant in-tab navigation with smooth CSS fade-in
  const navigateTo = (target) => {
    if (target === 'juegos') {
      if (currentView === 'inicio') {
        const el = document.getElementById('juegos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection('juegos');
      } else {
        setCurrentView('inicio');
        setActiveSection('juegos');
        window.history.pushState({}, '', '/');
        setTimeout(() => {
          const el = document.getElementById('juegos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
      return;
    }

    if (currentView === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(target);
    setActiveSection(target);
    const url = target === 'inicio' ? '/' : `?page=${target}`;
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToPayment = (id) => {
    setActivePaymentId(id);
    setCurrentView('pago');
    setActiveSection('pago');
    window.history.pushState({}, '', `/pago/${id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleContinuePendingPayment = (id) => {
    setPendingPayment(null);
    setHasEnteredGame(true);
    navigateToPayment(id);
  };

  const handleDismissPendingPayment = () => {
    setIsPendingPaymentDismissed(true);
  };

  const handleEditPendingPayment = async (pending) => {
    try {
      const fullRecord = await getRegistrationById(pending.id);
      const recordToEdit = fullRecord || pending;
      setEditingRegistration(recordToEdit);
      setSelectedGameForModal(recordToEdit.game || 'valorant');
    } catch {
      setEditingRegistration(pending);
      setSelectedGameForModal(pending.game || 'valorant');
    }
    setHasEnteredGame(true);
    setIsRegisterOpen(true);
  };

  const handleEditRegistration = (record) => {
    setEditingRegistration(record);
    setSelectedGameForModal(record.game || 'valorant');
    setIsRegisterOpen(true);
  };

  const handleRegistrationUpdated = (updatedRecord) => {
    if (pendingPayment && String(pendingPayment.id).toLowerCase() === String(updatedRecord.id).toLowerCase()) {
      setPendingPayment({ ...pendingPayment, ...updatedRecord });
    }
  };

  const handleLoadingComplete = () => {
    const next = targetView;
    setIsTransitioning(false);
    setTargetView(null);

    if (next === 'juegos') {
      setCurrentView('inicio');
      setActiveSection('juegos');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const el = document.getElementById('juegos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setCurrentView(next);
      setActiveSection(next);
      const url = next === 'inicio' ? '/' : `?page=${next}`;
      window.history.pushState({}, '', url);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Triggered when clicking [ JUGAR ] from the Undertale screen
  const handleEnterGame = (name) => {
    setPlayerName(name);
    setHasEnteredGame(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (gameId = 'valorant') => {
    setEditingRegistration(null);
    setSelectedGameForModal(gameId);
    setIsRegisterOpen(true);
  };

  const handleSelectGame = (gameId) => {
    setEditingRegistration(null);
    setSelectedGameForModal(gameId);
    setIsRegisterOpen(true);
  };

  const handleScrollToGameSlot = (gameId) => {
    const scrollToTarget = () => {
      const target = document.getElementById(`game-${gameId}`) || document.getElementById(`reglas-${gameId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('ring-4', 'ring-[#FFE600]');
        const rules = document.getElementById(`reglas-${gameId}`);
        if (rules) rules.classList.add('bg-white/10');
        setTimeout(() => {
          target.classList.remove('ring-4', 'ring-[#FFE600]');
          if (rules) rules.classList.remove('bg-white/10');
        }, 1800);
      } else {
        const el = document.getElementById('juegos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (currentView !== 'inicio') {
      setCurrentView('inicio');
      setActiveSection('juegos');
      window.history.pushState({}, '', '/');
      setTimeout(scrollToTarget, 100);
    } else {
      scrollToTarget();
    }
  };

  // =============================================================
  // SCREEN 0: STANDALONE ADMIN PAGE (NO PUBLIC ACCESS, DIRECT LINK ONLY)
  // =============================================================
  if (currentView === 'admin') {
    return (
      <AdminPanel
        isStandalone={true}
        isOpen={true}
        onGoHome={() => {
          setCurrentView('inicio');
          setActiveSection('inicio');
          window.history.pushState({}, '', '/');
        }}
      />
    );
  }

  // =============================================================
  // SCREEN 1: PURE UNDERTALE TITLE & NAME SCREEN (CERO SCROLL)
  // =============================================================
  if (!hasEnteredGame) {
    return (
      <>
        <UndertaleStartScreen 
          onEnterGame={handleEnterGame} 
          initialName={playerName} 
        />
        {!isPendingPaymentDismissed && pendingPayment && (
          <PendingPaymentBanner
            pendingPayment={pendingPayment}
            onContinue={handleContinuePendingPayment}
            onDismiss={handleDismissPendingPayment}
            onEdit={handleEditPendingPayment}
          />
        )}
      </>
    );
  }

  // =============================================================
  // SCREEN 2: "LA PÁGINA REAL" (PORTAL COMPLETO DE E-SPORTS CARRERA DE COMPUTACIÓN)
  // =============================================================
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans w-full max-w-full overflow-x-hidden">
      
      {/* Real Page Sticky Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister('valorant')}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        playerName={playerName}
        onReturnToMenu={() => setHasEnteredGame(false)}
        onNavigate={navigateTo}
      />

      {/* Main Real Page Active View */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
        
        {/* VIEW 1: HOME (Hero + Game Disciplines) */}
        {currentView === 'inicio' && (
          <div className="animate-fadeIn">
            <div id="inicio">
              <MainEsportsHero
                playerName={playerName}
                onOpenRegister={handleOpenRegister}
                onSelectGame={handleSelectGame}
                onSelectGameSlot={handleScrollToGameSlot}
                onScrollToBrackets={() => navigateTo('brackets')}
                onScrollToGames={() => navigateTo('juegos')}
              />
            </div>
            <div id="juegos">
              <GameCards onSelectGame={handleSelectGame} />
            </div>
          </div>
        )}

        {/* VIEW 2: PARTICIPANTES (Dedicated Real-Time Roster Page) */}
        {currentView === 'participantes' && (
          <div className="animate-fadeIn">
            <ParticipantsSection onOpenRegister={handleOpenRegister} />
          </div>
        )}

        {/* VIEW 3: BRACKETS (Coming Soon Page) */}
        {currentView === 'brackets' && (
          <div className="animate-fadeIn">
            <ComingSoonPage 
              type="brackets" 
              hideHeader 
              hideFooter 
              onGoHome={() => navigateTo('inicio')} 
            />
          </div>
        )}

        {/* VIEW 4: CRONOGRAMA (Coming Soon Page) */}
        {currentView === 'cronograma' && (
          <div className="animate-fadeIn">
            <ComingSoonPage 
              type="cronograma" 
              hideHeader 
              hideFooter 
              onGoHome={() => navigateTo('inicio')} 
            />
          </div>
        )}

        {/* VIEW 5: PAGO DIRECTO CON ENLACE MÁGICO (UUID) */}
        {currentView === 'pago' && (
          <div className="animate-fadeIn">
            <PaymentPage 
              paymentId={activePaymentId} 
              onGoHome={() => {
                setActivePaymentId('');
                navigateTo('inicio');
              }}
              onEdit={handleEditRegistration}
            />
          </div>
        )}

      </main>

      {/* Real Page Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister('valorant')}
      />

      {/* Official Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setEditingRegistration(null);
        }}
        preselectedGame={selectedGameForModal}
        initialGamerTag=""
        onNavigateToPayment={navigateToPayment}
        editingRegistration={editingRegistration}
        onRegistrationUpdated={handleRegistrationUpdated}
      />

      {/* Retro Undertale-style Loading Screen on Page Transitions */}
      {isTransitioning && (
        <LoadingTransition 
          targetPage={targetView} 
          onComplete={handleLoadingComplete} 
        />
      )}

      {/* Pending Payment Reminder Banner for returning users */}
      {!isPendingPaymentDismissed && pendingPayment && currentView !== 'pago' && (
        <PendingPaymentBanner
          pendingPayment={pendingPayment}
          onContinue={handleContinuePendingPayment}
          onDismiss={handleDismissPendingPayment}
          onEdit={handleEditPendingPayment}
        />
      )}

    </div>
  );
}

export default App;
