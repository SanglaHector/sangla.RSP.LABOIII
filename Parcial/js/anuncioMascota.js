import {Anuncio}  from './anuncio.js'
import {tratarDatos,armarPropiedadDesdeForm,limpiarTablaDinamica,
        porDefault,spinnerOn,spinnerOff,crearTabla,
        crearDrop,cargarDrop,eliminarDrop,normalizarTabla} from './funciones.js';
import {formatearParaServer} from './formateo.js';
import {cargarLocalStorage,traerAnuncios,altaAnuncion,bajaAnuncio,modificarAnuncio} from './localStorage.js';
import {filtrarSelectAnimales,calcularProm,filtroDeSelect,
    traerCheckeados,filtrarDatosChecks} from './DOM.js';
export class AnuncioMascota extends Anuncio
{
    id;
    titulo;
    descripcion;
    animal;
    precio;
    raza;
    fecha;
    elegir;
    
    constructor(id,titulo,descripcion,animal,precio,raza,fecha,elegir)
    {
        super(id,titulo,descripcion,precio);
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.animal =  animal;
        this.precio = precio;
        this.raza = raza;
        this.fecha = fecha;
        this.elegir = elegir;
    }
    
    static traerPropiedades()
    {
        //  const traer = 'http://localhost:3000/traer';
        let botones = document.getElementById('botones');
        limpiarTablaDinamica();
        eliminarDrop(botones);
        spinnerOn();
     //   let datos = await getXML(traer);
        let datos = traerAnuncios();
        spinnerOff();
        if(datos.message == "Sin datos")
        {
            window.alert("No hay datos cargados");
        }else{
            AnuncioMascota.armarPagina(datos.data);
            porDefault();
        }
    }
    static altaPropiedad()
    {
        const alta = 'http://localhost:3000/alta';
        let propiedad = armarPropiedadDesdeForm();
        propiedad = formatearParaServer(propiedad);
        propiedad.id = 0;
        
        spinnerOn();
        limpiarTablaDinamica();
        let response = altaAnuncion(propiedad);
      //  let response = await altaXML(alta,propiedad);

        spinnerOff();
        if(response.message == "Alta Exitosa")
        {
            AnuncioMascota.traerPropiedades();
            return true;
        }else
        {
            return false;
        }
    }
    static eliminarPropiedad()
    {
       // const bajaU = 'http://localhost:3000/baja';
        if(document.getElementById('txtId').value == 0)
        {
            window.alert("No ha seleccionado nada que eliminar");
        }else
        {
            if(confirm("¿Desea eliminar esta publicacion?"))
            {
                let propiedad = armarPropiedadDesdeForm();
                spinnerOn();
                limpiarTablaDinamica();
                //let response = await baja(bajaU,propiedad);
                let response = bajaAnuncio(propiedad);
            
                spinnerOff();
                if(response.message == "Baja Exitosa")
                {
                    AnuncioMascota.traerPropiedades();
                    return true;
                }else
                {
                    return false;
                }
            }
        }
    }
    
    static modificarPropiedad()
    {
      //  const modif = 'http://localhost:3000/modificar';
        if(document.getElementById('txtId').value == 0)
        {
            window.alert("No ha seleccionado nada que modificar");
        }else{
            if(confirm("¿Desea guardar cambios?"))
            {
                let propiedad = armarPropiedadDesdeForm();
                propiedad = formatearParaServer(propiedad);
                spinnerOn();
                limpiarTablaDinamica();
        
             //   let response = await modificarXML(modif,propiedad);
                let response =  modificarAnuncio(propiedad);
                
                spinnerOff();
                if(response.message == "Modificacion Exitosa")
                {
                    AnuncioMascota.traerPropiedades();
                    return true;
                }else
                {
                    return false;
                }
            }
        }
    }
    static reCalcularPromedio()
    {
        let filas = filtrarSelectAnimales();
        calcularProm(filas);
        filtroDeSelect(filas);
        this.reArmarTabla();
    }
    static reArmarTabla()
    {
        normalizarTabla();
        let arrCheck = traerCheckeados();
        filtrarDatosChecks(arrCheck);
        cargarLocalStorage(arrCheck);
    }
    static armarPagina(datos)
    {
        if(datos != null)
        {
            let propiedades =  tratarDatos(datos);
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