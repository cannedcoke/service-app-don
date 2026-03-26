const loading = document.getElementById('loading');
const error   = document.getElementById('error');
const content = document.getElementById('detalle-content');

function iniciales(nombre) {
  return nombre.split(' ').slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function renderEstrellas(calificacion) {
  const llenas = Math.floor(calificacion);
  const media  = calificacion % 1 >= 0.5 ? 1 : 0;
  const vacias = 5 - llenas - media;
  const star = (cls) => `<svg class="estrella ${cls}" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M7 1l1.55 3.14L12 4.74l-2.5 2.44.59 3.44L7 9.27l-3.09 1.35.59-3.44L2 4.74l3.45-.6L7 1z"/></svg>`;
  return star('estrella-llena').repeat(llenas) + star('estrella-media').repeat(media) + star('estrella-vacia').repeat(vacias);
}

function mostrarDetalle(p) {
  content.innerHTML = `
    <div class="detalle-card">

      <div class="detalle-hero">
        <div class="detalle-avatar">${iniciales(p.nombre)}</div>
        <div>
          <h1 class="detalle-nombre">${p.nombre}</h1>
          <span class="tarjeta-categoria">${p.categoria}</span>
        </div>
      </div>

      <div class="detalle-stats">
        <div class="detalle-stat">
          <div class="estrellas">
            ${renderEstrellas(p.calificacion)}
          </div>
          <span class="calificacion-numero">${p.calificacion.toFixed(1)}</span>
          <span class="calificacion-resenas">(${p.resenas} reseñas)</span>
        </div>
      </div>

      <div class="detalle-info-grid">
        <div class="detalle-info-item">
          <span class="detalle-info-label">Categoría</span>
          <span class="detalle-info-value">${p.categoria}</span>
        </div>
        <div class="detalle-info-item">
          <span class="detalle-info-label">Reseñas</span>
          <span class="detalle-info-value">${p.resenas}</span>
        </div>
        <div class="detalle-info-item">
          <span class="detalle-info-label">Calificación</span>
          <span class="detalle-info-value">${p.calificacion.toFixed(1)} / 5.0</span>
        </div>
        <div class="detalle-info-item">
          <span class="detalle-info-label">Teléfono</span>
          <span class="detalle-info-value">${p.telefono}</span>
        </div>
      </div>

      <div class="detalle-acciones">
        <a href="tel:${p.telefono}" class="tarjeta-btn-primary">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2.5C2 2.5 3 1 4.5 1c.5 0 1 .5 1.5 1.5S7 4.5 7 5c0 .8-.8 1.3-1.2 1.7C6.5 8 8 9.5 9.3 10.2 9.7 9.8 10.2 9 11 9c.5 0 2 .5 3 1.5s.5 2.5.5 2.5C14.5 14 13 15 11.5 15 6 15 1 9 1 4.5 1 3 2 2.5 2 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          Llamar ahora
        </a>
        <a href="https://wa.me/${p.telefono.replace(/\D/g,'')}" target="_blank" class="tarjeta-btn-ghost">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1a7 7 0 0 1 6.07 10.47L15 15l-3.6-.92A7 7 0 1 1 8 1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          WhatsApp
        </a>
      </div>

    </div>
  `;
  content.hidden = false;
}

// --- Read ?id from URL and load provider ---
const params = new URLSearchParams(window.location.search);
const id     = parseInt(params.get('id'), 10);

if (!id) {
  loading.hidden = true;
  error.hidden   = false;
} else {
  fetch('../data/db.json')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(proveedores => {
      loading.hidden = true;
      const proveedor = proveedores.find(p => p.id === id);
      if (!proveedor) { error.hidden = false; return; }
      mostrarDetalle(proveedor);
    })
    .catch(() => {
      loading.hidden = true;
      error.hidden   = false;
    });
}