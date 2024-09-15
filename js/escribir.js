export function escribirIntroduccion(poema, contenedor) {
    return new Promise (resolve => {
        const oraciones = poema.length;

        const escribirTodasOraciones = async () => {
            for (let i = 0; i < oraciones; i++) {
                await escribirOracionPromise(poema[i], contenedor);
            }
            resolve();
        };
    
        escribirTodasOraciones();
    });
    
}

function escribirOracionPromise(oracion, contenedor) {
    return new Promise(resolve => {
        let indiceCaracter = 0;
        function escribirCaracter() {
            if (indiceCaracter < oracion.length) {
            contenedor.textContent += oracion.charAt(indiceCaracter);
            indiceCaracter++;
            setTimeout(escribirCaracter, 100);
            } else {
                setTimeout(() => {
                    contenedor.textContent = "";
                    resolve(); // Resuelve la promesa cuando la oración se ha borrado
                }, 3000);
            }
        }
        escribirCaracter();
    });
}

export function escribirPoema(oracion, contenedor) {
    // console.log(oracion.length);
    return new Promise(resolve => {
        let indiceCaracter = 0;
        function escbribirUnCaracter() {
            if(indiceCaracter < oracion.length) {
                contenedor.textContent += oracion.charAt(indiceCaracter);
                indiceCaracter++;
                setTimeout(escbribirUnCaracter,25);
            } else {
                resolve();
            }
        }
        escbribirUnCaracter();
    });
}