let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito=JSON.parse(productosEnCarrito);
const contenedorCarritoVacio= document.querySelector("#carrito-vacio");
const contenedorProductos= document.querySelector("#carrito-productos");
const contenedorCarritoAcciones= document.querySelector("#carrito-acciones");
const contenedorCarritoComprado= document.querySelector("#carrito-comprado");
//lo declara con let porque los botones se crean después de que se carga el DOM
let botonesEliminar= document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar=document.querySelector(".carrito-acciones-vaciar");
const botonComprar=document.querySelector(".carrito-acciones-comprar");
const total= document.querySelector("#total");

function cargarProductosCarrito() {
    if(productosEnCarrito &&productosEnCarrito.length>0){

        console.log(productosEnCarrito)
        contenedorCarritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorProductos.innerHTML="";
    
        productosEnCarrito.forEach(producto => {
            const div= document.createElement("div");
            div.classList.add("carrito-producto");
            console.log(producto)
            div.innerHTML= `
            
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                                <div class="carrito-producto-titulo">
                                    <small>Titulo</small>
                                    <h3>${producto.titulo}</h3>
                                </div>
    
                                <div class="carrito-producto-cantidad">
                                    <small>Cantidad</small>
                                    <p>${producto.cantidad}</p>
                                </div>
    
                                <div class="carrito-productp-precio">
                                    <small>Precio</small>
                                    <p>$${producto.precio}</p>
                                </div>
    
                                <div class="carrito-producto-subtotal">
                                    <small>Subtotal</small>
                                    <p>$${producto.precio*producto.cantidad}0</p>
                                </div>
    
                                <button class="carrito-producto-eliminar" id=${producto.id}><i class="bi bi-trash"></i></button>`;
    
                                contenedorProductos.append(div);
        });
       
    } else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar=document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton=> {
        boton.addEventListener('click', eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    
    const idBoton= e.currentTarget.id;
    const productoEliminar= productosEnCarrito.find(producto=> producto.id==idBoton);
    if(productoEliminar.cantidad>1){
        productoEliminar.cantidad-=1;
    } else{
        const index= productosEnCarrito.findIndex(producto=> producto.id ==idBoton);
        //para borrar el elemento del array, empezando desde el index y cuántos num
        productosEnCarrito.splice(index,1);
    }
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    Toastify({
        text: "Producto eliminado",
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #7cb3ee, #cfd0d6)",
          borderRadius: "2rem",
          fontSize: ".8rem",
        }, 
        offset: {
            x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
      
}

botonVaciar.addEventListener('click', vaciarCarrito);

function vaciarCarrito(){
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:  "custom-confirm-button",
          cancelButton: "custom-cancel-button"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Estás seguroo?",
        text: "No podrás revertir este paso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, vaciar el carrito",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length=0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "Tu carrito se vació correctamente",
            icon: "success"
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Tu carrito está a salvo",
            icon: "error"
          });
        }
      });
    
}

function actualizarTotal(){
    const tot=productosEnCarrito.reduce((acc,producto)=> acc+(producto.precio * producto.cantidad),0);
    total.innerText= `$${tot}`; 
}

botonComprar.addEventListener('click', comprarCarrito);

function comprarCarrito(){
    productosEnCarrito.length=0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
        contenedorProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
}