# Listening widget

The Hobbies header uses Last.fm `user.getRecentTracks` for `aryamaz`. Spotify must be connected to that Last.fm account and Spotify Scrobbling enabled. Last.fm can include other music sources too; it does not confirm which player supplied a track.

## Production setup

In Cloudflare Pages → arya-portfolio → Settings → Variables and Secrets, set these runtime values for Production (and Preview if desired):

- `LASTFM_API_KEY`: the existing Last.fm API key, stored as a secret. Do not use a `PUBLIC_` prefix.
- `LASTFM_USERNAME`: `aryamaz`.

Redeploy after setting them. Keep the existing `npm run build` and `dist` settings. The repository-root `functions/api/now-playing.js` is deployed by Pages Git integration alongside the static Astro site. `/api/now-playing` should return a JSON object with `playing`, `recent`, or `empty` status, never a key. Missing config or an upstream failure returns `unavailable` with HTTP 503.

## Local development

Run `npm run dev` as usual (follow AGENTS.md for background server management). The Vite development middleware serves the same handler using the same `.env` file as the Formspree setting, which is ignored by Git. `.env.example` documents the variable names without credentials. Last.fm settings must not have a `PUBLIC_` prefix. The key stays server-side; do not put it in a client script. `astro preview` serves static files only, so test the endpoint with the dev server or Wrangler Pages locally.

## Behavior

Refreshes every 30 seconds while the page is visible. Successful upstream results are cached at the Cloudflare edge for 30 seconds. Now-playing is shown only for Last.fm's explicit flag; otherwise the latest scrobble is labelled Last played. Failure clears the live status. The card links to Last.fm and explicitly attributes the source. No Spotify OAuth or Last.fm write permissions are needed.
