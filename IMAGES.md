# Listado de fotografías necesarias

El sitio está construido y funciona completo, pero usa **slots de imagen marcados**
(fondo con textura + etiqueta de qué foto va ahí) en vez de fotos de stock genéricas
haciéndose pasar por Barbudos. Esto es intencional: no quise usar fotos falsas de
"Felipe/Juan/Pablo" ni un local que no es el real.

Cuando tengas la sesión de fotos, reemplaza cada archivo en `assets/images/` (mismo
nombre) y el slot desaparece solo — el CSS que dibuja la etiqueta se activa solo
mientras el `<img>` no tiene contenido real.

| Archivo | Sección | Dirección de arte | Crop / tamaño mínimo |
|---|---|---|---|
| `hero.jpg` | Hero | Barbero de perfil trabajando, luz cálida lateral, fondo desenfocado | 16:9 (4:5 en mobile) · 2400×1350 |
| `brand.jpg` | Nosotros | Detalle del servicio (toalla caliente, perfilado) o el local | 4:5 · 1600×2000 |
| `experience.jpg` | Experiencia Barbudos | Plano amplio de la estación completa, dramático | 21:9 · 2600×1100 |
| `barber-felipe.jpg` | Equipo | Retrato editorial de Felipe, fondo oscuro neutro | 4:5 · 1200×1500 |
| `barber-juan.jpg` | Equipo | Retrato editorial de Juan, mismo tratamiento | 4:5 · 1200×1500 |
| `barber-pablo.jpg` | Equipo | Retrato editorial de Pablo, mismo tratamiento | 4:5 · 1200×1500 |
| `gallery-1.jpg` … `gallery-5.jpg` | Galería | Interior, herramientas, detalle, barbero en acción, espera | ver `data-shot` en el HTML |
| `svc-corte.jpg`, `svc-barba.jpg`, `svc-cejas.jpg`, `svc-facial.jpg`, `svc-masaje.jpg`, `svc-lavado.jpg` | Servicios (hover) | Detalle de cada servicio | 3:4 · 800×1000 |
| `cta-final.jpg` | CTA final | Plano oscuro, silueta o detalle | 21:9 · 2400×1000 |
| `og-cover.jpg` | SEO / redes | Imagen de portada para compartir | 1200×630 |
| `favicon.png` | Navegador | Logo o monograma | 512×512 |

## Notas de producción
- Exporta todo en **WebP** (con fallback JPG si quieres máxima compatibilidad) y
  ojalá una versión AVIF para el hero.
- El hero y la sección Experiencia son las imágenes más pesadas visualmente — vale
  la pena invertir ahí la mejor toma.
- No hace falta retocar nada del código: los `<img>` ya están con `width`/`height`
  y `loading="lazy"` donde corresponde.
