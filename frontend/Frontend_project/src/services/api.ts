const API_BASE = 'http://localhost:5000';

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  return res.json();
}

export async function processImage() {
  const res = await fetch(`${API_BASE}/api/process`, {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
}
