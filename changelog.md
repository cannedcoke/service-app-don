# Changelog — Don

## [1.1.0] — Marzo 2026

### Cambios realizados

---

**1. Modo claro automático**
- Feedback: El color de fondo hace que se pierdan los colores de las letras.
- Solución: Se implementó modo claro automático según la preferencia del dispositivo usando `prefers-color-scheme`. Se redefinieron todas las variables CSS (`--bg-page`, `--text-primary`, `--border-card`, etc.) para garantizar contraste y legibilidad en ambos modos.

---

**2. Rediseño de las pills de categorías**
- Feedback: Las pills parecían botones clickeables, lo que generaba confusión.
- Solución: Se eliminaron los emojis y se reemplazaron con tipografías distintivas por categoría (Syne, Playfair Display, Space Mono, Bebas Neue, Cormorant Garamond). Se convirtieron en un ticker vertical animado, dejando en claro que son decorativas y no interactivas. Se ocultaron en dispositivos móviles.

---

**3. Navegación más intuitiva**
- Feedback: No era intuitivo cómo navegar o bajar por la página.
- Solución: Se reestructuró la página principal con secciones claramente diferenciadas (Hero, Cómo funciona, Para proveedores, Stats). Se agregaron etiquetas de sección (`Cómo funciona`, `Para profesionales`) y una jerarquía visual más clara con títulos grandes que guían el scroll.

---

**4. Limitación de caracteres en inputs**
- Feedback: Los campos de texto no tenían límite de caracteres.
- Solución: Se agregó el atributo `maxlength` a todos los inputs del formulario de registro de proveedores. Se añadió un contador de caracteres visible para que el usuario sepa cuántos caracteres le quedan.

---

**5. Menú burger en mobile**
- Feedback: En dispositivos móviles el menú de navegación desaparecía sin reemplazo.
- Solución: Se agregó un botón burger en el header visible solo en mobile. Al pulsarlo despliega el menú de navegación completo con animación. El botón se transforma en una X al abrirse y cierra el menú automáticamente al tocar cualquier enlace.