import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listProducts } from "../admin/api";

const categoryNames = {
  plywood: "Plywood Varieties",
  blockboard: "Block Board Varieties",
  flushdoor: "Flush Door Varieties"
};

export default function PlywoodVarieties() {
  const { category = "plywood" } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listProducts(category)
      .then(setItems)
      .catch(err => {
        console.error("Failed to load products:", err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const title = categoryNames[category] || "Products";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#4a6b3a] mb-2">{title}</h1>
      <p className="text-gray-600 mb-8">Browse our premium collection of {category}</p>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white/50 rounded-xl">
          <p className="text-gray-500">No products available in this category yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(p => (
            <div key={p._id} className="p-4 bg-white rounded-xl border border-[#d5c29e] shadow hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={p.imageUrl} 
                  alt={p.name}
                  className="h-full w-full object-cover hover:scale-105 transition duration-300" 
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#2a4b2f]">{p.name}</h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.description}</p>
              <p className="mt-3 text-sm font-medium text-[#6b4e24]">
                Thickness: {Array.isArray(p.thicknesses) ? p.thicknesses.join(", ") : "N/A"} mm
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-[#2a4b2f] text-white py-2 rounded-lg hover:bg-[#1f3523] transition">
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
