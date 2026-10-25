import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Dumbbell, Instagram, Menu, Minus, Plus, Search, ShoppingBag, Truck, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgaaoeba';
const CATEGORIES = ['Todo', 'Suplementos', 'Nutrición', 'Accesorios', 'Entrenamiento'];
const PRODUCTS = [
  { id: 'whey', name: 'Whey Protein', detail: 'Proteína · 2 lb · Vainilla', price: 149900, category: 'Suplementos', label: 'MÁS ELEGIDO', visual: 'whey', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=85', alt: 'Entrenamiento de fuerza en gimnasio' },
  { id: 'creatina', name: 'Creatina pura', detail: 'Monohidratada · 300 g', price: 79900, category: 'Suplementos', label: 'ESENCIAL', visual: 'creatine', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85', alt: 'Atleta preparándose para entrenar' },
  { id: 'shaker', name: 'Shaker SACREPS', detail: '700 ml · Mezcla fácil', price: 29900, category: 'Accesorios', label: '', visual: 'shaker', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=85', alt: 'Equipo de entrenamiento y pesas' },
  { id: 'bar', name: 'Barra de proteína', detail: 'Chocolate · Caja x 12', price: 8900, category: 'Nutrición', label: 'PARA LLEVAR', visual: 'bar', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', alt: 'Alimento saludable para complementar tu rutina' },
  { id: 'bands', name: 'Bandas de resistencia', detail: 'Set x 3 · Intensidades', price: 39900, category: 'Entrenamiento', label: '', visual: 'bands', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85', alt: 'Ejercicio de movilidad y entrenamiento' },
  { id: 'gloves', name: 'Guantes de training', detail: 'Agarre seguro · Negro', price: 54900, category: 'Accesorios', label: 'NUEVO', visual: 'gloves', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85', alt: 'Zona de pesas en gimnasio' },
  { id: 'bottle', name: 'Botella térmica', detail: 'Acero inoxidable · 750 ml', price: 69900, category: 'Accesorios', label: '', visual: 'bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85', alt: 'Botella deportiva para hidratarte' },
  { id: 'rope', name: 'Cuerda de velocidad', detail: 'Longitud ajustable · PVC', price: 34900, category: 'Entrenamiento', label: '', visual: 'rope', image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=900&q=85', alt: 'Sesión de ejercicio funcional' },
];

const money = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

function BrandMark() {
  return <a className="brand" href="#inicio" aria-label="SACREPS, inicio"><span className="brand-mark"><img src="/assets/sacreps-logo.png" alt="" /></span><span className="brand-name">SACREPS<span>TRAINING CULTURE</span></span></a>;
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className={`product-image product-image--${product.visual}`}>
        <img src={product.image} alt={product.alt} loading="lazy" />
        {product.label && <span className="product-label">{product.label}</span>}
        <button className="quick-add" onClick={() => onAdd(product)} aria-label={`Agregar ${product.name} al carrito`}><Plus size={19} strokeWidth={1.8} /></button>
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p></div><strong>{money(product.price)}</strong></div>
    </article>
  );
}

function App() {
  const [category, setCategory] = useState('Todo');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.from('.hero-copy > *, .hero-note', { y: reduceMotion ? 0 : 24, opacity: 0, duration: reduceMotion ? 0 : 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
      if (!reduceMotion) gsap.from('.product-card', { y: 22, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: '.product-grid', start: 'top 86%' } });
    }, heroRef);
    return () => context.revert();
  }, []);

  const filteredProducts = useMemo(() => PRODUCTS.filter((product) => {
    const matchesCategory = category === 'Todo' || product.category === category;
    const matchesQuery = `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    setSubmitted(false);
    setCartOpen(true);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  async function submitOrder(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setFormError('');
    const formData = new FormData(form);
    const orderLines = cart.map((item) => `${item.name} x${item.quantity} - ${money(item.price * item.quantity)}`).join('\n');
    formData.append('Productos del pedido', orderLines);
    formData.append('Subtotal', money(subtotal));
    formData.append('Envío', 'GRATIS');
    formData.append('Método de pago', 'Contra entrega');
    formData.append('_subject', `Nuevo pedido SACREPS - ${formData.get('Nombre')}`);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('No pudimos enviar el pedido. Revisa tus datos e inténtalo de nuevo.');
      setSubmitted(true);
      setCart([]);
      form.reset();
    } catch (error) {
      setFormError(error.message || 'No fue posible conectar. Escríbenos por WhatsApp y te ayudamos.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div ref={heroRef}>
      <div className="shipping-strip"><Truck size={14} /><span>ENVÍO GRATIS A TODA COLOMBIA</span><span className="strip-divider">·</span><span>PAGA AL RECIBIR</span><ArrowRight size={14} /></div>
      <header className="site-header">
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X /> : <Menu />}</button>
        <BrandMark />
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          <a href="#tienda" onClick={() => setMenuOpen(false)}>Tienda</a><a href="#guias" onClick={() => setMenuOpen(false)}>Guías</a><a href="#filosofia" onClick={() => setMenuOpen(false)}>Nuestra esencia</a><a href="#comunidad" onClick={() => setMenuOpen(false)}>Comunidad</a>
        </nav>
        <div className="header-actions"><a className="header-instagram" href="https://instagram.com/sacrepsco" target="_blank" rel="noreferrer" aria-label="Instagram SACREPS"><Instagram size={18} /></a><button className="cart-trigger" onClick={() => { setCartOpen(true); setSubmitted(false); }} aria-label={`Abrir carrito, ${itemCount} artículos`}><ShoppingBag size={19} /><span>Bolsa</span><b>{itemCount}</b></button></div>
      </header>

      <main>
        <section className="hero" id="inicio" aria-label="Entrena con intención">
          <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1900&q=85"><source src="/sacreps-gym-hero.mp4" type="video/mp4" /></video>
          <div className="hero-shade" />
          <div className="hero-copy"><span className="eyebrow light-eyebrow"><span /> EQUIPA TU SIGUIENTE NIVEL</span><h1>Entrena.<br /><em>Recupera.</em><br />Supérate.</h1><p>Todo lo que mueve tu entrenamiento, en un solo lugar.</p><div className="hero-actions"><a className="button button-light" href="#tienda">Descubrir la tienda <ArrowRight size={16} /></a><a className="hero-text-link" href="#filosofia">Conoce SACREPS <ArrowDown size={15} /></a></div></div>
          <div className="hero-note"><span className="hero-note-icon"><Dumbbell size={17} /></span><span><b>Lo que necesitas</b><small>para seguir avanzando</small></span><ArrowUpRight size={16} /></div>
          <div className="hero-index">01 <span /> 03</div>
        </section>

        <section className="benefit-row" aria-label="Beneficios de compra"><div><span className="benefit-number">01</span><strong>Envío gratis</strong><small>A cualquier lugar de Colombia</small></div><div><span className="benefit-number">02</span><strong>Pagas al recibir</strong><small>Compra con tranquilidad</small></div><div><span className="benefit-number">03</span><strong>Para cada objetivo</strong><small>Entrenamiento, nutrición y más</small></div><a href="#tienda" className="benefit-link">Encuentra lo tuyo <ArrowRight size={16} /></a></section>

        <section className="shop-section" id="tienda">
          <div className="section-heading"><div><span className="eyebrow">TU RUTINA, TU RITMO</span><h2>Encuentra tu <em>impulso.</em></h2></div><p>Productos para acompañarte dentro y fuera del gym.</p></div>
          <div className="catalog-tools"><div className="category-list" role="group" aria-label="Filtrar productos por categoría">{CATEGORIES.map((item) => <button key={item} className={category === item ? 'category-chip is-active' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar productos" aria-label="Buscar productos" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={15} /></button>}</label></div>
          <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>
          {filteredProducts.length === 0 && <div className="empty-results"><Search size={22} /><p>No encontramos productos para “{query}”.</p><button onClick={() => { setQuery(''); setCategory('Todo'); }}>Ver todo el catálogo</button></div>}
          <p className="demo-note">Precios y productos de referencia, sujetos a actualización.</p>
        </section>

        <section className="guides-section" id="guias"><div className="guides-heading"><div><span className="eyebrow">SACREPS KNOWLEDGE</span><h2>Aprende. Entrena. <em>Avanza.</em></h2></div><p>Ideas claras para moverte mejor, ganar fuerza y entrenar con intención.</p></div><div className="guide-grid">
          <article className="guide-card"><img src="https://images.unsplash.com/photo-1534368270820-9de3d8053204?auto=format&fit=crop&w=900&q=85" alt="Atleta preparando una sesión de fuerza" loading="lazy" /><div className="guide-content"><span>ENTRENAMIENTO · 4 MIN</span><h3>Progresar también es entrenar con técnica.</h3><details><summary>Leer guía <ArrowRight size={15} /></summary><p>Empieza con un movimiento que puedas controlar. Mantén un rango cómodo, una postura estable y repeticiones consistentes antes de aumentar la carga. Sube poco a poco y registra tus sesiones para notar el progreso. El descanso también hace parte del entrenamiento.</p></details></div></article>
          <article className="guide-card"><img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=85" alt="Preparación antes de entrenar" loading="lazy" /><div className="guide-content"><span>HÁBITOS · 3 MIN</span><h3>Una rutina que sí puedes sostener.</h3><details><summary>Leer guía <ArrowRight size={15} /></summary><p>El mejor plan es el que cabe en tu vida. Elige días realistas, prepara lo que necesitas con anticipación y deja espacio para recuperarte. Si una semana cambia, retoma el siguiente entrenamiento sin convertir un día difícil en una razón para abandonar.</p></details></div></article>
          <article className="guide-card"><img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=85" alt="Área de fuerza y pesas libres" loading="lazy" /><div className="guide-content"><span>NUTRICIÓN · 5 MIN</span><h3>Suplementos: información primero.</h3><details><summary>Leer guía <ArrowRight size={15} /></summary><p>Un suplemento acompaña, no reemplaza, una alimentación variada ni el descanso. Revisa ingredientes, etiqueta, lote e instrucciones del fabricante y elige productos con registro aplicable. Si tienes una condición de salud, tomas medicamentos o tienes dudas, consulta a un profesional antes de usarlo.</p></details></div></article>
        </div><p className="guide-disclaimer">Contenido educativo general; no reemplaza una valoración médica, nutricional ni la orientación de un entrenador.</p></section>

        <section className="manifesto" id="filosofia"><div className="manifesto-image"><img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85" alt="Atleta entrenando en un gimnasio" loading="lazy" /><span className="image-caption">SACREPS TRAINING CLUB · COLOMBIA</span></div><div className="manifesto-copy"><span className="eyebrow">MÁS QUE UNA TIENDA</span><h2>El progreso se construye <em>todos los días.</em></h2><p>Somos una comunidad que entrena con propósito. Encuentra el equipo, la nutrición y la guía para hacer de cada sesión un paso hacia adelante.</p><a href="https://instagram.com/sacrepsco" target="_blank" rel="noreferrer" className="text-link">Conoce nuestra comunidad <ArrowUpRight size={17} /></a><div className="manifesto-seal"><img src="/assets/sacreps-logo.png" alt="" /><span>ENTRENA<br />CON INTENCIÓN</span></div></div></section>

        <section className="community" id="comunidad"><div><span className="eyebrow light-eyebrow">NOS VEMOS EN EL GYM</span><h2>La disciplina se entrena.<br /><em>La comunidad también.</em></h2><p>Sigue el día a día de SACREPS, nuestros gimnasios y nuevos lanzamientos.</p></div><a href="https://instagram.com/sacrepsco" target="_blank" rel="noreferrer" className="button button-outline"><Instagram size={17} /> @sacrepsco <ArrowUpRight size={15} /></a><span className="community-watermark">SACREPS</span></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><BrandMark /><p>Tu entrenamiento merece<br />buenas decisiones.</p><a className="footer-whatsapp" href="https://wa.me/573144572008" target="_blank" rel="noreferrer">¿Tienes preguntas? <b>Hablemos por WhatsApp <ArrowUpRight size={14} /></b></a></div><div className="footer-bottom"><span>© 2026 SACREPS · Colombia</span><span>Envíos gratis · Pago contra entrega</span><a href="https://instagram.com/sacrepsco" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a></div></footer>
      <a className="whatsapp-float" href="https://wa.me/573144572008" target="_blank" rel="noreferrer" aria-label="Contactar SACREPS por WhatsApp"><span>¿Te ayudamos?</span><b>WhatsApp</b></a>

      {cartOpen && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}><aside className="cart-drawer" aria-label="Carrito de compras"><div className="drawer-header"><div><span className="eyebrow">TU SELECCIÓN</span><h2>Tu bolsa <span>({itemCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X /></button></div>
        {submitted ? <div className="order-success"><span><Check size={25} /></span><h3>¡Pedido recibido!</h3><p>Gracias por elegir SACREPS. Confirmaremos tu pedido para coordinar la entrega.</p><button className="button button-wine" onClick={() => { setCartOpen(false); setSubmitted(false); }}>Seguir explorando <ArrowRight size={16} /></button></div> : cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={28} /><h3>Tu bolsa está esperando.</h3><p>Agrega productos para empezar tu próximo entrenamiento.</p><button className="button button-wine" onClick={() => { setCartOpen(false); document.querySelector('#tienda')?.scrollIntoView({ behavior: 'smooth' }); }}>Ver productos <ArrowRight size={16} /></button></div> : <>
          <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><strong>{item.name}</strong><small>{item.detail}</small><b>{money(item.price * item.quantity)}</b><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Quitar una unidad de ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Agregar una unidad de ${item.name}`}><Plus size={13} /></button></div></div></div>)}</div>
          <div className="cart-summary"><p><span>Subtotal</span><b>{money(subtotal)}</b></p><p><span>Envío a Colombia</span><b className="free-shipping">GRATIS</b></p><p className="summary-total"><span>Total a pagar al recibir</span><b>{money(subtotal)}</b></p>
            <form className="checkout-form" onSubmit={submitOrder}><h3>Datos de entrega</h3><label>Nombre completo<input name="Nombre" autoComplete="name" required placeholder="Tu nombre" /></label><div className="form-row"><label>Celular<input name="Celular" type="tel" autoComplete="tel" required placeholder="300 000 0000" /></label><label>Departamento<input name="Departamento" autoComplete="address-level1" required placeholder="Departamento" /></label></div><div className="form-row"><label>Ciudad<input name="Ciudad" autoComplete="address-level2" required placeholder="Ciudad" /></label><label>Dirección<input name="Dirección" autoComplete="street-address" required placeholder="Dirección completa" /></label></div><label>Indicaciones <span className="optional">(opcional)</span><textarea name="Indicaciones de entrega" rows="2" placeholder="Apto, barrio, punto de referencia..." /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button type="submit" className="button button-wine checkout-button" disabled={sending}>{sending ? 'Enviando pedido…' : <>Confirmar pedido <ArrowRight size={16} /></>}</button><p className="checkout-note"><Truck size={14} /> Envío gratis · Pagas en la puerta de tu casa</p></form>
          </div></>}
        </aside></div>}
    </div>
  );
}

export default App;