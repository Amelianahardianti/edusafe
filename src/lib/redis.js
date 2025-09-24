// src/lib/redis.js
import 'dotenv/config';
import IORedis from 'ioredis';

function buildRedisFromUrl(urlRaw) {
  if (!urlRaw) throw new Error('REDIS_URL is empty');
  const url = urlRaw.trim();

  const isTls = url.startsWith('rediss://');
  const u = new URL(url);
  const hostname = u.hostname;

  // TLS options: SNI + minimal TLS 1.2 (Redis Cloud)
  const tlsOpts = isTls ? { servername: hostname, minVersion: 'TLSv1.2' } : undefined;

  const masked = url.replace(/(\/\/.*:)([^@]+)(@)/, (_, a, _b, c) => a + '***' + c);
  console.log('[redis] using URL:', masked, ' tls=', !!tlsOpts);

  // Tambahkan family=0 agar bebas IPv4/IPv6 (beberapa jaringan Windows rewel)
  return new IORedis(url, { tls: tlsOpts, family: 0, maxRetriesPerRequest: null, enableReadyCheck: true });
}

function buildRedisFromParts() {
  const host = (process.env.REDIS_HOST || '127.0.0.1').trim();
  const port = Number(process.env.REDIS_PORT || 6379);
  const username = process.env.REDIS_USERNAME || undefined;
  const password = process.env.REDIS_PASSWORD || undefined;
  const useTls = String(process.env.REDIS_TLS || '').toLowerCase() === 'true';
  const tls = useTls ? { servername: host, minVersion: 'TLSv1.2' } : undefined;

  console.log('[redis] using parts:', { host, port, username, tls: !!tls });

  return new IORedis({ host, port, username, password, tls, family: 0, maxRetriesPerRequest: null, enableReadyCheck: true });
}

const url = process.env.REDIS_URL;
const redis = url ? buildRedisFromUrl(url) : buildRedisFromParts();

redis.on('connect', () => console.log('[redis] connected'));
redis.on('ready',   () => console.log('[redis] ready'));
redis.on('error',   (e) => console.error('[redis] error:', e.message));

export default redis;
