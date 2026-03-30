    const providerForm = document.getElementById("provider_form")
    providerForm.addEventListener("submit", (e) =>{
        e.preventDefault()
      
        const nombre = document.getElementById("name_input").value;
        const email = document.getElementById("email_input").value;
        const telefono = document.getElementById("telephone_input").value;
        const categoria = document.getElementById('subject_input').value;
        const descripcion = document.getElementById("message_input").value
        const message = `Nombre: ${nombre}%0ATeléfono: ${telefono}%0AMail: ${email}%0AServicio: ${categoria}%0ADescripción: ${descripcion}`;
        const whatsappNumber = "595984960221"; 
        const url = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(url, "_blank");
        alert("Gracias por aplicar! nos contactaremos con usted shortly(change this)")
        // also on send clear the inputs
       


    })

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