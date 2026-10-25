import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, Newspaper, RefreshCw, Rss } from 'lucide-react';
import { NEWS_FEED_URL, NEWS_FALLBACK } from '../data.js';

const CACHE_KEY = 'sacreps-news-v1';
const CACHE_TTL = 20 * 60 * 1000;
const FEED_PROXY = 'https://api.allorigins.win/raw?url=';

function safeDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Actualidad' : new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export default function NewsPage() {
  const [items, setItems] = useState(NEWS_FALLBACK);
  const [status, setStatus] = useState('loading');
  const [updatedAt, setUpdatedAt] = useState(null);

  const refresh = useCallback(async (force = false) => {
    if (!force) {
      try {
        const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
        if (cached && Date.now() - cached.savedAt < CACHE_TTL && cached.items?.length) {
          setItems(cached.items);
          setUpdatedAt(cached.savedAt);
          setStatus('live');
          return;
        }
      } catch {
        sessionStorage.removeItem(CACHE_KEY);
      }
    }

    setStatus('loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const url = `${FEED_PROXY}${encodeURIComponent(NEWS_FEED_URL)}`;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('Feed no disponible');
      const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
      if (xml.querySelector('parsererror')) throw new Error('Feed RSS inválido');
      const currentItems = Array.from(xml.querySelectorAll('item')).slice(0, 12).map((item) => ({ title: item.querySelector('title')?.textContent?.trim(), source: item.querySelector('source')?.textContent?.trim() || 'Google Noticias', pubDate: item.querySelector('pubDate')?.textContent, link: item.querySelector('link')?.textContent?.trim() })).filter((item) => item.title && item.link);
      if (!currentItems.length) throw new Error('Feed vacío');
      const savedAt = Date.now();
      setItems(currentItems);
      setUpdatedAt(savedAt);
      setStatus('live');
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ items: currentItems, savedAt }));
    } catch {
      setStatus('fallback');
      setUpdatedAt(null);
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = window.setInterval(() => refresh(true), CACHE_TTL);
    return () => window.clearInterval(interval);
  }, [refresh]);

  return <div className="page-shell news-page"><section className="page-hero page-hero-news"><span className="eyebrow eyebrow-light"><Rss size={14} /> SACREPS BRIEFING</span><h1>El mundo<br />también <em>se mueve.</em></h1><p>Novedades del entrenamiento, bienestar y deporte, reunidas en un solo lugar.</p><div className="news-live-indicator"><span className={status === 'live' ? 'live-dot' : 'live-dot is-muted'} />{status === 'loading' ? 'Actualizando fuentes…' : status === 'live' ? 'Fuentes actualizadas' : 'Mostrando fuentes de respaldo'}{updatedAt && <span>· {safeDate(updatedAt)}</span>}</div></section>
    <section className="page-section news-section"><div className="section-title"><div><span className="eyebrow">LO QUE ESTÁ PASANDO</span><h2>Noticias para <em>seguir aprendiendo.</em></h2></div><button className="button button-soft refresh-button" onClick={() => refresh(true)} disabled={status === 'loading'}><RefreshCw className={status === 'loading' ? 'spin' : ''} size={15} /> Actualizar</button></div><p className="news-disclaimer">Titulares enlazados a sus fuentes originales. La selección automática puede incluir notas de distintos medios.</p><div className="news-grid">{items.map((item, index) => <article className={`news-card glass-panel ${index === 0 ? 'news-card-featured' : ''}`} key={`${item.link}-${index}`}><div className="news-card-top"><span><Newspaper size={15} /> {item.source}</span><span><Clock3 size={13} /> {safeDate(item.pubDate)}</span></div><h3>{item.title}</h3><a href={item.link} target="_blank" rel="noreferrer">Leer en la fuente <ArrowUpRight size={15} /></a><span className="news-number">{String(index + 1).padStart(2, '0')}</span></article>)}</div><div className="news-source-note"><span className="source-status">{status === 'live' ? 'EN VIVO' : 'SELECCIÓN EDITORIAL'}</span><p>La actualización automática depende de fuentes externas. SACREPS no modifica los artículos ni reemplaza la información de cada medio.</p></div></section></div>;
}