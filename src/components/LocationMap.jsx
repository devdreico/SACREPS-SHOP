import { useEffect, useMemo, useState } from 'react';
import { divIcon } from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { LOCATIONS } from '../data.js';

function FocusLocation({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo(location.position, location.city === 'Bogotá' ? 12 : 13, { duration: 0.8 });
  }, [location, map]);
  return null;
}

export default function LocationMap({ locations = LOCATIONS, selected, onSelect }) {
  const selectedLocation = LOCATIONS.find((location) => location.id === selected);
  const icons = useMemo(() => Object.fromEntries(LOCATIONS.map((location) => [location.id, divIcon({ className: 'sacreps-map-icon', html: `<span class="${location.id === selected ? 'is-selected' : ''}"><b>${String(location.id).padStart(2, '0')}</b></span>`, iconSize: [38, 38], iconAnchor: [19, 19] })])), [selected]);

  return (
    <div className="map-frame glass-panel">
      <MapContainer center={[4.704, -74.14]} zoom={10} scrollWheelZoom={false} className="sacreps-map">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FocusLocation location={selectedLocation} />
        {locations.map((location) => <Marker key={location.id} position={location.position} icon={icons[location.id]} eventHandlers={{ click: () => onSelect(location.id) }}><Tooltip>Sede referencial {String(location.id).padStart(2, '0')} · {location.area}, {location.city}</Tooltip></Marker>)}
      </MapContainer>
      <div className="map-legend"><span className="map-pulse" />11 puntos referenciales · Sabana de Bogotá</div>
    </div>
  );
}