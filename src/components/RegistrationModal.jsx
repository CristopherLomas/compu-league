import React, { useState, useEffect } from 'react';
import { 
  X, Check, Copy, Upload, AlertCircle, 
  Zap, Phone, Link2, ExternalLink, Send, 
  CheckCircle2, Clock, ArrowRight, ArrowLeft, Terminal, Coins, CreditCard, Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BANK_INFO, GAMES, CONTACT_INFO } from '../data/tournamentData';
import { saveRegistration, updateRegistrationData, generateUUID } from '../lib/storage';
import { GameLogo } from './GameLogo';

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  preselectedGame = 'valorant', 
  initialGamerTag = '',
  onNavigateToPayment,
  editingRegistration = null,
  onRegistrationUpdated = null,
}) {
  const [selectedGame, setSelectedGame] = useState(preselectedGame || 'valorant');
  const [isFreeAgent, setIsFreeAgent] = useState(preselectedGame === 'clash_royale');
  const [currentStep, setCurrentStep] = useState(1); // 1: Juego & Modalidad, 2: Roster, 3: Pago
  const [paymentMode, setPaymentMode] = useState(null); // null | 'now' | 'later'
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMagicLink, setCopiedMagicLink] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [successMode, setSuccessMode] = useState('now');
  const [errorMessage, setErrorMessage] = useState('');

  // Form State (Inicia siempre vacío para no arrastrar apodos de prueba)
  const [teamName, setTeamName] = useState('');
  const [captain, setCaptain] = useState({
    name: '',
    gameId: '',
    whatsapp: '',
    email: '',
    discord: '',
  });

  const [members, setMembers] = useState([
    { name: '', gameId: '', whatsapp: '', isSubstitute: false }
  ]);

  const [hasSubstitute, setHasSubstitute] = useState(false);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);

  useEffect(() => {
    if (isOpen && editingRegistration) {
      setSelectedGame(editingRegistration.game || 'valorant');
      setIsFreeAgent(editingRegistration.game === 'clash_royale' || Boolean(editingRegistration.is_free_agent));
      setTeamName(editingRegistration.team_name || '');
      setCaptain({
        name: editingRegistration.captain_name || '',
        gameId: editingRegistration.captain_game_id || '',
        whatsapp: editingRegistration.captain_whatsapp || '',
        email: editingRegistration.captain_email || '',
        discord: editingRegistration.captain_discord || '',
      });
      if (Array.isArray(editingRegistration.members) && editingRegistration.members.length > 0) {
        setMembers(editingRegistration.members.map(m => ({
          name: m.name || '',
          gameId: m.game_id || m.gameId || '',
          whatsapp: m.whatsapp || '',
          isSubstitute: Boolean(m.is_substitute || m.isSubstitute)
        })));
        setHasSubstitute(editingRegistration.members.some(m => m.is_substitute || m.isSubstitute));
      } else {
        setMembers([
          { name: '', gameId: '', whatsapp: '', isSubstitute: false }
        ]);
        setHasSubstitute(false);
      }
      setPaymentMode(editingRegistration.status === 'payment_pending' ? 'later' : 'now');
      setReceiptPreview(editingRegistration.receipt_image || editingRegistration.receipt_url || null);
      setErrorMessage('');
      setSuccessData(null);
      setCurrentStep(1);
    } else if (isOpen && !editingRegistration) {
      if (preselectedGame) {
        setSelectedGame(preselectedGame);
        if (preselectedGame === 'clash_royale') {
          setIsFreeAgent(true);
        }
      }
      // NUNCA prellenar con el apodo de la primera pantalla
      setCaptain({
        name: '',
        gameId: '',
        whatsapp: '',
        email: '',
        discord: '',
      });
      setTeamName('');
      setMembers([
        { name: '', gameId: '', whatsapp: '', isSubstitute: false }
      ]);
      setHasSubstitute(false);
      setPaymentMode(null);
      setReceiptPreview(null);
      setReceiptFile(null);
      setErrorMessage('');
      setSuccessData(null);
      setCurrentStep(1);
    }
  }, [isOpen, editingRegistration]);

  useEffect(() => {
    if (selectedGame === 'clash_royale') {
      setIsFreeAgent(true);
    }
  }, [selectedGame]);

  useEffect(() => {
    if (!isOpen) {
      setPaymentMode(null);
      setErrorMessage('');
      setReceiptPreview(null);
      setReceiptFile(null);
      setSuccessData(null);
      setCurrentStep(1);
    }
  }, [isOpen]);

  const gameConfig = GAMES.find(g => g.id === selectedGame) || GAMES[0];
  const isSoloGame = selectedGame === 'clash_royale' || isFreeAgent;

  // Calculate total price ($1 USD per player)
  let totalCost = 1.00;
  if (!isSoloGame) {
    if (selectedGame === 'valorant') {
      totalCost = 5.00;
    } else if (selectedGame === 'free_fire') {
      totalCost = 4.00;
    } else if (selectedGame === 'fortnite') {
      totalCost = 2.00;
    }
  }

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    if (!updated[index]) {
      updated[index] = { name: '', gameId: '', whatsapp: '', isSubstitute: false };
    }
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('La imagen del comprobante no debe superar los 5MB.');
        return;
      }
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedMimes.includes(file.type?.toLowerCase())) {
        setErrorMessage('Formato no válido. Solo se admiten fotos o capturas (JPG, PNG, WEBP).');
        return;
      }
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'magic') {
      setCopiedMagicLink(true);
      setTimeout(() => setCopiedMagicLink(false), 2500);
    }
  };

  const cleanPhone = (phone) => {
    let p = (phone || '').replace(/[^0-9]/g, '');
    if (p.startsWith('0')) p = '593' + p.substring(1);
    else if (!p.startsWith('593') && p.length === 9) p = '593' + p;
    return p;
  };

  const handleSubmit = async (e, forcedMode) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMessage('');

    if (!isSoloGame && !teamName.trim()) {
      setErrorMessage('Por favor ingresa el nombre de tu equipo para continuar.');
      setCurrentStep(1);
      return;
    }

    if (!captain.name.trim() || !captain.gameId.trim() || !captain.whatsapp.trim()) {
      setErrorMessage('Por favor completa todos los datos obligatorios del Capitán / Jugador principal en el Paso 2.');
      setCurrentStep(2);
      return;
    }

    if (!isSoloGame) {
      const requiredCount = selectedGame === 'valorant' ? 4 : selectedGame === 'free_fire' ? 3 : 1;
      for (let i = 0; i < requiredCount; i++) {
        const m = members[i];
        if (!m || !m.name?.trim() || !m.gameId?.trim() || !m.whatsapp?.trim()) {
          setErrorMessage(`Por favor completa todos los datos del Jugador #${i + 2} en el Paso 2.`);
          setCurrentStep(2);
          return;
        }
      }
    }

    const targetMode = forcedMode || paymentMode || (editingRegistration ? 'later' : null);

    if (!targetMode) {
      setErrorMessage('Por favor selecciona si deseas PAGAR AHORA o PAGAR DESPUÉS en el Paso 3.');
      setCurrentStep(3);
      return;
    }

    if (!editingRegistration && targetMode === 'now' && !receiptPreview) {
      setErrorMessage('Para pagar ahora, por favor adjunta la captura del comprobante bancario. O pulsa en PAGAR DESPUÉS para apartar tu cupo en este momento.');
      setCurrentStep(3);
      return;
    }

    try {
      setSubmitting(true);

      const teamMembersToSave = isSoloGame ? [] : members.slice(0, selectedGame === 'valorant' ? (hasSubstitute ? 5 : 4) : selectedGame === 'free_fire' ? 3 : 1).map(m => {
        const idVal = String(m.game_id || m.gameId || '').trim();
        const isSub = Boolean(m.isSubstitute || m.is_substitute);
        return {
          name: String(m.name || '').trim(),
          game_id: idVal,
          gameId: idVal,
          whatsapp: String(m.whatsapp || '').trim(),
          is_substitute: isSub,
          isSubstitute: isSub,
        };
      });
      const isPayLater = targetMode === 'later';

      if (editingRegistration) {
        const updatedRecord = {
          game: selectedGame,
          game_id: selectedGame,
          game_name: gameConfig.name,
          team_name: isSoloGame ? (selectedGame === 'clash_royale' ? captain.name : `Individual (${captain.name})`) : teamName,
          is_free_agent: isSoloGame,
          modality: selectedGame === 'clash_royale' ? '1v1' : (isSoloGame ? 'individual' : (selectedGame === 'valorant' ? '5v5' : selectedGame === 'fortnite' ? 'duos' : 'escuadras')),
          ff_modality: selectedGame === 'free_fire' ? (isSoloGame ? 'individual' : 'escuadras') : null,
          captain_name: captain.name,
          captain_game_id: captain.gameId,
          captain_whatsapp: captain.whatsapp,
          captain_email: captain.email || '',
          captain_discord: captain.discord || '',
          members: teamMembersToSave,
          total_amount: totalCost,
          amount_due: totalCost,
        };

        if (targetMode === 'now' && (receiptFile || receiptPreview)) {
          if (receiptFile) updatedRecord.receipt_file = receiptFile;
          if (receiptPreview) {
            updatedRecord.receipt_image = receiptPreview;
            updatedRecord.receipt_url = receiptPreview;
          }
          updatedRecord.payment_status = 'paid';
          updatedRecord.status = 'pending';
        }

        const result = await updateRegistrationData(editingRegistration.id, updatedRecord);
        const finalData = result || { ...editingRegistration, ...updatedRecord };

        if (onRegistrationUpdated) {
          onRegistrationUpdated(finalData);
        }

        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 },
        });

        setSuccessMode(targetMode);
        setSuccessData(finalData);
        return finalData;
      }

      const recordUUID = generateUUID();

      const registrationRecord = {
        id: recordUUID,
        created_at: new Date().toISOString(),
        game: selectedGame,
        game_id: selectedGame,
        game_name: gameConfig.name,
        team_name: isSoloGame ? (selectedGame === 'clash_royale' ? captain.name : `Individual (${captain.name})`) : teamName,
        is_free_agent: isSoloGame,
        modality: selectedGame === 'clash_royale' ? '1v1' : (isSoloGame ? 'individual' : (selectedGame === 'valorant' ? '5v5' : selectedGame === 'fortnite' ? 'duos' : 'escuadras')),
        ff_modality: selectedGame === 'free_fire' ? (isSoloGame ? 'individual' : 'escuadras') : null,
        captain_name: captain.name,
        captain_game_id: captain.gameId,
        captain_whatsapp: captain.whatsapp,
        captain_email: captain.email || '',
        captain_discord: captain.discord || '',
        members: teamMembersToSave,
        total_amount: totalCost,
        amount_due: totalCost,
        receipt_file: isPayLater ? null : receiptFile,
        receipt_image: isPayLater ? null : receiptPreview,
        receipt_url: isPayLater ? null : receiptPreview,
        status: isPayLater ? 'payment_pending' : 'pending',
        payment_status: isPayLater ? 'unpaid' : 'paid',
        admin_notes: isPayLater ? 'Pre-registro generado (Pagar después). Pendiente de comprobante.' : '',
      };

      await saveRegistration(registrationRecord);

      // Si seleccionó pagar después, guardar recordatorio en este dispositivo
      if (isPayLater) {
        try {
          localStorage.setItem('compu_league_pending_payment', JSON.stringify({
            id: registrationRecord.id,
            team_name: registrationRecord.team_name,
            game: registrationRecord.game,
            game_name: gameConfig.name,
            captain_name: registrationRecord.captain_name,
            amount_due: registrationRecord.amount_due,
            created_at: registrationRecord.created_at,
          }));
        } catch (e) {
          console.warn('No se pudo guardar pago pendiente en localStorage:', e);
        }
      } else {
        try {
          localStorage.removeItem('compu_league_pending_payment');
        } catch (e) {}
      }

      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
      });

      setSuccessMode(targetMode);
      setSuccessData(registrationRecord);
      return registrationRecord;
    } catch (err) {
      console.error(err);
      setErrorMessage('Ocurrió un error al guardar tu registro. Por favor intenta de nuevo.');
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const magicLink = successData 
    ? `${window.location.origin}/pago/${successData.id}` 
    : '';

  const whatsappSelfMessage = successData
    ? `🎮 *COMPU LEAGUE E-SPORTS 2026*\n\n¡Hola ${successData.captain_name}! Tu pre-registro para *${successData.team_name}* en *${gameConfig.name}* ha sido guardado.\n\n📌 *Link para pagar y subir comprobante ($${totalCost.toFixed(2)} USD):*\n${magicLink}\n\n📌 *O envía tu comprobante al WhatsApp Staff 0962074110 con:*\n- Nombre: ${successData.captain_name}\n- ID: ${successData.id}`
    : '';

  const whatsappCaptainUrl = successData
    ? `https://wa.me/${cleanPhone(successData.captain_whatsapp)}?text=${encodeURIComponent(whatsappSelfMessage)}`
    : '';

  const whatsappStaffReportUrl = successData
    ? `https://wa.me/593962074110?text=${encodeURIComponent(`Hola Staff Compu League, envío mi comprobante de pago para el equipo *${successData.team_name}*.\n- Nombre: ${successData.captain_name}\n- ID de registro: ${successData.id}\n- Torneo: ${gameConfig.name}\n- Valor: $${totalCost.toFixed(2)} USD`)}`
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 font-sans select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-[#090D15] border-4 border-black shadow-brutal-yellow overflow-hidden my-3 sm:my-6">
        
        {/* Modal Arcade Cabinet Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-black border-b-4 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/buho_pixel_start.png"
              alt="Logo Torneo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain shape-crisp drop-shadow-[0_0_8px_rgba(255,230,0,0.5)] shrink-0"
              style={{ imageRendering: 'pixelated' }}
            />
            <div>
              <div className="font-pixel text-[9px] text-[#FFE600] uppercase tracking-widest flex items-center gap-1.5">
                <span className={`w-2 h-2 inline-block animate-arcade-blink ${editingRegistration ? 'bg-[#00F0FF]' : 'bg-[#FF0055]'}`} />
                <span>[ TERMINAL // {editingRegistration ? 'EDITAR EQUIPO Y ROSTER' : 'INSCRIPCION OFICIAL'} ]</span>
              </div>
              <h3 className="text-base sm:text-xl font-black uppercase text-white font-display tracking-wider leading-none mt-0.5">
                {editingRegistration ? 'ACTUALIZAR DATOS' : 'COMPU LEAGUE'} <span className="text-[#FFE600]">{editingRegistration ? `#${editingRegistration.id.slice(0, 8).toUpperCase()}` : '2026'}</span>
              </h3>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="btn-arcade-press p-2 border-2 border-black bg-[#FF0055] text-white hover:bg-[#FF3377] transition cursor-pointer shadow-brutal-black font-black"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto space-y-5 bg-[#090D15]">
          
          {successData ? (
            /* ======================================================== */
            /* SUCCESS STATES (PAGAR AHORA vs PAGAR DESPUÉS)            */
            /* ======================================================== */
            successMode === 'later' ? (
              /* ENLACE MÁGICO CON UUID (PAGAR DESPUÉS) */
              <div className="text-center py-4 px-2 sm:px-4 space-y-5">
                <div className="w-20 h-20 mx-auto">
                  <img
                    src="/assets/buho_pixel_start.png"
                    alt="Búho pixel"
                    className="w-full h-full object-contain shape-crisp drop-shadow-[0_0_15px_rgba(255,230,0,0.6)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="inline-block px-3 py-1 bg-black text-[#00F0FF] border-2 border-[#00F0FF] font-pixel text-[9px] uppercase shadow-brutal-black">
                    ★ {editingRegistration ? 'DATOS ACTUALIZADOS' : 'PRE-REGISTRO GUARDADO'} ★
                  </div>
                  <h4 className="text-xl sm:text-3xl font-black uppercase text-white font-display tracking-wide drop-shadow-[2px_2px_0px_#000]">
                    {editingRegistration ? '¡DATOS ACTUALIZADOS CON ÉXITO!' : '¡PRE-REGISTRO COMPLETADO!'}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-cyber">
                    {editingRegistration
                      ? <>Se han actualizado los datos de <strong className="text-[#FFE600] font-pixel text-xs">{successData.team_name}</strong> para <strong className="text-white font-pixel text-xs">{gameConfig.name}</strong>.</>
                      : <>Tu cupo para <strong className="text-[#FFE600] font-pixel text-xs">{successData.team_name}</strong> en <strong className="text-white font-pixel text-xs">{gameConfig.name}</strong> ha sido apartado.</>}
                  </p>
                </div>

                {/* Info Card */}
                <div className="p-4 sm:p-5 bg-black border-2 border-black text-left max-w-xl mx-auto space-y-3 font-cyber text-xs text-slate-300 shadow-brutal-black">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 font-pixel text-[9px]">
                    <span className="text-slate-400">ESTADO:</span>
                    <span className="px-2 py-0.5 bg-[#00F0FF] text-black font-black uppercase">
                      PRE-REGISTRADO (PENDIENTE PAGO)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-pixel text-[8px] text-slate-500 uppercase block">CAPITAN / JUGADOR:</span>
                      <strong className="text-white font-bold">{successData.captain_name} ({successData.captain_game_id})</strong>
                    </div>
                    <div>
                      <span className="font-pixel text-[8px] text-slate-500 uppercase block">ID DE REGISTRO:</span>
                      <strong className="text-[#FFE600] font-mono text-[11px] break-all">{successData.id}</strong>
                    </div>
                  </div>

                  {Array.isArray(successData.members) && successData.members.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <span className="font-pixel text-[8px] text-slate-500 uppercase block">COMPAÑEROS REGISTRADOS:</span>
                      <div className="space-y-1">
                        {successData.members.map((m, idx) => {
                          const mId = m.game_id || m.gameId;
                          const isSub = Boolean(m.is_substitute || m.isSubstitute);
                          return (
                            <div key={idx} className="flex items-center justify-between text-[11px] bg-white/5 px-2 py-0.5 border border-white/10">
                              <span className="text-slate-300 truncate">
                                {idx + 2}P. {m.name} {isSub ? '(Sub)' : ''}
                              </span>
                              {mId && (
                                <span className={`font-pixel text-[9px] font-bold shrink-0 ml-1 ${isSub ? 'text-[#D8B4FE]' : 'text-[#00F0FF]'}`}>
                                  {mId}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between font-pixel">
                    <span className="text-slate-400 text-[10px]">VALOR TOTAL:</span>
                    <strong className="text-xl text-[#FFE600] font-black">${totalCost.toFixed(2)} USD</strong>
                  </div>
                </div>

                {/* Box 1: Link generado */}
                <div className="p-4 sm:p-5 bg-black border-2 border-[#FFE600] text-left max-w-xl mx-auto space-y-3 shadow-brutal-yellow">
                  <div className="flex items-center justify-between font-pixel text-[9px]">
                    <span className="text-[#FFE600] uppercase font-bold flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-[#FFE600]" />
                      1. TU LINK DE PAGO GENERADO
                    </span>
                    <span className="text-slate-400">ACCESO DIRECTO</span>
                  </div>

                  <div className="p-3 bg-[#0C121D] border-2 border-black text-xs font-mono text-[#00F0FF] break-all select-all font-bold">
                    {magicLink}
                  </div>

                  {/* Action Buttons: Copiar y Enviar por WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(magicLink, 'magic')}
                      className="btn-arcade-press shadow-brutal-black px-4 py-3 bg-[#FFE600] text-black font-pixel font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-2 border-black"
                    >
                      {copiedMagicLink ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedMagicLink ? '¡LINK COPIADO!' : 'COPIAR LINK'}</span>
                    </button>

                    <a
                      href={whatsappCaptainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-arcade-press shadow-brutal-black px-4 py-3 bg-[#00F0FF] text-black font-pixel font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black"
                    >
                      <Send className="w-4 h-4" />
                      <span>ENVIARME EL LINK</span>
                    </a>
                  </div>
                </div>

                {/* Box 2: Opción WhatsApp 0962074110 */}
                <div className="p-4 sm:p-5 bg-black border-2 border-[#10B981] text-left max-w-xl mx-auto space-y-3 shadow-brutal-black">
                  <div className="flex items-center justify-between font-pixel text-[9px]">
                    <span className="text-[#10B981] uppercase font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                      2. O ENVIA EL COMPROBANTE AL WHATSAPP
                    </span>
                    <span className="text-slate-400">STAFF OFICIAL</span>
                  </div>

                  <p className="text-xs text-slate-300 font-cyber leading-relaxed">
                    También puedes transferir y enviar la captura, tu nombre (<strong className="text-white">{successData.captain_name}</strong>) y tu ID al WhatsApp <strong className="text-[#10B981] font-bold">0962074110</strong>:
                  </p>

                  <a
                    href={whatsappStaffReportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-arcade-press shadow-brutal-black w-full px-4 py-3 bg-[#10B981] text-black font-pixel font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black"
                  >
                    <Send className="w-4 h-4" />
                    <span>ENVIAR CAPTURA AL WHATSAPP 0962074110</span>
                  </a>
                </div>

                {/* Direct Go To Payment Page Option */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  {onNavigateToPayment && (
                    <button
                      type="button"
                      onClick={() => onNavigateToPayment(successData.id)}
                      className="btn-arcade-press shadow-brutal-cyan w-full sm:w-auto px-5 py-3 border-2 border-black bg-[#00F0FF] text-black font-pixel font-black text-[10px] uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>[ IR A SUBIR EL PAGO AHORA ]</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-arcade-press shadow-brutal-black w-full sm:w-auto px-6 py-3 border-2 border-black bg-black text-slate-300 hover:text-white font-pixel text-[10px] uppercase cursor-pointer"
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            ) : (
              /* PAGAR AHORA SUCCESS */
              <div className="text-center py-6 px-4 space-y-6">
                <div className="w-20 h-20 mx-auto">
                  <img
                    src="/assets/buho_pixel_start.png"
                    alt="Búho feliz"
                    className="w-full h-full object-contain shape-crisp drop-shadow-[0_0_15px_rgba(255,230,0,0.6)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-3xl font-black uppercase text-white font-display tracking-wide drop-shadow-[2px_2px_0px_#000]">
                    {editingRegistration ? '¡DATOS ACTUALIZADOS EXITOSAMENTE!' : '¡INSCRIPCIÓN ENVIADA EXITOSAMENTE!'}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-cyber">
                    {editingRegistration
                      ? <>Hemos actualizado los datos de <strong className="text-[#FFE600] font-pixel text-xs">{successData.team_name}</strong> para <strong className="text-white font-pixel text-xs">{gameConfig.name}</strong>.</>
                      : <>Hemos recibido el registro de <strong className="text-[#FFE600] font-pixel text-xs">{successData.team_name}</strong> para <strong className="text-white font-pixel text-xs">{gameConfig.name}</strong> y tu comprobante por <strong className="text-[#FFE600] font-pixel text-xs">${totalCost.toFixed(2)} USD</strong>.</>}
                  </p>
                </div>

                <div className="p-5 bg-black border-2 border-black text-left max-w-lg mx-auto space-y-3 font-cyber text-xs text-slate-300 shadow-brutal-black">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 font-pixel text-[9px]">
                    <span className="text-slate-400">ESTADO DEL REGISTRO:</span>
                    <span className="px-2 py-0.5 bg-[#FFE600] text-black font-black uppercase">
                      EN VERIFICACION BANCARIA
                    </span>
                  </div>
                  <div>
                    <span className="font-pixel text-[8px] text-slate-500 uppercase block">CAPITAN / JUGADOR:</span>
                    <span className="text-white font-bold">{successData.captain_name} ({successData.captain_game_id})</span>
                  </div>
                  <div>
                    <span className="font-pixel text-[8px] text-slate-500 uppercase block">WHATSAPP DE CONTACTO:</span>
                    <span className="text-[#FFE600] font-mono font-bold">{successData.captain_whatsapp}</span>
                  </div>
                  {Array.isArray(successData.members) && successData.members.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <span className="font-pixel text-[8px] text-slate-500 uppercase block">COMPAÑEROS REGISTRADOS:</span>
                      <div className="space-y-1">
                        {successData.members.map((m, idx) => {
                          const mId = m.game_id || m.gameId;
                          const isSub = Boolean(m.is_substitute || m.isSubstitute);
                          return (
                            <div key={idx} className="flex items-center justify-between text-[11px] bg-white/5 px-2 py-0.5 border border-white/10">
                              <span className="text-slate-300 truncate">
                                {idx + 2}P. {m.name} {isSub ? '(Sub)' : ''}
                              </span>
                              {mId && (
                                <span className={`font-pixel text-[9px] font-bold shrink-0 ml-1 ${isSub ? 'text-[#D8B4FE]' : 'text-[#00F0FF]'}`}>
                                  {mId}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="pt-2 text-[10px] text-slate-400 leading-relaxed border-t border-white/10 font-cyber">
                    ⚠️ El staff de Compu League E-Sports validará tu comprobante de Banco Pichincha. Una vez verificado, te agregaremos al grupo oficial de WhatsApp y coordinaremos tus partidas.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={CONTACT_INFO.whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-arcade-press shadow-brutal-black w-full sm:w-auto px-6 py-3.5 font-pixel font-black text-[10px] uppercase tracking-wider text-black bg-[#10B981] hover:bg-white transition flex items-center justify-center gap-2 border-2 border-black"
                  >
                    <Phone className="w-4 h-4" />
                    <span>[ ESCRIBIR A WHATSAPP STAFF ]</span>
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-arcade-press shadow-brutal-black w-full sm:w-auto px-6 py-3.5 font-pixel text-[10px] uppercase tracking-wider text-slate-300 hover:text-white bg-black border-2 border-black transition cursor-pointer"
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            )
          ) : (
            /* ======================================================== */
            /* REGISTRATION FORM                                        */
            /* ======================================================== */
            <form onSubmit={(e) => handleSubmit(e, paymentMode)} className="space-y-5">
              
              {/* Wizard Step Navigation Tabs */}
              <div className="grid grid-cols-3 gap-2 p-2 bg-black border-2 border-black">
                <button
                  type="button"
                  onClick={() => { setErrorMessage(''); setCurrentStep(1); }}
                  className={`p-2.5 border font-pixel text-[8px] sm:text-[9px] uppercase flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    currentStep === 1
                      ? 'border-[#FFE600] bg-[#FFE600] text-black font-black shadow-brutal-yellow'
                      : currentStep > 1
                      ? 'border-[#10B981] bg-[#10B981]/20 text-[#10B981]'
                      : 'border-white/10 text-slate-500 bg-transparent'
                  }`}
                >
                  <span>{currentStep > 1 ? '✓' : '1.'}</span>
                  <span className="truncate">JUEGO</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isSoloGame && !teamName.trim()) {
                      setErrorMessage('Por favor ingresa el nombre de tu equipo para ir al Paso 2.');
                      return;
                    }
                    setErrorMessage('');
                    setCurrentStep(2);
                  }}
                  className={`p-2.5 border font-pixel text-[8px] sm:text-[9px] uppercase flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    currentStep === 2
                      ? 'border-[#FFE600] bg-[#FFE600] text-black font-black shadow-brutal-yellow'
                      : currentStep > 2
                      ? 'border-[#10B981] bg-[#10B981]/20 text-[#10B981]'
                      : 'border-white/10 text-slate-500 bg-transparent'
                  }`}
                >
                  <span>{currentStep > 2 ? '✓' : '2.'}</span>
                  <span className="truncate">ROSTER</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isSoloGame && !teamName.trim()) {
                      setErrorMessage('Completa el nombre de tu equipo en el Paso 1.');
                      setCurrentStep(1);
                      return;
                    }
                    if (!captain.name.trim() || !captain.gameId.trim() || !captain.whatsapp.trim()) {
                      setErrorMessage('Completa los datos del capitán / jugador en el Paso 2.');
                      setCurrentStep(2);
                      return;
                    }
                    if (!isSoloGame) {
                      const requiredCount = selectedGame === 'valorant' ? 4 : selectedGame === 'free_fire' ? 3 : 1;
                      for (let i = 0; i < requiredCount; i++) {
                        const m = members[i];
                        if (!m || !m.name?.trim() || !m.gameId?.trim() || !m.whatsapp?.trim()) {
                          setErrorMessage(`Completa los datos del Jugador #${i + 2} en el Paso 2.`);
                          setCurrentStep(2);
                          return;
                        }
                      }
                    }
                    setErrorMessage('');
                    setCurrentStep(3);
                  }}
                  className={`p-2.5 border font-pixel text-[8px] sm:text-[9px] uppercase flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    currentStep === 3
                      ? 'border-[#FFE600] bg-[#FFE600] text-black font-black shadow-brutal-yellow'
                      : 'border-white/10 text-slate-500 bg-transparent'
                  }`}
                >
                  <span>3.</span>
                  <span className="truncate">PAGO</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-3.5 bg-black border-2 border-[#FF0055] text-[#FF0055] font-pixel text-[10px] flex items-start gap-2.5 shadow-brutal-black animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#FF0055] mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* PASO 1: JUEGO & MODALIDAD                                */}
              {/* ======================================================== */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Selector de Juego */}
                  <div className="space-y-2.5">
                    <label className="font-pixel text-[10px] text-[#FFE600] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#FFE600] text-black border border-black flex items-center justify-center text-[10px] font-black">1</span>
                      <span>SELECCIONA EL VIDEOJUEGO // SLOT</span>
                    </label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {GAMES.map((game) => {
                        const isSelected = selectedGame === game.id;
                        return (
                          <button
                            key={game.id}
                            type="button"
                            onClick={() => {
                              setSelectedGame(game.id);
                              if (game.id === 'clash_royale') {
                                setIsFreeAgent(true);
                              }
                            }}
                            className={`btn-arcade-press p-3 border-2 border-black text-left transition relative cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#FFE600] text-black shadow-brutal-yellow font-black'
                                : 'bg-black text-slate-300 hover:text-white shadow-brutal-black'
                            }`}
                          >
                            <div className="w-6 h-6 mb-2 flex items-center justify-center">
                              <GameLogo gameId={game.id} color={isSelected ? '#000000' : game.color} />
                            </div>
                            <div>
                              <h4 className="font-display font-black text-sm uppercase leading-tight">
                                {game.name}
                              </h4>
                              <span className={`font-pixel text-[8px] block mt-1 ${isSelected ? 'text-black' : 'text-[#FFE600]'}`}>
                                {game.badge}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Aviso de Torneo Virtual y Transmisiones en Vivo */}
                  <div className="p-3 bg-black border-2 border-[#00F0FF] flex items-center justify-between gap-3 text-xs font-cyber shadow-brutal-cyan">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF0055] animate-ping shrink-0 inline-block" />
                      <span className="text-slate-200">
                        Torneo <strong className="text-[#00F0FF]">100% virtual</strong> (compite desde casa) • Todas las partidas se transmitirán en vivo.
                      </span>
                    </div>
                    <span className="font-pixel text-[8px] bg-[#00F0FF] text-black px-2 py-0.5 font-bold uppercase shrink-0 hidden sm:inline-block">
                      LIVE STREAM
                    </span>
                  </div>

                  {/* Tipo de Participación */}
                  <div className="p-4 bg-black border-2 border-black space-y-3 shadow-brutal-black">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-pixel text-[9px] text-[#FFE600] uppercase">
                          TIPO DE PARTICIPACION
                        </h4>
                        <p className="text-xs text-slate-400 font-cyber mt-0.5">
                          {selectedGame === 'clash_royale'
                            ? 'En Clash Royale la modalidad oficial es exclusivamente 1v1 Individual. No existe inscripción por equipos.'
                            : '¿Participas con tu equipo armado o te inscribes de forma individual?'}
                        </p>
                      </div>

                      {selectedGame === 'clash_royale' ? (
                        <div className="flex items-center gap-2">
                          <div className="font-pixel text-[9px] px-3.5 py-2 bg-[#A855F7] text-white border-2 border-black font-black uppercase shadow-brutal-purple flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5" />
                            <span>1v1 INDIVIDUAL ($1.00 USD)</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsFreeAgent(false)}
                            className={`btn-arcade-press font-pixel text-[9px] px-3 py-2 border-2 border-black uppercase cursor-pointer ${
                              !isFreeAgent
                                ? 'bg-[#FFE600] text-black font-black shadow-brutal-yellow'
                                : 'bg-[#0E1524] text-slate-400 hover:text-white shadow-brutal-black'
                            }`}
                          >
                            CON MI EQUIPO
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsFreeAgent(true)}
                            className={`btn-arcade-press font-pixel text-[9px] px-3 py-2 border-2 border-black uppercase cursor-pointer ${
                              isFreeAgent
                                ? 'bg-[#00F0FF] text-black font-black shadow-brutal-cyan'
                                : 'bg-[#0E1524] text-slate-400 hover:text-white shadow-brutal-black'
                            }`}
                          >
                            INDIVIDUAL
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nombre de Equipo */}
                  {!isSoloGame && (
                    <div className="space-y-1.5 bg-[#080D17] border-2 border-black p-4 shadow-brutal-black">
                      <label className="font-pixel text-[9px] uppercase text-[#FFE600] block font-bold">
                        NOMBRE DEL EQUIPO / CLAN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. CyberKnights, NullPointers, Dragons..."
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#101726] border-2 border-[#00F0FF]/40 text-xs sm:text-sm text-[#00F0FF] placeholder:text-slate-500 focus:border-[#FFE600] focus:bg-[#152035] focus:outline-none font-cyber uppercase shadow-brutal-black transition-colors"
                      />
                    </div>
                  )}

                  {/* Step 1 Navigation Bar */}
                  <div className="pt-3 border-t-2 border-white/10 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isSoloGame && !teamName.trim()) {
                          setErrorMessage('Por favor ingresa el nombre de tu equipo para continuar.');
                          return;
                        }
                        setErrorMessage('');
                        setCurrentStep(2);
                      }}
                      className="btn-arcade-press shadow-brutal-yellow w-full sm:w-auto px-6 py-3.5 bg-[#FFE600] hover:bg-[#FFF04D] text-black border-2 border-black font-pixel font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>CONTINUAR AL PASO 2: ROSTER</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* PASO 2: ROSTER & JUGADORES                               */}
              {/* ======================================================== */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Datos del Capitán */}
                  <div className="space-y-2.5">
                    <label className="font-pixel text-[10px] text-[#FFE600] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#FFE600] text-black border border-black flex items-center justify-center text-[10px] font-black">2</span>
                      <span>{isSoloGame ? 'DATOS DEL JUGADOR' : 'DATOS DEL CAPITAN (JUGADOR #1)'}</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#080D17] border-2 border-black shadow-brutal-black">
                      <div className="space-y-1">
                        <span className="font-pixel text-[8px] text-slate-300 uppercase">NOMBRE COMPLETO *</span>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Carlos Mendoza"
                          value={captain.name}
                          onChange={(e) => setCaptain({ ...captain, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#101726] border-2 border-[#00F0FF]/35 hover:border-[#00F0FF]/70 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:border-[#FFE600] focus:bg-[#152035] focus:outline-none font-cyber shadow-brutal-black transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="font-pixel text-[8px] text-slate-300 uppercase">ID EN JUEGO (NICK) *</span>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Shadow#LAN"
                          value={captain.gameId}
                          onChange={(e) => setCaptain({ ...captain, gameId: e.target.value })}
                          className="w-full px-3 py-2 bg-[#101726] border-2 border-[#00F0FF]/35 hover:border-[#00F0FF]/70 text-xs sm:text-sm text-[#00F0FF] placeholder:text-slate-400 focus:border-[#FFE600] focus:bg-[#152035] focus:outline-none font-cyber shadow-brutal-black transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="font-pixel text-[8px] text-slate-300 uppercase">WHATSAPP ACTIVO *</span>
                        <input
                          type="tel"
                          required
                          placeholder="Ej. 0987654321"
                          value={captain.whatsapp}
                          onChange={(e) => setCaptain({ ...captain, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 bg-[#101726] border-2 border-[#00F0FF]/35 hover:border-[#00F0FF]/70 text-xs sm:text-sm text-[#FFE600] placeholder:text-slate-400 focus:border-[#FFE600] focus:bg-[#152035] focus:outline-none font-mono shadow-brutal-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Miembros del Equipo */}
                  {!isSoloGame && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="font-pixel text-[10px] text-[#FFE600] uppercase tracking-wider flex items-center gap-2">
                          <span className="w-5 h-5 bg-[#FFE600] text-black border border-black flex items-center justify-center text-[10px] font-black">3</span>
                          <span>COMPAÑEROS DE EQUIPO (ROSTER)</span>
                        </label>
                        <span className="font-pixel text-[8px] text-slate-400">
                          {selectedGame === 'valorant' ? '4 TITULARES (+1 SUPLENTE)' : selectedGame === 'free_fire' ? '3 TITULARES' : '1 PAREJA / DUO'}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {Array.from({ length: selectedGame === 'valorant' ? 4 : selectedGame === 'free_fire' ? 3 : 1 }).map((_, idx) => (
                          <div key={idx} className="p-3 bg-[#080D17] border-2 border-black grid grid-cols-1 sm:grid-cols-3 gap-2.5 shadow-brutal-black">
                            <input
                              type="text"
                              required
                              placeholder={`Jugador #${idx + 2} - Nombre`}
                              value={members[idx]?.name || ''}
                              onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                              className="px-3 py-2 bg-[#121929] border-2 border-[#00F0FF]/35 hover:border-[#00F0FF]/70 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:border-[#FFE600] focus:bg-[#162136] focus:outline-none font-cyber transition-colors"
                            />
                            <input
                              type="text"
                              required
                              placeholder="ID de Juego / Nick"
                              value={members[idx]?.gameId || ''}
                              onChange={(e) => handleMemberChange(idx, 'gameId', e.target.value)}
                              className="px-3 py-2 bg-[#121929] border-2 border-[#00F0FF]/35 hover:border-[#00F0FF]/70 text-xs sm:text-sm text-[#00F0FF] placeholder:text-slate-400 focus:border-[#FFE600] focus:bg-[#162136] focus:outline-none font-cyber transition-colors"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="WhatsApp (+593...)"
                              value={members[idx]?.whatsapp || ''}
                              onChange={(e) => handleMemberChange(idx, 'whatsapp', e.target.value)}
                              className="px-3 py-2 bg-[#121929] border-2 border-[#00F0FF]/35 hover:border-[#00F0FF]/70 text-xs sm:text-sm text-[#FFE600] placeholder:text-slate-400 focus:border-[#FFE600] focus:bg-[#162136] focus:outline-none font-mono transition-colors"
                            />
                          </div>
                        ))}

                        {/* Suplente Opcional en Valorant */}
                        {selectedGame === 'valorant' && (
                          <div className="pt-1">
                            {!hasSubstitute ? (
                              <button
                                type="button"
                                onClick={() => setHasSubstitute(true)}
                                className="btn-arcade-press font-pixel text-[9px] font-bold text-[#FFE600] p-2 bg-black border-2 border-[#FFE600] uppercase cursor-pointer shadow-brutal-black"
                              >
                                + AGREGAR SUPLENTE OPCIONAL (GRATIS)
                              </button>
                            ) : (
                              <div className="p-3 bg-[#110B1C] border-2 border-[#A855F7] space-y-2 shadow-brutal-purple">
                                <div className="flex items-center justify-between font-pixel text-[8px] text-[#A855F7] font-bold uppercase">
                                  <span>SUPLENTE OPCIONAL (JUGADOR #6):</span>
                                  <button
                                    type="button"
                                    onClick={() => setHasSubstitute(false)}
                                    className="text-rose-400 hover:text-white cursor-pointer"
                                  >
                                    [ QUITAR ]
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                  <input
                                    type="text"
                                    placeholder="Nombre Suplente"
                                    value={members[4]?.name || ''}
                                    onChange={(e) => handleMemberChange(4, 'name', e.target.value)}
                                    className="px-3 py-2 bg-[#1A132E] border-2 border-[#A855F7]/40 hover:border-[#A855F7]/70 text-xs sm:text-sm text-white placeholder:text-purple-200/70 focus:border-[#A855F7] focus:bg-[#231840] focus:outline-none font-cyber transition-colors"
                                  />
                                  <input
                                    type="text"
                                    placeholder="ID Juego Suplente"
                                    value={members[4]?.gameId || ''}
                                    onChange={(e) => handleMemberChange(4, 'gameId', e.target.value)}
                                    className="px-3 py-2 bg-[#1A132E] border-2 border-[#A855F7]/40 hover:border-[#A855F7]/70 text-xs sm:text-sm text-[#A855F7] placeholder:text-purple-200/70 focus:border-[#A855F7] focus:bg-[#231840] focus:outline-none font-cyber transition-colors"
                                  />
                                  <input
                                    type="tel"
                                    placeholder="WhatsApp Suplente"
                                    value={members[4]?.whatsapp || ''}
                                    onChange={(e) => handleMemberChange(4, 'whatsapp', e.target.value)}
                                    className="px-3 py-2 bg-[#1A132E] border-2 border-[#A855F7]/40 hover:border-[#A855F7]/70 text-xs sm:text-sm text-white placeholder:text-purple-200/70 focus:border-[#A855F7] focus:bg-[#231840] focus:outline-none font-mono transition-colors"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2 Navigation Bar */}
                  <div className="pt-3 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => { setErrorMessage(''); setCurrentStep(1); }}
                      className="btn-arcade-press shadow-brutal-black w-full sm:w-auto px-5 py-3 border-2 border-black bg-black text-slate-300 hover:text-white font-pixel text-[10px] uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>PASO 1: JUEGO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!captain.name.trim() || !captain.gameId.trim() || !captain.whatsapp.trim()) {
                          setErrorMessage('Por favor completa todos los datos obligatorios del Capitán / Jugador principal.');
                          return;
                        }
                        if (!isSoloGame) {
                          const requiredCount = selectedGame === 'valorant' ? 4 : selectedGame === 'free_fire' ? 3 : 1;
                          for (let i = 0; i < requiredCount; i++) {
                            const m = members[i];
                            if (!m || !m.name?.trim() || !m.gameId?.trim() || !m.whatsapp?.trim()) {
                              setErrorMessage(`Por favor completa todos los datos del Jugador #${i + 2}.`);
                              return;
                            }
                          }
                        }
                        setErrorMessage('');
                        setCurrentStep(3);
                      }}
                      className="btn-arcade-press shadow-brutal-yellow w-full sm:w-auto px-6 py-3.5 bg-[#FFE600] hover:bg-[#FFF04D] text-black border-2 border-black font-pixel font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>CONTINUAR AL PASO 3: PAGO</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* PASO 3: PAGO & CONFIRMACION                              */}
              {/* ======================================================== */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  
                  {/* Resumen del Registro */}
                  <div className="p-4 bg-black border-2 border-[#FFE600] shadow-brutal-yellow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-cyber">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-[8px] bg-[#FFE600] text-black px-2 py-0.5 font-black uppercase">
                          RESUMEN
                        </span>
                        <span className="text-white font-bold text-sm uppercase font-display tracking-wider">
                          {isSoloGame ? (selectedGame === 'clash_royale' ? 'Clash Royale 1v1' : `Individual (${captain.name || 'Solitario'})`) : teamName}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1 font-cyber">
                        Torneo: <strong className="text-white">{gameConfig.name}</strong> • {isSoloGame ? '1 Jugador' : `${selectedGame === 'valorant' ? (hasSubstitute ? '6' : '5') : selectedGame === 'free_fire' ? '4' : '2'} Jugadores`}
                      </div>
                    </div>

                    <div className="text-right self-end sm:self-auto">
                      <span className="font-pixel text-[8px] text-slate-400 block uppercase">VALOR TOTAL:</span>
                      <span className="text-xl sm:text-2xl font-black text-[#FFE600] font-pixel block">
                        ${totalCost.toFixed(2)} <span className="text-xs text-slate-400">USD</span>
                      </span>
                    </div>
                  </div>

                  {/* Pregunta: Pagar Ahora o Pagar Después */}
                  <div className="space-y-4 p-4 sm:p-5 bg-black border-4 border-black shadow-brutal-black">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-white/10 font-pixel">
                      <label className="text-[10px] text-[#FFE600] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#FFE600] text-black border border-black flex items-center justify-center text-[10px] font-black">3</span>
                        <span>SELECCIONA: ¿PAGAR AHORA O PAGAR DESPUES?</span>
                      </label>
                    </div>

                    {/* Los 2 botones selectores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMode('now')}
                        className={`btn-arcade-press p-4 border-2 border-black text-left transition flex flex-col justify-between cursor-pointer ${
                          paymentMode === 'now'
                            ? 'bg-[#FFE600] text-black shadow-brutal-yellow font-black'
                            : 'bg-[#0B101A] text-slate-300 shadow-brutal-black'
                        }`}
                      >
                        <div className="flex items-center justify-between font-pixel text-[10px]">
                          <span className="flex items-center gap-2">
                            <Zap className="w-4 h-4 fill-current" />
                            PAGAR AHORA
                          </span>
                          {paymentMode === 'now' && (
                            <span className="bg-black text-[#FFE600] px-1.5 py-0.5 text-[8px]">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-2 font-cyber leading-relaxed ${paymentMode === 'now' ? 'text-black font-bold' : 'text-slate-400'}`}>
                          Ver datos bancarios y subir la foto del comprobante ahora mismo.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMode('later')}
                        className={`btn-arcade-press p-4 border-2 border-black text-left transition flex flex-col justify-between cursor-pointer ${
                          paymentMode === 'later'
                            ? 'bg-[#00F0FF] text-black shadow-brutal-cyan font-black'
                            : 'bg-[#0B101A] text-slate-300 shadow-brutal-black'
                        }`}
                      >
                        <div className="flex items-center justify-between font-pixel text-[10px]">
                          <span className="flex items-center gap-2">
                            <Link2 className="w-4 h-4" />
                            PAGAR DESPUES
                          </span>
                          {paymentMode === 'later' && (
                            <span className="bg-black text-[#00F0FF] px-1.5 py-0.5 text-[8px]">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-2 font-cyber leading-relaxed ${paymentMode === 'later' ? 'text-black font-bold' : 'text-slate-400'}`}>
                          Paga después con el link que se te genera o enviando la captura al WhatsApp 0962074110.
                        </p>
                      </button>
                    </div>

                    {/* Si eligió PAGAR AHORA */}
                    {paymentMode === 'now' && (
                      <div className="space-y-4 pt-3 border-t-2 border-white/10 animate-in fade-in duration-150">
                        {/* Caja de Datos Bancarios */}
                        <div className="p-4 bg-[#090D15] border-2 border-black space-y-3 shadow-brutal-black">
                          <div className="flex items-center justify-between font-pixel text-[9px] pb-2 border-b-2 border-white/10">
                            <span className="text-[#FFE600] uppercase font-bold flex items-center gap-2">
                              <CreditCard className="w-3.5 h-3.5 text-[#FFE600]" />
                              <span>DATOS DE TRANSFERENCIA</span>
                            </span>
                            <span className="bg-[#FFE600] text-black font-pixel text-[9px] px-2 py-0.5 font-black">
                              VALOR: ${totalCost.toFixed(2)} USD
                            </span>
                          </div>

                          {/* Número de cuenta */}
                          <div className="p-3 bg-[#0C121D] border-2 border-[#FFE600] flex items-center justify-between gap-3 shadow-brutal-yellow">
                            <div>
                              <span className="font-pixel text-[8px] text-[#FFE600] block uppercase tracking-wider">
                                NUMERO DE CUENTA // PICHINCHA
                              </span>
                              <strong className="text-white font-pixel text-base sm:text-lg tracking-widest select-all block mt-0.5">
                                {BANK_INFO.accountNumber}
                              </strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(BANK_INFO.accountNumber, 'account')}
                              className="btn-arcade-press shadow-brutal-pink px-4 py-2 bg-[#FFE600] hover:bg-[#FFF04D] text-black border-2 border-black font-pixel text-[9px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer font-black shrink-0"
                            >
                              {copiedAccount ? <Check className="w-3.5 h-3.5 stroke-[3] text-black" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedAccount ? '¡COPIADO!' : 'COPIAR'}</span>
                            </button>
                          </div>

                          {/* Banco, Tipo, Titular */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-black p-3.5 border-2 border-black">
                            <div>
                              <span className="font-pixel text-[8px] text-slate-500 uppercase block">BANCO</span>
                              <strong className="text-white font-cyber text-xs block font-bold mt-0.5">{BANK_INFO.bank}</strong>
                            </div>

                            <div>
                              <span className="font-pixel text-[8px] text-slate-500 uppercase block">TIPO CUENTA</span>
                              <strong className="text-white font-cyber text-xs block font-bold mt-0.5">{BANK_INFO.accountType}</strong>
                            </div>

                            <div>
                              <span className="font-pixel text-[8px] text-slate-500 uppercase block">TITULAR</span>
                              <strong className="text-[#00F0FF] font-cyber text-xs block font-bold mt-0.5">{BANK_INFO.holderName}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Subida de Captura */}
                        <div className="space-y-2">
                          <span className="font-pixel text-[9px] uppercase text-[#FFE600] block font-bold">
                            ADJUNTAR CAPTURA DEL COMPROBANTE *
                          </span>

                          {!receiptPreview ? (
                            <label className="crt-monitor-screen border-4 border-dashed border-white/20 hover:border-[#FFE600] bg-black p-6 flex flex-col items-center justify-center cursor-pointer transition group">
                              <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-[#FFE600] transition-colors" />
                              <span className="font-pixel text-[10px] font-black text-white mb-1 uppercase tracking-wider text-center group-hover:text-[#FFE600]">
                                [ CLIC PARA INSERTAR COMPROBANTE O ARRASTRA AQUI ]
                              </span>
                              <span className="text-[10px] text-slate-400 font-cyber text-center">
                                JPG, PNG o captura de pantalla (Max 5MB)
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleReceiptChange}
                                className="hidden"
                              />
                            </label>
                          ) : (
                            <div className="p-3 bg-black border-2 border-black flex items-center justify-between gap-4 shadow-brutal-black">
                              <div className="flex items-center gap-3">
                                <img
                                  src={receiptPreview}
                                  alt="Vista previa comprobante"
                                  className="w-14 h-14 object-cover border-2 border-[#FFE600]"
                                />
                                <div>
                                  <span className="font-pixel text-[9px] font-black text-white block uppercase">
                                    COMPROBANTE LISTO
                                  </span>
                                  <span className="font-pixel text-[8px] text-[#10B981] flex items-center gap-1 mt-0.5">
                                    <Check className="w-3 h-3 stroke-[3]" /> IMAGEN CARGADA
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => { setReceiptPreview(null); setReceiptFile(null); }}
                                className="btn-arcade-press shadow-brutal-pink px-3 py-1.5 bg-[#FF0055] text-white border-2 border-black font-pixel text-[8px] uppercase font-black cursor-pointer"
                              >
                                CAMBIAR
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Si eligió PAGAR DESPUÉS */}
                    {paymentMode === 'later' && (
                      <div className="p-4 bg-black border-2 border-[#00F0FF] space-y-3 pt-3 animate-in fade-in duration-150 shadow-brutal-cyan">
                        <div className="flex items-center gap-2 font-pixel text-[9px] text-[#00F0FF]">
                          <span className="w-2 h-2 bg-[#00F0FF] inline-block animate-arcade-blink" />
                          <span className="uppercase font-bold">
                            PAGAR DESPUES (${totalCost.toFixed(2)} USD)
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-cyber leading-relaxed">
                          ¡Aparta tu cupo ahora mismo! Paga después con cualquiera de estas opciones:
                        </p>

                        <div className="space-y-2 text-xs font-cyber text-slate-300">
                          <div className="p-3 bg-[#0C121D] border-2 border-black flex items-start gap-2.5">
                            <span className="text-[#00F0FF] font-pixel text-[9px] shrink-0 font-bold">1.</span>
                            <span>
                              <strong className="text-white">Con el link que se te genera:</strong> Al registrarte se creará un link exclusivo donde podrás entrar cuando quieras a subir la captura de tu comprobante.
                            </span>
                          </div>
                          <div className="p-3 bg-[#0C121D] border-2 border-black flex items-start gap-2.5">
                            <span className="text-[#10B981] font-pixel text-[9px] shrink-0 font-bold">2.</span>
                            <span>
                              <strong className="text-white">O por WhatsApp:</strong> Envía la captura de transferencia, tu nombre e ID de registro directamente al WhatsApp <strong className="text-[#10B981]">0962074110</strong>.
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3 Navigation & Submission Bar */}
                  <div className="pt-3 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => { setErrorMessage(''); setCurrentStep(2); }}
                      className="btn-arcade-press shadow-brutal-black w-full sm:w-auto px-5 py-3 border-2 border-black bg-black text-slate-300 hover:text-white font-pixel text-[10px] uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>PASO 2: ROSTER</span>
                    </button>

                    <div className="w-full sm:w-auto flex-1 sm:max-w-md">
                      {editingRegistration ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="btn-arcade-press shadow-brutal-cyan flex-1 py-3.5 bg-[#00F0FF] hover:bg-white text-black font-pixel font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-2 border-black"
                          >
                            {submitting ? (
                              <span>GUARDANDO...</span>
                            ) : (
                              <>
                                <Check className="w-4 h-4 stroke-[3]" />
                                <span>[ GUARDAR CAMBIOS ]</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={submitting}
                            onClick={async (e) => {
                              const updated = await handleSubmit(e, paymentMode || 'later');
                              if (updated && onNavigateToPayment) {
                                onClose();
                                onNavigateToPayment(editingRegistration.id);
                              }
                            }}
                            className="btn-arcade-press shadow-brutal-yellow flex-1 py-3.5 bg-[#FFE600] hover:bg-[#FFF04D] text-black font-pixel font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-2 border-black"
                          >
                            <span>[ CONTINUAR AL PAGO ]</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </button>
                        </div>
                      ) : paymentMode === 'now' ? (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-arcade-press shadow-brutal-pink w-full py-4 bg-[#FFE600] hover:bg-[#FFF04D] text-black font-pixel font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-2 border-black"
                        >
                          {submitting ? (
                            <span>ENVIANDO REGISTRO Y VOUCHER...</span>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 fill-black" />
                              <span>[ PAGAR Y ENVIAR REGISTRO (${totalCost.toFixed(2)} USD) ]</span>
                            </>
                          )}
                        </button>
                      ) : paymentMode === 'later' ? (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-arcade-press shadow-brutal-cyan w-full py-4 bg-[#00F0FF] hover:bg-[#5CE1E6] text-black font-pixel font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-2 border-black"
                        >
                          {submitting ? (
                            <span>GUARDANDO PRE-REGISTRO...</span>
                          ) : (
                            <>
                              <Link2 className="w-4 h-4 stroke-[3]" />
                              <span>[ PRE-REGISTRARSE // PAGAR DESPUES ]</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-arcade-press shadow-brutal-black w-full py-4 bg-[#141C2B] hover:bg-[#1E293B] text-slate-300 hover:text-white font-pixel text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-white/20"
                        >
                          <ArrowRight className="w-4 h-4 text-[#FFE600]" />
                          <span>[ SELECCIONA: AHORA O DESPUES ]</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
