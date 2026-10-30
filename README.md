# ComplaintOps — Local React Frontend

A dark, research-oriented React dashboard for the Banking Customer Complaint Intent Classification System. It connects to the existing deployed API; it does not recreate or modify the backend.

## Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm
- Internet access to reach `https://complaintops-api.onrender.com`

## Run locally

```bash
cd complaintops-frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally **http://localhost:5173**).

## Backend integration

The frontend uses the existing API:

- `GET https://complaintops-api.onrender.com/health`
- `POST https://complaintops-api.onrender.com/predict`

Prediction request body:

```json
{ "text": "I want to know why my bank transfer has not arrived" }
```

`src/services/api.js` validates the response shape and displays the API's returned intent, confidence, routing action, low-confidence flag, candidate intents and latency. It does not fabricate prediction results.

### Local CORS handling

During `npm run dev`, requests go to the local `/api` path. `vite.config.js` proxies `/api/*` to `https://complaintops-api.onrender.com/*`, avoiding browser cross-origin restrictions in local development without changing the backend. Vite's proxy is development-only. A production static host will need the backend to allow its origin through CORS (or a separately configured server-side proxy); no deployment configuration is included here by design.

## Features

- Dashboard with API health, session prediction count, actual average inference latency and recent activity
- Complaint analyzer with validation, loading states, example inputs and error messaging
- Prediction results with confidence visualization, low-confidence status and top-three candidates
- Session-only prediction history with search, CSV export and clear action
- Model information and explicitly labelled approximate baseline metrics
- Visual NLP pipeline overview
- Responsive layout for desktop, tablet and mobile

## Notes

- History exists only in React memory for the current page session; there is no database or local persistence.
- The API health indicator checks `/health` at startup and every 60 seconds.
- Render-hosted services may sleep when idle. The first request can take longer while the service wakes. The analyzer keeps the loading state visible and provides a retry-friendly message if a request fails.
- The model metrics (approximately 89.5% baseline accuracy and 0.895 baseline macro-F1) are project reference values, not live metrics calculated by this UI.
- `npm run build` creates the production bundle in `dist/`.
