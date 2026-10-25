import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import LocationMap from '../components/LocationMap.jsx';
import { LOCATIONS } from '../data.js';

const CITIES = ['Todas', 'Bogotá', 'Funza', 'Mosquera', 'Madrid', 'Subachoque'];

export default function LocationsPage() {
  const [city, setCity] = useState('Todas');
  const [selected, setSelected] = useState(null);
  const locations = city === 'Todas' ? LOCATIONS : LOCATIONS.filter((location) => location.city === city);
  return <div className="page-shell locations-page"><section className="page-hero page-hero-locations"><span className="eyebrow eyebrow-light">SACREPS TRAINING CLUB</span><h1>Cerca de donde<br /><em>vives.</em></h1><p>11 puntos referenciales en Bogotá y municipios de la Sabana.</p><a className="button button-light" href="#mapa-sacreps">Ver mapa <MapPin size={16} /></a></section>
    <section className="map-section page-section" id="mapa-sacreps"><div className="section-title"><div><span className="eyebrow">BOGOTÁ + SABANA</span><h2>Encuentra tu <em>punto.</em></h2></div><p>Selecciona una sede para ubicarla en el mapa.</p></div><div className="city-filters">{CITIES.map((item) => <button key={item} onClick={() => { setCity(item); setSelected(null); }} className={city === item ? 'city-filter is-active' : 'city-filter'}>{item}</button>)}</div>
      <div className="location-layout"><LocationMap locations={locations} selected={selected} onSelect={setSelected} /><div className="location-list glass-panel"><div className="location-list-head"><span className="micro-label">PUNTOS DE REFERENCIA</span><b>{locations.length.toString().padStart(2, '0')}</b></div>{locations.map((location) => <div key={location.id} className={selected === location.id ? 'location-row is-selected' : 'location-row'}><button onClick={() => setSelected(location.id)} aria-label={`Mostrar ${location.area}, ${location.city} en el mapa`}><span className="location-number">{location.id.toString().padStart(2, '0')}</span><span className="location-name"><b>{location.area}</b><small>{location.city}</small></span></button><a href={`https://www.google.com/maps/search/?api=1&query=${location.position[0]},${location.position[1]}`} target="_blank" rel="noreferrer" aria-label={`Abrir mapa referencial de ${location.area}`}><ArrowUpRight size={15} /></a></div>)}<p className="location-disclaimer">Estos 11 puntos son aproximados y no representan direcciones de sedes confirmadas. Escríbenos para validar dirección y horarios antes de visitarnos.</p><a className="button button-soft" href="https://wa.me/573144572008" target="_blank" rel="noreferrer">Confirmar una sede <ArrowUpRight size={15} /></a></div></div>
    </section>
  </div>;
}