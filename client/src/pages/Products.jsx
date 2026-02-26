import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCategories } from "../admin/api";

const Hero = ({ title, subtitle }) => (
  <div className="bg-green-50 border-b border-green-100">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2a4b2f]">{title}</h1>
      {subtitle && <p className="text-gray-700 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const ProductCard = ({ title, image, link }) => (
  <Link to={link} className="group block">
    <div className="rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition duration-300">
      <img src={image || 'https://via.placeholder.com/400x224?text=No+Image'} className="w-full h-56 object-cover" alt={title} />
    </div>
    <div className="mt-3 text-center text-xl font-semibold text-[#4a6b3a] group-hover:text-[#2a4b2f] duration-200">
      {title}
    </div>
  </Link>
);

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching categories...');
    listCategories()
      .then(data => {
        console.log('Categories loaded:', data);
        setCategories(data);
      })
      .catch(err => {
        console.error('Failed to load categories:', err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ✅ HERO SECTION */}
      <Hero title="Our Products" subtitle="Plywood, Block Boards & Flush Doors" />

      {/* ✅ PRODUCT CATEGORY GRID */}
      {loading ? (
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">No categories available yet.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          {categories.map(cat => (
            <ProductCard 
              key={cat._id}
              title={cat.name} 
              image={cat.imageUrl}
              link={`/products/${cat.slug}`}
            />
          ))}
        </div>
      )}

      {/* ✅ FEATURE BADGES (Same as Home / About / Contact) */}
      <div className="max-w-6xl mx-auto px-4 mt-6 mb-12 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "MR / BWR / BWP",
            text: "All major grades available in popular thicknesses with consistent quality.",
          },
          {
            title: "Construction Ready",
            text: "Shuttering ply and Block Boards engineered for strength and stability.",
          },
          {
            title: "Fast Dispatch",
            text: "Yamunanagar hub with reliable logistics and cash-friendly billing.",
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
    </>
  );
}
