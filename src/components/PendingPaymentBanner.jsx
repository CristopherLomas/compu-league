import React from 'react';
import { AlertCircle, ArrowRight, X, Clock, Coins, Edit, CheckCircle } from 'lucide-react';

export default function PendingPaymentBanner({
  pendingPayments = [],
  pendingPayment = null,
  onContinue,
  onDismiss,
  onEdit
}) {
  const items = Array.isArray(pendingPayments) && pendingPayments.length > 0 
    ? pendingPayments 
    : (pendingPayment ? [pendingPayment] : []);

  if (items.length === 0) return null;

  // Single Item View
  if (items.length === 1) {
    const item = items[0];
    const teamName = item.team_name || 'Tu Equipo';
    const gameName = item.game_name || item.game || 'Torneo';
    const captainName = item.captain_name || '';
    const amount = Number(item.amount_due || item.total_amount || 1).toFixed(2);

    return (
      <div className="fixed bottom-3 inset-x-3 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-xl sm:w-full z-50 animate-in slide-in-from-bottom duration-200 font-sans select-none">
        <div className="relative border-4 border-black bg-[#0C111C] p-4 sm:p-5 shadow-brutal-yellow">
          
          {/* Close "X" Button */}
          <button
            onClick={onDismiss}
            aria-label="Cerrar aviso temporalmente"
            className="btn-arcade-press absolute top-3 right-3 p-1.5 border-2 border-black bg-black text-white hover:text-[#FFE600] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black font-pixel text-[9px] sm:text-[10px]">
            <span className="w-2.5 h-2.5 bg-[#FF0055] inline-block animate-arcade-blink" />
            <span className="text-[#FFE600] uppercase font-bold tracking-wider">
              [ ! ] PENDING COIN // PRE-REGISTRO DETECTADO
            </span>
          </div>

          {/* Content Body */}
          <div className="space-y-2 mb-4 relative z-10 text-left">
            <p className="text-xs text-slate-300 font-cyber">
              {captainName ? `¡Hola ${captainName}! ` : ''}Detectamos una pre-inscripción pendiente en este dispositivo:
            </p>

            <div className="p-3 bg-black border-2 border-black flex items-center justify-between gap-3 shadow-brutal-black">
              <div className="truncate min-w-0">
                <span className="text-white text-base sm:text-lg font-black font-display uppercase tracking-wider block truncate">
                  {teamName}
                </span>
                <span className="text-xs text-[#00F0FF] font-pixel uppercase tracking-wider block mt-0.5">
                  {gameName}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[8px] text-slate-400 font-pixel uppercase block">TICKET:</span>
                <span className="text-base sm:text-xl font-black text-[#FFE600] font-pixel block">
                  ${amount} <span className="text-xs text-slate-400">USD</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-[#00F0FF] font-cyber">
              ¿Deseas completar el pago o necesitas corregir algún dato?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 relative z-10">
            <button
              type="button"
              onClick={() => onContinue(item.id)}
              className="btn-arcade-press shadow-brutal-pink flex-1 py-3 px-3.5 bg-[#FFE600] hover:bg-[#FFF04D] text-black border-2 border-black font-pixel font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <span>[ CONTINUAR CON EL PAGO ]</span>
              <ArrowRight className="w-4 h-4 shrink-0 stroke-[3]" />
            </button>

            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="btn-arcade-press shadow-brutal-cyan py-3 px-3.5 border-2 border-black bg-[#00F0FF] hover:bg-white text-black font-pixel font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>EDITAR DATOS</span>
              </button>
            )}

            <button
              type="button"
              onClick={onDismiss}
              className="btn-arcade-press shadow-brutal-black py-3 px-3 border-2 border-black bg-black text-slate-300 hover:text-white font-pixel text-[10px] uppercase tracking-wider transition-all text-center cursor-pointer"
            >
              MÁS TARDE
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Multiple Items View (2 or more pending games!)
  return (
    <div className="fixed bottom-3 inset-x-3 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-xl sm:w-full z-50 animate-in slide-in-from-bottom duration-200 font-sans select-none">
      <div className="relative border-4 border-black bg-[#0C111C] p-4 sm:p-5 shadow-brutal-yellow">
        
        {/* Close "X" Button */}
        <button
          onClick={onDismiss}
          aria-label="Cerrar aviso temporalmente"
          className="btn-arcade-press absolute top-3 right-3 p-1.5 border-2 border-black bg-black text-white hover:text-[#FFE600] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black font-pixel text-[9px] sm:text-[10px]">
          <span className="w-2.5 h-2.5 bg-[#FF0055] inline-block animate-arcade-blink" />
          <span className="text-[#FFE600] uppercase font-bold tracking-wider">
            [ ! ] PENDING COINS // {items.length} PRE-REGISTROS PENDIENTES
          </span>
        </div>

        {/* Content Body */}
        <div className="space-y-2 mb-3 relative z-10 text-left">
          <p className="text-xs text-slate-300 font-cyber">
            Detectamos <strong className="text-white">{items.length} juegos</strong> pre-inscritos pendientes de pago en este dispositivo:
          </p>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {items.map((item) => {
              const amount = Number(item.amount_due || item.total_amount || 1).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="p-3 bg-black border-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-brutal-black"
                >
                  <div className="truncate min-w-0">
                    <span className="text-white text-sm font-black font-display uppercase tracking-wider block truncate">
                      {item.team_name}
                    </span>
                    <span className="text-[11px] text-[#00F0FF] font-pixel uppercase tracking-wider block mt-0.5">
                      {item.game_name || item.game} • <strong className="text-[#FFE600] font-black">${amount} USD</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onContinue(item.id)}
                      className="btn-arcade-press shadow-brutal-pink py-2 px-3 bg-[#FFE600] hover:bg-[#FFF04D] text-black border border-black font-pixel font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>[ PAGAR ]</span>
                      <ArrowRight className="w-3 h-3 stroke-[3]" />
                    </button>

                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="btn-arcade-press p-2 border border-black bg-[#00F0FF] text-black font-pixel text-[9px] uppercase cursor-pointer"
                        title="Editar datos"
                      >
                        <Edit className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 font-cyber pt-1">
            💡 Puedes subir el comprobante individualmente para cada juego.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end pt-1 relative z-10">
          <button
            type="button"
            onClick={onDismiss}
            className="btn-arcade-press shadow-brutal-black py-2.5 px-4 border-2 border-black bg-black text-slate-300 hover:text-white font-pixel text-[10px] uppercase tracking-wider transition-all cursor-pointer"
          >
            MÁS TARDE
          </button>
        </div>

      </div>
    </div>
  );
}
