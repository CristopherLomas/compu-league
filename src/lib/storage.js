import { OFFICIAL_CONFIRMED_ROSTER } from '../data/officialConfirmedRoster';
// Sistema de Almacenamiento Unificado: Supabase + LocalStorage Fallback
import { createClient } from '@supabase/supabase-js';
import { 
  DEMO_VALORANT_MATCHES, 
  DEMO_CLASH_MATCHES, 
  DEMO_BATTLE_ROYALE_STANDINGS, 
  INITIAL_SCHEDULE 
} from '../data/tournamentData';

const STORAGE_KEYS = {
  REGISTRATIONS: 'compu_league_registrations',
  VALORANT_MATCHES: 'compu_league_valorant_matches',
  CLASH_MATCHES: 'compu_league_clash_matches',
  BR_STANDINGS: 'compu_league_br_standings',
  SCHEDULE: 'compu_league_schedule',
  SUPABASE_CONFIG: 'compu_league_supabase_config',
};

// Default Official Supabase Credentials (permanente y seguro para producción)
export const DEFAULT_SUPABASE_URL = 'https://tcntzazutwamcmcrwtji.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbnR6YXp1dHdhbWNtY3J3dGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5Njk4OTEsImV4cCI6MjA5NTU0NTg5MX0.feQC7r8mXHykDzVp8nCW1jyfonveQYlQhSiygeF0rk0';

// Obtener credenciales con verificación estricta y fallback garantizado
export const getSupabaseCredentials = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.url === 'string' && parsed.url.trim().startsWith('http') && !parsed.url.includes('xyzcompany') && parsed.anonKey) {
        return {
          url: parsed.url.trim(),
          anonKey: parsed.anonKey.trim(),
        };
      }
    }
  } catch (e) {
    // ignore
  }

  const envUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || '';
  const envKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || '';

  return {
    url: (envUrl && envUrl.trim().startsWith('http')) ? envUrl.trim() : DEFAULT_SUPABASE_URL,
    anonKey: envKey.trim() || DEFAULT_SUPABASE_ANON_KEY,
  };
};

export const saveSupabaseCredentials = (url, anonKey) => {
  localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify({ url, anonKey }));
};

export const getSupabaseClient = () => {
  const creds = getSupabaseCredentials();
  if (creds.url && creds.anonKey) {
    try {
      return createClient(creds.url, creds.anonKey);
    } catch (err) {
      console.warn('Error inicializando cliente Supabase:', err);
    }
  }
  return null;
};

export const sanitizeRegistrationRecord = (r) => {
  if (!r) return r;
  const rawMembers = Array.isArray(r.members) ? r.members : [];
  const normalizedMembers = rawMembers.map((m) => {
    const idVal = String(m.game_id || m.gameId || m.nick || m.gamerTag || m.id_juego || '').trim();
    const isSub = Boolean(m.is_substitute || m.isSubstitute);
    return {
      ...m,
      name: m.name ? String(m.name).trim() : '',
      game_id: idVal,
      gameId: idVal,
      whatsapp: m.whatsapp ? String(m.whatsapp).trim() : '',
      is_substitute: isSub,
      isSubstitute: isSub,
    };
  });

  if (r.game === 'clash_royale') {
    return {
      ...r,
      is_free_agent: true,
      members: [],
      modality: '1v1',
      total_amount: 1.00,
      amount_due: 1.00,
      team_name: r.captain_name || r.team_name || 'Individual',
      admin_notes: r.admin_notes ? r.admin_notes.replace(/agente libre/gi, 'individual') : r.admin_notes
    };
  }
  return {
    ...r,
    members: normalizedMembers,
    admin_notes: r.admin_notes ? r.admin_notes.replace(/agente libre/gi, 'individual') : r.admin_notes
  };
};

// -------------------------------------------------------------
// REGISTROS PÚBLICOS (PROTECCIÓN DE PRIVACIDAD: SIN TELÉFONOS, EMAILS NI COMPROBANTES)
// -------------------------------------------------------------
export const processPublicRoster = (rawRecords) => {
  if (!Array.isArray(rawRecords) || rawRecords.length === 0) {
    return OFFICIAL_CONFIRMED_ROSTER;
  }

  const confirmed = rawRecords.filter((r) => {
    if (r.status === 'rejected') return false;
    const isApprovedOrPaid = r.status === 'approved' || r.status === 'confirmed' || r.payment_status === 'paid';
    if (!isApprovedOrPaid) return false;

    const cap = (r.captain_name || '').toLowerCase();
    const team = (r.team_name || '').toLowerCase();

    // Excluir a Leonel de Valorant (reembolso por falta de equipo)
    if (r.game === 'valorant' && (cap.includes('leonel') || team.includes('leonel'))) return false;

    // Excluir pre-registros pendientes no confirmados
    if (cap.includes('darwin morales') || cap.includes('brayan tacan') || team.includes('cultosmv') || team.includes('evil genius')) {
      return false;
    }

    return true;
  });

  const ffSolitarios = [];
  const processed = [];

  for (const r of confirmed) {
    const cap = (r.captain_name || '').toLowerCase();
    const team = (r.team_name || '').toLowerCase();

    // Unificar solitarios de Free Fire
    if (r.game === 'free_fire' && (cap.includes('tarapues') || cap.includes('cevallos') || cap.includes('tates') || team.includes('solitario') || team.includes('individual'))) {
      const exists = ffSolitarios.some(s => (s.captain_name || '').toLowerCase().trim() === cap.trim());
      if (!exists) {
        ffSolitarios.push(r);
      }
      continue;
    }

    // Normalizar Clash Royale como 1v1 individual estricto
    if (r.game === 'clash_royale') {
      processed.push({
        ...sanitizeRegistrationRecord(r),
        is_free_agent: true,
        members: [],
        modality: '1v1',
      });
      continue;
    }

    processed.push(sanitizeRegistrationRecord(r));
  }

  // Si se encontraron solitarios de Free Fire, unificarlos en una sola Escuadra
  if (ffSolitarios.length > 0) {
    const leader = ffSolitarios.find(s => (s.captain_name || '').toLowerCase().includes('tarapues')) || ffSolitarios[0];
    const otherMembers = ffSolitarios.filter(s => s !== leader).map(s => ({
      name: s.captain_name || 'Compañero Solitario',
      game_id: s.captain_game_id || '',
      gameId: s.captain_game_id || '',
      is_substitute: false,
      isSubstitute: false,
    }));

    processed.push({
      id: 'ff-squad-solitarios',
      created_at: leader.created_at || '2026-11-03T18:00:00Z',
      game: 'free_fire',
      game_name: 'FREE FIRE',
      modality: 'escuadras',
      ff_modality: 'escuadras',
      team_name: 'Los Solitarios (Trío Oficial)',
      is_free_agent: false,
      captain_name: leader.captain_name,
      captain_game_id: leader.captain_game_id,
      members: otherMembers,
      status: 'approved',
      payment_status: 'paid',
    });
  }

  if (processed.length >= 40) {
    return processed;
  }

  return OFFICIAL_CONFIRMED_ROSTER;
};

export const getPublicRegistrations = async () => {
  const creds = getSupabaseCredentials();

  // 1. Intento con Supabase Client SDK
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, created_at, game, game_name, modality, ff_modality, team_name, is_free_agent, captain_name, captain_game_id, members, status, payment_status')
        .neq('status', 'rejected')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return processPublicRoster(data);
      }
    } catch (err) {
      console.warn('Error obteniendo registros públicos con Supabase Client:', err);
    }
  }

  // 2. Intento de respaldo con fetch() directo HTTP nativo
  if (creds.url && creds.anonKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(
        `${creds.url}/rest/v1/registrations?select=id,created_at,game,game_name,modality,ff_modality,team_name,is_free_agent,captain_name,captain_game_id,members,status,payment_status&status=neq.rejected&order=created_at.desc`,
        {
          headers: {
            apikey: creds.anonKey,
            Authorization: `Bearer ${creds.anonKey}`,
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const rawJson = await res.json();
        if (Array.isArray(rawJson) && rawJson.length > 0) {
          return processPublicRoster(rawJson);
        }
      }
    } catch (e) {
      console.warn('Fetch fallback public registrations failed:', e);
    }
  }

  // 3. Fallback directo a lista oficial confirmada idéntica al PDF
  return OFFICIAL_CONFIRMED_ROSTER;
};

// REGISTROS COMPLETOS (USO EXCLUSIVO DEL PANEL DE ADMINISTRACIÓN)
// -------------------------------------------------------------
export const getRegistrations = async () => {
  const creds = getSupabaseCredentials();

  // 1. Intento principal con @supabase/supabase-js
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(data));
        } catch {}
        return data.map(sanitizeRegistrationRecord);
      }
    } catch (err) {
      console.warn('Error en consulta SDK Supabase, intentando fetch nativo:', err);
    }
  }

  // 2. Intento de respaldo con fetch() directo HTTP nativo (resiliente en 4G/móvil)
  if (creds.url && creds.anonKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`${creds.url}/rest/v1/registrations?select=*&order=created_at.desc`, {
        headers: {
          apikey: creds.anonKey,
          Authorization: `Bearer ${creds.anonKey}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const rawJson = await res.json();
        if (Array.isArray(rawJson) && rawJson.length > 0) {
          try {
            localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(rawJson));
          } catch {}
          return rawJson.map(sanitizeRegistrationRecord);
        }
      }
    } catch (fetchErr) {
      console.warn('Fetch directo HTTP nativo a Supabase falló:', fetchErr);
    }
  }

  // 3. Fallback LocalStorage (Registros cacheados previamente)
  const savedLocal = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (savedLocal) {
    try {
      if (savedLocal.includes('reg-val-1') || savedLocal.includes('CyberKnights') || savedLocal.includes('Alpha Hunters')) {
        localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
      }
    } catch (e) {}
  }
  const cleanSavedLocal = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (cleanSavedLocal) {
    try {
      const parsed = JSON.parse(cleanSavedLocal);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeRegistrationRecord);
      }
    } catch (e) {}
  }

  // Registros demo iniciales para que el portal muestre equipos y jugadores de inmediato
  const defaultRegistrations = OFFICIAL_CONFIRMED_ROSTER;
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(defaultRegistrations));
  return defaultRegistrations;
};

// Generador de UUID v4 estándar (ej: a8098c1a-f86e-11da-bd1a-00112444be1e)
export const generateUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const getRegistrationById = async (id) => {
  if (!id) return null;
  const cleanId = String(id).trim();

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', cleanId)
        .maybeSingle();
      if (!error && data) return sanitizeRegistrationRecord(data);
    } catch (e) {
      console.warn('Error al buscar registro en Supabase:', e);
    }
  }

  const all = await getRegistrations();
  return all.find(r => String(r.id).trim().toLowerCase() === cleanId.toLowerCase()) || null;
};

export const sanitizeRegistrationForSupabase = (record) => {
  const allowed = [
    'id', 'created_at', 'game', 'game_name', 'modality', 'ff_modality',
    'team_name', 'is_free_agent', 'captain_name', 'captain_game_id',
    'captain_whatsapp', 'captain_email', 'captain_discord', 'members',
    'amount_due', 'total_amount', 'receipt_url', 'receipt_image',
    'payment_status', 'status', 'admin_notes', 'verified_at', 'updated_at'
  ];
  const clean = {};
  allowed.forEach((col) => {
    if (record[col] !== undefined) {
      clean[col] = record[col];
    }
  });
  return clean;
};

export const uploadReceiptToSupabase = async (file, registrationId) => {
  const supabase = getSupabaseClient();
  if (!supabase || !file) return null;

  // Validación estricta de seguridad: Solo imágenes legítimas (JPG, PNG, WEBP)
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const fileType = (file.type || '').toLowerCase();
  if (fileType && !allowedMimeTypes.includes(fileType)) {
    console.warn('Seguridad: Formato de archivo rechazado. Solo se permiten imágenes JPG, PNG o WEBP.');
    return null;
  }

  // Sanitización de extensión para evitar inyecciones ejecutables o scripts
  const rawExt = file.name ? file.name.split('.').pop().toLowerCase() : 'png';
  const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(rawExt) ? rawExt : 'png';

  try {
    const fileName = `${registrationId || generateUUID()}-${Date.now()}.${safeExt}`;
    const filePath = `receipts/${fileName}`;

    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(filePath, file, {
        contentType: fileType || 'image/png',
        cacheControl: '3600',
        upsert: true
      });

    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(filePath);
      return publicUrl;
    }
    if (error) {
      console.warn('Supabase storage upload error:', error.message);
    }
  } catch (err) {
    console.warn('Error uploading receipt to Supabase storage:', err);
  }
  return null;
};

export const saveRegistration = async (registrationData) => {
  // If Clash Royale, strictly enforce 1v1 individual constraints
  if (registrationData.game === 'clash_royale') {
    registrationData = {
      ...registrationData,
      is_free_agent: true,
      members: [],
      modality: '1v1',
      total_amount: 1.00,
      amount_due: 1.00,
      team_name: registrationData.captain_name || registrationData.team_name || 'Individual',
    };
  }

  const supabase = getSupabaseClient();
  const recordId = registrationData.id || generateUUID();
  // Si hay un archivo y Supabase está activo, intentar subir al Storage
  let storageUrl = null;
  if (registrationData.receipt_file && supabase) {
    storageUrl = await uploadReceiptToSupabase(registrationData.receipt_file, recordId);
  }

  const finalReceiptUrl = storageUrl || registrationData.receipt_url || registrationData.receipt_image || null;

  const newRecord = {
    ...registrationData,
    id: recordId,
    created_at: registrationData.created_at || new Date().toISOString(),
    status: registrationData.status || 'pending',
    payment_status: registrationData.payment_status || (registrationData.status === 'payment_pending' ? 'unpaid' : 'paid'),
    receipt_url: finalReceiptUrl,
    receipt_image: registrationData.receipt_image || finalReceiptUrl,
  };

  delete newRecord.receipt_file;

  if (supabase) {
    try {
      const dbPayload = sanitizeRegistrationForSupabase(newRecord);
      const { data, error } = await supabase
        .from('registrations')
        .insert([dbPayload])
        .select();
      if (!error && data && data[0]) return sanitizeRegistrationRecord(data[0]);
      if (error) {
        console.warn('⚠️ Error al insertar en Supabase:', error.message);
      }
    } catch (e) {
      console.warn('Supabase insert failed, fallback to local:', e);
    }
  }

  // Fallback Local
  const current = await getRegistrations();
  const updated = [newRecord, ...current.filter(r => r.id !== recordId)];
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
  return newRecord;
};

export const updateRegistrationReceipt = async (id, receiptImage, receiptFile = null) => {
  if (!id) return null;
  const cleanId = String(id).trim();
  const now = new Date().toISOString();

  const supabase = getSupabaseClient();
  let storageUrl = null;
  if (receiptFile && supabase) {
    storageUrl = await uploadReceiptToSupabase(receiptFile, cleanId);
  }

  const finalReceiptUrl = storageUrl || receiptImage;

  const updates = {
    receipt_image: receiptImage || finalReceiptUrl,
    receipt_url: finalReceiptUrl,
    payment_status: 'paid',
    status: 'pending',
    updated_at: now,
    admin_notes: 'Comprobante subido mediante Enlace Mágico. Pendiente de verificación.'
  };

  if (supabase) {
    try {
      const dbUpdates = sanitizeRegistrationForSupabase(updates);
      await supabase
        .from('registrations')
        .update(dbUpdates)
        .eq('id', cleanId);
    } catch (e) {
      console.warn('Supabase update receipt failed:', e);
    }
  }

  const current = await getRegistrations();
  let found = null;
  const updated = current.map((r) => {
    if (String(r.id).trim().toLowerCase() === cleanId.toLowerCase()) {
      found = { ...r, ...updates };
      return found;
    }
    return r;
  });

  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
  return found;
};

export const updateRegistrationData = async (id, updatedFields) => {
  if (!id) return null;
  const cleanId = String(id).trim();

  // Si es Clash Royale, forzar estrictamente 1v1 individual sin equipo ni miembros
  if (updatedFields.game === 'clash_royale') {
    updatedFields = {
      ...updatedFields,
      is_free_agent: true,
      members: [],
      modality: '1v1',
      total_amount: 1.00,
      amount_due: 1.00,
      team_name: updatedFields.captain_name || updatedFields.team_name || 'Individual',
    };
  }

  const updates = {
    ...updatedFields,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const dbUpdates = sanitizeRegistrationForSupabase(updates);
      await supabase
        .from('registrations')
        .update(dbUpdates)
        .eq('id', cleanId);
    } catch (e) {
      console.warn('Supabase update registration data failed:', e);
    }
  }

  const current = await getRegistrations();
  let found = null;
  const updated = current.map((r) => {
    if (String(r.id).trim().toLowerCase() === cleanId.toLowerCase()) {
      found = sanitizeRegistrationRecord({ ...r, ...updates });
      return found;
    }
    return r;
  });

  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));

  // Actualizar también en el recordatorio local de pago pendiente si coincide
  try {
    const savedPending = localStorage.getItem('compu_league_pending_payment');
    if (savedPending) {
      const parsed = JSON.parse(savedPending);
      if (parsed && String(parsed.id).trim().toLowerCase() === cleanId.toLowerCase()) {
        const newPending = {
          ...parsed,
          team_name: found.team_name,
          game: found.game,
          game_name: found.game_name,
          captain_name: found.captain_name,
          amount_due: found.amount_due,
        };
        localStorage.setItem('compu_league_pending_payment', JSON.stringify(newPending));
      }
    }
  } catch (e) {}

  return found;
};

export const updateRegistrationStatus = async (id, status, notes = '') => {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('registrations')
        .update({ status, admin_notes: notes, verified_at: new Date().toISOString() })
        .eq('id', id);
    } catch (e) {}
  }

  const current = await getRegistrations();
  const updated = current.map((r) => 
    r.id === id ? { ...r, status, admin_notes: notes, verified_at: new Date().toISOString() } : r
  );
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
  return updated;
};

// -------------------------------------------------------------
// BRACKETS & PARTIDOS
// -------------------------------------------------------------
export const getValorantMatches = () => {
  const local = localStorage.getItem(STORAGE_KEYS.VALORANT_MATCHES);
  if (local) {
    try {
      if (local.includes('CyberKnights') || local.includes('Kernel Panic')) {
        localStorage.setItem(STORAGE_KEYS.VALORANT_MATCHES, JSON.stringify(DEMO_VALORANT_MATCHES));
        return DEMO_VALORANT_MATCHES;
      }
      return JSON.parse(local);
    } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEYS.VALORANT_MATCHES, JSON.stringify(DEMO_VALORANT_MATCHES));
  return DEMO_VALORANT_MATCHES;
};

export const updateValorantMatch = (matchId, updates) => {
  const matches = getValorantMatches();
  const updated = matches.map(m => m.id === matchId ? { ...m, ...updates } : m);
  localStorage.setItem(STORAGE_KEYS.VALORANT_MATCHES, JSON.stringify(updated));
  return updated;
};

export const getClashMatches = () => {
  const local = localStorage.getItem(STORAGE_KEYS.CLASH_MATCHES);
  if (local) {
    try {
      if (local.includes('Alex_Master') || local.includes('DarkKnight99')) {
        localStorage.setItem(STORAGE_KEYS.CLASH_MATCHES, JSON.stringify(DEMO_CLASH_MATCHES));
        return DEMO_CLASH_MATCHES;
      }
      return JSON.parse(local);
    } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEYS.CLASH_MATCHES, JSON.stringify(DEMO_CLASH_MATCHES));
  return DEMO_CLASH_MATCHES;
};

export const updateClashMatch = (matchId, updates) => {
  const matches = getClashMatches();
  const updated = matches.map(m => m.id === matchId ? { ...m, ...updates } : m);
  localStorage.setItem(STORAGE_KEYS.CLASH_MATCHES, JSON.stringify(updated));
  return updated;
};

// -------------------------------------------------------------
// BATTLE ROYALE STANDINGS (FREE FIRE & FORTNITE)
// -------------------------------------------------------------
export const getBattleRoyaleStandings = () => {
  const local = localStorage.getItem(STORAGE_KEYS.BR_STANDINGS);
  if (local) {
    try {
      if (local.includes('Dragons E-Sports') || local.includes('ChugJug Boys')) {
        localStorage.setItem(STORAGE_KEYS.BR_STANDINGS, JSON.stringify(DEMO_BATTLE_ROYALE_STANDINGS));
        return DEMO_BATTLE_ROYALE_STANDINGS;
      }
      return JSON.parse(local);
    } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEYS.BR_STANDINGS, JSON.stringify(DEMO_BATTLE_ROYALE_STANDINGS));
  return DEMO_BATTLE_ROYALE_STANDINGS;
};

export const saveBattleRoyaleStandings = (gameKey, newStandings) => {
  const current = getBattleRoyaleStandings();
  const updated = {
    ...current,
    [gameKey]: newStandings,
  };
  localStorage.setItem(STORAGE_KEYS.BR_STANDINGS, JSON.stringify(updated));
  return updated;
};

// -------------------------------------------------------------
// CRONOGRAMA
// -------------------------------------------------------------
export const getSchedule = () => {
  const local = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
  if (local) {
    try { return JSON.parse(local); } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(INITIAL_SCHEDULE));
  return INITIAL_SCHEDULE;
};

export const saveSchedule = (scheduleList) => {
  localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(scheduleList));
  return scheduleList;
};

// -------------------------------------------------------------
// PENDING PAYMENTS (DISPOSITIVO LOCAL MULTI-JUEGOS)
// -------------------------------------------------------------
export const getPendingPaymentsList = () => {
  try {
    const listRaw = localStorage.getItem('compu_league_pending_payments');
    if (listRaw) {
      const parsed = JSON.parse(listRaw);
      if (Array.isArray(parsed)) return parsed;
    }
    const singleRaw = localStorage.getItem('compu_league_pending_payment');
    if (singleRaw) {
      const parsed = JSON.parse(singleRaw);
      if (parsed && parsed.id) return [parsed];
    }
    return [];
  } catch {
    return [];
  }
};

export const addPendingPayment = (ticket) => {
  if (!ticket || !ticket.id) return [];
  try {
    const current = getPendingPaymentsList();
    const filtered = current.filter(item => item.id !== ticket.id);
    const updated = [ticket, ...filtered];
    localStorage.setItem('compu_league_pending_payments', JSON.stringify(updated));
    localStorage.setItem('compu_league_pending_payment', JSON.stringify(ticket));
    return updated;
  } catch (e) {
    console.warn('Error guardando ticket pendiente:', e);
    return [];
  }
};

export const removePendingPayment = (ticketId) => {
  if (!ticketId) return [];
  try {
    const current = getPendingPaymentsList();
    const updated = current.filter(item => item.id !== ticketId);
    if (updated.length > 0) {
      localStorage.setItem('compu_league_pending_payments', JSON.stringify(updated));
      localStorage.setItem('compu_league_pending_payment', JSON.stringify(updated[0]));
    } else {
      localStorage.removeItem('compu_league_pending_payments');
      localStorage.removeItem('compu_league_pending_payment');
    }
    return updated;
  } catch (e) {
    console.warn('Error eliminando ticket pendiente:', e);
    return [];
  }
};
