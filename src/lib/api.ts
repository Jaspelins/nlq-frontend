export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export function authHeaders(token?: string, orgId?: string) {
  const h: Record<string,string> = { 'Content-Type':'application/json' };
  if (token) h['Authorization'] = `Bearer ${token}`;
  if (orgId) h['X-Org-Id'] = orgId;
  return h;
}

export async function login(email: string, password: string) {
  const r = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST', headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json() as Promise<{ token:string; user:any; orgs:any[] }>;
}

export async function runNlq(token: string, orgId: string, payload: any) {
  const r = await fetch(`${BASE_URL}/nlq`, {
    method: 'POST',
    headers: authHeaders(token, orgId),
    body: JSON.stringify(payload),
    cache: 'no-store'
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function createOrg(token: string, name: string, slug: string) {
  const r = await fetch(`${BASE_URL}/admin/orgs`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ name, slug })
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function setDatasource(token: string, orgId: string, dsn: string) {
  const r = await fetch(`${BASE_URL}/admin/orgs/${orgId}/datasource`, {
    method: 'POST',
    headers: authHeaders(token, orgId),
    body: JSON.stringify({ dsn })
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
