# Barbudos Barbería — sitio nuevo

Sitio estático (HTML/CSS/JS vanilla, sin frameworks), listo para Cloudflare Pages o Vercel
igual que Skinergy / Rabbitts Capital.

## Estructura
```
index.html
css/styles.css
js/main.js
assets/images/      ← ver IMAGES.md para el listado exacto de fotos a subir
```

## Decisiones de contenido (verificadas contra barbudosbarberia.cl, agosto 2026)
- **Equipo:** solo Felipe, Juan y Pablo aparecen confirmados en el sitio actual
  (`/barberos/`). Tu brief mencionaba Andrés y Benjamín pero no están publicados
  — si siguen en el equipo, solo hay que agregar su tarjeta en `#barberos` y su
  perfil en el `data-barber` del JS.
- **Rating:** no encontré una fuente de Google Places API pública en vivo. Usé
  **4.8★** de un agregador de reseñas (infopeluquerias.cl) en vez del 4.9 del
  brief. La sección de reseñas (`#reseñas`) ya está lista para conectarse a la
  API de Google Business Profile — hoy muestra 2 reseñas reales parafraseadas
  (no copiadas textual) más una tarjeta que indica dónde va la integración.
- **Reserva:** el sistema real de agenda de Barbudos vive en `fiweex.com/agenda/barbudos`,
  al que no tengo acceso por API. El modal de reserva es 100% propio visualmente
  y no inventa horarios "disponibles" reales — al confirmar, abre WhatsApp con
  un mensaje prellenado con todo lo elegido. Si more adelante consigues acceso
  a la API de Fiweex (o migras a otra plataforma con API), solo hay que
  reemplazar la función `submitBooking()` en `js/main.js`.
- **Precios y horarios:** tomados literalmente de `/nosotros/` (páginas confirmadas).

## Próximo paso recomendado (no incluido aún)
Si quieres que los precios/servicios sean editables sin tocar HTML, el siguiente
paso natural es mover el array de `service-item` a un `data/services.json` y
renderizarlo por JS — puedo hacerlo en una siguiente pasada si te sirve.

## Performance
- Sin librerías externas pesadas (nada de GSAP/jQuery) — todas las animaciones
  son CSS transform/opacity + IntersectionObserver, tal como pide el brief.
- Google Maps se carga solo al hacer scroll cerca de la sección o al hacer clic.
- `prefers-reduced-motion` respetado globalmente.
