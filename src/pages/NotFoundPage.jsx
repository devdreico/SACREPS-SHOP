import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <section className="not-found page-section"><Compass size={40} /><span className="eyebrow">404 · FUERA DE RUTA</span><h1>Este camino<br /><em>no existe.</em></h1><Link className="button button-primary" to="/"><ArrowLeft size={16} /> Volver al inicio</Link></section>;
}