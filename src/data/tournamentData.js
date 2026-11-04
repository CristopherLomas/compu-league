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
    gameName: 'Ceremonia de Apertura Oficial',
    stageTitle: 'Transmisión Inaugural en Facebook Live & Sorteo de Brackets',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-2',
    dayLabel: 'Noche 1 - Miércoles 4 de Noviembre',
    date: '2026-11-04',
    time: '21:15 - 22:15',
    gameId: 'clash_royale',
    gameName: 'Clash Royale (1v1)',
    stageTitle: 'Octavos, Cuartos, Semifinales y Gran Final (Bo3)',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-3',
    dayLabel: 'Noche 1 - Miércoles 4 de Noviembre',
    date: '2026-11-04',
    time: '22:15 - 23:30',
    gameId: 'free_fire',
    gameName: 'Free Fire (Battle Royale)',
    stageTitle: 'Sala 1: Torneo Solitario | Sala 2: Torneo Escuadras (11 Squads)',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-4',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '21:00 - 22:00',
    gameId: 'fortnite',
    gameName: 'Fortnite (Dúos)',
    stageTitle: 'Sala Personalizada Battle Royale - 2 Partidas Puntuables (11 Dúos)',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-5',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '22:00 - 23:45',
    gameId: 'valorant',
    gameName: 'Valorant (5v5)',
    stageTitle: 'Cuartos de Final y Semifinales de Upper Bracket (Bo1)',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-6',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '21:00 - 22:00',
    gameId: 'valorant',
    gameName: 'Valorant (5v5)',
    stageTitle: 'Final Lower Bracket & Semifinal de Consolidación (Bo1)',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-7',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '22:00 - 23:30',
    gameId: 'valorant',
    gameName: 'Valorant (5v5)',
    stageTitle: 'GRAN FINAL SUPREMA (Al mejor de 3 mapas - Bo3)',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-8',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '23:30 - 23:45',
    gameId: 'valorant',
    gameName: 'Clausura General del Torneo',
    stageTitle: 'Premiación de Campeones de los 4 Juegos & Cuadro de Honor',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
];

// Equipos y brackets oficiales con participantes confirmados
export const DEMO_VALORANT_MATCHES = [
  // Upper Bracket R1 / Cuartos
  { id: 'v-u1', bracket: 'upper', round: 'Cuartos de Final', matchIndex: 1, teamA: 'TEAM ING', teamB: 'ikonikos', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-u2', bracket: 'upper', round: 'Cuartos de Final', matchIndex: 2, teamA: 'Chupines 2027', teamB: 'Profugos de la pala', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-u3', bracket: 'upper', round: 'Cuartos de Final', matchIndex: 3, teamA: 'Los pusydystroyer', teamB: 'VIPERX', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-u4', bracket: 'upper', round: 'Cuartos de Final', matchIndex: 4, teamA: 'Clasificado Bye', teamB: 'Esperando Rival', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Upper Bracket Semifinals
  { id: 'v-u5', bracket: 'upper', round: 'Semifinal Upper', matchIndex: 5, teamA: 'Ganador M1', teamB: 'Ganador M2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-u6', bracket: 'upper', round: 'Semifinal Upper', matchIndex: 6, teamA: 'Ganador M3', teamB: 'Clasificado Bye', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Upper Bracket Final
  { id: 'v-u7', bracket: 'upper', round: 'Final Upper Bracket', matchIndex: 7, teamA: 'Finalista Upper 1', teamB: 'Finalista Upper 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Lower Bracket R1
  { id: 'v-l1', bracket: 'lower', round: 'Ronda 1 Loser', matchIndex: 8, teamA: 'Perdedor M1', teamB: 'Perdedor M2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-l2', bracket: 'lower', round: 'Ronda 1 Loser', matchIndex: 9, teamA: 'Perdedor M3', teamB: 'Perdedor M4', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  
  // Lower Bracket Semifinal
  { id: 'v-l3', bracket: 'lower', round: 'Semifinal Loser', matchIndex: 10, teamA: 'Ganador L1', teamB: 'Ganador L2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  // Lower Final
  { id: 'v-l4', bracket: 'lower', round: 'Final Loser Bracket', matchIndex: 11, teamA: 'Ganador Semi Loser', teamB: 'Perdedor Final Upper', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Grand Final Bo3
  { id: 'v-gf', bracket: 'grand_final', round: 'GRAN FINAL (Bo3)', matchIndex: 12, teamA: 'Campeón Upper Bracket', teamB: 'Campeón Loser Bracket', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' }
];

export const DEMO_CLASH_MATCHES = [
  // Preliminar / Octavos
  { id: 'cr-1', round: 'Ronda Clasificatoria', matchIndex: 1, playerA: 'Jordan Bastidas', playerB: 'Akane Reina', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-2', round: 'Ronda Clasificatoria', matchIndex: 2, playerA: 'Edwin Landeta', playerB: 'Harold Mejia', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  // Cuartos
  { id: 'cr-3', round: 'Cuartos de Final', matchIndex: 3, playerA: 'Milton Fuel Bravo', playerB: 'Ganador M1', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-4', round: 'Cuartos de Final', matchIndex: 4, playerA: 'Juan Carlos Llore', playerB: 'Ivan Bernal', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-5', round: 'Cuartos de Final', matchIndex: 5, playerA: 'Stalin Obando', playerB: 'Ganador M2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-6', round: 'Cuartos de Final', matchIndex: 6, playerA: 'Jeremy Valdivieso', playerB: 'Marcillo Cuascota', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  // Semis
  { id: 'cr-7', round: 'Semifinales', matchIndex: 7, playerA: 'Ganador Cuartos 1', playerB: 'Ganador Cuartos 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'cr-8', round: 'Semifinales', matchIndex: 8, playerA: 'Ganador Cuartos 3', playerB: 'Ganador Cuartos 4', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  // Gran Final Bo3
  { id: 'cr-9', round: 'GRAN FINAL (Bo3)', matchIndex: 9, playerA: 'Finalista 1', playerB: 'Finalista 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
];

export const DEMO_BATTLE_ROYALE_STANDINGS = {
  free_fire_escuadras: [
    { rank: 1, team: 'Los Duvalineros', captain: 'JORDAN', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 2, team: 'AJOS FC', captain: 'Alejandro Lucero', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 3, team: 'KODEX', captain: 'Alexis Mallamas', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 4, team: 'pisa cabezas', captain: 'Leonel De La Torre', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 5, team: 'Camtina', captain: 'Harold Mejia', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 6, team: 'Switch', captain: 'Maicol Flores', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 7, team: 'Lowe', captain: 'Xavier Lema', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 8, team: 'Zenith', captain: 'Elkin Cuayal', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 9, team: 'Dinastía-Cero', captain: 'Liceth Escobar', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 10, team: 'Los Renacidos', captain: 'Melinda Reascos', kills: 0, status: 'Confirmado - Sala Escuadras' },
    { rank: 11, team: 'leviatán', captain: 'Henry Tipaz', kills: 0, status: 'Confirmado - Sala Escuadras' },
  ],
  free_fire_solitario: [
    { rank: 1, team: 'David Tarapues (Solitario)', captain: 'David Tarapues', kills: 0, status: 'Confirmado - Sala Solitario' },
    { rank: 2, team: 'Matew Cevallos (Solitario)', captain: 'Matew Cevallos', kills: 0, status: 'Confirmado - Sala Solitario' },
    { rank: 3, team: 'Alejandro Tates (Solitario)', captain: 'Alejandro Tates', kills: 0, status: 'Confirmado - Sala Solitario' },
    { rank: 4, team: 'Harold Mejia (Solitario)', captain: 'Harold Mejia', kills: 0, status: 'Confirmado - Sala Solitario' },
    { rank: 5, team: 'Leonel De La Torre (Solitario)', captain: 'Leonel De La Torre', kills: 0, status: 'Confirmado - Sala Solitario' },
  ],
  fortnite_duos: [
    { rank: 1, team: 'G2 Encebollados', captain: 'Fernando Muñoz', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 2, team: '67 Boys', captain: 'Carlos Loza', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 3, team: '𓆰LOS MISMISIMOS𓆪', captain: 'Alejandro & Juan V.', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 4, team: 'Winners', captain: 'Anthony Hurtado', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 5, team: 'PERRITOS ORG', captain: 'Romel Maldonado', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 6, team: 'Herederos de epstein', captain: 'Angel Yar', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 7, team: 'Los legendarios', captain: 'Richard Bonilla', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 8, team: 'Los saiyans', captain: 'Andrés Argoti', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 9, team: 'Inges sin título', captain: 'José Jiménez', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 10, team: 'LOS GUACHITURROS', captain: 'Jeremy Valdivieso', kills: 0, status: 'Confirmado - Sala Dúos' },
    { rank: 11, team: 'CIBER', captain: 'Lenin Pozo', kills: 0, status: 'Confirmado - Sala Dúos' },
  ]
};
