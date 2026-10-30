// Local development uses the Vite proxy to avoid browser CORS restrictions.
// The proxy forwards /api/* to this deployed API without changing the backend.
const API_BASE = 'https://complaintops-api.onrender.com';
const API_ROOT = import.meta.env.DEV ? '/api' : API_BASE;

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_ROOT}${path}`, {
      ...options,
      headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
    });
  } catch (error) {
    throw new Error('Unable to reach the ComplaintOps API. Check your internet connection or try again in a moment.');
  }
  const raw = await response.text();
  let data;
  try { data = raw ? JSON.parse(raw) : {}; } catch { throw new Error('The API returned an unexpected response. Please try again.'); }
  if (!response.ok) throw new Error(data.detail || data.message || `API request failed (${response.status}).`);
  return data;
}

export async function checkHealth() {
  const data = await request('/health');
  if (!data || typeof data !== 'object') throw new Error('Health endpoint returned an invalid response.');
  return data;
}

export async function predictComplaint(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('Enter a complaint before running the analysis.');
  const data = await request('/predict', { method: 'POST', body: JSON.stringify({ text: text.trim() }) });
  if (!data || typeof data.intent !== 'string' || typeof data.confidence !== 'number' || !Array.isArray(data.top_candidates)) {
    throw new Error('The prediction response is missing required fields. Check the backend API contract.');
  }
  return data;
}
