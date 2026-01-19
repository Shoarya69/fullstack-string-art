const API_BASE = 'http://localhost:5000';

export async function Regi_api(username:string, password: string) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const res = await fetch(`${API_BASE}/api/register`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  return res.json();
}
