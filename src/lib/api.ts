import {
  ActivityEvent,
  ApiActivity,
  ApiEncounter,
  ApiInventory,
  ApiPatient,
  ApiPatientCreate,
  ApiPortfolio,
  ApiPortfolioStats,
  ApiUser,
  EncounterPayload,
  EncounterUpdatePayload,
  LoginPayload,
  RegisterPayload,
  VerifyEmailPayload,
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request(path: string, options: RequestInit = {}, token = '') {
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      message = body.detail || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function jsonRequest(path: string, method: string, body: unknown, token = '') {
  return request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }, token);
}

export async function login(payload: LoginPayload) {
  const body = new URLSearchParams();
  body.set('username', payload.email);
  body.set('password', payload.password);
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  }) as Promise<{ access_token: string; token_type: string }>;
}

export function register(payload: RegisterPayload) {
  return jsonRequest('/auth/register', 'POST', payload) as Promise<ApiUser>;
}

export function verifyEmail(payload: VerifyEmailPayload) {
  return jsonRequest('/auth/verify-email', 'POST', payload);
}

export function resendVerification(email: string) {
  return jsonRequest('/auth/resend-verification', 'POST', { email, code: '000000' });
}

export function getMe(token: string) {
  return request('/auth/me', {}, token) as Promise<ApiUser>;
}

export function getPatients(token: string, query = '') {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  params.set('limit', '100');
  return request(`/patients/search?${params.toString()}`, {}, token) as Promise<ApiPatient[]>;
}

export function createPatient(token: string, payload: ApiPatientCreate) {
  return jsonRequest('/patients', 'POST', payload, token) as Promise<ApiPatient>;
}

export function getEncounters(token: string, status = '') {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return request(`/encounters${suffix}`, {}, token) as Promise<ApiEncounter[]>;
}

export function getEncounter(token: string, encounterId: string) {
  return request(`/encounters/${encounterId}`, {}, token) as Promise<ApiEncounter>;
}

export function createEncounter(token: string, payload: EncounterPayload) {
  return jsonRequest('/encounters', 'POST', payload, token) as Promise<ApiEncounter>;
}

export function updateEncounter(token: string, encounterId: string, payload: EncounterUpdatePayload) {
  return jsonRequest(`/encounters/${encounterId}`, 'PATCH', payload, token) as Promise<ApiEncounter>;
}

export function analyzeEncounter(token: string, encounterId: string) {
  return request(`/encounters/${encounterId}/ai-analyze`, { method: 'POST' }, token) as Promise<{ encounter_id: string; status: string; analysis: unknown }>;
}

export function finalizeEncounter(token: string, encounterId: string) {
  return request(`/encounters/${encounterId}/finalize`, { method: 'POST' }, token) as Promise<ApiEncounter>;
}

export function approveEncounter(token: string, encounterId: string, notes: string) {
  return jsonRequest(`/encounters/${encounterId}/approve`, 'POST', { notes }, token) as Promise<ApiEncounter>;
}

export function rejectEncounter(token: string, encounterId: string, notes: string) {
  return jsonRequest(`/encounters/${encounterId}/reject`, 'POST', { notes }, token) as Promise<ApiEncounter>;
}

export function getPortfolio(token: string) {
  return request('/portfolio/me', {}, token) as Promise<ApiPortfolio>;
}

export function getPortfolioStats(token: string) {
  return request('/portfolio/stats', {}, token) as Promise<ApiPortfolioStats>;
}

export function getActivity(token: string) {
  return request('/activity?limit=50', {}, token) as Promise<ApiActivity[]>;
}

export function getInventory(token: string) {
  return request('/inventory', {}, token) as Promise<ApiInventory>;
}

export function activityToEvent(activity: ApiActivity): ActivityEvent {
  return {
    id: activity.id,
    type: activity.activity_type,
    title: activity.activity_type.replace(/_/g, ' '),
    description: activity.description,
    timeAgo: new Date(activity.created_at).toLocaleString(),
  };
}
