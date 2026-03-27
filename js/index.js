fetch('./data/db.json')
  .then(r => r.json())
  .then(proveedores => {
    const categorias = new Set(proveedores.map(p => p.categoria)).size;
    const resenas = proveedores.reduce((sum, p) => sum + p.resenas, 0);
    document.getElementById('hp-proveedores').textContent = proveedores.length + '+';
    document.getElementById('hp-categorias').textContent = categorias;
    document.getElementById('hp-resenas').textContent = resenas.toLocaleString('es-PY') + '+';
  })
  .catch(() => {});

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