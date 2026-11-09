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
    formatDetail: '2 Partidas Puntuables en Dúos: Partida 1 Con Construcción y Partida 2 Cero Construcción. Puntos: 1º: 10 pts, 2º: 5 pts, 3º: 3 pts, 4º: 2 pts, 5º: 1 pto, Kill: 1 pto.',
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
    stageTitle: 'M1: TEAM ING (1-0) | M2: Profugos de la pala (1-0) | M3: VIPERX (1-0)',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-4',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '21:00 - 21:45',
    gameId: 'free_fire',
    gameName: 'Free Fire - Torneo de Escuadras (Ronda 1 y 2)',
    stageTitle: '🏆 ¡CAMPEONES DE ESCUADRAS! R1: Lowe (Booyah) | R2: Pisa Cabezas (Booyah) • Torneo Concluido',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-5',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '21:45 - 22:30',
    gameId: 'free_fire',
    gameName: 'Free Fire - Torneo Solitario (Individual)',
    stageTitle: '👑 ¡GRAN CAMPEÓN INDIVIDUAL: SEBASTIÁN GUZMÁN (Pisa Cabezas)! • Torneo Concluido',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-6',
    dayLabel: 'Noche 2 - Jueves 5 de Noviembre',
    date: '2026-11-05',
    time: '22:30 - 23:45',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - Jornada 2: Semifinales',
    stageTitle: 'Semi 1: Profugos de la pala (1-0 ikonikos) | Semi 2: TEAM ING (1-0 VIPERX)',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-7',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '21:00 - 21:35',
    gameId: 'fortnite',
    gameName: 'Fortnite (Dúos) - Partida 1: Con Construcción (Build)',
    stageTitle: '🏆 Ronda 1 Concluida. Top 1: CIBER (14 pts) | Top 2: Winners (9 pts) | Top 3: PERRITOS ORG (9 pts)',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-8',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '21:35 - 22:15',
    gameId: 'fortnite',
    gameName: 'Fortnite (Dúos) - Partida 2: Cero Construcción (Zero Build)',
    stageTitle: '🏆 ¡TORNEO CONCLUIDO! Campeón: Winners (21 pts) • Subcampeón: PERRITOS ORG (16 pts)',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-9',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '22:15 - 23:40',
    gameId: 'valorant',
    gameName: 'Valorant (5v5) - LA GRAN FINAL (Bo3)',
    stageTitle: '🏆 ¡CAMPEÓN SUPREMO: PROFUGOS DE LA PALA (2-0)! Subcampeón: TEAM ING (Torneo Concluido)',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
  {
    id: 'sch-10',
    dayLabel: 'Noche 3 - Viernes 6 de Noviembre',
    date: '2026-11-06',
    time: '23:40 - 23:55',
    gameId: 'valorant',
    gameName: 'Ceremonia de Clausura & Premiación General',
    stageTitle: '🏆 Cuadro de Honor Completo de los 4 Juegos • ¡Compu League 2026 Finalizado con Éxito!',
    status: 'Finalizado',
    streamLabel: 'En vivo por Facebook',
  },
];

// Equipos y brackets oficiales basados 100% en el Roster Oficial del PDF
export const DEMO_VALORANT_MATCHES = [
  // Cuartos de Final (Bo1)
  { id: 'v-1', bracket: 'cuartos', round: 'Cuartos de Final', matchIndex: 1, teamA: 'LOS SIN MANOS', teamB: 'TEAM ING', scoreA: 0, scoreB: 1, winner: 'TEAM ING', status: 'completed' },
  { id: 'v-2', bracket: 'cuartos', round: 'Cuartos de Final', matchIndex: 2, teamA: 'Chupines 2027', teamB: 'Profugos de la pala', scoreA: 0, scoreB: 1, winner: 'Profugos de la pala', status: 'completed' },
  { id: 'v-3', bracket: 'cuartos', round: 'Cuartos de Final', matchIndex: 3, teamA: 'Los pusydystroyer', teamB: 'VIPERX', scoreA: 0, scoreB: 1, winner: 'VIPERX', status: 'completed' },
  
  // Semifinales (Bo1)
  { id: 'v-4', bracket: 'semis', round: 'Semifinales', matchIndex: 4, teamA: 'ikonikos', teamB: 'Profugos de la pala', scoreA: 0, scoreB: 1, winner: 'Profugos de la pala', status: 'completed' },
  { id: 'v-5', bracket: 'semis', round: 'Semifinales', matchIndex: 5, teamA: 'TEAM ING', teamB: 'VIPERX', scoreA: 1, scoreB: 0, winner: 'TEAM ING', status: 'completed' },

  // Gran Final (Bo3)
  { id: 'v-6', bracket: 'grand_final', round: 'GRAN FINAL (Bo3)', matchIndex: 6, teamA: 'Profugos de la pala', teamB: 'TEAM ING', scoreA: 2, scoreB: 0, winner: 'Profugos de la pala', status: 'completed' }
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

export const VALORANT_CHAMPIONS = {
  champion: {
    team: 'Profugos de la pala',
    captain: 'Mateo Huera (БАЙЧИ#КОЗЕЛ)',
    members: [
      'Juan Buelvas (BerteX 乂#PAN)',
      'Joseph Ramírez (RYOU HANABI#花火02)',
      'Anthony Huera (AnthonyHxe#GGZ)',
      'Diego Escobar (Dieguinho#3030)'
    ],
    score: '2-0',
    title: 'Gran Campeón Oficial Valorant 5v5 2026',
  },
  runnerUp: {
    team: 'TEAM ING',
    captain: 'Alex Pilacuan (AleXx #ECUA)',
    members: [
      'Edison Godoy (Edy #ECU)',
      'kevin Diaz (K3ViN #7004)',
      'Oscar Ger (Gero #2819)',
      'Kevin Mejia (AlexanderMy #UWU)'
    ],
    title: 'Subcampeón Oficial',
  },
  semifinalists: ['ikonikos', 'VIPERX'],
  completedDate: '2026-11-09'
};

export const CLASH_ROYALE_CHAMPION = {
  champion: 'Edwin Landeta',
  runnerUp: 'Stalin Obando',
  semifinalists: ['Milton Fuel Bravo', 'Kevin Pozo'],
  completedDate: '2026-11-04'
};

export const FREE_FIRE_CHAMPIONS = {
  round1: {
    team: 'Lowe',
    captain: 'Xavier Lema',
    captainId: '339299831',
    members: ['Edison (406508681)', 'JuanPa (2677070637)', 'Daniel (383753985)'],
    title: 'Campeón Escuadras - Ronda 1 (Booyah)',
  },
  round2: {
    team: 'pisa cabezas',
    captain: 'Leonel De La Torre',
    captainId: '693056546',
    members: ['Marlon Guamán (7232971902)', 'Juan Morán (262414604)', 'Sebastián Guzmán (2297093616)'],
    title: 'Campeón Escuadras - Ronda 2 (Booyah)',
  },
  solo: {
    player: 'Sebastián Guzmán',
    team: 'pisa cabezas',
    playerId: '2297093616',
    title: 'Gran Campeón Torneo Individual / Solitario (Booyah)',
  },
  completedDate: '2026-11-05'
};

export const FORTNITE_CHAMPIONS = {
  champion: {
    team: 'Winners',
    captain: 'Anthony Hurtado (Thony_Jh)',
    partner: 'Darío Castro (Daribootfn)',
    points: 21,
    kills: 11,
    title: 'Gran Campeón Oficial Fortnite Dúos 2026',
  },
  runnerUp: {
    team: 'PERRITOS ORG',
    captain: 'Romel Maldonado (DrackRomel)',
    partner: 'Alejandro Rivera (Flaizzz ﾒ)',
    points: 16,
    kills: 12,
    title: 'Subcampeón Oficial',
  },
  thirdPlace: {
    team: '67 Boys',
    captain: 'Carlos Loza (Carloxin67)',
    partner: 'Enrique Patiño (Moonsoft 67)',
    points: 14,
    kills: 4,
  },
  fourthPlace: {
    team: 'CIBER',
    captain: 'Lenin Pozo (leninpx_)',
    partner: 'Luis Ibujes (Laiib)',
    points: 14,
    kills: 4,
  },
  completedDate: '2026-11-06'
};

export const DEMO_BATTLE_ROYALE_STANDINGS = {
  free_fire_escuadras: [
    { rank: 1, team: 'pisa cabezas', captain: 'Leonel De La Torre', kills: 14, status: '🏆 BOOYAH RONDA 2 (CAMPEÓN)', isWinner: true },
    { rank: 2, team: 'Lowe', captain: 'Xavier Lema', kills: 12, status: '🏆 BOOYAH RONDA 1 (CAMPEÓN)', isWinner: true },
    { rank: 3, team: 'Los Duvalineros', captain: 'JORDAN', kills: 7, status: 'Top 3 • Finalizado' },
    { rank: 4, team: 'CHUPITeam', captain: 'Mateo Cuaical', kills: 6, status: 'Top 4 • Finalizado' },
    { rank: 5, team: 'AJOS FC', captain: 'Alejandro Lucero', kills: 5, status: 'Top 5 • Finalizado' },
    { rank: 6, team: 'KODEX', captain: 'Alexis Mallamas', kills: 4, status: 'Finalizado' },
    { rank: 7, team: 'Camtina', captain: 'Harold Mejia', kills: 4, status: 'Finalizado' },
    { rank: 8, team: 'Switch', captain: 'Maicol Flores', kills: 3, status: 'Finalizado' },
    { rank: 9, team: 'Zenith', captain: 'Elkin Cuayal', kills: 3, status: 'Finalizado' },
    { rank: 10, team: 'Dinastía-Cero', captain: 'Liceth Escobar', kills: 2, status: 'Finalizado' },
    { rank: 11, team: 'Los Renacidos', captain: 'Melinda Reascos', kills: 2, status: 'Finalizado' },
    { rank: 12, team: 'leviatán', captain: 'Henry Tipaz', kills: 1, status: 'Finalizado' },
    { rank: 13, team: 'Los Solitarios (Trío)', captain: 'David Tarapues / Matew / Alejandro', kills: 1, status: 'Finalizado' },
    { rank: 14, team: 'Los duros del trago', captain: 'Anchundia Kevin', kills: 1, status: 'Finalizado' },
    { rank: 15, team: 'Team Dylan', captain: 'Dylan (亗Dylanᖭ22♡)', kills: 0, status: 'Finalizado' },
    { rank: 16, team: 'Team Elvin Yumi', captain: 'Elvin Yumi', kills: 0, status: 'Finalizado' },
  ],
  free_fire_solitario: [
    { rank: 1, team: 'Sebastián Guzmán', captain: 'Sebastián Guzmán (Pisa Cabezas - 2297093616)', kills: 7, status: '👑 GRAN CAMPEÓN INDIVIDUAL (BOOYAH)', isWinner: true },
    { rank: 2, team: 'David Tarapues', captain: 'David Tarapues', kills: 4, status: 'Top 2 • Finalizado' },
    { rank: 3, team: 'Leonel De La Torre', captain: 'Leonel De La Torre', kills: 4, status: 'Top 3 • Finalizado' },
    { rank: 4, team: 'Matew Cevallos', captain: 'Matew Cevallos', kills: 3, status: 'Top 4 • Finalizado' },
    { rank: 5, team: 'Alejandro Tates', captain: 'Alejandro Tates', kills: 3, status: 'Top 5 • Finalizado' },
    { rank: 6, team: 'Xavier Lema', captain: 'Xavier Lema', kills: 2, status: 'Finalizado' },
    { rank: 7, team: 'Harold Mejia', captain: 'Harold Mejia', kills: 2, status: 'Finalizado' },
    { rank: 8, team: 'Alexis Mallamas', captain: 'Alexis Mallamas', kills: 1, status: 'Finalizado' },
    { rank: 9, team: 'Alejandro Lucero', captain: 'Alejandro Lucero', kills: 1, status: 'Finalizado' },
    { rank: 10, team: 'Elkin Cuayal', captain: 'Elkin Cuayal', kills: 1, status: 'Finalizado' },
    { rank: 11, team: 'Liceth Escobar', captain: 'Liceth Escobar', kills: 1, status: 'Finalizado' },
    { rank: 12, team: 'Melinda Reascos', captain: 'Melinda Reascos', kills: 0, status: 'Finalizado' },
    { rank: 13, team: 'Henry Tipaz', captain: 'Henry Tipaz', kills: 0, status: 'Finalizado' },
    { rank: 14, team: 'Mateo Cuaical', captain: 'Mateo Cuaical', kills: 0, status: 'Finalizado' },
    { rank: 15, team: 'JORDAN', captain: 'JORDAN', kills: 0, status: 'Finalizado' },
    { rank: 16, team: 'Maicol Flores', captain: 'Maicol Flores', kills: 0, status: 'Finalizado' },
  ],
  fortnite_duos: [
    { rank: 1, team: 'Winners', captain: 'Anthony Hurtado (Thony_Jh) / Darío Castro (Daribootfn)', kills: 11, points: 21, status: '👑 GRAN CAMPEÓN (21 PTS)', isWinner: true },
    { rank: 2, team: 'PERRITOS ORG', captain: 'Romel Maldonado (DrackRomel) / Alejandro Rivera (Flaizzz)', kills: 12, points: 16, status: '🥈 SUBCAMPEÓN (16 PTS)', isWinner: true },
    { rank: 3, team: '67 Boys', captain: 'Carlos Loza (Carloxin67) / Enrique Patiño (Moonsoft)', kills: 4, points: 14, status: '🥉 3º LUGAR (14 PTS)' },
    { rank: 4, team: 'CIBER', captain: 'Lenin Pozo (leninpx_) / Luis Ibujes (Laiib)', kills: 4, points: 14, status: '🎖️ 4º LUGAR (14 PTS)' },
    { rank: 5, team: 'Los saiyans', captain: 'Andrés Argoti (Rocrak675) / Daniel Revelo (ROBEN30)', kills: 5, points: 9, status: '5º Lugar (9 PTS)' },
    { rank: 6, team: 'G2 Encebollados', captain: 'Fernando Muñoz (Ferxxr_) / Alair Vinueza (Benji.vin)', kills: 0, points: 4, status: '6º Lugar (4 PTS)' },
    { rank: 7, team: 'LOS SIN MANOS', captain: 'Anthony Jimenez (ElMalius) / Nahim Arciniegas (n4him_xo)', kills: 3, points: 3, status: '7º Lugar (3 PTS)' },
    { rank: 8, team: 'Herederos de epstein', captain: 'Angel Yar (angelooxx1724) / Joelin Garcia (Joel.xdxd)', kills: 2, points: 2, status: '8º Lugar (2 PTS)' },
    { rank: 9, team: 'LOS GUACHITURROS', captain: 'Jeremy Valdivieso (JEREMY214v2) / Sebastian Paucar (ZZSebaStia)', kills: 2, points: 2, status: '9º Lugar (2 PTS)' },
    { rank: 10, team: '𓆰LOS MISMISIMOS𓆪', captain: 'Alejandr (kevgokiu) / Juan Viñachi (CarlxsSJJ)', kills: 0, points: 0, status: '0 PTS' },
    { rank: 11, team: 'TEAM ING', captain: 'Edison Godoy (Edy22O) / Kevin Mejia (diaz_Kevin)', kills: 0, points: 0, status: '0 PTS' },
    { rank: 12, team: 'Los legendarios', captain: 'Richard Bonilla (Richi.137) / Dylan Cuacés (Miki_c137)', kills: 0, points: 0, status: '0 PTS' },
    { rank: 13, team: 'Inges sin título', captain: 'José Jiménez (Hod plays) / Sebastian Jiménez (sebistis12)', kills: 0, points: 0, status: '0 PTS' },
  ]
};
