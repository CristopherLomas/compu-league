import React from 'react';

// ─── Real Official Esports Game Logos ──────────────────────────────────────────
export const GameLogo = ({ gameId, color, className = "w-full h-full" }) => {
  // 1. VALORANT - Official Riot Games Geometric V Mark
  if (gameId === 'valorant') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill={color || '#FF4655'}
        className={`${className} object-contain filter drop-shadow-[0_0_6px_rgba(255,70,85,0.7)]`}
        aria-label="Logo oficial de Valorant"
      >
        <path d="M23.792 2.152a.252.252 0 0 0-.098.083c-3.384 4.23-6.769 8.46-10.15 12.69-.107.093-.025.288.119.265 2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25c.774-.967 1.55-1.934 2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205.002 3.074.001 6.15.001 9.225a.679.679 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247 2.455 0 4.91.003 7.365 0 .142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z" />
      </svg>
    );
  }

  // 2. FREE FIRE - Official Garena Free Fire Logo with Flaming Dagger
  if (gameId === 'free_fire') {
    return (
      <img
        src="/assets/free_fire_logo.png"
        alt="Logo oficial de Free Fire"
        className={`${className} object-contain filter drop-shadow-[0_0_6px_rgba(255,230,0,0.6)]`}
        loading="lazy"
      />
    );
  }

  // 3. FORTNITE - Official Epic Games Fortnite 3D "F" Lettermark
  if (gameId === 'fortnite') {
    return (
      <img
        src="/assets/fortnite_f_logo.png"
        alt="Logo oficial de Fortnite"
        className={`${className} object-contain filter drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]`}
        loading="lazy"
      />
    );
  }

  // 4. CLASH ROYALE - Official Supercell Clash Royale 3D King Crown
  if (gameId === 'clash_royale') {
    return (
      <img
        src="/assets/crown_01.png"
        alt="Corona oficial de Clash Royale"
        className={`${className} object-contain filter drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]`}
        loading="lazy"
      />
    );
  }

  return null;
};

export default GameLogo;
