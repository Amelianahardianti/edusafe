// src/lib/redis.js
import 'dotenv/config';
import IORedis from 'ioredis';

let redis = null;
let redisConnected = false;

function buildRedisFromUrl(urlRaw) {
  if (!urlRaw) {
    console.warn('[redis] REDIS_URL not set, Redis disabled');
    return null;
  }
  const url = urlRaw.trim();

  const isTls = url.startsWith('rediss://');
  const u = new URL(url);
  const hostname = u.hostname;

  // TLS options: SNI + minimal TLS 1.2 (Redis Cloud)
  const tlsOpts = isTls ? { servername: hostname, minVersion: 'TLSv1.2' } : undefined;

  const masked = url.replace(/(\/\/.*:)([^@]+)(@)/, (_, a, _b, c) => a + '***' + c);
  console.log('[redis] using URL:', masked, ' tls=', !!tlsOpts);

  // Tambahkan family=0 agar bebas IPv4/IPv6 (beberapa jaringan Windows rewel)
  // Tambahkan reconnectOnError dan retryStrategy untuk handle connection issues
  const client = new IORedis(url, { 
    tls: tlsOpts, 
    family: 0, 
    maxRetriesPerRequest: null, 
    enableReadyCheck: true,
    retryStrategy: (times) => {
      if (times > 3) {
        console.warn('[redis] Max retries reached, Redis will work in degraded mode');
        return null; // Stop retrying
      }
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    reconnectOnError: (err) => {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        return true;
      }
      return false;
    },
    connectTimeout: 10000,
    lazyConnect: false,
    showFriendlyErrorStack: true
  });

  client.on('connect', () => {
    redisConnected = true;
    console.log('[redis] connected');
  });

  client.on('ready', () => {
    redisConnected = true;
    console.log('[redis] ready');
  });

  client.on('error', (e) => {
    redisConnected = false;
    // Hanya log error penting, jangan spam
    if (e.code !== 'ECONNREFUSED' && !e.message.includes('getaddrinfo')) {
      console.error('[redis] error:', e.message);
    }
  });

  client.on('close', () => {
    redisConnected = false;
    console.log('[redis] connection closed');
  });

  return client;
}

function buildRedisFromParts() {
  const host = (process.env.REDIS_HOST || '127.0.0.1').trim();
  const port = Number(process.env.REDIS_PORT || 6379);
  const username = process.env.REDIS_USERNAME || undefined;
  const password = process.env.REDIS_PASSWORD || undefined;
  const useTls = String(process.env.REDIS_TLS || '').toLowerCase() === 'true';
  const tls = useTls ? { servername: host, minVersion: 'TLSv1.2' } : undefined;

  console.log('[redis] using parts:', { host, port, username, tls: !!tls });

  const client = new IORedis({ 
    host, 
    port, 
    username, 
    password, 
    tls, 
    family: 0, 
    maxRetriesPerRequest: null, 
    enableReadyCheck: true,
    retryStrategy: (times) => {
      if (times > 3) return null;
      return Math.min(times * 50, 2000);
    },
    connectTimeout: 10000
  });

  client.on('connect', () => {
    redisConnected = true;
    console.log('[redis] connected');
  });

  client.on('ready', () => {
    redisConnected = true;
    console.log('[redis] ready');
  });

  client.on('error', (e) => {
    redisConnected = false;
    if (e.code !== 'ECONNREFUSED') {
      console.error('[redis] error:', e.message);
    }
  });

  return client;
}

// Initialize Redis connection
const url = process.env.REDIS_URL;
try {
  redis = url ? buildRedisFromUrl(url) : buildRedisFromParts();
  
  // Set timeout untuk connection, jika tidak connect dalam 5 detik, anggap failed
  setTimeout(() => {
    if (!redisConnected && redis) {
      console.warn('[redis] Connection timeout, Redis will work in degraded mode (no caching)');
    }
  }, 5000);
} catch (error) {
  console.warn('[redis] Failed to initialize Redis:', error.message);
  console.warn('[redis] Application will continue without Redis caching');
  redis = null;
}

// Export wrapper yang handle null redis
const redisWrapper = {
  get: async (key) => {
    if (!redis || !redisConnected) return null;
    try {
      return await redis.get(key);
    } catch (e) {
      return null;
    }
  },
  set: async (key, value, ...args) => {
    if (!redis || !redisConnected) return;
    try {
      await redis.set(key, value, ...args);
    } catch (e) {
      // Silent fail
    }
  },
  del: async (keys) => {
    if (!redis || !redisConnected) return;
    try {
      await redis.del(keys);
    } catch (e) {
      // Silent fail
    }
  },
  scan: async (cursor, ...args) => {
    if (!redis || !redisConnected) return ['0', []];
    try {
      return await redis.scan(cursor, ...args);
    } catch (e) {
      return ['0', []];
    }
  }
};

export default redisWrapper;
