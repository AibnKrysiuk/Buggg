import { escribirPoema } from "./escribir.js";

export class Carta {
    constructor (poema,img,contenedor) {
        this.poema = poema;
        this.imgSrc = img;
        this.contenedor = contenedor;
        this.cantOraciones = poema.length;
        this.intervalo = null;
        this.indiceDeOraciones = 0;
    }

    mostrarImg(){
        const imagen = document.createElement('img');
        imagen.src = this.imgSrc;
        imagen.classList.add('imgSelected');
        
        this.contenedor.appendChild(imagen);
    }

    mostrarPoema(){
        const hoja = document.createElement('div');
        hoja.classList.add('poema');
        this.intervalo = setInterval(() => {
            
            //Si es un renglon vacio agrego un br y si no un parrafo
            if(this.poema[this.indiceDeOraciones] === " ") {
                const contenedor = document.createElement('br');
                hoja.appendChild(contenedor);
            } else {
                const contenedor = document.createElement('p');
                hoja.appendChild(contenedor);
                //llamo a escribir la oracion en el parrafo creado.
                escribirPoema(this.poema[this.indiceDeOraciones], contenedor);
            }
            this.contenedor.appendChild(hoja);
            
            //cambio a la siguiente oracion
            this.indiceDeOraciones++;
            //console.log(this.indiceDeOraciones);

            //si ya no tengo oraciones dejo de escribir.
            if(this.indiceDeOraciones === this.cantOraciones) {
                clearInterval(this.intervalo);
                console.log('Se termino de escribir el poema');
                this.intervalo = null;
            }
        }, 500);
    }

    borrarPoema() {
        clearInterval(this.intervalo);
        console.log('Se termino de escribir el poema');
        this.intervalo = null;
    }

    closeBtn(callback){
        //creo el boton
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('btn-cerrar');

        //creo el icono
        const icono = document.createElement('i');
        icono.classList.add('fa-solid', 'fa-rotate-left');
        icono.style.color = 'whitesmoke';

        //agrego el icono al boton
        closeBtn.appendChild(icono);

        //agrego un addEventListener
        closeBtn.addEventListener('click', callback);

        //agrego el boton a la ventana
        this.contenedor.appendChild(closeBtn);
    }
}