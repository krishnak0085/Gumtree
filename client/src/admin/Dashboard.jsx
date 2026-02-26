import React, { useEffect, useState } from 'react';
import { authFetch, getToken, listCategoriesAdmin, createCategory, deleteCategory, listProducts, createProduct, updateProduct, deleteProduct, uploadImage } from './api';

const Box = ({ children }) => <div className="p-4 rounded-2xl bg-white/95 border border-[#d5c29e] shadow">{children}</div>;

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name:'', category:'', description:'', thicknesses:'', imageUrl:'' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [catForm, setCatForm] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    if (!getToken()) return;
    refresh();
  }, []);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const cs = await listCategoriesAdmin();
      setCats(cs);
      const ps = await listProducts();
      setProducts(ps);
    } catch (err) {
      setError('Failed to load data: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const name = catForm.name.trim();
    if (!name) {
      alert('Please enter category name');
      return;
    }
    if (!catForm.imageUrl) {
      alert('Please upload a cover image');
      return;
    }
    try {
      await createCategory({ name, imageUrl: catForm.imageUrl });
      setCatForm({ name: '', imageUrl: '' });
      refresh();
      alert('Category created successfully!');
    } catch (err) {
      alert('Error creating category: ' + err.message);
      console.error(err);
    }
  };

  const onCategoryFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      console.log('Uploading category image:', f.name);
      const { url } = await uploadImage(f);
      console.log('Category image uploaded:', url);
      setCatForm(prev => ({ ...prev, imageUrl: url }));
    } catch (err) {
      alert('Image upload failed: ' + err.message);
      console.error(err);
    }
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    refresh(); 
  };

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      console.log('Current form state before upload:', form);
      console.log('Uploading image:', f.name);
      const { url } = await uploadImage(f);
      console.log('Image uploaded, URL:', url);
      console.log('Form state when setting image:', form);
      setForm(prev => {
        const updated = { ...prev, imageUrl: url };
        console.log('Updated form state:', updated);
        return updated;
      });
    } catch (err) {
      alert('Image upload failed: ' + err.message);
      console.error(err);
    }
  };

const submitProduct = async (e) => {
  e.preventDefault();

  // Validate required fields
  if (!form.name || !form.category) {
    alert('Please fill in Name and Category');
    return;
  }

  if (!form.imageUrl) {
    alert('Please select an image');
    return;
  }

  const payload = {
    ...form,
    thicknesses: form.thicknesses
      ? form.thicknesses.split(',').map(t => t.trim())
      : []
  };

  console.log('=== SUBMIT PRODUCT ===');
  console.log('Form state:', form);
  console.log('Final payload:', JSON.stringify(payload, null, 2));

  try {
    if (editing) {
      console.log('Updating product:', editing._id);
      await updateProduct(editing._id, payload);
      console.log('✅ Product updated successfully');
      setEditing(null);
    } else {
      console.log('Creating new product');
      await createProduct(payload);
      console.log('✅ Product created successfully');
    }

    // Only clear form AFTER successful save
    setForm({ name:'', category:'', description:'', thicknesses:'', imageUrl:'' });
    await refresh();
    alert('Product saved successfully!');
  } catch (err) {
    alert('Error saving product: ' + err.message);
    console.error('Submit error:', err);
  }
};
  const editProduct = (p) => {
    setEditing(p);
    setForm({ ...p, thicknesses: (p.thicknesses || []).join(', ') });
    setTab('products');
    window.scrollTo(0,0);
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    refresh();
  };

  if (!getToken()) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="p-6 rounded-xl bg-white border">Please login at <code>/admin/login</code>.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3e8] via-[#faf8f3] to-[#f0ebe0] grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#4a6b3a] mb-2">Loading...</div>
          <p className="text-gray-600">Fetching your data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3e8] via-[#faf8f3] to-[#f0ebe0] grid place-items-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button onClick={() => refresh()} className="bg-[#2a4b2f] text-white px-6 py-2 rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3e8] via-[#faf8f3] to-[#f0ebe0]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#4a6b3a]">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button className={`px-6 py-3 rounded-xl font-semibold transition ${tab==='products'?'bg-[#2a4b2f] text-white shadow-lg':'bg-white border border-[#d5c29e] text-[#4a6b3a] hover:shadow'}`} onClick={()=>setTab('products')}>
              📦 Products
            </button>
            <button className={`px-6 py-3 rounded-xl font-semibold transition ${tab==='categories'?'bg-[#2a4b2f] text-white shadow-lg':'bg-white border border-[#d5c29e] text-[#4a6b3a] hover:shadow'}`} onClick={()=>setTab('categories')}>
              🏷️ Categories
            </button>
          </div>
        </div>

        {tab==='products' && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Box>
              <h2 className="font-semibold text-[#6b4e24]">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={submitProduct} className="mt-3 space-y-3">
                <div>
                  <label className="text-sm">Name</label>
                  <input className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
                </div>
                <div>
                  <label className="text-sm">Category</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                    <option value="">Select...</option>
                    {cats.map(c => <option key={c._id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm">Thicknesses (comma separated)</label>
                  <input className="w-full border rounded-lg px-3 py-2" value={form.thicknesses} onChange={e=>setForm({...form, thicknesses:e.target.value})}/>
                </div>
                <div>
                  <label className="text-sm">About / Description</label>
                  <textarea className="w-full border rounded-lg px-3 py-2 h-24" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
                </div>
                <div>
                  <label className="text-sm">Image</label>
                  <div className="flex items-center gap-3">
                    <input type="file" onChange={onFile} />
                    {form.imageUrl && <img src={form.imageUrl} className="h-12 w-12 rounded-lg object-cover" />}
                  </div>
                </div>
                <button className="bg-[#2a4b2f] text-white px-4 py-2 rounded-xl">{editing?'Save Changes':'Add Product'}</button>
              </form>
            </Box>

            <Box>
              <h2 className="font-semibold text-[#6b4e24]">Existing Products</h2>
              <div className="mt-3 grid gap-3 max-h-[480px] overflow-auto">
                {products.map(p => (
                  <div key={p._id} className="p-3 border rounded-xl flex items-center gap-3 bg-white hover:shadow transition">
                    <img src={p.imageUrl || 'https://via.placeholder.com/120x90?text=Image'} className="h-16 w-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-gray-600">{p.category} • {Array.isArray(p.thicknesses)?p.thicknesses.join(', '):''} mm</div>
                    </div>
                    <button onClick={()=>editProduct(p)} className="px-3 py-1 rounded-lg border">Edit</button>
                    <button onClick={()=>removeProduct(p._id)} className="px-3 py-1 rounded-lg bg-red-600 text-white">Delete</button>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        )}

        {tab==='categories' && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Box>
              <h2 className="font-semibold text-[#6b4e24]">Create Category</h2>
              <form onSubmit={saveCategory} className="mt-3 space-y-3">
                <div>
                  <label className="text-sm">Category Name</label>
                  <input 
                    placeholder="e.g., Plywood, Block Board, Flush Door" 
                    value={catForm.name}
                    onChange={e => setCatForm({...catForm, name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm">Cover Image</label>
                  <div className="flex items-center gap-3">
                    <input type="file" onChange={onCategoryFile} accept="image/*" />
                    {catForm.imageUrl && <img src={catForm.imageUrl} className="h-12 w-12 rounded-lg object-cover" />}
                  </div>
                </div>
                <button className="w-full bg-[#2a4b2f] text-white px-4 py-2 rounded-xl">Add Category</button>
              </form>
            </Box>
            <Box>
              <h2 className="font-semibold text-[#6b4e24]">Existing Categories</h2>
              <div className="mt-3 grid gap-2">
                {cats.map(c => (
                  <div key={c._id} className="p-3 border rounded-xl bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {c.imageUrl && <img src={c.imageUrl} className="h-10 w-10 rounded object-cover" />}
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.slug}</div>
                      </div>
                    </div>
                    <button onClick={()=>removeCategory(c._id)} className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm">Delete</button>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
