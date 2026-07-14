/**
 * PlanTatil 2.0 – Maps Short Link Resolver
 * Cloudflare Worker
 *
 * Bu Worker, Google Maps kısa linklerini (maps.app.goo.gl/...) takip ederek
 * yönlendirme zincirini çözer ve nihai uzun URL'i JSON olarak döner.
 * Cloudflare IP'leri üzerinden çalıştığı için Google'ın bot koruması devreye girmez.
 *
 * Deployment:
 *   1. https://workers.cloudflare.com adresine git.
 *   2. Yeni bir Worker oluştur (Dashboard → Workers → Create Application).
 *   3. Bu dosyanın içeriğini Worker editörüne yapıştır.
 *   4. "Deploy" butonuna bas.
 *   5. Oluşan *.workers.dev URL'ini map-card-creator.js içindeki
 *      RESOLVER_WORKER_URL sabitine yaz.
 */

const ALLOWED_ORIGINS = [
  'https://cmtsy81.github.io',
  'http://localhost:8000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8000',
  // Geliştirme ortamında file:// protokolü için null origin'e izin ver
  'null',
];

// Sadece Google Maps domainlerine yönlendirilecek isteklere izin ver (güvenlik)
const ALLOWED_TARGET_HOSTS = [
  'maps.app.goo.gl',
  'goo.gl',
  'maps.google.com',
  'www.google.com',
];

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || 'null';

    // OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    const reqUrl = new URL(request.url);
    const targetUrl = reqUrl.searchParams.get('url');

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    // Güvenlik: sadece Google Maps domain'lerine yönlendir
    let targetHost;
    try {
      targetHost = new URL(targetUrl).hostname;
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    if (!ALLOWED_TARGET_HOSTS.some(h => targetHost === h || targetHost.endsWith('.' + h))) {
      return new Response(JSON.stringify({ error: 'Target host not allowed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    try {
      // Google Maps kısa linki takip et (Cloudflare'in IP'si üzerinden → bot engeli yok)
      const response = await fetch(targetUrl, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          // Gerçek bir tarayıcı gibi görün
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
          'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
        },
      });

      const finalUrl = response.url; // Yönlendirme sonrası nihai URL

      // Nihai URL'den koordinat ve yer adı çıkar
      const coordsMatch = finalUrl.match(/@([0-9.-]+),([0-9.-]+)/);
      const placeMatch = finalUrl.match(/\/place\/([^\/@?]+)/);

      if (coordsMatch) {
        const lat = parseFloat(coordsMatch[1]);
        const lng = parseFloat(coordsMatch[2]);
        const placeName = placeMatch
          ? decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
          : null;

        return new Response(
          JSON.stringify({ ok: true, lat, lng, placeName, resolvedUrl: finalUrl }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
          }
        );
      }

      // Koordinat yoksa (sadece konumlama olmayan bir link) nihai URL'i döndür
      return new Response(
        JSON.stringify({ ok: true, lat: null, lng: null, placeName: null, resolvedUrl: finalUrl }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
        }
      );
    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }
  },
};
