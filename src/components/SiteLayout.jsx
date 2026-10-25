import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Instagram, Menu, Minus, Plus, ShoppingBag, Truck, X } from 'lucide-react';
import { gsap } from 'gsap';
import { formatCOP } from './ProductCard.jsx';

const NAVIGATION = [
  { to: '/tienda', label: 'Tienda' },
  { to: '/sedes', label: 'Gimnasios' },
  { to: '/guias', label: 'Wiki' },
  { to: '/comunidad', label: 'Comunidad' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/servicios', label: 'Servicios' },
];
const PAGE_TITLES = { '/': 'SACREPS | Movimiento con propósito', '/tienda': 'Tienda | SACREPS', '/sedes': 'Gimnasios | SACREPS', '/guias': 'Wiki de entrenamiento | SACREPS', '/comunidad': 'Comunidad | SACREPS', '/noticias': 'Actualidad deportiva | SACREPS', '/servicios': 'Bienestar y apps | SACREPS', '/nosotros': 'Nuestra esencia | SACREPS', '/contacto': 'Contacto | SACREPS' };

function Brand() {
  return <NavLink className="brand" to="/" aria-label="SACREPS, inicio"><span className="brand-symbol"><img src="/assets/sacreps-logo.png" alt="" /></span><span className="brand-word">SACREPS<span>TRAINING CULTURE</span></span></NavLink>;
}

function CartDrawer({ items, onClose, onChangeQuantity, onOrder, orderState, orderError }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><aside className="cart-drawer glass-panel" aria-label="Carrito de compras"><div className="drawer-heading"><div><span className="micro-label">TU SELECCIÓN</span><h2>Tu bolsa <span>({itemCount})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Cerrar carrito"><X /></button></div>
    {orderState === 'sent' ? <div className="cart-empty"><span className="success-mark">✓</span><h3>¡Pedido recibido!</h3><p>Te contactaremos para confirmar la entrega.</p><button className="button button-primary" onClick={onClose}>Seguir explorando</button></div> : !items.length ? <div className="cart-empty"><ShoppingBag size={30} /><h3>Tu bolsa está esperando.</h3><p>Explora la tienda y agrega algo para tu próxima sesión.</p><button className="button button-primary" onClick={onClose}>Volver a la tienda</button></div> : <>
      <div className="cart-lines">{items.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt="" /><div className="cart-line-data"><strong>{item.name}</strong><small>{item.detail}</small><b>{formatCOP(item.price * item.quantity)}</b><div className="quantity-stepper"><button onClick={() => onChangeQuantity(item.id, -1)} aria-label={`Quitar ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => onChangeQuantity(item.id, 1)} aria-label={`Agregar ${item.name}`}><Plus size={13} /></button></div></div></div>)}</div>
      <div className="cart-totals"><p><span>Productos</span><b>{formatCOP(subtotal)}</b></p><p><span>Envío</span><b className="free-label">GRATIS</b></p><p className="total-row"><span>Total · pagas al recibir</span><b>{formatCOP(subtotal)}</b></p>
        <form className="checkout-form" onSubmit={onOrder}><h3>¿A dónde lo enviamos?</h3><label>Nombre<input name="Nombre" autoComplete="name" required placeholder="Tu nombre completo" /></label><div className="form-two"><label>Celular<input name="Celular" type="tel" autoComplete="tel" required placeholder="300 000 0000" /></label><label>Departamento<input name="Departamento" autoComplete="address-level1" required placeholder="Departamento" /></label></div><label>Ciudad<input name="Ciudad" autoComplete="address-level2" required placeholder="Ciudad" /></label><label>Dirección completa<input name="Dirección" autoComplete="street-address" required placeholder="Dirección, barrio y número" /></label><label>Indicaciones <span className="optional">(opcional)</span><textarea name="Indicaciones de entrega" rows="2" placeholder="Apto, torre o punto de referencia" /></label>{orderError && <p className="form-error" role="alert">{orderError}</p>}<button className="button button-primary checkout-button" type="submit" disabled={orderState === 'sending'}>{orderState === 'sending' ? 'Enviando pedido…' : <>Confirmar pedido<ArrowRight size={16} /></>}</button><p className="checkout-note"><Truck size={14} /> Gratis · En tu casa en 1 o 2 días</p></form>
      </div></>}
  </aside></div>;
}

export default function SiteLayout({ cart, cartOpen, setCartOpen, orderState, orderError, onChangeQuantity, onOrder, onAddProduct }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const routeRef = useRef(null);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const context = { onAddProduct };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[location.pathname] || 'SACREPS | En movimiento';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !routeRef.current) return undefined;
    const animation = gsap.context(() => {
      gsap.fromTo('.hero-content > *, .page-hero .eyebrow, .page-hero h1, .page-hero > p, .page-hero > .button', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out', clearProps: 'all' });
    }, routeRef);
    return () => animation.revert();
  }, [location.pathname]);

  return <>
    <div className="announcement"><Truck size={14} /><span>ENVÍO GRATIS A COLOMBIA</span><i /> <span>EN TU CASA EN 1 O 2 DÍAS</span><i /> <span>PAGA AL RECIBIR</span></div>
    <header className="site-header"><button className="menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X /> : <Menu />}</button><Brand />
      <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">{NAVIGATION.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>{item.label}</NavLink>)}</nav>
      <div className="header-tools"><NavLink className="contact-link" to="/contacto">Conversemos <ArrowUpRight size={15} /></NavLink><button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Abrir bolsa, ${itemCount} productos`}><ShoppingBag size={18} /><span>Bolsa</span><b>{itemCount}</b></button></div>
    </header>
    <main className="route-content" key={location.pathname} ref={routeRef}><Outlet context={context} /></main>
    <footer className="site-footer"><div className="footer-top"><div><Brand /><p>Entrena con intención.<br />Crece con comunidad.</p></div><div className="footer-nav"><span className="micro-label">EXPLORA</span>{NAVIGATION.map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}</div><div className="footer-nav"><span className="micro-label">CONECTA</span><a href="https://instagram.com/sacrepsco" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href="https://wa.me/573144572008" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a><NavLink to="/contacto">Únete al equipo <ArrowRight size={14} /></NavLink></div></div><div className="footer-bottom"><span>© 2026 SACREPS · Colombia</span><span>Envío gratis · 1 o 2 días · Contra entrega</span><a href="https://instagram.com/sacrepsco" target="_blank" rel="noreferrer"><Instagram size={15} /> @sacrepsco</a></div></footer>
    <a className="whatsapp-float" href="https://wa.me/573144572008" target="_blank" rel="noreferrer" aria-label="Escribir a SACREPS por WhatsApp">WA <span>Hablemos</span></a>
    {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onChangeQuantity={onChangeQuantity} onOrder={onOrder} orderState={orderState} orderError={orderError} />}
  </>;
}