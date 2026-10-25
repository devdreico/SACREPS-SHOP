import { ArrowUpRight, Plus } from 'lucide-react';

export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
}

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card glass-panel">
      <div className="product-visual"><img src={product.image} alt={product.name} loading="lazy" />{product.label && <span className="product-label">{product.label}</span>}<button className="product-add" onClick={() => onAdd(product)} aria-label={`Agregar ${product.name} al carrito`}><Plus size={18} /></button></div>
      <div className="product-details"><span>{product.category}</span><h3>{product.name}</h3><p>{product.detail}</p><div className="product-price"><strong>{formatCOP(product.price)}</strong><ArrowUpRight size={16} /></div></div>
    </article>
  );
}