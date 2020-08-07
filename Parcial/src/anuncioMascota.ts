import {tratarDatos,armarPropiedadDesdeForm,limpiarTablaDinamica,
    porDefault,spinnerOn,spinnerOff,crearTabla,
    crearDrop,cargarDrop,eliminarDrop,normalizarTabla} from '../js/funciones.js';
import {formatearParaServer} from '../js/formateo.js';
import {cargarLocalStorage,traerAnuncios,altaAnuncion,bajaAnuncio,modificarAnuncio} from '../js/localStorage.js';
import {filtrarSelectAnimales,calcularProm,filtroDeSelect,
traerCheckeados,filtrarDatosChecks} from '../js/DOM.js';
import {Data} from './Data.js';
import { Anuncio } from './anuncio.js';
export class AnuncioMascota extends Anuncio
{
    protected animal:string;
    protected raza:string;
    protected fecha:string;
    protected elegir:string;
    
    constructor(id:any,titulo:string,descripcion:string,animal:string,precio:number,raza:string,
        fecha:string,elegir:string)
    {
        super(id,titulo,descripcion,precio);
        this.animal =  animal;
        this.raza = raza;
        this.fecha = fecha;
        this.elegir = elegir;
    }
    //getter & setters
    get Animal():string {return this.animal};
    set Animal(e:string){this.animal = e};

    get Raza():string {return this.raza};
    set Raza(e:string){this.raza = e};

    get Fecha():string {return this.fecha};
    set Fecha(e:string){this.fecha = e};

    get Elegir():string {return this.elegir};
    set Elegir(e:string){this.elegir = e};

    static traerPropiedades():any
    {
        let botones:any = document.getElementById('botones');
        limpiarTablaDinamica();
        eliminarDrop(botones);
        spinnerOn();
        let datos:Data =traerAnuncios();
        spinnerOff();
        if(datos.message == "Sin datos")
        {
            window.alert("No hay datos cargados");
        }else{
            AnuncioMascota.armarPagina(datos.data);
            porDefault();
        }
    }
    static altaPropiedad():boolean
    {
        let propiedad:AnuncioMascota = armarPropiedadDesdeForm();
        propiedad = formatearParaServer(propiedad);
        propiedad.id = 0;
        
        spinnerOn();
        limpiarTablaDinamica();
        let response:Data = altaAnuncion(propiedad);

        spinnerOff();
        if(response.message == "Alta Exitosa")
        {
            porDefault();
            AnuncioMascota.traerPropiedades();
            return true;
        }else
        {
            return false;
        }
    }
    static eliminarPropiedad():boolean
    {
        let id:any = (document.getElementById('txtId') as HTMLInputElement).value;
        if(id == 0 || id == null)
        {
            window.alert("No ha seleccionado nada que eliminar");
        }else
        {
            if(confirm("¿Desea eliminar esta publicacion?"))
            {
                let propiedad:AnuncioMascota = armarPropiedadDesdeForm();
                spinnerOn();
                limpiarTablaDinamica();
                let response:Data = bajaAnuncio(propiedad);
            
                spinnerOff();
                if(response.message == "Baja Exitosa")
                {
                    porDefault();
                    AnuncioMascota.traerPropiedades();
                    return true;
                }else
                {
                    return false;
                }
            }
        }
    }
    
    static modificarPropiedad():boolean
    {
        let id:any = (document.getElementById('txtId') as HTMLInputElement).value;
        if(id == 0 || id == null)
        {
            window.alert("No ha seleccionado nada que modificar");
        }else{
            if(confirm("¿Desea guardar cambios?"))
            {
                let propiedad:AnuncioMascota = armarPropiedadDesdeForm();
                propiedad = formatearParaServer(propiedad);
                spinnerOn();
                limpiarTablaDinamica();
        
                let response:Data = modificarAnuncio(propiedad);
                
                spinnerOff();
                if(response.message == "Modificacion Exitosa")
                {
                    porDefault();
                    AnuncioMascota.traerPropiedades();
                    return true;
                }else
                {
                    return false;
                }
            }
        }
    }
    static reCalcularPromedio():any
    {
        let filas:AnuncioMascota[] = filtrarSelectAnimales();
        calcularProm(filas);
        filtroDeSelect(filas);
        this.reArmarTabla();
    }
    static reArmarTabla():any
    {
        normalizarTabla();
        let arrCheck:any[] = traerCheckeados();
        filtrarDatosChecks(arrCheck);
        cargarLocalStorage(arrCheck);
    }
    static armarPagina(datos:any[]):any
    {
        if(datos != null)
        {
            let propiedades:AnuncioMascota[] =  tratarDatos(datos);
            let arr = Array.from(propiedades);
            let tabla:any = crearTabla(arr);
            crearDrop();
            let div:any = document.getElementById('paraTabla');
            cargarDrop(arr[0]);
            div.appendChild(tabla);
            this.reCalcularPromedio();
        }
    }
}