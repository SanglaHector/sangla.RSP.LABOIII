import { tratarDatos } from '../js/funciones.js';
function alta(anuncio, data) {
    let propiedades = tratarDatos(data);
    //data= array de objetos
    //propiedades: array de objetos anuncio mascota
    anuncio.Id = generarId(propiedades);
    propiedades.push(anuncio);
    return propiedades;
}
function baja(anuncio, data) {
    let propiedades = tratarDatos(data);
    let indice;
    propiedades.forEach((e, i) => anuncio.Id == e.Id ? indice = i : null);
    propiedades.splice(indice, 1);
    return propiedades;
}
function generarId(data) {
    if (data.length == 0) {
        return 1;
    }
    else {
        let id = data.map((e) => e.id)
            .reduce((a, b) => a >= b ? a : b);
        return parseInt(id) + 1;
    }
}
function modificacion(anuncio, data) {
    let propiedades = baja(anuncio, data);
    propiedades.push(anuncio);
    return propiedades;
}
export { alta, baja, modificacion, generarId };
//# sourceMappingURL=DataAccess.js.map