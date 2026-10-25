import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { CATEGORIES, PRODUCTS } from '../data.js';

export default function ShopPage() {
  const [category, setCategory] = useState('Todo');
  const [query, setQuery] = useState('');
  const { onAddProduct } = useOutletContext();
  const filtered = useMemo(() => PRODUCTS.filter((product) => (category === 'Todo' || product.category === category) && `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(query.toLowerCase())), [category, query]);

  return <div className="page-shell shop-page"><section className="page-hero page-hero-shop"><span className="eyebrow eyebrow-light">EQUIPA TU SIGUIENTE NIVEL</span><h1>Elige lo que<br /><em>te mueve.</em></h1><p>Nutrición, accesorios y entrenamiento en un solo lugar.</p><div className="shop-hero-badges"><span>Envío gratis</span><span>1 o 2 días</span><span>Contra entrega</span></div></section>
    <section className="page-section shop-catalog"><div className="section-title"><div><span className="eyebrow">CATÁLOGO SACREPS</span><h2>Tu próxima <em>sesión empieza aquí.</em></h2></div><span className="catalog-count">{filtered.length} productos</span></div><div className="catalog-controls"><div className="category-list" aria-label="Filtrar por categoría"><SlidersHorizontal size={16} />{CATEGORIES.map((item) => <button key={item} className={category === item ? 'category-chip is-active' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en la tienda" aria-label="Buscar en la tienda" /></label></div>
      {filtered.length ? <div className="product-grid shop-product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={onAddProduct} />)}</div> : <div className="empty-state"><Search size={24} /><h3>No hay coincidencias</h3><p>Prueba otro nombre o categoría.</p><button className="button button-soft" onClick={() => { setQuery(''); setCategory('Todo'); }}>Limpiar filtros</button></div>}
      <p className="demo-note">Productos y precios ilustrativos; confirma disponibilidad antes de comprar.</p>
    </section>
  </div>;
}