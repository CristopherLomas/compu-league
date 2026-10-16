import React, { useState } from 'react';
import { ArrowRight, Check, Monitor, Smartphone, Gamepad2, Coins } from 'lucide-react';
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
      'Doble eliminación oficial con Winners Bracket y Losers Bracket.',
      'Mapas oficiales del circuito competitivo.',
      'Gran Final Bo3 al mejor de 3 mapas.',
    ],
  },
  {
    id: 'free_fire',
    slot: 'SLOT 02 // ESCUADRAS & SOLO',
    name: 'FREE FIRE',
    badge: 'BATTLE ROYALE',
    accentColor: '#FFE600',
    bgBorder: 'border-[#FFE600]',
    shadowClass: 'shadow-brutal-yellow',
    image: '/assets/free_fire_lobby.jpg',
    fallbackImage: '/assets/free_fire.jpg',
    imagePosition: 'object-center',
    coinPrice: '$4.00 / $1.00',
    coinDetail: 'INDIVIDUAL: $1.00 • EQUIPO: $4.00',
    difficulty: 'SURVIVAL',
    players: '4 (ESCUADRA) O 1 (SOLO)',
    platform: 'MOVIL / SALAS PRIVADAS',
    platformIcon: Smartphone,
    buttonText: '[ INSCRIBIR ESCUADRA ]',
    rules: [
      'Modalidades disponibles: Escuadras Battle Royale y Torneo Individual.',
      'Salas privadas exclusivas de Battle Royale.',
      'Gana quien se lleve el BOOYAH o victoria total.',
    ],
  },
  {
    id: 'fortnite',
    slot: 'SLOT 03 // DUOS',
    name: 'FORTNITE',
    badge: 'BATTLE ROYALE',
    accentColor: '#00F0FF',
    bgBorder: 'border-[#00F0FF]',
    shadowClass: 'shadow-brutal-cyan',
    image: '/assets/fortnite_lobby.jpg',
    fallbackImage: '/assets/fortnite.jpg',
    imagePosition: 'object-center',
    coinPrice: '$2.00',
    coinDetail: '$1.00 POR INTEGRANTE DEL DUO',
    difficulty: 'VELOCIDAD',
    players: '2 JUGADORES (DUO)',
    platform: 'PC / CONSOLA / MOVIL',
    platformIcon: Gamepad2,
    buttonText: '[ INSCRIBIR DUO ]',
    rules: [
      'Sala privada Battle Royale en parejas con código exclusivo de servidor.',
      'Crossplay 100% abierto: compite desde PC, PlayStation, Xbox o Móvil.',
      'Victoria Magistral: gana la última pareja en pie dentro de la tormenta final.',
    ],
  },
  {
    id: 'clash_royale',
    slot: 'SLOT 04 // DUELOS BO3',
    name: 'CLASH ROYALE',
    badge: 'ESTRATEGIA 1V1',
    accentColor: '#A855F7',
    bgBorder: 'border-[#A855F7]',
    shadowClass: 'shadow-brutal-purple',
    image: '/assets/clash_royale_lobby.jpg',
    fallbackImage: '/assets/clash_royale.jpg',
    imagePosition: 'object-top',
    coinPrice: '$1.00',
    coinDetail: 'INSCRIPCION INDIVIDUAL DIRECTA',
    difficulty: 'ESTRATEGIA',
    players: '1 JUGADOR (SOLITARIO)',
    platform: 'MOVIL (ANDROID / IOS)',
    platformIcon: Smartphone,
    buttonText: '[ INSCRIBIRSE 1V1 ]',
    rules: [
      'Llave eliminatoria directa en duelos al mejor de 3 partidas (Bo3).',
      'Nivel parejo oficial de torneo: cartas fijas en Nivel 11 estándar.',
      'Mazo libre sin restricciones de cartas evolucionadas o campeones.',
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
                <span className="bg-[#FFE600] text-black font-pixel text-[9px] sm:text-[10px] px-2.5 py-1 border border-black font-black uppercase">
                  [ 4 JUEGOS OFICIALES ]
                </span>
                <span className="bg-black text-[#00F0FF] font-pixel text-[9px] sm:text-[10px] px-2.5 py-1 border border-[#00F0FF]">
                  ELIGE TU JUEGO
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
                        <div className="space-y-1 mt-1 font-pixel text-[7px] sm:text-[8px] md:text-[9px]">
                          <div className="flex items-center justify-between text-white pr-0.5 gap-1">
                            <span className="text-slate-400 text-[7px] sm:text-[8px] shrink-0">INDIV:</span>
                            <span className="text-[#FFE600] font-black text-[10px] sm:text-xs md:text-sm whitespace-nowrap">$1.00 <span className="text-[7px] sm:text-[8px] text-slate-300 font-normal">USD</span></span>
                          </div>
                          <div className="flex items-center justify-between text-white pr-0.5 gap-1 border-t border-white/10 pt-1">
                            <span className="text-slate-400 text-[7px] sm:text-[8px] shrink-0">EQUIPO:</span>
                            <span className="text-[#FFE600] font-black text-[10px] sm:text-xs md:text-sm whitespace-nowrap">$4.00 <span className="text-[7px] sm:text-[8px] text-slate-300 font-normal">USD</span></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="min-w-0 overflow-hidden flex flex-col justify-center">
                        <div className="font-pixel text-[7px] sm:text-[8px] text-slate-400 uppercase flex items-center gap-1 truncate">
                          <Coins className="w-3 h-3 text-[#FFE600] shrink-0" />
                          <span className="truncate">VALOR FICHA:</span>
                        </div>
                        <div className="font-pixel text-sm sm:text-lg md:text-xl text-[#FFE600] mt-1 font-black truncate">
                          {game.coinPrice} <span className="text-[7px] sm:text-[8px] md:text-[9px] text-slate-300 font-normal">USD</span>
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

                {/* 4. Physical Arcade Button (Sinks on click) */}
                <div className="p-3.5 sm:p-5 pt-0 bg-[#090D15]">
                  <button
                    type="button"
                    onClick={() => onSelectGame(game.id)}
                    className={`btn-arcade-press w-full py-3 sm:py-3.5 px-3 sm:px-4 font-pixel text-[10px] sm:text-xs md:text-sm uppercase font-black border-2 border-black cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-w-0 ${game.shadowClass}`}
                    style={{
                      backgroundColor: game.accentColor,
                      color: game.id === 'free_fire' ? '#000' : (game.id === 'fortnite' ? '#000' : '#FFF'),
                    }}
                  >
                    <span className="truncate">{game.buttonText}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3] shrink-0" />
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
