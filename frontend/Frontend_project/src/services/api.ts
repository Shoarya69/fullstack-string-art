const API_BASE = 'http://localhost:5000';

export async function uploadImage(file: File, numberofString: number,numberofNails: number, token : string) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('Number_Str',numberofString.toString());
  formData.append('Number_Nails',numberofNails.toString());
  if (!token) {
    console.log("error token is missing");
  }
  

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`   // ✅ TOKEN HEADER ME
    },
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
