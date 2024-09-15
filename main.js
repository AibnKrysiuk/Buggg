import { imagenes } from "./js/imagenes.js";
import { escribirIntroduccion } from "./js/escribir.js";
import { introduccion, poemas } from "./js/escritos.js";
import { Carta } from "./js/carta.js";
import { sonidos } from "./js/sonidos.js";


const anchoVentana = window.innerWidth;
const ventana1 = document.querySelector('.cardsContainer');
const contenedor = document.querySelector(".container");
const titleCont = document.querySelector('.titleContainer');
const titulo = document.querySelector('.texto');
const footer = document.querySelector('.footer');

const ventana2 = document.querySelector('.cardPressed');
const parrafo = document.querySelector('.parrafo');


let sonido = null;


function colocar_cartas( numCartas) {
    for(let i = 0; i < numCartas; i++) {
        contenedor.innerHTML += `<div class="carta" data-carta="carta1"></div>`;
    }
}

function cant_cartas(anchoVentana){

    if(anchoVentana <= 780) {
        colocar_cartas(1);
        const cartas = document.querySelectorAll(".carta");

        return cartas;
    } else if (anchoVentana > 780 && anchoVentana <= 1200) {
        colocar_cartas(2);
        const cartas = document.querySelectorAll(".carta");

        return cartas;
    } else {
        colocar_cartas(3);
        const cartas = document.querySelectorAll(".carta");

        return cartas;
    }

}

let indiceInicial = 0;

function mostrar_imagen(cant, cartas, desplazamiento){
    indiceInicial += desplazamiento * cant ;

    //aseguramos que el indice este siempre dentro del rango 
    if(indiceInicial < 0) {
        indiceInicial = Math.floor(imagenes.length / cant) * cant;
    } else if (indiceInicial >= imagenes.length) {
        indiceInicial = 0;
    }

    for(let i = 0; i < cant; i++) {
        const indiceImg = (indiceInicial + i) % imagenes.length;
        cartas[i].innerHTML = `<img src="${imagenes[indiceImg]}" class="imagen" alt="">`;

        const img = cartas[i].querySelector('img'); // Utilizamos 'img' para mayor claridad

        // Agregamos los event listeners de manera eficiente en un solo bucle:
        img.addEventListener('mouseover', (event) => {
            handleMouseOver(event, cant);
        });
        img.addEventListener('mouseout', (event) => {
            handleMouseOut(event, cant);
        });

        // let gif = cartas[i].querySelector('img');
        // gif.addEventListener('mouseover', () => {
        //     console.log('Paso por la carta.');
        //     document.body.style.backgroundImage = `url(${gif.src})`;
        //     sonido = null;
        //     reproducirSonido();
        // });
    
        // gif.addEventListener('mouseout', () => {
        //     console.log('Salgo de la carta.');
        //     document.body.style.backgroundImage = 'none';
        //     if(sonido !== null) {
        //         sonido.pause();
        //         sonido = null;
        //     }
        // });
    }
    
}


function handleMouseOver(event,cant) {
    const imagenActual = event.currentTarget; // Obtenemos la imagen actual

    // Establecemos la imagen de fondo y reproducimos el sonido (igual que antes)
    document.body.style.backgroundImage = `url(${imagenActual.src})`;
    sonido = null;
    reproducirSonido();

    // Reducimos la opacidad de las otras imágenes:
    for (let i = 0; i < cant; i++) {
        if (cartas[i] !== imagenActual.parentElement) { // Evitamos afectar al elemento padre
        cartas[i].querySelector('img').style.opacity = 0.2; // Ajusta la opacidad según sea necesario
        }
    }
}

function handleMouseOut(event,cant) {
    const imagenActual = event.currentTarget; // Obtenemos la imagen actual

    // Restablecemos la imagen de fondo y detenemos el sonido si es necesario (igual que antes)
    document.body.style.backgroundImage = 'none';
    if (sonido !== null) {
        sonido.pause();
        sonido = null;
    }

    // Restauramos la opacidad de las otras imágenes:
    for (let i = 0; i < cant; i++) {
        if (cartas[i] !== imagenActual.parentElement) {
        cartas[i].querySelector('img').style.opacity = 1; // Restablecemos la opacidad
        }
    }
}



const cartas = cant_cartas(anchoVentana);

mostrar_imagen(cartas.length, cartas, 0);


let carta;

cartas.forEach((card) => {

    card.addEventListener('click', () => {
        footer.style.display = "none";
        titleCont.style.display = "none";
        ventana1.style.display = "none";
        ventana2.style.display = "flex";
        ventana2.innerHTML = "";
        if(sonido !== null){
            sonido.pause();
            sonido = null;
        }

        let gif = card.querySelector('img');
        gif.style.opacity = 0.5;

        console.log(gif.src);
        let nroDePoema = imagenes.indexOf(gif.src);
        let cartaEnVista = new Carta(poemas[nroDePoema],gif.src,ventana2);
        carta = cartaEnVista;
        // cartaEnVista.closeBtn();
        cartaEnVista.mostrarImg();
        cartaEnVista.mostrarPoema();
        cartaEnVista.closeBtn(handleButtonClick);
        
    });
});


// Introduccion a la pagina
const escribir = async () => {
    await escribirIntroduccion(introduccion, titulo);
    setTimeout(escribir, 1000); // Ajusta el intervalo
};

escribir();
console.log('cantidad de poemas = ', poemas.length);
console.log('cantidad de imagenes = ', imagenes.length);
console.log(sonidos[obtenerNumeroAleatorio()]);

function handleButtonClick() {
    document.body.style.backgroundImage = 'none';
    footer.style.display = "flex";
    titleCont.style.display = "flex";
    ventana1.style.display = "flex";
    ventana2.style.display = "none";
    ventana2.innerHTML = "";
    carta.borrarPoema();
    carta = null;
    // You can perform any actions you want here, like closing the carta
}

ventana1.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) {
        // La rueda se desplaza hacia arriba
        mostrar_imagen(cartas.length, cartas, -1);
    } else if (event.deltaY > 0) {
        // La rueda se desplaza hacia abajo
        mostrar_imagen(cartas.length, cartas, 1);
    }

}, { passive: true });

// Selecciona el documento completo para escuchar los eventos táctiles
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let startY;

function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 3);
}

function reproducirSonido(){
    sonido = null;
    sonido = new Audio(sonidos[obtenerNumeroAleatorio()]);
    sonido.play();
    setTimeout(() => {
        if(sonido !== null){
            sonido.pause();
            sonido = null;
        }
    }, 1000);
}

function handleTouchStart(event) {
    // Obtiene la posición inicial del toque
    startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!startY) {
        return;
    }

    let currentY = event.touches[0].clientY;

    // Calcula la distancia recorrida
    let distance = currentY - startY;

    // Puedes ajustar este umbral según tus necesidades
    if (distance > 3) {
        // Aquí puedes ejecutar acciones cuando se desliza hacia abajo
        mostrar_imagen(cartas.length, cartas, -1);
        sonido = null;
        sonido = new Audio(sonidos[obtenerNumeroAleatorio()]);
        sonido.play();
        setTimeout(() => {
            sonido.pause();
            sonido = null;
        }, 1000);
    }

    if (distance < 3) {
        // Aquí puedes ejecutar acciones cuando se desliza hacia abajo
        mostrar_imagen(cartas.length, cartas, 1);
        sonido = new Audio(sonidos[obtenerNumeroAleatorio()]);
        sonido.play();
        setTimeout(() => {
            sonido.pause();
            sonido = null;
        }, 1000);
    }

    // Reinicia la posición inicial
    startY = null;
}