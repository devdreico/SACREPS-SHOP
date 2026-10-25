import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import { FORMSPREE_ENDPOINT } from './data.js';

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const CommunityPage = lazy(() => import('./pages/CommunityPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const GuidesPage = lazy(() => import('./pages/GuidesPage.jsx'));
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const LocationsPage = lazy(() => import('./pages/LocationsPage.jsx'));
const NewsPage = lazy(() => import('./pages/NewsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const ShopPage = lazy(() => import('./pages/ShopPage.jsx'));

export default function RouterApp() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderState, setOrderState] = useState('idle');
  const [orderError, setOrderError] = useState('');

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    setOrderState('idle');
    setCartOpen(true);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  async function submitOrder(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const products = cart.map((item) => `${item.name} x${item.quantity} — $${new Intl.NumberFormat('es-CO').format(item.price * item.quantity)}`).join('\n');
    data.append('Productos del pedido', products);
    data.append('Subtotal COP', String(subtotal));
    data.append('Envío', 'Gratis a Colombia');
    data.append('Tiempo estimado', '1 o 2 días');
    data.append('Método de pago', 'Contra entrega');
    data.append('_subject', `Nuevo pedido SACREPS — ${data.get('Nombre')}`);
    setOrderState('sending');
    setOrderError('');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('No pudimos enviar el pedido. Revisa tus datos e inténtalo de nuevo.');
      setOrderState('sent');
      setCart([]);
      form.reset();
    } catch (error) {
      setOrderState('idle');
      setOrderError(error.message || 'No fue posible conectar. Escríbenos por WhatsApp.');
    }
  }

  const layoutProps = { cart, cartOpen, setCartOpen, orderState, orderError, onChangeQuantity: changeQuantity, onOrder: submitOrder, onAddProduct: addToCart };
  return <Suspense fallback={<div className="route-loader"><img src="/assets/sacreps-logo.png" alt="" /><span>Preparando tu siguiente paso…</span></div>}><Routes><Route element={<SiteLayout {...layoutProps} />}><Route index element={<HomePage />} /><Route path="tienda" element={<ShopPage />} /><Route path="sedes" element={<LocationsPage />} /><Route path="guias" element={<GuidesPage />} /><Route path="comunidad" element={<CommunityPage />} /><Route path="noticias" element={<NewsPage />} /><Route path="servicios" element={<ServicesPage />} /><Route path="nosotros" element={<AboutPage />} /><Route path="contacto" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes></Suspense>;
}