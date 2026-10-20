import React from 'react';
import { MessageSquare, Phone, ArrowUp, Coins, Zap, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data/tournamentData';

export default function Footer({ onOpenRegister }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t-4 border-black pt-12 pb-10 sm:pt-16 sm:pb-12 relative overflow-hidden text-slate-100 font-sans select-none">
      
      {/* Background Cyber Grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#FFE600 1px, transparent 1px), linear-gradient(90deg, #FFE600 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b-2 border-white/10">
          
          {/* Col 1: Brand & Tournament Crest */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/buho_pixel_start.png" 
                alt="Logo Compu League 2026" 
                className="w-12 h-12 object-contain shape-crisp drop-shadow-[0_0_10px_rgba(255,230,0,0.5)]"
                style={{ imageRendering: 'pixelated' }}
              />
              <div>
                <span className="font-pixel text-[8px] text-[#FFE600] uppercase block">
                  TORNEO OFICIAL CARRERA DE COMPUTACION
                </span>
                <span className="text-xl font-black text-white tracking-wider font-display uppercase leading-tight block">
                  COMPU LEAGUE
                </span>
                <span className="font-pixel text-[9px] text-[#FFE600] uppercase">
                  E-SPORTS 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-cyber">
              El torneo oficial de la carrera de Computación. Compite individualmente o con tu equipo, domina la partida y demuestra quien es el mejor.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10B981] text-black border-2 border-black font-pixel text-[8px] font-black uppercase">
              <span className="w-2 h-2 bg-black animate-arcade-blink" />
              <span>INSCRIPCIONES ABIERTAS</span>
            </div>
          </div>

          {/* Col 2: Patrocinadores Oficiales */}
          <div className="space-y-3">
            <h4 className="font-pixel text-[10px] uppercase text-[#FFE600] tracking-wider">
              [ PATROCINADORES ]
            </h4>
            
            {/* Sponsor: KOA (Integrado directamente a la página, sin contenedor) */}
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/koadevss?exln=MTlyeTdqaHo1bTBkbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group"
                title="Visitar KOA (@koadevss)"
              >
                <img 
                  src="/assets/koa_sponsor.png" 
                  alt="KOA - Desarrollo inteligente, soluciones naturales" 
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_1px_rgba(255,255,255,0.85)] drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                />
              </a>

              <p className="text-xs text-slate-300 font-cyber leading-relaxed">
                <strong className="text-white">KOA</strong> • Desarrollo inteligente, soluciones naturales.
              </p>

              {/* Botones de Redes Sociales de KOA */}
              <div className="flex items-center gap-2 pt-1 font-cyber">
                <a
                  href="https://www.instagram.com/koadevss?exln=MTlyeTdqaHo1bTBkbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-arcade-press flex items-center justify-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-[10px] uppercase tracking-wide border border-black shadow-brutal-black transition hover:opacity-95"
                  title="Instagram de KOA (@koadevss)"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.tiktok.com/@koadevss?_r=1&_t=ZS-9AhmIfmL6wi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-arcade-press flex items-center justify-center gap-1.5 py-1.5 px-3 bg-black hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wide border border-[#00F0FF]/60 shadow-brutal-cyan transition"
                  title="TikTok de KOA (@koadevss)"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#00F0FF] shrink-0" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.45 6.3 6.3 0 0 0 1.87-4.45v-6.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.87-.19z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Torneo Info & Premios */}
          <div className="space-y-3">
            <h4 className="font-pixel text-[10px] uppercase text-[#FFE600] tracking-wider">
              [ INTEL DEL TORNEO ]
            </h4>
            <div className="text-xs text-slate-300 space-y-2 font-cyber">
              <p className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Estado:</span>
                <strong className="text-[#10B981] font-pixel text-[9px]">FASE DE REGISTRO</strong>
              </p>
              <p className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Fechas:</span>
                <strong className="text-white font-bold">4, 5 y 6 Noviembre</strong>
              </p>
              <p className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Modalidad:</span>
                <strong className="text-[#00F0FF] font-bold">Online / Multiplataforma</strong>
              </p>
              
              <div className="p-3 bg-[#0B101A] border-2 border-[#FFE600] text-[#FFE600] shadow-brutal-black">
                <div className="flex items-center gap-2 font-pixel text-[9px] font-black uppercase">
                  <span className="text-[#FFE600] text-xs font-pixel font-black">$</span>
                  <span>PREMIOS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Soporte y Staff WhatsApp + Discord Oficial */}
          <div className="space-y-3">
            <h4 className="font-pixel text-[10px] uppercase text-[#FFE600] tracking-wider">
              [ CANALES DE SOPORTE ]
            </h4>
            
            <p className="text-xs text-slate-400 font-cyber">
              ¿Dudas sobre inscripciones o transferencias bancarias? Escríbenos directamente:
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={CONTACT_INFO.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade-press shadow-brutal-black flex items-center justify-center gap-2 px-4 py-3 bg-[#10B981] hover:bg-[#15D494] text-black border-2 border-black font-pixel font-black text-[9px] uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {CONTACT_INFO.whatsappStaff}</span>
              </a>

              {/* Discord Oficial en morado */}
              <a
                href={CONTACT_INFO.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade-press shadow-brutal-black w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#5865F2] hover:bg-[#6975F7] text-white border-2 border-black font-pixel font-black text-[9px] uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>[ ENTRAR AL DISCORD OFICIAL ]</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-pixel text-[8px] sm:text-[9px] text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span>© 2026 COMPU LEAGUE E-SPORTS</span>
            <span>•</span>
            <span className="text-[#FFE600]">CARRERA DE COMPUTACIÓN</span>
          </div>

          <button
            onClick={scrollToTop}
            className="btn-arcade-press shadow-brutal-black px-3.5 py-2 border-2 border-black bg-[#0B101A] hover:bg-black text-[#FFE600] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <span>SUBIR</span>
            <ArrowUp className="w-3 h-3 stroke-[3]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
