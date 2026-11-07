import React, { useState } from 'react';
import { ArrowRight, Check, Monitor, Smartphone, Gamepad2, Coins, Lock } from 'lucide-react';
import { GameLogo } from './GameLogo';

const ARCADE_GAMES = [
  {
    id: 'valorant',
    slot: 'SLOT 01 // 5v5',
    name: 'VALORANT',
    badge: 'SHOOTER TACTICO',
    accentColor: '#FF0055',
    bgBorder: 'border-[#FF0055]',
    shadowClass: 'shadow-brutal-pink',
    image: '/assets/valorant_lobby.jpg',
    fallbackImage: '/assets/valorant.jpg',
    imagePosition: 'object-center',
    coinPrice: '$5.00',
    coinDetail: '$1.00 POR TITULAR (5 JUGADORES)',
    difficulty: 'COMPETITIVO',
    players: '5 TITULARES + 1 SUPLENTE',
    platform: 'PC EXCLUSIVO',
    platformIcon: Monitor,
    buttonText: '[ REGISTRAR 5V5 ]',
    rules: [
      'Eliminación directa oficial: Cuartos de Final, Semifinales y Gran Final.',
      'Partidas Bo1 en rondas eliminatorias; Gran Final Bo3 al mejor de 3 mapas.',
      'Mapas oficiales del circuito competitivo.',
    ],
  },
  {
    id: 'free_fire',
    slot: 'SLOT 02 // FINALIZADO',
    name: 'FREE FIRE',
    badge: '🏆 CAMPEONES: LOWE & PISA CABEZAS',
    accentColor: '#FFE600',
    bgBorder: 'border-[#FFE600]',
    shadowClass: 'shadow-brutal-yellow',
    image: '/assets/free_fire_lobby.jpg',
    fallbackImage: '/assets/free_fire.jpg',
    imagePosition: 'object-center',
    coinPrice: 'FINALIZADO',
    coinDetail: 'R1: LOWE • R2: PISA CABEZAS • IND: SEBASTIÁN GUZMÁN',
    difficulty: 'SURVIVAL',
    players: '16 ESCUADRAS (TORNEO CONCLUIDO)',
    platform: 'MOVIL / SALAS PRIVADAS',
    platformIcon: Smartphone,
    buttonText: '[ 🏆 CAMPEONES DEFINIDOS ]',
    rules: [
      '¡Torneo oficial de Free Fire concluido con éxito el Jueves 5 de Noviembre!',
      'Campeón Ronda 1 (Escuadras): LOWE (Booyah • Cap. Xavier Lema).',
      'Campeón Ronda 2 (Escuadras): PISA CABEZAS (Booyah • Cap. Leonel De La Torre).',
      'Gran Campeón Solitario / Individual: SEBASTIÁN GUZMÁN (Pisa Cabezas).',
    ],
  },
  {
    id: 'fortnite',
    slot: 'SLOT 03 // FINALIZADO',
    name: 'FORTNITE',
    badge: '🏆 CAMPEÓN: WINNERS (21 PTS)',
    accentColor: '#00F0FF',
    bgBorder: 'border-[#00F0FF]',
    shadowClass: 'shadow-brutal-cyan',
    image: '/assets/fortnite_lobby.jpg',
    fallbackImage: '/assets/fortnite.jpg',
    imagePosition: 'object-center',
    coinPrice: 'FINALIZADO',
    coinDetail: '1º: WINNERS (21 PTS) • 2º: PERRITOS ORG (16 PTS)',
    difficulty: 'VELOCIDAD',
    players: '13 DÚOS (TORNEO CONCLUIDO)',
    platform: 'PC / CONSOLA / MOVIL',
    platformIcon: Gamepad2,
    buttonText: '[ 🏆 CAMPEÓN DEFINIDO ]',
    rules: [
      '¡Torneo oficial de Fortnite Dúos concluido con éxito el Viernes 6 de Noviembre!',
      'Gran Campeón Oficial: WINNERS (Anthony Hurtado & Darío Castro) con 21 Puntos.',
      'Subcampeón: PERRITOS ORG (Romel Maldonado & Alejandro Rivera) con 16 Puntos.',
      '3º y 4º Lugar: 67 Boys y CIBER empatados con 14 Puntos cada uno.',
    ],
  },
  {
    id: 'clash_royale',
    slot: 'SLOT 04 // FINALIZADO',
    name: 'CLASH ROYALE',
    badge: '🏆 CAMPEÓN: EDWIN LANDETA',
    accentColor: '#FFE600',
    bgBorder: 'border-[#FFE600]',
    shadowClass: 'shadow-brutal-yellow',
    image: '/assets/clash_royale_lobby.jpg',
    fallbackImage: '/assets/clash_royale.jpg',
    imagePosition: 'object-top',
    coinPrice: 'FINALIZADO',
    coinDetail: 'CAMPEÓN: EDWIN LANDETA (2-0)',
    difficulty: 'ESTRATEGIA',
    players: '1 JUGADOR (17 GLADIADORES)',
    platform: 'MOVIL (ANDROID / IOS)',
    platformIcon: Smartphone,
    buttonText: '[ 🏆 CAMPEÓN DEFINIDO ]',
    rules: [
      '¡Torneo oficial concluido el Miércoles 4 de Noviembre!',
      'Gran Campeón: Edwin Landeta tras vencer 2-0 en la Gran Final.',
      'Subcampeón: Stalin Obando • Semifinales: Milton Fuel y Kevin Pozo.',
    ],
  },
];

export default function GameCards({ onSelectGame }) {
  const [activeSlot, setActiveSlot] = useState(null);

  return (
    <section 
      id="juegos" 
      className="py-14 sm:py-24 bg-[#05070C] text-slate-100 font-sans select-none border-b-4 border-black relative overflow-hidden"
    >
      {/* Background Subtle Cyber Lines */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#FFE600 1px, transparent 1px), linear-gradient(90deg, #FFE600 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header (Arcade Slot Selection Machine) ─────────────── */}
        <div className="bg-[#0B101A] border-2 border-black p-5 sm:p-6 mb-10 shadow-brutal-black">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#FF0055] text-white font-pixel text-[9px] sm:text-[10px] px-2.5 py-1 border border-black font-black uppercase">
                  [ INSCRIPCIONES CERRADAS ]
                </span>
                <span className="bg-black text-[#FFE600] font-pixel text-[9px] sm:text-[10px] px-2.5 py-1 border border-[#FFE600]">
                  INICIO: MIÉRCOLES 4 // 9:00 PM
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-none">
                SELECCION DE <span className="text-[#FFE600]">JUEGOS</span>
              </h2>

              <p className="text-slate-300 font-cyber text-xs sm:text-sm max-w-2xl">
                Cada videojuego cuenta con su propio fixture y premios. Inscribe a tu equipo en el juego correspondiente.
              </p>
            </div>

            <div className="bg-black border-2 border-[#FFE600] p-3 font-pixel text-[9px] sm:text-[10px] text-[#FFE600] self-start md:self-auto shrink-0 shadow-brutal-yellow">
              <div className="animate-arcade-blink">★ TORNEO MULTIPLATAFORMA</div>
              <div className="text-slate-400 mt-1">4, 5 Y 6 NOVIEMBRE 2026</div>
            </div>

          </div>
        </div>

        {/* ── 4 Arcade Slots Grid (Cartuchos de Arcade) ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {ARCADE_GAMES.map((game) => {
            const isHovered = activeSlot === game.id;

            return (
              <div
                key={game.id}
                id={`game-${game.id}`}
                onMouseEnter={() => setActiveSlot(game.id)}
                onMouseLeave={() => setActiveSlot(null)}
                className={`bg-[#0B101A] border-4 ${game.bgBorder} ${game.shadowClass} flex flex-col justify-between transition-all duration-300 scroll-mt-24 w-full min-w-0 overflow-hidden`}
              >
                {/* 1. Cartridge Header Bar */}
                <div className="bg-black border-b-2 border-black p-2.5 px-3 sm:px-4 flex items-center justify-between font-pixel text-[8px] sm:text-[10px] gap-2 min-w-0">
                  <span className="text-white font-bold tracking-wider truncate min-w-0">
                    {game.slot}
                  </span>
                  <span 
                    className="px-2 py-0.5 border text-black font-black whitespace-nowrap shrink-0 text-[8px] sm:text-[9px]"
                    style={{ backgroundColor: game.accentColor, borderColor: '#000' }}
                  >
                    {game.badge}
                  </span>
                </div>

                {/* 2. CRT Screen Display with 80s Scanlines */}
                <div className="crt-monitor-screen relative h-48 sm:h-56 w-full bg-black border-b-2 border-black overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    onError={(e) => { e.target.src = game.fallbackImage; }}
                    className={`w-full h-full object-cover ${game.imagePosition || 'object-center'} filter brightness-90 group-hover:scale-105 transition-transform duration-300`}
                  />

                  {/* Top-Right HUD Badge */}
                  <div className="absolute top-3 right-3 z-20 font-pixel text-[8px] sm:text-[9px] bg-black/90 text-white px-2 py-1 border border-white/30">
                    <span className="text-[#FFE600]">ESTADO:</span> ACTIVO
                  </div>

                  {/* In-Game HUD overlay at bottom of screen */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-4 z-20 flex items-end justify-between min-w-0">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      {/* Real Game Logo */}
                      <div 
                        className="h-11 w-11 sm:h-14 sm:w-14 bg-black border-2 shrink-0 flex items-center justify-center shadow-brutal-black p-1"
                        style={{ borderColor: game.accentColor }}
                      >
                        <GameLogo gameId={game.id} color={game.accentColor} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-display font-black text-xl sm:text-3xl text-white uppercase leading-none drop-shadow-[2px_2px_0px_#000] truncate">
                          {game.name}
                        </h3>
                        <span className="font-pixel text-[8px] sm:text-[9px] text-[#FFE600] block mt-0.5 truncate">
                          {game.players}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Cartridge Specs & Difficulty Panel */}
                <div className="p-3.5 sm:p-5 space-y-4 bg-[#090D15] min-w-0">
                  
                  {/* Arcade Meter Row: Price & Difficulty */}
                  <div className="grid grid-cols-2 gap-2 bg-black border-2 border-white/10 p-2.5 sm:p-3 min-w-0">
                    
                    {/* Coin Price */}
                    {game.id === 'free_fire' ? (
                      <div className="min-w-0 overflow-hidden flex flex-col justify-center">
                        <div className="font-pixel text-[7px] sm:text-[8px] text-slate-400 uppercase flex items-center gap-1 truncate">
                          <Coins className="w-3 h-3 text-[#FFE600] shrink-0" />
                          <span className="truncate">VALOR FICHA:</span>
                        </div>
                        <div className="space-y-1 mt-1 font-cyber text-xs">
                          <div className="flex items-center justify-between text-white pr-0.5 gap-1">
                            <span className="text-slate-400 text-[8px] sm:text-[9px] font-pixel shrink-0">INDIV:</span>
                            <span className="text-[#FFE600] font-black text-sm sm:text-base font-display whitespace-nowrap">$1.00 <span className="text-[9px] text-slate-300 font-normal font-sans">USD</span></span>
                          </div>
                          <div className="flex items-center justify-between text-white pr-0.5 gap-1 border-t border-white/10 pt-1">
                            <span className="text-slate-400 text-[8px] sm:text-[9px] font-pixel shrink-0">EQUIPO:</span>
                            <span className="text-[#FFE600] font-black text-sm sm:text-base font-display whitespace-nowrap">$4.00 <span className="text-[9px] text-slate-300 font-normal font-sans">USD</span></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="min-w-0 overflow-hidden flex flex-col justify-center">
                        <div className="font-pixel text-[7px] sm:text-[8px] text-slate-400 uppercase flex items-center gap-1 truncate">
                          <Coins className="w-3 h-3 text-[#FFE600] shrink-0" />
                          <span className="truncate">VALOR FICHA:</span>
                        </div>
                        <div className="font-display text-xl sm:text-2xl text-[#FFE600] mt-0.5 font-black truncate tracking-wide">
                          {game.coinPrice} <span className="text-xs text-slate-300 font-normal font-sans">USD</span>
                        </div>
                        <div className="font-cyber text-[9px] sm:text-[10px] text-slate-400 truncate mt-0.5" title={game.coinDetail}>
                          {game.coinDetail}
                        </div>
                      </div>
                    )}

                    {/* Difficulty Meter: Solo Nivel de Reto sin barra ASCII ni DIFICULTAD: ALTA */}
                    <div className="border-l border-white/10 pl-2.5 sm:pl-3 flex flex-col justify-center min-w-0 overflow-hidden">
                      <div className="font-pixel text-[7px] sm:text-[8px] text-slate-400 uppercase tracking-wider truncate">
                        NIVEL DE RETO:
                      </div>
                      <div 
                        className="font-pixel text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base mt-1 font-black tracking-tight sm:tracking-wide truncate"
                        style={{ color: game.accentColor }}
                        title={game.difficulty}
                      >
                        {game.difficulty}
                      </div>
                    </div>

                  </div>

                  {/* Clean Modern Rules in Chakra Petch (High legibility) */}
                  <div 
                    id={`reglas-${game.id}`} 
                    className="space-y-2 border-l-2 border-white/20 pl-3 py-1 transition-colors duration-300 scroll-mt-32"
                  >
                    <div className="font-pixel text-[8px] text-[#FFE600] uppercase tracking-wider mb-1">
                      // FORMATO OFICIAL DEL TORNEO:
                    </div>
                    {game.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-cyber leading-tight">
                        <span 
                          className="font-pixel text-[9px] shrink-0 mt-0.5 font-black"
                          style={{ color: game.accentColor }}
                        >
                          ▶
                        </span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* 4. Physical Arcade Button (Inscripciones Cerradas - Ver Reglas) */}
                <div className="p-3.5 sm:p-5 pt-0 bg-[#090D15]">
                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById(`reglas-${game.id}`);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        target.classList.add('bg-white/10');
                        setTimeout(() => target.classList.remove('bg-white/10'), 1500);
                      }
                    }}
                    className={`btn-arcade-press w-full py-3 sm:py-3.5 px-3 sm:px-4 font-pixel text-[10px] sm:text-xs md:text-sm uppercase font-black border-2 border-black cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-w-0 ${game.shadowClass}`}
                    style={{
                      backgroundColor: game.accentColor,
                      color: game.id === 'free_fire' ? '#000' : (game.id === 'fortnite' ? '#000' : '#FFF'),
                    }}
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">[ CERRADAS // VER REGLAS ]</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
