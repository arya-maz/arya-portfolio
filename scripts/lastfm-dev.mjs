import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { onRequestGet } from '../functions/api/now-playing.js';

// Local equivalent of the Cloudflare Pages Function; no secrets enter Vite's client bundle.
export function lastFmDev() {
  return {
    name: 'lastfm-local-api',
    configureServer(server) {
      server.middlewares.use('/api/now-playing', async (req, res) => {
        if (req.method !== 'GET') { res.writeHead(405); res.end(); return; }
        const env = {};
        try {
          const settings = parseEnv(readFileSync(new URL('../.env', import.meta.url), 'utf8'));
          env.LASTFM_API_KEY = settings.LASTFM_API_KEY;
          env.LASTFM_USERNAME = settings.LASTFM_USERNAME;
        } catch { /* Missing local configuration uses the same unavailable state. */ }
        try {
          const response = await onRequestGet({ env, request: new Request('http://localhost/api/now-playing'), waitUntil: () => {} });
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(await response.text());
        } catch { res.writeHead(503); res.end('{}'); }
      });
    }
  };
}
