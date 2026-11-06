import React, { useState, useEffect } from 'react';
import { 
  Trophy, Shield, Flame, Crosshair, 
  Crown, RefreshCw, CheckCircle2, Clock
} from 'lucide-react';
import { 
  DEMO_VALORANT_MATCHES, 
  DEMO_CLASH_MATCHES, 
  DEMO_BATTLE_ROYALE_STANDINGS 
} from '../data/tournamentData';
import { GameLogo } from './GameLogo';

export default function LiveBrackets() {
  const [activeTab, setActiveTab] = useState('valorant');
  const [ffSubTab, setFfSubTab] = useState('escuadras');

  const [valorantMatches, setValorantMatches] = useState([]);
  const [clashMatches, setClashMatches] = useState([]);
  const [brStandings, setBrStandings] = useState({
    free_fire_escuadras: [],
    free_fire_solitario: [],
    fortnite_duos: []
  });

  const loadData = () => {
    try {
      const CURRENT_DATA_VERSION = 'v17_fortnite_official_scoring_flyer';
      const savedVersion = localStorage.getItem('compu_league_brackets_version');
      const savedVal = localStorage.getItem('compu_league_valorant_matches');
      const savedClash = localStorage.getItem('compu_league_clash_matches');

      // Forzar actualización inmediata si la versión es anterior o faltan los nuevos cruces
      const isOutdated = 
        savedVersion !== CURRENT_DATA_VERSION ||
        !savedVal ||
        !savedVal.includes('VIPERX') ||
        !savedVal.includes('LOS SIN MANOS') ||
        !savedVal.includes('"bracket":"cuartos"') || !savedVal.includes('"winner":"TEAM ING"') ||
        !savedClash ||
        !savedClash.includes('Lenin Rodríguez') ||
        !savedClash.includes('Kevin Pozo') || !savedClash.includes('Edison Godoy') || !savedClash.includes('Nicolas Villareal') || !savedClash.includes('Kevin Diaz') || !savedClash.includes('"status":"completed"');

      if (isOutdated) {
        localStorage.setItem('compu_league_brackets_version', CURRENT_DATA_VERSION);
        localStorage.setItem('compu_league_valorant_matches', JSON.stringify(DEMO_VALORANT_MATCHES));
        localStorage.setItem('compu_league_clash_matches', JSON.stringify(DEMO_CLASH_MATCHES));
        localStorage.setItem('compu_league_br_standings', JSON.stringify(DEMO_BATTLE_ROYALE_STANDINGS));
        setValorantMatches(DEMO_VALORANT_MATCHES);
        setClashMatches(DEMO_CLASH_MATCHES);
        setBrStandings(DEMO_BATTLE_ROYALE_STANDINGS);
        return;
      }

      setValorantMatches(JSON.parse(savedVal));
      setClashMatches(JSON.parse(savedClash));
      setBrStandings(localStorage.getItem('compu_league_br_standings') ? JSON.parse(localStorage.getItem('compu_league_br_standings')) : DEMO_BATTLE_ROYALE_STANDINGS);
    } catch {
      setValorantMatches(DEMO_VALORANT_MATCHES);
      setClashMatches(DEMO_CLASH_MATCHES);
      setBrStandings(DEMO_BATTLE_ROYALE_STANDINGS);
    }
  };

    useEffect(() => {
    loadData();
  }, []);

  const tabs = [
    { id: 'valorant', name: 'VALORANT (5v5)', icon: Shield, color: '#FF0055' },
    { id: 'fortnite', name: 'FORTNITE (DUOS)', icon: Crosshair, color: '#00F0FF' },
    { id: 'free_fire', name: 'FREE FIRE (🏆 FINALIZADO)', icon: Flame, color: '#FFE600' },
    { id: 'clash_royale', name: 'CLASH ROYALE (🏆 FINALIZADO)', icon: Crown, color: '#A855F7' },
  ];

  return (
    <section id="brackets" className="py-14 sm:py-20 bg-[#07090F] text-slate-100 font-sans select-none border-b-4 border-black relative overflow-hidden">
      
      {/* Background Cyber Grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="bg-[#0B101A] border-4 border-black p-5 sm:p-6 mb-8 shadow-brutal-black">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-black text-[#00F0FF] border-2 border-[#00F0FF] font-pixel text-[9px] uppercase shadow-brutal-black">
                ★ MARCADORES OFICIALES EN VIVO ★
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide font-display drop-shadow-[2px_2px_0px_#000]">
                BRACKETS &amp; <span className="text-[#FFE600]">RESULTADOS</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-cyber leading-relaxed">
                Actualización oficial durante las 3 noches (4, 5 y 6 de Noviembre de 2026).
              </p>
            </div>

            <button
              onClick={loadData}
              className="btn-arcade-press shadow-brutal-yellow self-start md:self-auto px-5 py-3 border-2 border-black bg-[#FFE600] text-black font-pixel text-[10px] font-black uppercase flex items-center gap-2 tracking-wider cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[3]" />
              <span>[ SINCRONIZAR ]</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn-arcade-press font-pixel text-[9px] sm:text-[10px] px-4 py-3 border-2 border-black uppercase font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-brutal-yellow font-black'
                    : 'bg-black text-slate-300 hover:text-white shadow-brutal-black'
                }`}
              >
                <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                  <GameLogo gameId={tab.id} color={isActive ? '#000000' : tab.color} />
                </div>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. VALORANT BRACKET                                           */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'valorant' && (
          <div className="space-y-8">
            
            {/* Single Elimination Main Bracket */}
            <div className="border-4 border-black bg-[#0B101A] p-5 sm:p-7 shadow-brutal-cyan">
              <div className="mb-6 pb-4 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-pixel">
                <div className="space-y-1">
                  <span className="text-[#00F0FF] text-xs font-bold tracking-wider block">
                    VALORANT 5v5 // ELIMINACIÓN DIRECTA
                  </span>
                  <p className="text-[10px] text-slate-400 font-cyber">
                    Partidas Bo1 en Cuartos y Semifinales. Gran Final al mejor de 3 mapas (Bo3). ¡El ganador avanza, el perdedor queda eliminado!
                  </p>
                </div>
                <span className="text-[9px] px-2.5 py-1 border border-[#00F0FF]/40 bg-black text-[#00F0FF] font-bold self-start sm:self-auto">
                  7 EQUIPOS OFICIALES // BO1 &amp; GRAN FINAL BO3
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cuartos de Final */}
                <div className="space-y-3">
                  <div className="text-[9px] text-[#00F0FF] pb-2 border-b-2 border-black font-pixel font-bold uppercase flex items-center justify-between">
                    <span>CUARTOS DE FINAL</span>
                    <span className="text-[8px] text-slate-400">BO1</span>
                  </div>
                  {valorantMatches.filter(m => m.round === 'Cuartos de Final').map((m) => (
                    <EsportsMatchCard key={m.id} match={m} />
                  ))}

                  {/* Seed 1 Bye Banner */}
                  <div className="border-2 border-dashed border-[#FFE600]/40 bg-black/60 p-3.5 space-y-1 text-center shadow-brutal-black">
                    <span className="font-pixel text-[8px] text-[#FFE600] uppercase block">
                      ★ PASE DIRECTO A SEMIFINALES ★
                    </span>
                    <span className="font-display font-black text-sm uppercase text-white block">
                      IKONIKOS
                    </span>
                    <span className="text-[9px] font-cyber text-slate-400 block">
                      Cabeza de serie clasificado directo
                    </span>
                  </div>
                </div>

                {/* Semifinales */}
                <div className="space-y-3">
                  <div className="text-[9px] text-[#FFE600] pb-2 border-b-2 border-black font-pixel font-bold uppercase flex items-center justify-between">
                    <span>SEMIFINALES</span>
                    <span className="text-[8px] text-slate-400">BO1</span>
                  </div>
                  {valorantMatches.filter(m => m.round === 'Semifinales').map((m) => (
                    <EsportsMatchCard key={m.id} match={m} />
                  ))}
                </div>

                {/* Gran Final */}
                <div className="space-y-3">
                  <div className="text-[9px] text-[#FF0055] pb-2 border-b-2 border-black font-pixel font-bold uppercase flex items-center justify-between">
                    <span>GRAN FINAL</span>
                    <span className="text-[8px] text-[#FFE600] font-black">BO3</span>
                  </div>
                  {valorantMatches.filter(m => m.round === 'GRAN FINAL (Bo3)' || m.bracket === 'grand_final').map((m) => (
                    <EsportsMatchCard key={m.id} match={m} highlight />
                  ))}
                </div>
              </div>
            </div>

            {/* Grand Final Feature Box */}
            {valorantMatches.filter(m => m.bracket === 'grand_final' || m.round === 'GRAN FINAL (Bo3)').map((m) => (
              <div key={m.id} className="border-4 border-black bg-black p-6 sm:p-8 text-center space-y-4 shadow-brutal-yellow">
                <div className="inline-block px-4 py-1.5 bg-[#FFE600] text-black font-pixel text-xs font-black uppercase tracking-wider border-2 border-black">
                  🏆 DEFINICIÓN DEL TÍTULO // GRAN FINAL VALORANT (BO3)
                </div>
                
                <div className="p-5 sm:p-7 border-2 border-[#FFE600] bg-[#0C121D] max-w-xl mx-auto shadow-brutal-black">
                  <div className="flex items-center justify-between text-base sm:text-xl font-black font-display">
                    <div className={`flex-1 text-right pr-4 uppercase ${m.winner === m.teamA ? 'text-[#FFE600] font-black' : 'text-slate-100'}`}>
                      {m.teamA}
                    </div>
                    <div className="px-4 py-1.5 border-2 border-black bg-[#FFE600] text-black font-black shrink-0 text-lg sm:text-2xl font-pixel shadow-brutal-black">
                      {m.scoreA} : {m.scoreB}
                    </div>
                    <div className={`flex-1 text-left pl-4 uppercase ${m.winner === m.teamB ? 'text-[#FFE600] font-black' : 'text-slate-100'}`}>
                      {m.teamB}
                    </div>
                  </div>
                  <p className="mt-3 font-pixel text-[9px] text-[#00F0FF]">
                    Ganador Semifinal 1 vs. Ganador Semifinal 2 • Al mejor de 3 mapas
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. CLASH ROYALE (1v1)                                         */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'clash_royale' && (
          <div className="border-4 border-black bg-[#0B101A] p-6 sm:p-8 space-y-6 shadow-brutal-purple">
            <div className="pb-4 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-pixel">
              <div>
                <span className="text-white text-xs font-bold tracking-wider block">
                  CLASH ROYALE // TORNEO 1v1 BO3
                </span>
                <p className="text-[10px] text-slate-400 font-cyber mt-1">
                  Torneo oficial finalizado el 4 de Noviembre. Duelos al mejor de 1 (Bo1) y Gran Final ganada 2-0 por Edwin Landeta.
                </p>
              </div>
              <span className="text-[9px] px-2.5 py-1 border border-[#FFE600]/40 bg-black text-[#FFE600] font-bold self-start sm:self-auto">
                🏆 TORNEO FINALIZADO // CAMPEÓN DEFINIDO
              </span>
            </div>

            {/* Champion Showcase Podium */}
            <div className="border-4 border-black bg-gradient-to-r from-[#FFE600]/15 via-black to-[#FFE600]/15 p-5 sm:p-7 text-center space-y-3 shadow-brutal-yellow">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-pixel text-xs font-black uppercase border-2 border-black">
                <Trophy className="w-4 h-4 text-black" /> ¡CAMPEÓN OFICIAL CLASH ROYALE 2026! 🏆
              </div>
              <div className="text-3xl sm:text-5xl font-black font-display text-white tracking-wide uppercase drop-shadow-[3px_3px_0px_#000]">
                👑 <span className="text-[#FFE600]">EDWIN LANDETA</span> 👑
              </div>
              <p className="text-xs sm:text-sm font-cyber text-slate-200 max-w-2xl mx-auto">
                ¡Felicitaciones al gran campeón! Edwin Landeta se coronó en una emocionante Gran Final tras superar 2-0 a Stalin Obando en la Gran Final.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3 pt-2 text-xs font-cyber">
                <div className="px-3.5 py-1.5 bg-black/90 border-2 border-slate-700 flex items-center gap-2 shadow-brutal-black">
                  <span className="font-pixel text-[9px] text-slate-400 uppercase">🥈 SUBCAMPEÓN</span>
                  <span className="text-white font-bold">Stalin Obando</span>
                </div>
                <div className="px-3.5 py-1.5 bg-black/90 border-2 border-slate-700 flex items-center gap-2 shadow-brutal-black">
                  <span className="font-pixel text-[9px] text-[#00F0FF] uppercase">🥉 TOP 4 (SEMIS)</span>
                  <span className="text-slate-200 font-bold">Milton Fuel Bravo &bull; Kevin Pozo</span>
                </div>
              </div>
            </div>

            {/* Matches Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clashMatches.map((m) => {
                const isGrandFinal = m.round.includes('GRAN FINAL');
                return (
                  <div 
                    key={m.id} 
                    className={`border-2 border-black bg-black p-3.5 space-y-2 shadow-brutal-black ${isGrandFinal ? 'sm:col-span-2 lg:col-span-4 border-[#FFE600] bg-gradient-to-b from-[#1C1605] to-black ring-2 ring-[#FFE600]/30' : ''}`}
                  >
                    <div className="flex justify-between font-pixel text-[8px] text-slate-400 pb-1.5 border-b border-white/10">
                      <span className={isGrandFinal ? 'text-[#FFE600] font-bold text-[9px]' : ''}>{m.round}</span>
                      <span className={m.status === 'completed' ? 'text-[#10B981] font-bold' : 'text-slate-400'}>
                        {m.status === 'completed' ? 'FINALIZADO' : m.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1 font-cyber text-xs">
                      <div className={`flex justify-between items-center p-1.5 border transition-colors ${m.winner === m.playerA ? 'bg-[#FFE600]/20 text-[#FFE600] font-bold border-[#FFE600]/50' : 'text-slate-300 border-white/5'}`}>
                        <span className="flex items-center gap-1.5 truncate">
                          {m.winner === m.playerA && <Crown className="w-3.5 h-3.5 text-[#FFE600] shrink-0" />}
                          <span className="truncate">{m.playerA}</span>
                        </span>
                        <strong className="font-pixel text-xs shrink-0 ml-2">{m.scoreA}</strong>
                      </div>
                      <div className={`flex justify-between items-center p-1.5 border transition-colors ${m.winner === m.playerB ? 'bg-[#FFE600]/20 text-[#FFE600] font-bold border-[#FFE600]/50' : 'text-slate-300 border-white/5'}`}>
                        <span className="flex items-center gap-1.5 truncate">
                          {m.winner === m.playerB && <Crown className="w-3.5 h-3.5 text-[#FFE600] shrink-0" />}
                          <span className="truncate">{m.playerB}</span>
                        </span>
                        <strong className="font-pixel text-xs shrink-0 ml-2">{m.scoreB}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. BATTLE ROYALE STANDINGS                                    */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'free_fire' || activeTab === 'fortnite') && (
          <div className="border-4 border-black bg-[#0B101A] p-5 sm:p-7 shadow-brutal-black space-y-6">

            {/* Free Fire Champions Showcase Podium */}
            {activeTab === 'free_fire' && (
              <div className="border-4 border-black bg-gradient-to-r from-[#FFE600]/15 via-black to-[#FFE600]/15 p-5 sm:p-7 text-center space-y-5 shadow-brutal-yellow">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-pixel text-xs font-black uppercase border-2 border-black">
                  <Trophy className="w-4 h-4 text-black" /> ¡TORNEO OFICIAL FREE FIRE CONCLUIDO! 🏆
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-4xl font-black font-display text-white tracking-wide uppercase drop-shadow-[2px_2px_0px_#000]">
                    👑 <span className="text-[#FFE600]">CUADRO DE HONOR Y CAMPEONES</span> 👑
                  </div>
                  <p className="text-xs sm:text-sm font-cyber text-slate-300 max-w-2xl mx-auto">
                    Partidas oficiales disputadas en salas privadas de Battle Royale (16 Escuadras y Torneo Solitario).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
                  {/* Ronda 1: Lowe */}
                  <div className="border-2 border-black bg-black p-4 space-y-2 shadow-brutal-black relative overflow-hidden">
                    <div className="flex items-center justify-between font-pixel text-[9px] text-[#FFE600] border-b border-white/10 pb-1.5">
                      <span>ESCUADRAS // RONDA 1</span>
                      <span className="bg-[#FFE600] text-black px-1.5 py-0.5 font-black">BOOYAH!</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-display text-white uppercase">
                      🏆 LOWE
                    </div>
                    <div className="text-xs font-cyber text-slate-300">
                      Capitán: <strong className="text-white">Xavier Lema</strong> (339299831)
                    </div>
                    <div className="text-[11px] font-cyber text-slate-400 space-y-0.5 pt-1 border-t border-white/5">
                      <div>• Edison (406508681)</div>
                      <div>• JuanPa (2677070637)</div>
                      <div>• Daniel (383753985)</div>
                    </div>
                  </div>

                  {/* Ronda 2: Pisa Cabezas */}
                  <div className="border-2 border-black bg-black p-4 space-y-2 shadow-brutal-black relative overflow-hidden">
                    <div className="flex items-center justify-between font-pixel text-[9px] text-[#FFE600] border-b border-white/10 pb-1.5">
                      <span>ESCUADRAS // RONDA 2</span>
                      <span className="bg-[#FFE600] text-black px-1.5 py-0.5 font-black">BOOYAH!</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-display text-white uppercase">
                      🏆 PISA CABEZAS
                    </div>
                    <div className="text-xs font-cyber text-slate-300">
                      Capitán: <strong className="text-white">Leonel De La Torre</strong> (693056546)
                    </div>
                    <div className="text-[11px] font-cyber text-slate-400 space-y-0.5 pt-1 border-t border-white/5">
                      <div>• Marlon Guamán (7232971902)</div>
                      <div>• Juan Morán (262414604)</div>
                      <div>• Sebastián Guzmán (2297093616)</div>
                    </div>
                  </div>

                  {/* Individual: Sebastián Guzmán */}
                  <div className="border-2 border-[#00F0FF] bg-gradient-to-b from-[#031B2A] to-black p-4 space-y-2 shadow-brutal-cyan relative overflow-hidden ring-1 ring-[#00F0FF]/40">
                    <div className="flex items-center justify-between font-pixel text-[9px] text-[#00F0FF] border-b border-white/10 pb-1.5">
                      <span>TORNEO SOLITARIO</span>
                      <span className="bg-[#00F0FF] text-black px-1.5 py-0.5 font-black">CAMPEÓN</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-display text-[#FFE600] uppercase">
                      👑 SEBASTIÁN GUZMÁN
                    </div>
                    <div className="text-xs font-cyber text-slate-300">
                      Escuadra: <strong className="text-white">Pisa Cabezas</strong>
                    </div>
                    <div className="text-[11px] font-cyber text-slate-300 space-y-0.5 pt-1 border-t border-white/5">
                      <div>ID Jugador: <strong className="text-[#00F0FF]">2297093616</strong></div>
                      <div className="text-[#10B981] font-bold">¡Último sobreviviente en pie!</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Fortnite Official Scoring System Showcase (Matching Official Flyer) */}
            {activeTab === 'fortnite' && (
              <div className="border-4 border-black bg-gradient-to-r from-[#00F0FF]/15 via-black to-[#00F0FF]/15 p-4 sm:p-6 shadow-brutal-cyan space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3 font-pixel">
                  <div>
                    <span className="text-[#00F0FF] text-xs font-bold uppercase tracking-wider block">
                      FORTNITE DÚOS // SISTEMA OFICIAL DE PUNTOS
                    </span>
                    <p className="text-[10px] text-slate-300 font-cyber mt-0.5">
                      2 Partidas en Sala Privada: Partida 1 (Con Construcción) + Partida 2 (Cero Construcción).
                    </p>
                  </div>
                  <span className="text-[9px] px-2.5 py-1 bg-black text-[#00F0FF] border border-[#00F0FF] font-bold self-start sm:self-auto">
                    13 DÚOS // SALA CON CLAVE
                  </span>
                </div>

                {/* Points Cards Grid matching the official flyer */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-pixel text-center">
                  <div className="bg-black/90 border-2 border-[#FFE600] p-2.5 shadow-brutal-black">
                    <span className="text-[9px] text-[#FFE600] block mb-0.5">🏆 1º LUGAR</span>
                    <span className="text-white text-base sm:text-lg font-black">10 PTS</span>
                  </div>
                  <div className="bg-black/90 border-2 border-slate-300 p-2.5 shadow-brutal-black">
                    <span className="text-[9px] text-slate-300 block mb-0.5">🥈 2º LUGAR</span>
                    <span className="text-white text-base sm:text-lg font-black">5 PTS</span>
                  </div>
                  <div className="bg-black/90 border-2 border-[#D97706] p-2.5 shadow-brutal-black">
                    <span className="text-[9px] text-[#F59E0B] block mb-0.5">🥉 3º LUGAR</span>
                    <span className="text-white text-base sm:text-lg font-black">3 PTS</span>
                  </div>
                  <div className="bg-black/90 border-2 border-[#00F0FF] p-2.5 shadow-brutal-black">
                    <span className="text-[9px] text-[#00F0FF] block mb-0.5">🎖️ 4º LUGAR</span>
                    <span className="text-white text-base sm:text-lg font-black">2 PTS</span>
                  </div>
                  <div className="bg-black/90 border-2 border-[#00F0FF]/60 p-2.5 shadow-brutal-black">
                    <span className="text-[9px] text-[#00F0FF]/80 block mb-0.5">👤 5º LUGAR</span>
                    <span className="text-white text-base sm:text-lg font-black">1 PTO</span>
                  </div>
                  <div className="bg-black/90 border-2 border-[#FF0055] p-2.5 shadow-brutal-pink">
                    <span className="text-[9px] text-[#FF0055] block mb-0.5">🎯 CADA KILL</span>
                    <span className="text-[#FF0055] text-base sm:text-lg font-black">1 PTO</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pb-3 border-b-2 border-black font-pixel">
              <span className="text-[#FFE600] text-xs font-bold uppercase">
                TABLA DE POSICIONES // BATTLE ROYALE
              </span>
              <span className="text-[#00F0FF] text-[9px]">
                OFFICIAL SCORES
              </span>
            </div>

            {/* Sub-selector for Free Fire */}
            {activeTab === 'free_fire' && (
              <div className="flex gap-2 font-pixel text-[9px]">
                <button
                  onClick={() => setFfSubTab('escuadras')}
                  className={`btn-arcade-press px-3 py-1.5 border-2 border-black cursor-pointer ${ffSubTab === 'escuadras' ? 'bg-[#FFE600] text-black font-black' : 'bg-black text-slate-400'}`}
                >
                  ESCUADRAS (4P)
                </button>
                <button
                  onClick={() => setFfSubTab('solitario')}
                  className={`btn-arcade-press px-3 py-1.5 border-2 border-black cursor-pointer ${ffSubTab === 'solitario' ? 'bg-[#00F0FF] text-black font-black' : 'bg-black text-slate-400'}`}
                >
                  INDIVIDUAL (SOLO)
                </button>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left font-cyber text-xs">
                <thead>
                  <tr className="border-b-2 border-black bg-black font-pixel text-[8px] text-slate-400 uppercase">
                    <th className="p-2.5">RANK</th>
                    <th className="p-2.5">EQUIPO / JUGADOR</th>
                    <th className="p-2.5">CAPITAN</th>
                    <th className="p-2.5 text-center">KILLS</th>
                    <th className="p-2.5 text-right">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    activeTab === 'fortnite' 
                      ? brStandings.fortnite_duos 
                      : (ffSubTab === 'escuadras' ? brStandings.free_fire_escuadras : brStandings.free_fire_solitario)
                  )?.map((row) => (
                    <tr key={row.rank} className="border-b border-white/5 hover:bg-black/60">
                      <td className="p-2.5 font-pixel text-[9px] text-[#FFE600]">#{row.rank}</td>
                      <td className="p-2.5 font-bold text-white uppercase">{row.team}</td>
                      <td className="p-2.5 text-slate-400">{row.captain}</td>
                      <td className="p-2.5 text-center font-pixel text-[10px] text-[#00F0FF]">{row.kills}</td>
                      <td className="p-2.5 text-right font-pixel text-[8px]">
                        <span className={row.isWinner ? 'bg-[#10B981] text-black px-1.5 py-0.5 font-black' : 'text-slate-500'}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

function EsportsMatchCard({ match, compact = false, highlight = false }) {
  const isCompleted = match.status === 'completed';
  const winnerA = match.winner && match.winner === match.teamA;
  const winnerB = match.winner && match.winner === match.teamB;

  return (
    <div className={`border-2 border-black p-3 bg-black space-y-2 ${
      highlight ? 'shadow-brutal-yellow' : 'shadow-brutal-black'
    }`}>
      <div className="flex items-center justify-between font-pixel text-[8px] text-slate-400 pb-1 border-b border-white/10">
        <span>{match.round} #{match.matchIndex}</span>
        <span className={isCompleted ? 'text-[#10B981]' : 'text-slate-500'}>
          {isCompleted ? 'FINALIZADO' : 'PENDIENTE'}
        </span>
      </div>

      <div className="space-y-1 font-cyber text-xs">
        <div className={`flex items-center justify-between p-1.5 border border-white/5 ${
          winnerA ? 'bg-[#FFE600]/15 text-[#FFE600] font-bold' : 'text-slate-300'
        }`}>
          <span className="truncate pr-2 uppercase">
            {winnerA && <span className="text-[#FFE600] mr-1">★</span>}
            <span>{match.teamA}</span>
          </span>
          <span className="font-pixel font-bold px-1.5 py-0.5 bg-[#0C121D] text-white shrink-0 text-[10px]">
            {match.scoreA}
          </span>
        </div>

        <div className={`flex items-center justify-between p-1.5 border border-white/5 ${
          winnerB ? 'bg-[#FFE600]/15 text-[#FFE600] font-bold' : 'text-slate-300'
        }`}>
          <span className="truncate pr-2 uppercase">
            {winnerB && <span className="text-[#FFE600] mr-1">★</span>}
            <span>{match.teamB}</span>
          </span>
          <span className="font-pixel font-bold px-1.5 py-0.5 bg-[#0C121D] text-white shrink-0 text-[10px]">
            {match.scoreB}
          </span>
        </div>
      </div>
    </div>
  );
}
