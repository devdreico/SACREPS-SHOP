export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgaaoeba';

export const PRODUCTS = [
  { id: 'whey', name: 'Whey Protein', detail: 'Proteína · 2 lb · Vainilla', price: 149900, category: 'Suplementos', label: 'MÁS ELEGIDO', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=85' },
  { id: 'creatina', name: 'Creatina pura', detail: 'Monohidratada · 300 g', price: 79900, category: 'Suplementos', label: 'ESENCIAL', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85' },
  { id: 'shaker', name: 'Shaker SACREPS', detail: '700 ml · Mezcla fácil', price: 29900, category: 'Accesorios', label: '', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=85' },
  { id: 'bar', name: 'Barra de proteína', detail: 'Chocolate · Caja x 12', price: 8900, category: 'Nutrición', label: 'PARA LLEVAR', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85' },
  { id: 'bands', name: 'Bandas de resistencia', detail: 'Set x 3 · Intensidades', price: 39900, category: 'Entrenamiento', label: '', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85' },
  { id: 'gloves', name: 'Guantes de training', detail: 'Agarre seguro · Negro', price: 54900, category: 'Accesorios', label: 'NUEVO', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85' },
  { id: 'bottle', name: 'Botella térmica', detail: 'Acero inoxidable · 750 ml', price: 69900, category: 'Accesorios', label: '', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85' },
  { id: 'rope', name: 'Cuerda de velocidad', detail: 'Longitud ajustable · PVC', price: 34900, category: 'Entrenamiento', label: '', image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=900&q=85' },
];

export const CATEGORIES = ['Todo', 'Suplementos', 'Nutrición', 'Accesorios', 'Entrenamiento'];

export const LOCATIONS = [
  { id: 1, city: 'Bogotá', area: 'Chapinero', position: [4.647, -74.063] },
  { id: 2, city: 'Bogotá', area: 'Galerías', position: [4.641, -74.078] },
  { id: 3, city: 'Bogotá', area: 'Modelia', position: [4.670, -74.127] },
  { id: 4, city: 'Bogotá', area: 'Suba', position: [4.747, -74.094] },
  { id: 5, city: 'Bogotá', area: 'Restrepo', position: [4.582, -74.103] },
  { id: 6, city: 'Funza', area: 'Centro', position: [4.716, -74.211] },
  { id: 7, city: 'Funza', area: 'Sector oriental', position: [4.718, -74.199] },
  { id: 8, city: 'Mosquera', area: 'Centro', position: [4.705, -74.230] },
  { id: 9, city: 'Mosquera', area: 'Sector occidental', position: [4.714, -74.244] },
  { id: 10, city: 'Madrid', area: 'Centro', position: [4.732, -74.265] },
  { id: 11, city: 'Subachoque', area: 'Centro', position: [4.927, -74.174] },
];

export const GUIDES = [
  { category: 'FUERZA', time: '6 MIN', title: 'Empieza fuerte: técnica antes que carga', summary: 'Una base segura para progresar en los movimientos principales.', image: 'https://images.unsplash.com/photo-1534368270820-9de3d8053204?auto=format&fit=crop&w=1000&q=85', steps: ['Aprende el movimiento sin peso o con una carga ligera.', 'Mantén un rango de movimiento cómodo y controlado.', 'Aumenta la carga gradualmente cuando la técnica sea estable.', 'Registra tus sesiones y programa días de recuperación.'] },
  { category: 'HÁBITOS', time: '4 MIN', title: 'Cómo crear una rutina que sí puedas sostener', summary: 'La constancia empieza con un plan compatible con tu semana real.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=85', steps: ['Define horarios realistas y objetivos concretos.', 'Prepara ropa y equipo con anticipación.', 'Incluye descanso y movilidad en tu semana.', 'Retoma el plan después de una pausa sin intentar compensarlo todo de golpe.'] },
  { category: 'NUTRICIÓN', time: '5 MIN', title: 'Suplementos: etiqueta, contexto y criterio', summary: 'Qué revisar antes de agregar un producto a tu rutina.', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1000&q=85', steps: ['Lee ingredientes, porción e instrucciones del fabricante.', 'Verifica lote, procedencia y registro que corresponda.', 'Un suplemento no reemplaza alimentación ni descanso.', 'Consulta a un profesional si tomas medicamentos o tienes una condición de salud.'] },
  { category: 'RECUPERACIÓN', time: '3 MIN', title: 'Recuperar también es parte del entrenamiento', summary: 'Descanso, hidratación y atención a las señales de tu cuerpo.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85', steps: ['Alterna días de carga con recuperación.', 'Prioriza sueño y alimentación suficientes.', 'Ajusta el plan ante dolor persistente o fatiga inusual.', 'Busca orientación profesional si una molestia continúa.'] },
];

export const NEWS_FEED_URL = 'https://news.google.com/rss/search?q=(fitness%20OR%20gimnasio%20OR%20entrenamiento%20OR%20deporte)%20Colombia&hl=es-419&gl=CO&ceid=CO:es-419';

export const NEWS_FALLBACK = [
  { title: 'Explora noticias sobre entrenamiento de fuerza en Colombia', source: 'Búsqueda en Google Noticias', pubDate: '', link: 'https://news.google.com/search?q=entrenamiento+de+fuerza+Colombia' },
  { title: 'Novedades de recuperación y bienestar deportivo', source: 'Búsqueda en Google Noticias', pubDate: '', link: 'https://news.google.com/search?q=recuperaci%C3%B3n+deportiva' },
  { title: 'Actualidad sobre deporte y actividad física', source: 'Búsqueda en Google Noticias', pubDate: '', link: 'https://news.google.com/search?q=deporte+actividad+f%C3%ADsica+Colombia' },
];