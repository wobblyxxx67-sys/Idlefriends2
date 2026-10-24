import { getStore } from '@netlify/blobs';

export const store = getStore({
  name: 'idle-friends-2-shared',
  consistency: 'strong'
});

export const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  },
  body: JSON.stringify(body)
});

export const readJson = (event) => {
  try {
    return JSON.parse(event.body || '{}');
  } catch {
    return {};
  }
};

export const isAdmin = (body) =>
  String(body?.name || '').trim().toLowerCase() === 'test123';

export async function getJson(key, fallback) {
  return (await store.get(key, { type: 'json' })) ?? fallback;
}

export async function setJson(key, value) {
  await store.setJSON(key, value);
}
