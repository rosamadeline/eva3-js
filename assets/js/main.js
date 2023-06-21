
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
})()
  /**
   * form complete
   */
//carga la tabla de datos abajo del formulario
  var cargarTabla = (listadoNuevo)=>{
    let eSBtnAccion = document.getElementById("sBtnAccion");
    let eContenedorTabla = document.getElementById("contenedorTabla");
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEdad = document.getElementById("edad");
    let eEmail = document.getElementById("email");
    let eTelefono = document.getElementById("telefono");
    let eAsunto = document.getElementById("asunto");
    let eMensaje = document.getElementById("mensaje");
    render = "<table>"
    render += "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Email</th><th>Telefono</th><th>Asunto</th><th>Mensaje</th><th>¿Desea modificar su mensaje?</th></th></tr>"
    for (let i = 0; i < listadoNuevo.length; i++) { 
      const element = listadoNuevo[i]; //se obtiene una lista nueva con los elementos
        render+="<tr>"
        render+="<td>"+element.nombre+"</td>";
        render+="<td>"+element.apellido+"</td>";
        render+="<td>"+element.edad+"</td>";
        render+="<td>"+element.email+"</td>";
        render+="<td>"+element.telefono+"</td>";
        render+="<td>"+element.asunto+"</td>";
        render+= "<td>"+element.mensaje+"</td>";
        render+="<td>"
        render+="<button class='btnStyle' id='btnEditar"+i+"'>Editar mensaje</button>"
        render+="<button class='btnStyle' id='btnEliminar"+i+"'>Eliminar mensaje</button>"
        render+="</td>"
        render+="</tr>"
    }
    render+="</table>"
    eContenedorTabla.innerHTML = render;
    for (let i = 0; i < listadoNuevo.length; i++) {
      const element = listadoNuevo[i];  //se obtiene una lista nueva con los elementos
        var eBtnEditar = document.getElementById("btnEditar"+i);
        eBtnEditar.addEventListener("click",()=>{
            let sBtn = "<div class='text-center mt-3'><button type='button' class='btnStyle' id='btnEditar' value='"+i+"'>Editar</button></div>"
            eSBtnAccion.innerHTML = sBtn
            let eBtnEditarUp = document.getElementById("btnEditar");
            console.log(eBtnEditarUp)
            eBtnEditarUp.addEventListener('click',()=>modificar(listadoNuevo)) 

            eNombre.value = element.nombre;
            eApellido.value = element.apellido;
            eEdad.value = element.edad;
            eEmail.value = element.email;
            eTelefono.value = element.telefono;
            eAsunto.value = element.asunto;
            eMensaje.value = element.mensaje;
        })
        var eBtnEliminar = document.getElementById("btnEliminar"+i);
        eBtnEliminar.addEventListener("click",()=>{
            let sBtn = "<div class='text-center mt-3'><button type='button' class='btnStyle' id='btnEliminar' value='"+i+"'>Eliminar</button></div>"
            eSBtnAccion.innerHTML = sBtn
            let eBtnEliminarUp = document.getElementById("btnEliminar");
            console.log(eBtnEliminarUp)
            eBtnEliminarUp.addEventListener('click',()=>eliminar(listadoNuevo)) 

            eNombre.value = element.nombre;
            eApellido.value = element.apellido;
            eEdad.value = element.edad;
            eEmail.value = element.email;
            eTelefono.value = element.telefono;
            eAsunto.value = element.asunto;
            eMensaje.value = element.mensaje;
        })
        
        
    }
  }


var modificar = (listadoNuevo)=>{
    console.log("registro")
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEdad = document.getElementById("edad");
    let eEmail = document.getElementById("email");
    let eTelefono = document.getElementById("telefono");
    let eAsunto = document.getElementById("asunto");
    let eMensaje = document.getElementById("mensaje");
    let eBtnEditarUp = document.getElementById("btnEditar");
        

    console.log("Editando...");
    let nombre = eNombre.value;
    let apellido = eApellido.value;
    let edad = eEdad.value;
    let email = eEmail.value;
    let telefono = eTelefono.value;
    let asunto = eAsunto.value;
    let mensaje = eMensaje.value;
    let indice = eBtnEditarUp.value;
    console.log(nombre);
    console.log(apellido);
    console.log(edad);
    console.log(email);
    console.log(telefono);
    console.log(asunto);
    console.log(mensaje);
    console.log(indice);
    listadoNuevo[indice].nombre = nombre;
    listadoNuevo[indice].apellido = apellido;
    listadoNuevo[indice].edad = edad;
    listadoNuevo[indice].email = email;
    listadoNuevo[indice].telefono = telefono;
    listadoNuevo[indice].asunto = asunto;
    listadoNuevo[indice].mensaje = mensaje;
    localStorage.setItem('formulario',JSON.stringify(listadoNuevo))
    cargarTabla(listadoNuevo);
}
// 
var eliminar = (listadoNuevo)=>{
  let eBtnEliminarUp = document.getElementById("btnEliminar");
  let indice = eBtnEliminarUp.value;
  let lista = listadoNuevo.filter((p)=>p.id!=indice)
  let listaFinal = lista.map((p,index)=>{return {...p,'id':index}})
  localStorage.setItem('formulario',JSON.stringify(listaFinal))
  cargarTabla(listaFinal)
}

var registrar = ()=>{
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEdad = document.getElementById("edad");
    let eEmail = document.getElementById("email");
    let eTelefono = document.getElementById("telefono");
    let eAsunto = document.getElementById("asunto");
    let eMensaje = document.getElementById("mensaje");
    let nombre = eNombre.value;
    let apellido = eApellido.value;
    let edad = eEdad.value;
    let email = eEmail.value;
    let telefono = eTelefono.value;
    let asunto = eAsunto.value;
    let mensaje = eMensaje.value;
    console.log(nombre);
    console.log(apellido);
    console.log(edad);
    console.log(email);
    console.log(telefono);
    console.log(asunto);
    console.log(mensaje);
    let listadoAntiguoStr = localStorage.getItem("formulario");
    let listaAntiguo = JSON.parse(listadoAntiguoStr);
    console.log(listaAntiguo)
    if(listaAntiguo==null){
        let persona = {"id":0,"nombre":nombre,"apellido":apellido, "edad":edad,"email":email,"telefono":telefono,"asunto":asunto,"mensaje":mensaje};
        var listadoNuevo = [persona]
    }else{
        let persona = {"id":listaAntiguo.length,"nombre":nombre,"apellido":apellido, "edad":edad,"email":email,"telefono":telefono,"asunto":asunto,"mensaje":mensaje};
        var listadoNuevo = [...listaAntiguo,persona]
    }
    console.log(listadoNuevo)
    localStorage.setItem("formulario",JSON.stringify(listadoNuevo));
    cargarTabla(listadoNuevo)
  
  }
var obtenerDatos = ()=>{
    let listadoAntiguoStr = localStorage.getItem("formulario");
    let listaAntiguo = JSON.parse(listadoAntiguoStr);
    cargarTabla(listaAntiguo)
}
document.getElementById("btn").addEventListener("click",registrar)
addEventListener('load',obtenerDatos)

  /**
   * contraste */
  var handleContraste = () =>{
    let btn = document.getElementById('btnContraste');
    let estado = btn.value;
    if (estado == 'o'){
    btn.value = "c";
    let elements = document.getElementsByClassName('azul');
    console.log(elements)
    console.log(elements[0])
    console.log(elements[0].classList)
    elements[0].classList.add('beige');
    console.log(elements[0].classList)
    elements[0].classList.remove('azul');
    }
    else if (estado == 'c'){
    btn.value = "o";
    let elements = document.getElementsByClassName('beige');
    console.log(elements)
    console.log(elements[0])
    console.log(elements[0].classList)
    elements[0].classList.add('azul');
    console.log(elements[0].classList)
    elements[0].classList.remove('beige');
    }
}

document.getElementById('btnContraste').addEventListener('click', handleContraste);
