import React, { useState } from 'react';
import { login } from './api';

export default function AdminLogin({ onSuccess }) {
  const [username, setU] = useState('gumtreeply');
  const [password, setP] = useState('gumtre#001');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try { await login(username, password); onSuccess(); }
    catch { setErr('Invalid credentials'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f3e8] via-[#faf8f3] to-[#f0ebe0] p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-[#d5c29e]">
        <h2 className="text-3xl font-bold text-[#4a6b3a] mb-2">Admin Login</h2>
        <p className="text-gray-600 text-sm mb-6">Gumtree Plywood Management</p>
        
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#6b4e24] mb-2">Username</label>
          <input 
            value={username} 
            onChange={e=>setU(e.target.value)} 
            className="w-full border border-[#d5c29e] rounded-lg px-4 py-3 focus:outline-none focus:border-[#4a6b3a] focus:ring-2 focus:ring-[#4a6b3a]/20"
            placeholder="Enter username"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#6b4e24] mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e=>setP(e.target.value)} 
            className="w-full border border-[#d5c29e] rounded-lg px-4 py-3 focus:outline-none focus:border-[#4a6b3a] focus:ring-2 focus:ring-[#4a6b3a]/20"
            placeholder="Enter password"
          />
        </div>
        
        {err && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{err}</div>}
        
        <button className="w-full bg-[#2a4b2f] hover:bg-[#1f3523] text-white font-semibold rounded-lg py-3 transition shadow-md">
          🔐 Login
        </button>
        
        <p className="text-gray-500 text-xs text-center mt-6">Default: gumtreeply / gumtre#001</p>
      </form>
    </div>
  );
}
