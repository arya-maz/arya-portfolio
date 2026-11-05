const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});
const httpsUrl = value => {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
};

export async function onRequestGet({ env, request, waitUntil }) {
  const key = env.LASTFM_API_KEY?.trim();
  const user = env.LASTFM_USERNAME?.trim();
  if (!key || !user) return json({ status: 'unavailable' }, 503);
  const cache = globalThis.caches?.default;
  const cacheKey = new Request(new URL('/api/now-playing', request.url));
  if (cache) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }
  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.search = new URLSearchParams({ method: 'user.getRecentTracks', user, api_key: key, format: 'json', limit: '1' });
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return json({ status: 'unavailable' }, 503);
    const data = await response.json();
    if (data.error || !data.recenttracks) return json({ status: 'unavailable' }, 503);
    const tracks = data.recenttracks.track;
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    const result = !track?.name ? { status: 'empty' } : {
      status: track['@attr']?.nowplaying === 'true' ? 'playing' : 'recent',
      title: track.name,
      artist: typeof track.artist === 'string' ? track.artist : track.artist?.['#text'] || '',
      album: track.album?.['#text'] || '',
      artwork: httpsUrl([...(track.image || [])].reverse().find(image => image['#text'])?.['#text']),
      url: httpsUrl(track.url) || `https://www.last.fm/user/${encodeURIComponent(user)}`,
      profile: `https://www.last.fm/user/${encodeURIComponent(user)}`
    };
    const output = json(result);
    if (cache) {
      const cached = new Response(output.clone().body, { headers: { ...Object.fromEntries(output.headers), 'Cache-Control': 'public, max-age=30' } });
      waitUntil(cache.put(cacheKey, cached));
    }
    return output;
  } catch {
    // Never return upstream URLs or errors, which can contain the API key.
    return json({ status: 'unavailable' }, 503);
  }
}
