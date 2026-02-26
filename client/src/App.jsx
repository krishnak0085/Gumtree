import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import AdminLogin from './admin/Login.jsx';
import AdminDashboard from './admin/Dashboard.jsx';
import Products from "./pages/Products";
import PlywoodVarieties from "./pages/PlywoodVarieties";
import about1 from "./assets/about.jpg";
import about2 from "./assets/about2.jpg";
import about3 from "./assets/about3.jpg";
// ---------- UI Helpers ----------
const Container = ({ children }) => (
  <div className="max-w-6xl mx-auto px-4">{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
    {children}
  </span>
);

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`rounded-2xl px-4 py-2 shadow hover:shadow-md transition font-medium ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border shadow-sm p-4 ${className}`}>{children}</div>
);
const Hero = ({ title, subtitle }) => (
  <div className="bg-green-50 border-b border-green-100">
    <div className="max-w-6xl mx-auto px-4 py-8">
       <h1 className="text-3xl md:text-4xl font-bold text-[#2a4b2f]">{title}</h1>
      {subtitle && <p className="text-gray-700 mt-1">{subtitle}</p>}
    </div>
  </div>
);


// ---------- Navbar ----------
import logo from "./assets/logo.png";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const navLink = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${isActive ? 'bg-green-800 text-white' : 'text-gray-800 hover:bg-green-100'}`;

  return (
    <header className="sticky top-0 z-40 bg-[#f7f3e8] shadow-md border-b border-[#d8c4a4]">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border border-[#c9a858]" />
            <div>
              <div className="text-xl font-bold text-[#4a6b3a]">Gumtree Plywood</div>
              <div className="text-xs text-gray-600">Jagadhri, Yamunanagar</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-3">
            <NavLink to="/" className={navLink}>Home</NavLink>
            <NavLink to="/about" className={navLink}>About</NavLink>
            <NavLink to="/products" className={navLink}>Products</NavLink>
            <NavLink to="/contact" className={navLink}>Contact</NavLink>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded border border-[#6b4e24] text-[#4a6b3a] font-bold">
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden bg-[#f7f3e8] border-t border-[#d8c4a4] pb-3">
            <NavLink to="/" className={navLink} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={navLink} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/products" className={navLink} onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to="/contact" className={navLink} onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        )}
      </Container>
    </header>
  );
};

// ---------- Footer ----------
const Footer = () => (
  <footer className="mt-16 border-t">
    <Container>
      <div className="py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">Gumtree Plywood</div>
          <p className="text-gray-600">Manufacturer of Plywood, Block Boards & Flush Doors.</p>
          <p className="text-gray-600 mt-2">Plot — Jagadhri, Yamunanagar, Haryana</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <div className="text-gray-600">Phone: +91-8053031325</div>
          <div className="text-gray-600">Email: gumtree.plywoods@gmail.com</div>
        </div>
      </div>
      <div className="py-6 text-xs text-gray-500">© {new Date().getFullYear()} Gumtree Plywood. All rights reserved.</div>
    </Container>
  </footer>
);

// ---------- Home ----------
const Home = () => {
  const navigate = useNavigate();

  // Slider Images
  const slides = [about1, about2, about3];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <Container>
          <div className="py-16 grid md:grid-cols-2 gap-8 items-center">

            {/* LEFT TEXT */}
            <div>
              <Badge>Manufacturer • Jagadhri</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight text-[#2a4b2f]">
                Premium Plywood, Block Boards & Flush Doors
              </h1>
              <p className="mt-4 text-gray-600">
                Built on trust and craftsmanship. We deliver durable sheets and doors for homes, offices and construction.
              </p>
            </div>

            {/* RIGHT SLIDER */}
            <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden rounded-2xl shadow-lg border border-[#d5c29e]">
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-full h-full object-cover flex-shrink-0"
                    style={{ minWidth: "100%" }}
                    alt="Gumtree Factory"
                  />
                ))}
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full border border-white ${
                      currentSlide === i ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12  bg-cover bg-center bg-fixed">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title: 'MR / BWR / BWP',
              text: 'All major grades available in popular thicknesses with consistent quality.',
            },{
              title: 'Construction Ready',
              text: 'Shuttering ply and Block Boards engineered for strength and stability.',
            },{
              title: 'Fast Dispatch',
              text: 'Yamunanagar hub with reliable logistics and cash-friendly billing.',
            }].map((b,i)=>(
              <div key={i} className="p-6 rounded-xl bg-white/90 border border-[#d5c29e] shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                <div className="font-bold text-[#2a4b2f] text-lg">{b.title}</div>
                <p className="mt-2 text-gray-700 text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};
// ...//about

const About = () => {
  const slides = [about1, about2, about3];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Hero
        title="About Gumtree Plywood"
        subtitle="Crafted with care. Trusted by dealers across North India."
      />

      <Container>
        <div className="py-12 max-w-3xl">
          <p className="text-gray-700">
            We are a Yamunanagar-based plywood manufacturer...
          </p>

          {/* Slider */}
<div className="mt-6 w-full overflow-hidden rounded-2xl shadow-lg border border-[#d5c29e] relative h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px]">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((src, i) => (
                <img
                  key={i}
                  src={src}
className="w-full h-full object-contain bg-white flex-shrink-0"
                  style={{ minWidth: "100%" }}
                  alt="Factory"
                />
              ))}
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full border border-white ${
                    currentSlide === i ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ✅ Features Section Added Here */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[{
              title: 'MR / BWR / BWP',
              text: 'All major grades available in popular thicknesses with consistent quality.',
            },{
              title: 'Construction Ready',
              text: 'Shuttering ply and Block Boards engineered for strength and stability.',
            },{
              title: 'Fast Dispatch',
              text: 'Yamunanagar hub with reliable logistics and cash-friendly billing.',
            }].map((b,i)=>(
              <div key={i} className="p-6 rounded-xl bg-white/90 border border-[#d5c29e] shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                <div className="font-bold text-[#2a4b2f] text-lg">{b.title}</div>
                <p className="mt-2 text-gray-700 text-sm">{b.text}</p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </>
  );
};


// ---------- Products ----------
const ProductCard = ({ item }) => (
  <Card>
    <div className="aspect-[4/3] bg-gray-100 rounded-xl grid place-items-center text-gray-500">Image</div>
    <div className="mt-3 font-semibold">{item.name}</div>
    <div className="text-gray-600 text-sm">{item.description}</div>
    <div className="mt-2 text-sm">Thicknesses: {item.thicknesses?.join(', ')} mm</div>
  </Card>
);


// ---------- Contact ----------
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/https://gumtree-backend-u7q8.onrender.com/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (sent) {
    return (
     
      <Container>
        <div className="py-12 max-w-xl">
          <h2 className="text-3xl font-bold">Thank you!</h2>
          <p className="mt-2 text-gray-700">We have received your message. Our sales team will call you shortly for a cash quote.</p>
        </div>
      </Container>
    
    );
  }

  return (
      <>
    <Hero title="Get a Quote" subtitle="We respond quickly." />
    <Container>
      <div className="py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold">Get a Quote</h2>
          <p className="text-gray-600 mt-2">Share quantities, grade & thickness. We respond quickly.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {['name','email','phone'].map(k => (
              <div key={k}>
                <label className="block text-sm font-medium capitalize">{k}</label>
                <input name={k} value={form[k]} onChange={onChange}
                  className="mt-1 w-full rounded-xl border px-3 py-2" placeholder={k==='phone' ? '+91-' : ''} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea name="message" value={form.message} onChange={onChange}
                className="mt-1 w-full rounded-xl border px-3 py-2 h-28" placeholder="I need 50 sheets BWR 18mm in Delhi..." />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button className="bg-green-700 text-white">Send</Button>
          </form>
        </div>
        <div>
          <div className="h-64 rounded-2xl bg-gray-100 grid place-items-center text-gray-500">Map / Factory Photo</div>
          <div className="mt-4 text-sm text-gray-700">Address: Jagadhri, Yamunanagar, Haryana • Phone: +91-XXXXXXXXXX • Email: sales@gumtreeplywood.com</div>
        </div>
      </div>

{/* ✅ Add Feature Section Here */}
<div className="mt-12 grid md:grid-cols-3 gap-6">
  {[
    {
      title: 'MR / BWR / BWP',
      text: 'All major grades available in popular thicknesses with consistent quality.',
    },
    {
      title: 'Construction Ready',
      text: 'Shuttering ply and Block Boards engineered for strength and stability.',
    },
    {
      title: 'Fast Dispatch',
      text: 'Yamunanagar hub with reliable logistics and cash-friendly billing.',
    },
  ].map((b, i) => (
    <div
      key={i}
      className="p-6 rounded-xl bg-white/90 border border-[#d5c29e] shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
    >
      <div className="font-bold text-[#2a4b2f] text-lg">{b.title}</div>
      <p className="mt-2 text-gray-700 text-sm">{b.text}</p>
    </div>
  ))}
</div>

</Container>

    </>
  );
};

// ---------- Chat Widget ----------
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(() => [{ role: 'bot', text: 'Namaste! How can I help you today?' }]);
  const sessionId = useMemo(() => {
    const k = 'gumtree_chat_session';
    let id = localStorage.getItem(k);
    if (!id) { id = Math.random().toString(36).slice(2); localStorage.setItem(k, id); }
    return id;
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMsgs(m => [...m, { role: 'user', text }]);
    setInput('');
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, text }) });
      const data = await res.json();
      setMsgs(m => [...m, { role: 'bot', text: data.reply || 'OK' }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Network issue. Please call us for instant support.' }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {open && (
        <div className="w-80 h-96 rounded-2xl border shadow-lg bg-white flex flex-col overflow-hidden mb-3">
          <div className="px-4 py-3 border-b font-semibold">Chat with Gumtree</div>
          <div className="flex-1 p-3 space-y-2 overflow-auto">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role==='bot' ? 'bg-gray-100' : 'bg-green-700 text-white ml-auto'}`}>{m.text}</div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
              className="flex-1 rounded-xl border px-3 py-2 text-sm" placeholder="Ask about price, stock..." />
            <Button className="bg-green-700 text-white" onClick={send}>Send</Button>
          </div>
        </div>
      )}
      <Button className="bg-green-700 text-white" onClick={() => setOpen(o=>!o)}>{open? 'Close' : 'Chat'}</Button>
    </div>
  );
};

// ---------- App ----------
export default function App() {
    const [quoteOpen, setQuoteOpen] = useState(false);
const [quote, setQuote] = useState({ name:"", city:"", grade:"", qty:"" });

const sendQuoteToWhatsapp = () => {
  const msg = `Hello, I want a price quote:
Name: ${quote.name}
City: ${quote.city}
Grade: ${quote.grade}
Quantity: ${quote.qty} sheets`;
  
  window.open(`https://wa.me/918053031325?text=${encodeURIComponent(msg)}`, "_blank");
  setQuoteOpen(false);
};

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin onSuccess={() => window.location.assign('/admin/dashboard')} />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/products" element={<Products />} />
<Route path="/products/:category" element={<PlywoodVarieties />} />

          </Routes>
        </main>
       <Footer />



{/* ---- Floating Call & WhatsApp Buttons ---- */}
<div className="fixed bottom-20 right-4 flex flex-col gap-3 z-50">
  <a href="tel:+918053031325" className="bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-800 transition flex items-center gap-2">
    📞 Call
  </a>
  <a href="https://wa.me/918053031325" target="_blank" className="bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition flex items-center gap-2">
    💬 WhatsApp
  </a>
</div>

{/* ---- Quote Popup ---- */}
{quoteOpen && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-80 p-6 rounded-2xl shadow-xl border border-[#d5c29e]">

      <h3 className="text-xl font-semibold text-[#2a4b2f] mb-3">Get Best Cash Rate</h3>

      {["name","city","grade","qty"].map((field) => (
        <input
          key={field}
          placeholder={
            field === "qty"
              ? "Quantity (Sheets)"
              : field.charAt(0).toUpperCase()+field.slice(1)
          }
          value={quote[field]}
          onChange={(e) => setQuote({...quote, [field]: e.target.value})}
          className="w-full border rounded-xl px-3 py-2 mb-3"
        />
      ))}

      <div className="flex gap-3 mt-4">
        <button
          className="flex-1 bg-gray-200 rounded-xl py-2"
          onClick={() => setQuoteOpen(false)}
        >
          Cancel
        </button>
        <button
          className="flex-1 bg-green-700 text-white rounded-xl py-2"
          onClick={sendQuoteToWhatsapp}
        >
          Send
        </button>
      </div>

    </div>
  </div>
)}

<ChatWidget />


      </div>
    </BrowserRouter>
  );
}

/*
Index bootstrap (client/src/main.jsx):
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

Basic CSS (client/src/index.css):
html,body,#root{height:100%}
body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif}
*/
