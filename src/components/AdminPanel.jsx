import React, { useState, useEffect } from 'react';
import { 
  X, Lock, CheckCircle, XCircle, Eye, Phone, Copy, Check, 
  Users, DollarSign, Database, Trophy, AlertCircle, Search 
} from 'lucide-react';
import { 
  getRegistrations, 
  updateRegistrationStatus, 
  getValorantMatches, 
  updateValorantMatch,
  getClashMatches,
  updateClashMatch,
  getBattleRoyaleStandings,
  saveBattleRoyaleStandings,
  getSchedule,
  getSupabaseCredentials,
  saveSupabaseCredentials
} from '../lib/storage';
import { GAMES } from '../data/tournamentData';

export default function AdminPanel({ isOpen = true, onClose, isStandalone = false, onGoHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('compu_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Sub-tab
  const [activeAdminTab, setActiveAdminTab] = useState('registrations'); // 'registrations', 'free_agents', 'brackets', 'schedule', 'supabase'

  // Data states
  const [registrations, setRegistrations] = useState([]);
  const [filterGame, setFilterGame] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [copiedPhones, setCopiedPhones] = useState(false);

  // Brackets states
  const [valorantMatches, setValorantMatches] = useState([]);
  const [clashMatches, setClashMatches] = useState([]);
  const [brStandings, setBrStandings] = useState({ free_fire_escuadras: [], free_fire_solitario: [], fortnite_duos: [] });

  // Supabase Config state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [supabaseSaved, setSupabaseSaved] = useState(false);

  const loadAllData = async () => {
    const regs = await getRegistrations();
    setRegistrations(regs);
    setValorantMatches(getValorantMatches());
    setClashMatches(getClashMatches());
    setBrStandings(getBattleRoyaleStandings());

    const creds = getSupabaseCredentials();
    setSupabaseUrl(creds.url);
    setSupabaseAnonKey(creds.anonKey);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(passwordInput.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Hash criptográfico SHA-256 de la nueva contraseña segura (no almacena texto plano)
      if (
        hashHex === '3514e4509fa0bb3161fe1833aed6966cae355a016144ba3251a0078ed8f233be'
      ) {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('compu_admin_authenticated', 'true');
        } catch {}
        setAuthError('');
      } else {
        setAuthError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch {
      setAuthError('Error de verificación. Inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('compu_admin_authenticated');
    } catch {}
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleStatusChange = async (id, newStatus) => {
    let notes = '';
    if (newStatus === 'rejected') {
      notes = prompt('Ingresa el motivo del rechazo (ej. Comprobante ilegible, valor no coincide):') || 'Comprobante no válido';
    } else if (newStatus === 'approved') {
      notes = 'Comprobante de Banco Pichincha validado por el staff.';
    }

    const updated = await updateRegistrationStatus(id, newStatus, notes);
    setRegistrations(updated);
  };

  // Copy all approved WhatsApp numbers to clipboard for creating WhatsApp Groups
  const handleCopyAllPhones = () => {
    const phones = registrations
      .filter(r => r.status === 'approved')
      .map(r => r.captain_whatsapp)
      .filter(Boolean);

    // Also include member phones
    registrations.filter(r => r.status === 'approved').forEach(r => {
      if (Array.isArray(r.members)) {
        r.members.forEach(m => {
          if (m.whatsapp) phones.push(m.whatsapp);
        });
      }
    });

    const unique = [...new Set(phones)].join(', ');
    navigator.clipboard.writeText(unique);
    setCopiedPhones(true);
    setTimeout(() => setCopiedPhones(false), 2500);
  };

  // Score match handler for Valorant
  const handleScoreUpdateValorant = (matchId, scoreA, scoreB) => {
    const numA = parseInt(scoreA, 10) || 0;
    const numB = parseInt(scoreB, 10) || 0;
    const match = valorantMatches.find(m => m.id === matchId);
    let winner = null;
    let status = 'completed';

    if (numA > numB) winner = match.teamA;
    else if (numB > numA) winner = match.teamB;
    else status = 'scheduled';

    const updated = updateValorantMatch(matchId, {
      scoreA: numA,
      scoreB: numB,
      winner,
      status,
    });
    setValorantMatches(updated);
  };

  // Score match handler for Clash Royale
  const handleScoreUpdateClash = (matchId, scoreA, scoreB) => {
    const numA = parseInt(scoreA, 10) || 0;
    const numB = parseInt(scoreB, 10) || 0;
    const match = clashMatches.find(m => m.id === matchId);
    let winner = null;
    let status = 'completed';

    if (numA >= 2) winner = match.playerA;
    else if (numB >= 2) winner = match.playerB;
    else status = 'scheduled';

    const updated = updateClashMatch(matchId, {
      scoreA: numA,
      scoreB: numB,
      winner,
      status,
    });
    setClashMatches(updated);
  };

  // Update BR row
  const handleUpdateBRKills = (gameKey, index, newKills, newRank) => {
    const currentList = [...brStandings[gameKey]];
    if (currentList[index]) {
      currentList[index].kills = parseInt(newKills, 10) || 0;
      if (newRank) {
        currentList[index].rank = parseInt(newRank, 10) || 1;
        if (currentList[index].rank === 1) {
          currentList[index].status = '¡Sobreviviente Ganador!';
          currentList[index].isWinner = true;
        } else {
          currentList[index].status = `Eliminado (Top ${currentList[index].rank})`;
          currentList[index].isWinner = false;
        }
      }
    }
    const updated = saveBattleRoyaleStandings(gameKey, currentList);
    setBrStandings(updated);
  };

  // Save Supabase Keys
  const handleSaveSupabase = (e) => {
    e.preventDefault();
    saveSupabaseCredentials(supabaseUrl.trim(), supabaseAnonKey.trim());
    setSupabaseSaved(true);
    setTimeout(() => setSupabaseSaved(false), 3000);
    loadAllData();
  };

  // Calculations
  const totalApproved = registrations.filter(r => r.status === 'approved').length;
  const totalPending = registrations.filter(r => r.status === 'pending' || r.status === 'payment_pending').length;
  const totalRejected = registrations.filter(r => r.status === 'rejected').length;
  const totalActive = registrations.filter(r => r.status !== 'rejected').length;
  const totalRevenue = registrations
    .filter(r => r.status === 'approved')
    .reduce((acc, r) => acc + (parseFloat(r.amount_due) || 0), 0);
  const freeAgentsList = registrations.filter(r => r.is_free_agent && r.status !== 'rejected');

  // Filtered registrations (Oculta rechazados por defecto a menos que se filtre explícitamente por 'rejected')
  const filteredRegs = registrations.filter(r => {
    if (filterGame !== 'all' && r.game !== filterGame) return false;
    if (filterStatus === 'all') {
      if (r.status === 'rejected') return false;
    } else if (filterStatus === 'pending') {
      if (r.status !== 'pending' && r.status !== 'payment_pending') return false;
    } else if (r.status !== filterStatus) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = r.captain_name?.toLowerCase().includes(q);
      const matchTeam = r.team_name?.toLowerCase().includes(q);
      const matchId = r.captain_game_id?.toLowerCase().includes(q);
      const matchPhone = r.captain_whatsapp?.includes(q);
      const matchMembers = r.members?.some(m => 
        m.name?.toLowerCase().includes(q) || 
        (m.game_id || m.gameId)?.toLowerCase().includes(q)
      );
      return matchName || matchTeam || matchId || matchPhone || matchMembers;
    }
    return true;
  });

  if (!isStandalone && !isOpen) return null;

  const headerBar = (
    <div className="px-4 sm:px-6 py-4 bg-[#121929] border-b-2 border-[#223252] flex items-center justify-between shrink-0 flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1D2942] border-2 border-[#FFE600] flex items-center justify-center text-[#FFE600] shadow-[0_0_10px_rgba(255,230,0,0.3)] shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white flex items-center gap-2">
            Panel Staff Admin
            <span className="text-[8px] font-pixel px-1.5 py-0.5 bg-[#FFE600] text-black font-black uppercase">
              Compu League 2026
            </span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans hidden sm:block">
            Gestión de inscripciones, validación de transferencias Banco Pichincha y fixtures.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <>
            <button
              type="button"
              onClick={loadAllData}
              className="px-2.5 py-1.5 bg-[#1B273F] hover:bg-[#28395B] border border-cyan-500/40 text-cyan-300 font-pixel text-[8px] sm:text-[9px] uppercase transition cursor-pointer"
              title="Recargar datos"
            >
              RECARGAR
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-2.5 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-pixel text-[8px] sm:text-[9px] uppercase transition cursor-pointer"
              title="Cerrar sesión"
            >
              CERRAR SESIÓN
            </button>
          </>
        )}

        {isStandalone ? (
          <button
            type="button"
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="px-3 py-1.5 bg-[#FFE600] hover:bg-white text-black font-pixel font-bold text-[8px] sm:text-[9px] uppercase transition cursor-pointer flex items-center gap-1"
          >
            ← IR A LA WEB
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );

  const loginScreen = (
    <div className={isStandalone ? "flex-1 flex items-center justify-center p-4" : "p-8 sm:p-12 max-w-md mx-auto text-center space-y-6"}>
      <div className="w-full max-w-md mx-auto text-center space-y-6 bg-[#121929] border-4 border-black p-6 sm:p-8 shadow-brutal-yellow">
        <div className="w-16 h-16 bg-[#FFE600] text-black border-2 border-black flex items-center justify-center mx-auto shadow-brutal-black">
          <Lock className="w-8 h-8 stroke-[2.5]" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
            ACCESO RESTRINGIDO
          </h4>
          <p className="text-xs text-slate-300 font-sans">
            Área reservada para el Staff de Compu League E-Sports.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {authError && (
            <div className="p-3 bg-rose-950/80 border-2 border-rose-500 text-rose-300 text-xs font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}
          <div>
            <input
              type="password"
              required
              placeholder="Contraseña del staff..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 bg-black border-2 border-white/20 text-white text-center font-mono text-base focus:border-[#FFE600] focus:outline-none placeholder:text-slate-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 font-pixel font-black text-xs uppercase tracking-wider text-black bg-[#FFE600] hover:bg-white transition border-2 border-black shadow-brutal-black cursor-pointer"
          >
            [ INGRESAR AL PANEL ]
          </button>
        </form>

        <div className="pt-2">
          <button
            type="button"
            onClick={onGoHome || onClose || (() => { window.location.href = '/'; })}
            className="text-slate-400 hover:text-[#FFE600] text-[9px] font-pixel underline uppercase cursor-pointer transition"
          >
            ← Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );

  const dashboardContent = (
    <div className={isStandalone ? "flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 overflow-y-auto" : "flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"}>
            
            {/* Quick Metrics Bar */}
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-4 bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 sm:gap-3.5 shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs text-slate-400 block font-medium truncate font-cyber">Inscritos Totales</span>
                  <strong className="text-lg sm:text-xl font-mono text-white font-bold block">{registrations.length}</strong>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 sm:gap-3.5 shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs text-slate-400 block font-medium truncate font-cyber">Por Validar</span>
                  <strong className="text-lg sm:text-xl font-mono text-amber-400 font-bold block">{totalPending}</strong>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 sm:gap-3.5 shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs text-slate-400 block font-medium truncate font-cyber">Validados / Pagados</span>
                  <strong className="text-lg sm:text-xl font-mono text-emerald-400 font-bold block">{totalApproved}</strong>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 sm:gap-3.5 shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs text-slate-400 block font-medium truncate font-cyber">Recaudación Validada</span>
                  <strong className="text-base sm:text-xl font-mono text-yellow-400 font-bold block">${totalRevenue.toFixed(2)} USD</strong>
                </div>
              </div>
            </div>

            {/* Navigation Tabs within Admin */}
            <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-800 font-cyber">
              {[
                { id: 'registrations', label: `Inscripciones (${totalActive})`, icon: Users },
                { id: 'free_agents', label: `Individuales (${freeAgentsList.length})`, icon: Users },
                { id: 'brackets', label: 'Gestor de Brackets', icon: Trophy },
                { id: 'supabase', label: 'Conexión Supabase', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeAdminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAdminTab(tab.id)}
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 font-bold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ----------------------------------------------------------- */}
            {/* TAB 1: REGISTRATIONS & RECEIPT VALIDATOR */}
            {/* ----------------------------------------------------------- */}
            {activeAdminTab === 'registrations' && (
              <div className="space-y-4">
                
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-900/80 p-3 border border-slate-800 font-cyber">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, ID, equipo o cel..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>

                    {/* Filter Game & Status in 2 columns on mobile */}
                    <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                      <select
                        value={filterGame}
                        onChange={(e) => setFilterGame(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 focus:outline-none font-sans"
                      >
                        <option value="all">Todos los Juegos</option>
                        {GAMES.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>

                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 focus:outline-none font-sans"
                      >
                        <option value="all">Inscritos Activos (Ocultar Rechazados)</option>
                        <option value="pending">Por Validar / Pendientes ({totalPending})</option>
                        <option value="approved">Aprobados / Validados ({totalApproved})</option>
                        {totalRejected > 0 && (
                          <option value="rejected">Ver Rechazados ({totalRejected})</option>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Super Button: Copy WhatsApp Numbers */}
                  <button
                    type="button"
                    onClick={handleCopyAllPhones}
                    className="w-full lg:w-auto px-4 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {copiedPhones ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPhones ? '¡Números Copiados!' : 'Copiar WhatsApps para Grupos'}</span>
                  </button>
                </div>

                {/* 1. VISTA MÓVIL EN TARJETAS (Visible solo en smartphones/pantallas pequeñas < md) */}
                <div className="block md:hidden space-y-3.5 font-sans">
                  {filteredRegs.length === 0 ? (
                    <div className="py-8 px-4 text-center text-slate-400 bg-slate-900/60 border border-slate-800 text-xs">
                      No hay inscripciones registradas que coincidan con los filtros.
                    </div>
                  ) : (
                    filteredRegs.map((reg) => {
                      const amount = (parseFloat(reg.amount_due) || 1).toFixed(2);
                      const hasReceipt = Boolean(reg.receipt_url);
                      const isApproved = reg.status === 'approved';
                      const isRejected = reg.status === 'rejected';

                      return (
                        <div
                          key={reg.id}
                          className="bg-slate-900/90 border border-slate-800 p-3.5 space-y-3 shadow-lg"
                        >
                          {/* Cabecera de la Tarjeta: Juego, Modalidad y Estado */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-black text-xs uppercase tracking-wide text-white">
                                  {reg.game.replace('_', ' ')}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono font-semibold uppercase">
                                  {reg.modality}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-100 mt-1">
                                {reg.team_name || 'Inscripción Individual'}
                              </h4>
                              {reg.is_free_agent && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-amber-400/20 text-amber-300 font-bold inline-block mt-0.5">
                                  Individual (Sin Equipo)
                                </span>
                              )}
                            </div>

                            <div className="shrink-0 text-right">
                              <span
                                className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                  isApproved
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : isRejected
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                    : reg.status === 'payment_pending'
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                }`}
                              >
                                {isApproved
                                  ? '✓ Validado'
                                  : isRejected
                                  ? '✗ Rechazado'
                                  : reg.status === 'payment_pending'
                                  ? '⏳ Pre-Registro'
                                  : '⏳ Por Validar'}
                              </span>
                              <div className="text-xs font-mono font-bold text-amber-400 mt-1">
                                ${amount} USD
                              </div>
                            </div>
                          </div>

                          {/* Datos del Capitán / Contacto */}
                          <div className="bg-slate-950/80 p-2.5 border border-slate-800/80 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-400 uppercase font-mono">Capitán / Jugador:</span>
                              <span className="text-[10px] text-cyan-400 font-mono font-bold">
                                ID: {reg.captain_game_id}
                              </span>
                            </div>
                            <div className="font-semibold text-white truncate">
                              {reg.captain_name}
                            </div>
                            {reg.captain_whatsapp && (
                              <div className="pt-1 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400">WhatsApp:</span>
                                <a
                                  href={`https://wa.me/${reg.captain_whatsapp.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition"
                                >
                                  <Phone className="w-3 h-3 text-emerald-400" />
                                  <span>{reg.captain_whatsapp}</span>
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Integrantes del Equipo con Gamer IDs */}
                          {Array.isArray(reg.members) && reg.members.length > 0 && (
                            <div className="bg-slate-950/60 p-2.5 border border-slate-800/80 space-y-1.5">
                              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                                <span>Integrantes del Equipo ({reg.members.length}):</span>
                              </div>
                              <div className="space-y-1">
                                {reg.members.map((m, idx) => {
                                  const memberId = m.game_id || m.gameId || '';
                                  const isSub = Boolean(m.isSubstitute || m.is_substitute);
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between text-xs bg-slate-900/60 px-2 py-1 border border-slate-800/60"
                                    >
                                      <span className="text-slate-300 truncate mr-2 font-medium">
                                        {idx + 2}P. {m.name} {isSub && <span className="text-amber-400 text-[10px]">(Suplente)</span>}
                                      </span>
                                      {memberId ? (
                                        <span className="text-[#00F0FF] font-mono font-bold text-[11px] shrink-0 bg-cyan-950/60 px-1.5 py-0.5 border border-cyan-500/30">
                                          ID: {memberId}
                                        </span>
                                      ) : (
                                        <span className="text-slate-500 text-[10px] italic">Sin ID</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Botón para Ver Comprobante */}
                          {hasReceipt ? (
                            <button
                              type="button"
                              onClick={() => setSelectedReceipt(reg.receipt_url)}
                              className="w-full py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                            >
                              <Eye className="w-4 h-4 text-cyan-400" />
                              <span>Ver Comprobante de Pago</span>
                            </button>
                          ) : (
                            <div className="text-center py-2 text-slate-500 text-xs italic bg-slate-950/40 border border-dashed border-slate-800">
                              Sin comprobante de transferencia subido
                            </div>
                          )}

                          {/* Acciones de Validación para Staff */}
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                            {reg.status !== 'approved' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(reg.id, 'approved')}
                                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Aprobar Pago</span>
                              </button>
                            )}
                            {reg.status !== 'rejected' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(reg.id, 'rejected')}
                                className="flex-1 py-2.5 bg-rose-600/90 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Rechazar</span>
                              </button>
                            )}
                            {reg.status === 'approved' && (
                              <div className="flex-1 py-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                                <CheckCircle className="w-4 h-4" />
                                <span>Inscripción Validada</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* 2. VISTA DE TABLA PARA ESCRITORIO (Visible en pantallas medianas y grandes >= md) */}
                <div className="hidden md:block rounded-none bg-slate-900/60 border border-slate-800 overflow-hidden font-sans">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4">Juego & Modalidad</th>
                          <th className="py-3 px-4">Equipo / Participante</th>
                          <th className="py-3 px-4">Capitán / Contacto</th>
                          <th className="py-3 px-4">Integrantes</th>
                          <th className="py-3 px-4 text-center">Monto</th>
                          <th className="py-3 px-4 text-center">Comprobante</th>
                          <th className="py-3 px-4 text-center">Estado</th>
                          <th className="py-3 px-4 text-right">Acciones Staff</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredRegs.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="py-8 text-center text-slate-500">
                              No hay inscripciones registradas que coincidan con los filtros.
                            </td>
                          </tr>
                        ) : (
                          filteredRegs.map((reg) => (
                            <tr key={reg.id} className="hover:bg-slate-800/30 transition">
                              <td className="py-3 px-4">
                                <span className="font-bold text-white block uppercase">
                                  {reg.game.replace('_', ' ')}
                                </span>
                                <span className="text-[10px] text-cyan-400 font-mono">
                                  {reg.modality}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-white block">
                                  {reg.team_name || 'Individual'}
                                </span>
                                {reg.is_free_agent && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-amber-400/20 text-amber-300 font-bold">
                                    Individual
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <div className="space-y-0.5">
                                  <span className="font-semibold text-slate-200 block">
                                    {reg.captain_name} ({reg.captain_game_id})
                                  </span>
                                  <a
                                    href={`https://wa.me/${reg.captain_whatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                                  >
                                    <Phone className="w-3 h-3" />
                                    {reg.captain_whatsapp}
                                  </a>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {Array.isArray(reg.members) && reg.members.length > 0 ? (
                                  <div className="space-y-0.5 max-w-[200px]">
                                    <span className="text-slate-400 text-[10px] block font-mono">
                                      {reg.members.length} miembros:
                                    </span>
                                    {reg.members.map((m, idx) => {
                                      const memberId = m.game_id || m.gameId || '';
                                      const isSub = Boolean(m.isSubstitute || m.is_substitute);
                                      return (
                                        <span key={idx} className="block text-[11px] text-slate-300 truncate">
                                          • {m.name} {memberId ? <span className="text-[#00F0FF] font-mono font-bold">[{memberId}]</span> : ''} {isSub && <em className="text-amber-400"> (Suplente)</em>}
                                        </span>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <span className="text-slate-500 italic text-[11px]">Sin miembros extra</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center font-mono font-bold text-amber-400">
                                ${(parseFloat(reg.amount_due) || 1).toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {reg.receipt_url ? (
                                  <button
                                    onClick={() => setSelectedReceipt(reg.receipt_url)}
                                    className="px-2.5 py-1 rounded-none bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-semibold text-[11px] flex items-center gap-1 mx-auto transition cursor-pointer"
                                  >
                                    <Eye className="w-3 h-3" />
                                    Ver Captura
                                  </button>
                                ) : (
                                  <span className="text-slate-500 text-[11px]">Sin foto</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider ${
                                  reg.status === 'approved'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : reg.status === 'rejected'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                      : reg.status === 'payment_pending'
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                }`}>
                                  {reg.status === 'approved' 
                                    ? 'Validado' 
                                    : reg.status === 'rejected' 
                                      ? 'Rechazado' 
                                      : reg.status === 'payment_pending' 
                                        ? 'Pre-Registro' 
                                        : 'Por Validar'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {reg.status !== 'approved' && (
                                    <button
                                      onClick={() => handleStatusChange(reg.id, 'approved')}
                                      title="Validar y Aprobar Pago"
                                      className="p-1.5 rounded-none bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition cursor-pointer"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  {reg.status !== 'rejected' && (
                                    <button
                                      onClick={() => handleStatusChange(reg.id, 'rejected')}
                                      title="Rechazar Comprobante"
                                      className="p-1.5 rounded-none bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition cursor-pointer"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------- */}
            {/* TAB 2: INDIVIDUALES */}
            {/* ----------------------------------------------------------- */}
            {activeAdminTab === 'free_agents' && (
              <div className="space-y-4">
                <div className="p-4 rounded-none bg-[#091129] border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      Lista de Jugadores Individuales para Asignar
                    </h4>
                    <p className="text-xs text-slate-400">
                      Jugadores inscritos individualmente sin equipo. Reúnelos por Discord o WhatsApp para conformar escuadras de Valorant o Free Fire.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-none bg-amber-400 text-slate-950 font-bold text-xs font-mono">
                    {freeAgentsList.length} Jugadores
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {freeAgentsList.map((agent) => (
                    <div key={agent.id} className="p-4 rounded-none bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                          {agent.game.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-none bg-slate-800 text-slate-300 font-bold">
                          ${(parseFloat(agent.amount_due) || 1).toFixed(2)}
                        </span>
                      </div>
                      <h5 className="font-bold text-white text-sm">{agent.captain_name}</h5>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>ID: <strong className="text-slate-200">{agent.captain_game_id}</strong></div>
                        <div>WhatsApp: <strong className="text-emerald-400">{agent.captain_whatsapp}</strong></div>
                      </div>
                      <a
                        href={`https://wa.me/${agent.captain_whatsapp.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(agent.captain_name)},%20te%20escribimos%20de%20Compu%20League%20para%20asignarte%20equipo%20en%20${agent.game}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-none bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition mt-2"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Contactar para Equipo
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------- */}
            {/* TAB 3: GESTOR DE BRACKETS Y MARCADORES EN VIVO */}
            {/* ----------------------------------------------------------- */}
            {activeAdminTab === 'brackets' && (
              <div className="space-y-8">
                
                {/* Valorant Match Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm uppercase text-white flex items-center gap-2">
                      <span className="w-3 h-3 rounded-none bg-rose-500"></span>
                      Actualizar Marcadores de Valorant (Upper & Lower)
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">Modificación en Vivo</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {valorantMatches.map((m) => (
                      <div key={m.id} className="p-3.5 rounded-none bg-slate-900 border border-slate-800 space-y-2">
                        <div className="text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                          <span>{m.round}</span>
                          <span className="text-slate-400">ID: {m.id}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="truncate flex-1 font-bold text-white">{m.teamA}</span>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            defaultValue={m.scoreA}
                            id={`scoreA-${m.id}`}
                            className="w-12 text-center py-1 rounded-none bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-bold"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="truncate flex-1 font-bold text-white">{m.teamB}</span>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            defaultValue={m.scoreB}
                            id={`scoreB-${m.id}`}
                            className="w-12 text-center py-1 rounded-none bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-bold"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const valA = document.getElementById(`scoreA-${m.id}`).value;
                            const valB = document.getElementById(`scoreB-${m.id}`).value;
                            handleScoreUpdateValorant(m.id, valA, valB);
                          }}
                          className="w-full py-1.5 rounded-none bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition"
                        >
                          Guardar Resultado
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clash Royale Editor */}
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <h4 className="font-black text-sm uppercase text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-none bg-cyan-400"></span>
                    Actualizar Marcadores Clash Royale (Bo3)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {clashMatches.map((m) => (
                      <div key={m.id} className="p-3.5 rounded-none bg-slate-900 border border-slate-800 space-y-2">
                        <div className="text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                          <span>{m.round}</span>
                          <span className="text-slate-400">Partida #{m.matchIndex}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="truncate flex-1 font-bold text-white">{m.playerA}</span>
                          <input
                            type="number"
                            min="0"
                            max="3"
                            defaultValue={m.scoreA}
                            id={`crA-${m.id}`}
                            className="w-12 text-center py-1 rounded-none bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-bold"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="truncate flex-1 font-bold text-white">{m.playerB}</span>
                          <input
                            type="number"
                            min="0"
                            max="3"
                            defaultValue={m.scoreB}
                            id={`crB-${m.id}`}
                            className="w-12 text-center py-1 rounded-none bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-bold"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const valA = document.getElementById(`crA-${m.id}`).value;
                            const valB = document.getElementById(`crB-${m.id}`).value;
                            handleScoreUpdateClash(m.id, valA, valB);
                          }}
                          className="w-full py-1.5 rounded-none bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition"
                        >
                          Guardar Bo3
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Fire & Fortnite BR Kills / Placement Editor */}
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <h4 className="font-black text-sm uppercase text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-none bg-amber-400"></span>
                    Actualizar Puesto & Kills en Battle Royale (Free Fire / Fortnite)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Ingresa el puesto (#1 para el último sobreviviente) y la cantidad de bajas para que se actualice la tabla en vivo.
                  </p>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-amber-300 block">Free Fire Escuadras:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      {brStandings.free_fire_escuadras.map((row, idx) => (
                        <div key={idx} className="p-2.5 rounded-none bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                          <span className="font-bold text-white truncate block">{row.team}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">Puesto:</span>
                            <input
                              type="number"
                              defaultValue={row.rank}
                              id={`ff-rank-${idx}`}
                              className="w-12 text-center py-0.5 rounded-none bg-slate-950 border border-slate-700 text-white font-mono"
                            />
                            <span className="text-[10px] text-slate-400">Kills:</span>
                            <input
                              type="number"
                              defaultValue={row.kills}
                              id={`ff-kills-${idx}`}
                              className="w-12 text-center py-0.5 rounded-none bg-slate-950 border border-slate-700 text-white font-mono"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const r = document.getElementById(`ff-rank-${idx}`).value;
                              const k = document.getElementById(`ff-kills-${idx}`).value;
                              handleUpdateBRKills('free_fire_escuadras', idx, k, r);
                            }}
                            className="w-full py-1 rounded-none bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-cyan-300"
                          >
                            Actualizar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------- */}
            {/* TAB 4: CONEXIÓN SUPABASE */}
            {/* ----------------------------------------------------------- */}
            {activeAdminTab === 'supabase' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="p-5 rounded-none bg-slate-900/90 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black uppercase text-white">
                        Conectar con tu Base de Datos en Supabase
                      </h4>
                      <p className="text-xs text-slate-400">
                        Sincronización en la nube gratuita para brackets y registros en tiempo real.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    1. Crea tu proyecto gratuito en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold">supabase.com</a>.<br/>
                    2. En el <strong>SQL Editor</strong> de Supabase, copia y pega el archivo <code className="text-amber-300 font-mono">src/supabase_schema.sql</code> para crear las tablas con 1 clic.<br/>
                    3. Ve a <strong>Project Settings &gt; API</strong> y copia tu <strong>Project URL</strong> y <strong>anon public key</strong> aquí abajo:
                  </p>
                </div>

                <form onSubmit={handleSaveSupabase} className="p-5 rounded-none bg-slate-900 border border-slate-800 space-y-4">
                  {supabaseSaved && (
                    <div className="p-3 rounded-none bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>¡Credenciales de Supabase guardadas y sincronizadas con éxito!</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Project URL de Supabase:
                    </label>
                    <input
                      type="url"
                      placeholder="https://xyzcompany.supabase.co"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Anon Public Key:
                    </label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={supabaseAnonKey}
                      onChange={(e) => setSupabaseAnonKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-none font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition"
                  >
                    Guardar y Conectar Supabase
                  </button>
                </form>
              </div>
            )}

          </div>
  );

  const receiptModal = selectedReceipt && (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4">
      <div className="relative max-w-lg w-full bg-slate-900 border border-cyan-500/40 rounded-none p-4 shadow-2xl flex flex-col max-h-[92vh] font-sans">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            Comprobante de Transferencia Bancaria
          </h4>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="p-1.5 rounded-none bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto rounded-none border border-slate-800 flex items-center justify-center bg-black/60 p-2 my-3 min-h-[220px]">
          <img
            src={selectedReceipt}
            alt="Comprobante en detalle"
            className="max-w-full max-h-[65vh] object-contain rounded-none"
          />
        </div>
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800 shrink-0">
          {typeof selectedReceipt === 'string' && (selectedReceipt.startsWith('http://') || selectedReceipt.startsWith('https://') || selectedReceipt.startsWith('data:image/') || selectedReceipt.startsWith('/assets/')) && (
            <a
              href={selectedReceipt}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition flex items-center gap-1"
            >
              Abrir original ↗
            </a>
          )}
          <button
            onClick={() => setSelectedReceipt(null)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex flex-col font-sans select-none">
        {headerBar}
        {!isAuthenticated ? loginScreen : dashboardContent}
        {receiptModal}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-6xl bg-[#1a2742] border-4 border-[#364e78] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col select-none text-slate-100 font-sans">
        {headerBar}
        {!isAuthenticated ? loginScreen : dashboardContent}
      </div>
      {receiptModal}
    </div>
  );
}


