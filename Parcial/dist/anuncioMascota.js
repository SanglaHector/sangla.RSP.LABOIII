import { tratarDatos, armarPropiedadDesdeForm, limpiarTablaDinamica, porDefault, spinnerOn, spinnerOff, crearTabla, crearDrop, cargarDrop, eliminarDrop, normalizarTabla } from '../js/funciones.js';
import { formatearParaServer } from '../js/formateo.js';
import { cargarLocalStorage, traerAnuncios, altaAnuncion, bajaAnuncio, modificarAnuncio } from '../js/localStorage.js';
import { filtrarSelectAnimales, calcularProm, filtroDeSelect, traerCheckeados, filtrarDatosChecks } from '../js/DOM.js';
import { Anuncio } from './anuncio.js';
export class AnuncioMascota extends Anuncio {
    constructor(id, titulo, descripcion, animal, precio, raza, fecha, elegir) {
        super(id, titulo, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha = fecha;
        this.elegir = elegir;
    }
    //getter & setters
    get Animal() { return this.animal; }
    ;
    set Animal(e) { this.animal = e; }
    ;
    get Raza() { return this.raza; }
    ;
    set Raza(e) { this.raza = e; }
    ;
    get Fecha() { return this.fecha; }
    ;
    set Fecha(e) { this.fecha = e; }
    ;
    get Elegir() { return this.elegir; }
    ;
    set Elegir(e) { this.elegir = e; }
    ;
    static traerPropiedades() {
        let botones = document.getElementById('botones');
        limpiarTablaDinamica();
        eliminarDrop(botones);
        spinnerOn();
        let datos = traerAnuncios();
        spinnerOff();
        if (datos.message == "Sin datos") {
            window.alert("No hay datos cargados");
        }
        else {
            AnuncioMascota.armarPagina(datos.data);
            porDefault();
        }
    }
    static altaPropiedad() {
        let propiedad = armarPropiedadDesdeForm();
        propiedad = formatearParaServer(propiedad);
        propiedad.id = 0;
        spinnerOn();
        limpiarTablaDinamica();
        let response = altaAnuncion(propiedad);
        spinnerOff();
        if (response.message == "Alta Exitosa") {
            porDefault();
            AnuncioMascota.traerPropiedades();
            return true;
        }
        else {
            return false;
        }
    }
    static eliminarPropiedad() {
        let id = document.getElementById('txtId').value;
        if (id == 0 || id == null) {
            window.alert("No ha seleccionado nada que eliminar");
        }
        else {
            if (confirm("¿Desea eliminar esta publicacion?")) {
                let propiedad = armarPropiedadDesdeForm();
                spinnerOn();
                limpiarTablaDinamica();
                let response = bajaAnuncio(propiedad);
                spinnerOff();
                if (response.message == "Baja Exitosa") {
                    porDefault();
                    AnuncioMascota.traerPropiedades();
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    static modificarPropiedad() {
        let id = document.getElementById('txtId').value;
        if (id == 0 || id == null) {
            window.alert("No ha seleccionado nada que modificar");
        }
        else {
            if (confirm("¿Desea guardar cambios?")) {
                let propiedad = armarPropiedadDesdeForm();
                propiedad = formatearParaServer(propiedad);
                spinnerOn();
                limpiarTablaDinamica();
                let response = modificarAnuncio(propiedad);
                spinnerOff();
                if (response.message == "Modificacion Exitosa") {
                    porDefault();
                    AnuncioMascota.traerPropiedades();
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    static reCalcularPromedio() {
        let filas = filtrarSelectAnimales();
        calcularProm(filas);
        filtroDeSelect(filas);
        this.reArmarTabla();
    }
    static reArmarTabla() {
        normalizarTabla();
        let arrCheck = traerCheckeados();
        filtrarDatosChecks(arrCheck);
        cargarLocalStorage(arrCheck);
    }
    static armarPagina(datos) {
        if (datos != null) {
            let propiedades = tratarDatos(datos);
            let arr = Array.from(propiedades);
            let tabla = crearTabla(arr);
            crearDrop();
            let div = document.getElementById('paraTabla');
            cargarDrop(arr[0]);
            div.appendChild(tabla);
            this.reCalcularPromedio();
        }
    }
}
//# sourceMappingURL=anuncioMascota.js.map