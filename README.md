# SACREPS-SHOP

Experiencia multipágina de SACREPS con Vite, React, React Router, GSAP, Leaflet y OpenStreetMap.

## Desarrollo

```sh
npm install
npm run dev
```

Genera una compilación de producción con `npm run build`.

## Catálogo y pedidos

El catálogo y los precios iniciales son demostrativos y se editan en `src/data.js`. El checkout usa pago contra entrega y envía los pedidos a `https://formspree.io/f/xgaaoeba`. El sitio informa envío gratis y entrega en 1 o 2 días; confirma cobertura y tiempos operativos antes de aceptar pedidos reales. No se deben publicar medicamentos sin validar sus requisitos regulatorios.

## Páginas

- `/tienda`: catálogo, filtros y compra.
- `/sedes`: mapa de 11 puntos aproximados en Bogotá, Funza, Mosquera, Madrid y Subachoque. No son direcciones verificadas; confirma cada sede por WhatsApp antes de visitarla.
- `/comunidad` y `/contacto`: formularios conectados a Formspree e Instagram/WhatsApp.
- `/guias`: contenido educativo general, no sustituye consejo médico.
- `/noticias`: titulares consultados desde Google Noticias mediante un proxy RSS público, con caché y búsquedas de respaldo. Su disponibilidad depende del proxy externo.
- `/servicios`: enlaces a SANIVER y búsqueda de Symmetry en las tiendas oficiales de apps.

Reemplaza los puntos del mapa por las direcciones confirmadas y verifica el nombre/desarrollador de Symmetry antes de promocionar una app específica.

## Recursos

El hero utiliza `public/sacreps-gym-hero.mp4`, un video de stock de Pexels (recurso 3195394). Consulta la [licencia de Pexels](https://www.pexels.com/license/) antes de redistribuir el sitio. Las fotografías de catálogo y guías cargan desde Unsplash.