const openMenu=document.querySelector("#open-menu");
const closeMenu=document.querySelector("#close-menu");
const aside=document.querySelector("aside");

openMenu.addEventListener('click', ()=> {
    aside.classList.add("aside-visible");
});

closeMenu.addEventListener('click', ()=> {
    aside.classList.remove("aside-visible");
});

// para que cuando hagamos click en un boton del aside, este se esconda
botonesCategorias.forEach(boton => {
    boton.addEventListener('click', ()=>{
        aside.classList.remove("aside-visible");
    })    
});