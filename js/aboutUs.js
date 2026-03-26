fetch('../data/db.json')
  .then(r => r.json())
  .then(proveedores => {
    const categorias = new Set(proveedores.map(p => p.categoria)).size;
    const resenas    = proveedores.reduce((sum, p) => sum + p.resenas, 0);

    document.getElementById('stat-proveedores').textContent = proveedores.length + '+';
    document.getElementById('stat-categorias').textContent  = categorias;
    document.getElementById('stat-resenas').textContent     = resenas.toLocaleString('es-PY') + '+';
  })
  .catch((e) => console.error('db.json fetch failed:', e));