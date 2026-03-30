const grid     = document.getElementById('tarjetas-grid');
const loading  = document.getElementById('loading');
const error    = document.getElementById('error');
const contador = document.getElementById('contador');
const select   = document.getElementById('subject_input');

// --- Helpers -------------------------------------------------
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

function crearTarjeta(p) {
  const article = document.createElement('article');
  article.className = 'tarjeta';
  article.setAttribute('role', 'listitem');
  article.innerHTML = `
    <div class="tarjeta-header">
      <div class="tarjeta-avatar" aria-hidden="true">${iniciales(p.nombre)} </div>
      <div class="tarjeta-info">
        <p class="tarjeta-nombre">${p.nombre}</p>
        <span class="tarjeta-categoria">${p.categoria}</span>
      </div>
    </div>
    <div class="tarjeta-calificacion">
      <div class="estrellas" role="img" aria-label="Calificación: ${p.calificacion} de 5 estrellas">
        ${renderEstrellas(p.calificacion)}
      </div>
      <span class="calificacion-numero">${p.calificacion.toFixed(1)}</span>
      <span class="calificacion-resenas">(${p.resenas} reseñas)</span>
    </div>
    <div class="tarjeta-acciones">
      <a href="./detalle.html?id=${p.id}" class="tarjeta-btn-primary">Ver detalle</a>
      <a href="tel:${p.telefono}" class="tarjeta-btn-ghost">Llamar</a>
    </div>
  `;
  return article;
}

// --- Filter + render -----------------------------------------
let todosLosProveedores = [];

function renderizar() {
  const seleccion = select.value;
  const filtrados = seleccion
  ? todosLosProveedores.filter(p => p.categoria.toLowerCase() === seleccion.toLowerCase())
  : todosLosProveedores;

  grid.innerHTML = '';
  contador.textContent = `${filtrados.length} proveedores encontrados`;

  loading.hidden = false;

  setTimeout(() => {
  loading.hidden = true;
  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;padding:2rem 0">No hay proveedores para esta categoría.</p>`;
    return;
  }


    filtrados.forEach(p => grid.appendChild(crearTarjeta(p)));
  },1000)
}

// --- Populate select dynamically from JSON -------------------
function poblarSelect() {

  // Add "Otro" at the end as a catch-all
  const otro = document.createElement('option');
  otro.value = '';
  otro.textContent = 'Mostrar todos';
  select.insertBefore(otro, select.querySelector('option:not([disabled])'));
}

// --- Fetch ---------------------------------------------------
fetch('../data/db.json')
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(proveedores => {
    setTimeout(()=>{
    todosLosProveedores = proveedores;
    loading.hidden = true;
    poblarSelect(proveedores);
    renderizar();
    },1000)
  })
  .catch(() => {
    loading.hidden = true;
    error.hidden = false;
  });

select.addEventListener('change', renderizar);

  // Burger menu
const burger = document.querySelector('.burger');
const nav    = document.querySelector('.site-nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close on nav link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});