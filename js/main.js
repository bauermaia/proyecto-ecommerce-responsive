
let productos= [];

fetch("./js/productos.json")
.then(response=> response.json())
.then (data=>{
    productos=data;
    cargarProductos(productos);
});

const contenedorProductos=document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar=document.querySelectorAll(".producto-agregar"); 
const num=document.querySelector("#numerito");

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML='';
    productosElegidos.forEach(producto=> {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= ` <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">${producto.titulo}</h3>
                            <p class="producto-precio">$${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>`;

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();

};

botonesCategorias.forEach(boton=>{
    boton.addEventListener('click',(e)=>{
        botonesCategorias.forEach(boton=> boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if(e.currentTarget.id != "todos"){
        const productoCategoria= productos.find(producto=> producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText=productoCategoria.categoria.nombre;
        console.log(productoCategoria.categoria.nombre);
    const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
    cargarProductos(productosBoton);
    } else {
        tituloPrincipal.innerText= "Todos los productos";
        cargarProductos(productos);
    }
    });
});


function actualizarBotonesAgregar(){
    botonesAgregar=document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton=>{
        boton.addEventListener('click',agregarAlCarrito);
    });
};

//recupera lo que ya hay en el ls
let productosEnCarrito;

let productosEnCarritoLS= localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS){
    productosEnCarrito=JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}
 
function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado al carrito",
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

    const idBoton = e.currentTarget.id;
    const productoAgregado= productos.find(producto=> producto.id ==idBoton);

    // se fija si el producto ya está en el array
    if(productosEnCarrito.some(producto=> producto.id=== idBoton)){
        //buscamos el index del producto en el array para aumentar la propiedad cantidad
        const index= productosEnCarrito.findIndex(producto=> producto.id==idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        // se agrega la propeidad cantidad a los productos
        productoAgregado.cantidad=1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    //guardar array en localstorage para llamarlo desde el carrito

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

//para el numero en el carrito, no se puede hacer array.length porque cuando se tocan dos productos iguales no lo cuenta
function actualizarNumerito(){
    let numerito = productosEnCarrito.reduce((acc, producto)=> acc+producto.cantidad, 0);
    num.innerText= numerito;
}



