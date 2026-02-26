const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const setToken = (t) => localStorage.setItem('gumtree_token', t);
export const getToken = () => localStorage.getItem('gumtree_token') || '';

export const authFetch = (path, opts={}) => {
  const token = getToken();
  const headers = {
    ...(opts.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  
  // Only set Content-Type if NOT FormData (let browser set it automatically for FormData)
  if (!(opts.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  return fetch(`${API}${path}`, {
    ...opts,
    headers
  });
};

export const login = async (username, password) => {
  const r = await fetch(`${API}/api/admin/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, password }) });
  if (!r.ok) throw new Error('Invalid credentials');
  const data = await r.json();
  setToken(data.token);
  return true;
};

export const listCategories = async () =>
  (await fetch(`${API}/api/categories`)).json();
export const listCategoriesAdmin = async () =>
  (await authFetch('/api/admin/categories')).json();
export const createCategory = async (payload) =>
  (await authFetch('/api/admin/categories', {
    method:'POST',
    body: JSON.stringify(typeof payload === 'string' ? { name: payload } : payload)
  })).json();
export const deleteCategory = async (id) =>
  (await authFetch(`/api/admin/categories/${id}`, {
    method:'DELETE'
  })).json();
export const listProducts = async (category) => (await fetch(`${API}/api/products${category ? `?category=${category}`:''}`)).json();
export const createProduct = async (payload) => (await authFetch('/api/admin/products', { method:'POST', body: JSON.stringify(payload) })).json();
export const updateProduct = async (id, payload) => (await authFetch(`/api/admin/products/${id}`, { method:'PUT', body: JSON.stringify(payload) })).json();
export const deleteProduct = async (id) => (await authFetch(`/api/admin/products/${id}`, { method:'DELETE' })).json();

export const uploadImage = async (file) => {
  console.log('Starting upload for file:', file.name, 'Size:', file.size);
  
  const fd = new FormData();
  fd.append('image', file);
  
  console.log('FormData created, sending to server...');
  const r = await authFetch('/api/upload', { method:'POST', body: fd });
  
  if (!r.ok) {
    const errorData = await r.json().catch(() => ({}));
    console.error('Upload error response:', errorData);
    throw new Error(errorData.error || 'Upload failed');
  }
  
  const data = await r.json();
  console.log('Upload success, URL:', data.url);
  return data;
};
