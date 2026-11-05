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
    teamFormat: 'Escuadras (4 jugadores) y Sala Solitario Abierta',
    requiredPlayers: 4,
    maxPlayers: 4,
    substitutesAllowed: false,
    priceTotal: 4.00,
    priceNote: '$4 por Escuadra, o $1 solo Individual.',
    bracketType: 'battle_royale',
    formatDetail: '2 Partidas Oficiales: Partida 1 en Escuadras y Partida 2 en Solitario (acceso libre para todos los participantes inscritos). Gana quien se lleve el BOOYAH.',
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
    description: 'Batalla Campal de supervivencia y duelos en parejas con y sin construcción.',
    teamFormat: 'Dúos',
    requiredPlayers: 2,
    maxPlayers: 2,
    substitutesAllowed: false,
    priceTotal: 2.00,
    priceNote: '$2 por Dúo ($1 por persona)',
    bracketType: 'battle_royale',
    formatDetail: '2 Partidas Puntuables en Dúos: Partida 1 Con Construcción (Build) y Partida 2 Cero Construcción (Zero Build). Puntos acumulados por posición y eliminaciones.',
    platform: 'Multiplataforma',
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
    stageTitle: '🏆 ¡CAMPEÓN: EDWIN LANDETA (2-0)! Subcampeón: Stalin Obando (Torneo Finalizado)',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-3',
    dayLabel: 'Noche 1 - Miércoles 4 de Noviembre',
    date: '2026-11-04',
    time: '22:15 - 23:45',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - Jornada 1: Cuartos de Final',
    stageTitle: 'Match 1: TEAM ING superó a LOS SIN MANOS (1-0) | Match 2: Chupines 2027 vs Profugos | Match 3: Pusydystroyer vs VIPERX',
    status: 'En Curso',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-4',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '21:00 - 21:45',
    gameId: 'free_fire',
    gameName: 'Free Fire - Partida 1: Torneo de Escuadras',
    stageTitle: '16 Escuadras en Sala Personalizada Battle Royale. 8 en Sala A y 8 en Sala B.',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-5',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '21:45 - 22:30',
    gameId: 'free_fire',
    gameName: 'Free Fire - Partida 2: Torneo Solitario (Todos)',
    stageTitle: 'Sala Abierta para Todos los Inscritos de Free Fire. ¡Booyah Individual!',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-6',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '22:30 - 23:45',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - Jornada 2: Semifinales',
    stageTitle: 'Semi 1: ikonikos vs Ganador M2 | Semi 2: TEAM ING vs Ganador M3',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-7',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '21:00 - 21:35',
    gameId: 'fortnite',
    gameName: 'Fortnite (Dúos) - Partida 1: Con Construcción (Build)',
    stageTitle: '13 Dúos en Sala Personalizada en Parejas - Modo Clásico Con Construcción',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-8',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '21:35 - 22:15',
    gameId: 'fortnite',
    gameName: 'Fortnite (Dúos) - Partida 2: Cero Construcción (Zero Build)',
    stageTitle: 'Puntería pura y coberturas. Cómputo final de puntos acumulados',
    status: 'Programado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-9',
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
    id: 'sch-10',
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
  // Cuartos de Final (Bo1)
  { id: 'v-1', bracket: 'cuartos', round: 'Cuartos de Final', matchIndex: 1, teamA: 'LOS SIN MANOS', teamB: 'TEAM ING', scoreA: 0, scoreB: 1, winner: 'TEAM ING', status: 'completed' },
  { id: 'v-2', bracket: 'cuartos', round: 'Cuartos de Final', matchIndex: 2, teamA: 'Chupines 2027', teamB: 'Profugos de la pala', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-3', bracket: 'cuartos', round: 'Cuartos de Final', matchIndex: 3, teamA: 'Los pusydystroyer', teamB: 'VIPERX', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  
  // Semifinales (Bo1)
  { id: 'v-4', bracket: 'semis', round: 'Semifinales', matchIndex: 4, teamA: 'ikonikos', teamB: 'Ganador Match 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },
  { id: 'v-5', bracket: 'semis', round: 'Semifinales', matchIndex: 5, teamA: 'TEAM ING', teamB: 'Ganador Match 3', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' },

  // Gran Final (Bo3)
  { id: 'v-6', bracket: 'grand_final', round: 'GRAN FINAL (Bo3)', matchIndex: 6, teamA: 'Ganador Semifinal 1', teamB: 'Ganador Semifinal 2', scoreA: 0, scoreB: 0, winner: null, status: 'scheduled' }
];

export const DEMO_CLASH_MATCHES = [
  // Duelo Clasificatorio de Apertura (Play-In Bo1)
  { id: 'cr-playin', round: 'Play-In Apertura (Bo1)', matchIndex: 0, playerA: 'Nicolas Villareal', playerB: 'Kevin Diaz', scoreA: 0, scoreB: 1, winner: 'Kevin Diaz', status: 'completed' },

  // Octavos de Final (Bo1)
  { id: 'cr-1', round: 'Octavos de Final (Bo1)', matchIndex: 1, playerA: 'Jordan Bastidas', playerB: 'Akane Reina', scoreA: 0, scoreB: 1, winner: 'Akane Reina', status: 'completed' },
  { id: 'cr-2', round: 'Octavos de Final (Bo1)', matchIndex: 2, playerA: 'Edwin Landeta', playerB: 'Harold Mejia', scoreA: 1, scoreB: 0, winner: 'Edwin Landeta', status: 'completed' },
  { id: 'cr-3', round: 'Octavos de Final (Bo1)', matchIndex: 3, playerA: 'Danny Quilumbaquin', playerB: 'Paul Ger', scoreA: 0, scoreB: 1, winner: 'Paul Ger', status: 'completed' },
  { id: 'cr-4', round: 'Octavos de Final (Bo1)', matchIndex: 4, playerA: 'Ivan Bernal', playerB: 'Marcillo Pablo', scoreA: 1, scoreB: 0, winner: 'Ivan Bernal', status: 'completed' },
  { id: 'cr-5', round: 'Octavos de Final (Bo1)', matchIndex: 5, playerA: 'Stalin Obando', playerB: 'Lenin Rodríguez', scoreA: 1, scoreB: 0, winner: 'Stalin Obando', status: 'completed' },
  { id: 'cr-6', round: 'Octavos de Final (Bo1)', matchIndex: 6, playerA: 'Jeremy Valdivieso', playerB: 'Kevin Pozo', scoreA: 0, scoreB: 1, winner: 'Kevin Pozo', status: 'completed' },
  { id: 'cr-7', round: 'Octavos de Final (Bo1)', matchIndex: 7, playerA: 'Juan Carlos Llore', playerB: 'Edison Godoy', scoreA: 0, scoreB: 1, winner: 'Edison Godoy', status: 'completed' },
  { id: 'cr-8', round: 'Octavos de Final (Bo1)', matchIndex: 8, playerA: 'Milton Fuel Bravo', playerB: 'Kevin Diaz', scoreA: 1, scoreB: 0, winner: 'Milton Fuel Bravo', status: 'completed' },
  
  // Cuartos de Final (Bo1)
  { id: 'cr-9', round: 'Cuartos de Final (Bo1)', matchIndex: 9, playerA: 'Milton Fuel Bravo', playerB: 'Akane Reina', scoreA: 1, scoreB: 0, winner: 'Milton Fuel Bravo', status: 'completed' },
  { id: 'cr-10', round: 'Cuartos de Final (Bo1)', matchIndex: 10, playerA: 'Edison Godoy', playerB: 'Edwin Landeta', scoreA: 0, scoreB: 1, winner: 'Edwin Landeta', status: 'completed' },
  { id: 'cr-11', round: 'Cuartos de Final (Bo1)', matchIndex: 11, playerA: 'Stalin Obando', playerB: 'Paul Ger', scoreA: 1, scoreB: 0, winner: 'Stalin Obando', status: 'completed' },
  { id: 'cr-12', round: 'Cuartos de Final (Bo1)', matchIndex: 12, playerA: 'Kevin Pozo', playerB: 'Ivan Bernal', scoreA: 1, scoreB: 0, winner: 'Kevin Pozo', status: 'completed' },
  
  // Semifinales (Bo1)
  { id: 'cr-13', round: 'Semifinal 1 (Bo1)', matchIndex: 13, playerA: 'Milton Fuel Bravo', playerB: 'Edwin Landeta', scoreA: 0, scoreB: 1, winner: 'Edwin Landeta', status: 'completed' },
  { id: 'cr-14', round: 'Semifinal 2 (Bo1)', matchIndex: 14, playerA: 'Stalin Obando', playerB: 'Kevin Pozo', scoreA: 1, scoreB: 0, winner: 'Stalin Obando', status: 'completed' },
  
  // Gran Final (Al mejor de 2/3 - Victoria 2-0)
  { id: 'cr-15', round: 'GRAN FINAL (2 - 0)', matchIndex: 15, playerA: 'Edwin Landeta', playerB: 'Stalin Obando', scoreA: 2, scoreB: 0, winner: 'Edwin Landeta', status: 'completed' },
];

export const CLASH_ROYALE_CHAMPION = {
  champion: 'Edwin Landeta',
  runnerUp: 'Stalin Obando',
  semifinalists: ['Milton Fuel Bravo', 'Kevin Pozo'],
  completedDate: '2026-11-04'
};

export const DEMO_BATTLE_ROYALE_STANDINGS = {
  free_fire_escuadras: [
    { rank: 1, team: 'Los Duvalineros', captain: 'JORDAN', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 2, team: 'CHUPITeam', captain: 'Mateo Cuaical', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 3, team: 'AJOS FC', captain: 'Alejandro Lucero', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 4, team: 'KODEX', captain: 'Alexis Mallamas', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 5, team: 'pisa cabezas', captain: 'Leonel De La Torre', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 6, team: 'Camtina', captain: 'Harold Mejia', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 7, team: 'Switch', captain: 'Maicol Flores', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 8, team: 'Lowe', captain: 'Xavier Lema', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 9, team: 'Zenith', captain: 'Elkin Cuayal', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 10, team: 'Dinastía-Cero', captain: 'Liceth Escobar', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 11, team: 'Los Renacidos', captain: 'Melinda Reascos', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 12, team: 'leviatán', captain: 'Henry Tipaz', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 13, team: 'Los Solitarios (Trío)', captain: 'David Tarapues / Matew / Alejandro', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 14, team: 'Los duros del trago', captain: 'Anchundia Kevin', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 15, team: 'Team Dylan', captain: 'Dylan (亗Dylanᖭ22♡)', kills: 0, status: 'Sala Escuadras + Solitario' },
    { rank: 16, team: 'Team Elvin Yumi', captain: 'Elvin Yumi', kills: 0, status: 'Sala Escuadras + Solitario' },
  ],
  free_fire_solitario: [
    { rank: 1, team: 'David Tarapues', captain: 'David Tarapues', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 2, team: 'Matew Cevallos', captain: 'Matew Cevallos', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 3, team: 'Alejandro Tates', captain: 'Alejandro Tates', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 4, team: 'Leonel De La Torre', captain: 'Leonel De La Torre', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 5, team: 'Harold Mejia', captain: 'Harold Mejia', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 6, team: 'Alexis Mallamas', captain: 'Alexis Mallamas', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 7, team: 'Alejandro Lucero', captain: 'Alejandro Lucero', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 8, team: 'Xavier Lema', captain: 'Xavier Lema', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 9, team: 'Elkin Cuayal', captain: 'Elkin Cuayal', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 10, team: 'Liceth Escobar', captain: 'Liceth Escobar', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 11, team: 'Melinda Reascos', captain: 'Melinda Reascos', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 12, team: 'Henry Tipaz', captain: 'Henry Tipaz', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 13, team: 'Mateo Cuaical', captain: 'Mateo Cuaical', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 14, team: 'JORDAN', captain: 'JORDAN', kills: 0, status: 'Sala Solitario Abierta' },
    { rank: 15, team: 'Maicol Flores', captain: 'Maicol Flores', kills: 0, status: 'Sala Solitario Abierta' },
  ],
  fortnite_duos: [
    { rank: 1, team: 'LOS SIN MANOS', captain: 'ANTHONY JIMENEZ', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 2, team: 'G2 Encebollados', captain: 'Fernando Muñoz', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 3, team: '67 Boys', captain: 'Carlos Loza', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 4, team: 'LOS MISMISIMOS', captain: 'Alejandro & Juan V.', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 5, team: 'Winners', captain: 'Anthony Hurtado', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 6, team: 'PERRITOS ORG', captain: 'Romel Maldonado', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 7, team: 'Herederos de epstein', captain: 'Angel Yar', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 8, team: 'Los legendarios', captain: 'Richard Bonilla', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 9, team: 'Los saiyans', captain: 'Andrés Argoti', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 10, team: 'Inges sin título', captain: 'José Jiménez', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 11, team: 'LOS GUACHITURROS', captain: 'Jeremy Valdivieso', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
    { rank: 12, team: 'CIBER', captain: 'Lenin Pozo', kills: 0, status: 'Partida 1 (Build) + Partida 2 (Zero Build)' },
  ]
};
