// Configuración General del Torneo Compu League E-Sports 2026
// Torneo Oficial Multiplataforma

export const BANK_INFO = {
  bank: 'Banco Pichincha',
  accountType: 'Cuenta de Ahorros',
  accountNumber: '2206402368',
  holderName: 'Cristopher Lomas',
  email: 'crislomasfe@gmail.com',
  costPerPerson: 1.00,
  currency: 'USD',
  notes: 'Recuerda guardar la captura de tu comprobante de transferencia bancaria para adjuntarla en tu registro.',
};

export const CONTACT_INFO = {
  whatsappStaff: '0962074110',
  whatsappDirectUrl: 'https://wa.me/593962074110?text=Hola,%20tengo%20una%20consulta%20sobre%20el%20torneo%20Compu%20League%202026',
  discordUrl: 'https://discord.gg/ynfD8aHHmP',
  streamFacebook: 'https://www.facebook.com/compuleagueesports/', // Transmisión oficial en vivo
  facebookUrl: 'https://www.facebook.com/compuleagueesports/',
  deadlineIso: '2026-11-04T21:00:00-05:00',
  deadlineLabel: 'Miércoles 4 de Noviembre - 9:00 PM',
  tournamentStartIso: '2026-11-04T21:00:00-05:00',
  tournamentStartLabel: 'Miércoles 4 de Noviembre - 9:00 PM (21:00)',
  tournamentDatesLabel: '4, 5 y 6 de Noviembre de 2026 (Noches - 9:00 PM)',
  isRegistrationClosed: true,
};

export const GAMES = [
  {
    id: 'valorant',
    name: 'VALORANT',
    badge: 'SHOOTER TACTICO',
    color: '#ff4655',
    accentColor: 'from-rose-500 to-red-600',
    borderColor: 'border-rose-500/40',
    glowColor: 'shadow-rose-500/20',
    description: 'Enfrentamientos tácticos en primera persona con disparos precisos y habilidades únicas de personajes.',
    teamFormat: '5 Titulares + 1 Suplente Opcional',
    requiredPlayers: 5,
    maxPlayers: 6,
    substitutesAllowed: true,
    priceTotal: 5.00,
    priceNote: '$5 por equipo ($1 por persona, suplente gratis)',
    bracketType: 'double_elimination', // Loser bracket
    formatDetail: 'Doble Eliminación (Winners Bracket, Loser Bracket y Gran Final). Partidas al mejor de 1 (Bo1), Finales al mejor de 3 (Bo3).',
    platform: 'PC',
    icon: 'target',
    whatsappGroupUrl: 'https://chat.whatsapp.com/EluwoOy9WVHKtoUfUJigko?s=cl&p=a&mlu=4&ilr=4',
  },
  {
    id: 'free_fire',
    name: 'FREE FIRE',
    badge: 'BATTLE ROYALE',
    color: '#f59e0b',
    accentColor: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/40',
    glowColor: 'shadow-amber-500/20',
    description: 'Supervivencia al límite en móvil. Modalidades oficiales disponibles en Escuadras y torneo Individual.',
    teamFormat: 'Escuadras (4 jugadores) o Individual (1 jugador)',
    requiredPlayers: 4,
    maxPlayers: 4,
    substitutesAllowed: false,
    priceTotal: 4.00,
    priceNote: '$4 por Escuadra, o $1 solo Individual.',
    bracketType: 'battle_royale',
    formatDetail: 'Partida Battle Royale por modalidad (1 sala Escuadras y 1 sala Individual). Gana quien se lleve el BOOYAH o victoria total.',
    platform: 'Móvil / Emulador oficial',
    icon: 'flame',
    whatsappGroupUrl: 'https://chat.whatsapp.com/HeGmvTRIc6xLiHz2QHR2B5?s=cl&p=a&mlu=4&ilr=4',
  },
  {
    id: 'fortnite',
    name: 'FORTNITE',
    badge: 'BATTLE ROYALE',
    color: '#3b82f6',
    accentColor: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-500/40',
    glowColor: 'shadow-blue-500/20',
    description: 'Batalla Campal de supervivencia y construcción/cero construcción en parejas.',
    teamFormat: 'Dúos',
    requiredPlayers: 2,
    maxPlayers: 2,
    substitutesAllowed: false,
    priceTotal: 2.00,
    priceNote: '$2 por Dúo ($1 por persona)',
    bracketType: 'battle_royale',
    formatDetail: 'Partida de Battle Royale. Gana el último dúo sobreviviente en pie (Top 1).',
    platform: ' ',
    icon: 'crosshair',
    whatsappGroupUrl: 'https://chat.whatsapp.com/JYxfM883obE8iXgW8Svo7M?s=cl&p=a&mlu=4&ilr=4',
  },
  {
    id: 'clash_royale',
    name: 'CLASH ROYALE',
    badge: 'ESTRATEGIA 1V1',
    color: '#06b6d4',
    accentColor: 'from-cyan-500 to-teal-600',
    borderColor: 'border-cyan-500/40',
    glowColor: 'shadow-cyan-500/20',
    description: 'Duelo de torres y cartas en tiempo real. Estrategia y reflejos rápidos.',
    teamFormat: 'Individual (1 jugador)',
    requiredPlayers: 1,
    maxPlayers: 1,
    substitutesAllowed: false,
    priceTotal: 1.00,
    priceNote: '$1 por jugador',
    bracketType: 'tournament_tree',
    formatDetail: 'Llave de Torneo eliminatoria directa. Duelos al mejor de 3 partidas (Bo3). Nivel de cartas estándar de torneo.',
    platform: 'Móvil (Android / iOS)',
    icon: 'crown',
    whatsappGroupUrl: 'https://chat.whatsapp.com/FJWPs4wm2kv65Jfeg4Sp1J?s=cl&p=a&mlu=4&ilr=4',
  },
];

export const getGameWhatsAppGroupUrl = (gameId) => {
  const game = GAMES.find(g => g.id === gameId);
  return game?.whatsappGroupUrl || 'https://wa.me/593962074110';
};

export const INITIAL_SCHEDULE = [
  {
    id: 'sch-1',
    dayLabel: 'Noche 1 - Miércoles 4 de Noviembre',
    date: '2026-11-04',
    time: '21:00 - 21:15',
    gameId: 'clash_royale',
    gameName: 'Ceremonia de Inauguración Oficial',
    stageTitle: 'Transmisión en Vivo por Facebook Live & Presentación de la Liga',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-2',
    dayLabel: 'Noche 1 - Miércoles 4 de Noviembre',
    date: '2026-11-04',
    time: '21:15 - 22:15',
    gameId: 'clash_royale',
    gameName: 'Clash Royale (1v1) - Torneo Completo',
    stageTitle: 'Octavos, Cuartos, Semifinales y Gran Final (Bo3) - 12 Jugadores',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-3',
    dayLabel: 'Noche 1 - Miércoles 4 de Noviembre',
    date: '2026-11-04',
    time: '22:15 - 23:45',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - Jornada 1: Cuartos de Final',
    stageTitle: 'Partida 1: Chupines 2027 vs Profugos | Partida 2: Pusydystroyer vs Sin Manos',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-4',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '21:00 - 22:30',
    gameId: 'free_fire',
    gameName: 'Free Fire (Battle Royale) - 2 Salas + Gran Final',
    stageTitle: 'Sala A (7 Squads) + Sala B (6 Squads) -> Gran Sala Final Booyah',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-5',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '22:30 - 23:45',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - Jornada 2: Semifinales Upper',
    stageTitle: 'Semi 1: TEAM ING vs Ganador M1 | Semi 2: ikonikos vs Ganador M2',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-6',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '21:00 - 22:15',
    gameId: 'fortnite',
    gameName: 'Fortnite (Dúos en Creativo) - 2 Lobbies + Gran Final',
    stageTitle: 'Lobby A (6 Dúos) + Lobby B (6 Dúos) -> Lobby Gran Final por la Corona',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-7',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '22:15 - 23:40',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - Jornada 3: LA GRAN FINAL (Bo3)',
    stageTitle: 'Duelo Supremo al mejor de 3 mapas por el Campeonato de Valorant',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-8',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '23:40 - 23:55',
    gameId: 'valorant',
    gameName: 'Ceremonia de Clausura & Premiación General',
    stageTitle: 'Cuadro de Honor y Entrega de Títulos de los 4 Juegos',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
];

// Equipos y brackets oficiales basados 100% en el Roster Oficial del PDF
export const DEMO_VALORANT_MATCHES = [
  // Upper Bracket Cuartos de Final (6 Equipos: 2 Byes y 2 Enfrentamientos)
  { id: 'v-u1', bracket: 'upper', round: 'Cuartos de Final', matchIndex: 1, teamA: 'Chupines 2027', teamB: 'Profugos de la pala', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-u2', bracket: 'upper', round: 'Cuartos de Final', matchIndex: 2, teamA: 'Los pusydystroyer', teamB: 'LOS SIN MANOS', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  
  // Upper Bracket Semifinales (TEAM ING e ikonikos entran como cabezas de serie)
  { id: 'v-u3', bracket: 'upper', round: 'Semifinal Upper 1', matchIndex: 3, teamA: 'TEAM ING', teamB: 'Ganador M1', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-u4', bracket: 'upper', round: 'Semifinal Upper 2', matchIndex: 4, teamA: 'ikonikos', teamB: 'Ganador M2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Upper Bracket Final
  { id: 'v-u5', bracket: 'upper', round: 'Final Upper Bracket', matchIndex: 5, teamA: 'Ganador Semi 1', teamB: 'Ganador Semi 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Lower Bracket
  { id: 'v-l1', bracket: 'lower', round: 'Ronda 1 Loser', matchIndex: 6, teamA: 'Perdedor M1', teamB: 'Perdedor M2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-l2', bracket: 'lower', round: 'Semifinal Loser', matchIndex: 7, teamA: 'Ganador Ronda 1 Loser', teamB: 'Perdedor Semi Upper', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-l3', bracket: 'lower', round: 'Final Loser Bracket', matchIndex: 8, teamA: 'Ganador Semi Loser', teamB: 'Perdedor Final Upper', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Grand Final Bo3
  { id: 'v-gf', bracket: 'grand_final', round: 'GRAN FINAL (Bo3)', matchIndex: 9, teamA: 'Campeón Upper Bracket', teamB: 'Campeón Loser Bracket', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' }
];

export const DEMO_CLASH_MATCHES = [
  // Octavos de Final Preliminares (12 Jugadores Oficiales del PDF: 4 Byes a cuartos)
  { id: 'cr-1', round: 'Octavos de Final', matchIndex: 1, playerA: 'Jordan Bastidas', playerB: 'Akane Reina', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-2', round: 'Octavos de Final', matchIndex: 2, playerA: 'Edwin Landeta', playerB: 'Harold Mejia', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-3', round: 'Octavos de Final', matchIndex: 3, playerA: 'Danny Quilumbaquin', playerB: 'Paul Ger', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-4', round: 'Octavos de Final', matchIndex: 4, playerA: 'Ivan Bernal', playerB: 'Marcillo Pablo', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  
  // Cuartos de Final (Entran Milton Fuel, Juan Carlos Llore, Stalin Obando, Jeremy Valdivieso)
  { id: 'cr-5', round: 'Cuartos de Final', matchIndex: 5, playerA: 'Milton Fuel Bravo', playerB: 'Ganador M1', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-6', round: 'Cuartos de Final', matchIndex: 6, playerA: 'Juan Carlos Llore', playerB: 'Ganador M2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-7', round: 'Cuartos de Final', matchIndex: 7, playerA: 'Stalin Obando', playerB: 'Ganador M3', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-8', round: 'Cuartos de Final', matchIndex: 8, playerA: 'Jeremy Valdivieso', playerB: 'Ganador M4', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  
  // Semifinales
  { id: 'cr-9', round: 'Semifinales', matchIndex: 9, playerA: 'Ganador Cuartos 1', playerB: 'Ganador Cuartos 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-10', round: 'Semifinales', matchIndex: 10, playerA: 'Ganador Cuartos 3', playerB: 'Ganador Cuartos 4', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  
  // Gran Final Bo3
  { id: 'cr-11', round: 'GRAN FINAL (Bo3)', matchIndex: 11, playerA: 'Finalista 1', playerB: 'Finalista 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
];

export const DEMO_BATTLE_ROYALE_STANDINGS = {
  free_fire_escuadras: [
    // Sala A (7 Escuadras)
    { rank: 1, team: 'Los Duvalineros', captain: 'JORDAN', kills: 0, status: 'Sala A (Grupo 1)' },
    { rank: 2, team: 'CHUPITeam', captain: 'Mateo Cuaical', kills: 0, status: 'Sala A (Grupo 1)' },
    { rank: 3, team: 'AJOS FC', captain: 'Alejandro Lucero', kills: 0, status: 'Sala A (Grupo 1)' },
    { rank: 4, team: 'KODEX', captain: 'Alexis Mallamas', kills: 0, status: 'Sala A (Grupo 1)' },
    { rank: 5, team: 'pisa cabezas', captain: 'Leonel De La Torre', kills: 0, status: 'Sala A (Grupo 1)' },
    { rank: 6, team: 'Camtina', captain: 'Harold Mejia', kills: 0, status: 'Sala A (Grupo 1)' },
    { rank: 7, team: 'Switch', captain: 'Maicol Flores', kills: 0, status: 'Sala A (Grupo 1)' },
    // Sala B (6 Escuadras)
    { rank: 8, team: 'Lowe', captain: 'Xavier Lema', kills: 0, status: 'Sala B (Grupo 2)' },
    { rank: 9, team: 'Zenith', captain: 'Elkin Cuayal', kills: 0, status: 'Sala B (Grupo 2)' },
    { rank: 10, team: 'Dinastía-Cero', captain: 'Liceth Escobar', kills: 0, status: 'Sala B (Grupo 2)' },
    { rank: 11, team: 'Los Renacidos', captain: 'Melinda Reascos', kills: 0, status: 'Sala B (Grupo 2)' },
    { rank: 12, team: 'leviatán', captain: 'Henry Tipaz', kills: 0, status: 'Sala B (Grupo 2)' },
    { rank: 13, team: 'Los Solitarios (Trío)', captain: 'David Tarapues / Matew / Alejandro', kills: 0, status: 'Sala B (Grupo 2)' },
  ],
  free_fire_solitario: [
    { rank: 1, team: 'David Tarapues, Matew Cevallos y Alejandro Tates', captain: 'Unificados a Escuadras', kills: 0, status: 'Compiten como Escuadra #13 en Sala B' },
  ],
  fortnite_duos: [
    // Lobby A Creativo (6 Dúos / 12 Jugadores)
    { rank: 1, team: 'LOS SIN MANOS', captain: 'ANTHONY JIMENEZ', kills: 0, status: 'Lobby A (Grupo 1)' },
    { rank: 2, team: 'G2 Encebollados', captain: 'Fernando Muñoz', kills: 0, status: 'Lobby A (Grupo 1)' },
    { rank: 3, team: '67 Boys', captain: 'Carlos Loza', kills: 0, status: 'Lobby A (Grupo 1)' },
    { rank: 4, team: 'LOS MISMISIMOS', captain: 'Alejandro & Juan V.', kills: 0, status: 'Lobby A (Grupo 1)' },
    { rank: 5, team: 'Winners', captain: 'Anthony Hurtado', kills: 0, status: 'Lobby A (Grupo 1)' },
    { rank: 6, team: 'PERRITOS ORG', captain: 'Romel Maldonado', kills: 0, status: 'Lobby A (Grupo 1)' },
    // Lobby B Creativo (6 Dúos / 12 Jugadores)
    { rank: 7, team: 'Herederos de epstein', captain: 'Angel Yar', kills: 0, status: 'Lobby B (Grupo 2)' },
    { rank: 8, team: 'Los legendarios', captain: 'Richard Bonilla', kills: 0, status: 'Lobby B (Grupo 2)' },
    { rank: 9, team: 'Los saiyans', captain: 'Andrés Argoti', kills: 0, status: 'Lobby B (Grupo 2)' },
    { rank: 10, team: 'Inges sin título', captain: 'José Jiménez', kills: 0, status: 'Lobby B (Grupo 2)' },
    { rank: 11, team: 'LOS GUACHITURROS', captain: 'Jeremy Valdivieso', kills: 0, status: 'Lobby B (Grupo 2)' },
    { rank: 12, team: 'CIBER', captain: 'Lenin Pozo', kills: 0, status: 'Lobby B (Grupo 2)' },
  ]
};
