import {traerCheckeados,tildarChecks, tratarDatos} from './funciones.js';
//import {/*alta,baja,modificacion,*/cargarSelectAnimales/*,generarId*/} from './DOM.js';
import {cargarSelectAnimales} from './DOM.js';
import {alta,baja,modificacion,generarId} from '../dist/DataAccess.js';
import {Data} from './data.js';
import {cargarChart} from './chart.js';
function inicializarManejadores()
{
    cargarChart()
    cargarSelectAnimales();
    let checks = traerCheckeados();
    let objChecks = {
        ID:false,
        TRANSACCION:false,
        TITULO:false,
        DESCRIPCION:false,
        PRECIO:false,
        ANIMAL:false,
        RAZA:false,
        FECHA:false,
        ELEGIR:false
    };
    for (const key in objChecks) {
        if (objChecks.hasOwnProperty(key)) {
            const element = objChecks[key];
            checks.forEach(elementCh => {
                if(key == elementCh)
                {
                    objChecks[key] = true;
                }
            });
        }
    }
    
    if(!localStorage.getItem('listaCheck'))
    {
        localStorage.setItem('listaCheck',JSON.stringify(objChecks));
    }else
    {
        objChecks = JSON.parse(localStorage.getItem('listaCheck'));
        tildarChecks(objChecks);
    }
}
function cargarLocalStorage(checks)
{
    let objChecks = {
        ID:false,
        TRANSACCION:false,
        TITULO:false,
        DESCRIPCION:false,
        PRECIO:false,
        ANIMAL:false,
        RAZA:false,
        FECHA:false,
        ELEGIR:false
    };
    for (const key in objChecks) {
        if (objChecks.hasOwnProperty(key)) {
            const element = objChecks[key];
            checks.forEach(elementCh => {
                if(key == elementCh)
                {
                    objChecks[key] = true;
                }
            });
        }
    }
    localStorage.setItem('listaCheck',JSON.stringify(objChecks));
}
function traerAnuncios()
{
    try{    
        if(!localStorage.getItem('listaMascotas'))
        {
            let arr = Array();
            return new Data("Sin datos",arr);
        }else
        {
            let arr = JSON.parse(localStorage.getItem('listaMascotas'));
            if(arr.length == 0)
            {
                return new Data("Sin datos",arr);
            }
            return new Data("Enviando datos",arr);
        }
    }
    catch(e)
    {
        console.log(e);
    }
}
function altaAnuncion(anuncio)
{
    try{  
        if(!localStorage.getItem('listaMascotas'))
        {
            let data = Array(anuncio);
            anuncio.id = generarId(data);
            data = Array(anuncio);
            localStorage.setItem('listaMascotas',JSON.stringify(data));
            return new Data("Alta Exitosa",data);

        }else
        {
            let arr = JSON.parse(localStorage.getItem('listaMascotas'));
            let nuevoArr = alta(anuncio,arr);
            localStorage.setItem('listaMascotas', JSON.stringify(nuevoArr));
            return new Data("Alta Exitosa",nuevoArr);
        }
    }catch(e)
    {
        console.log(e);
        return new Data("Algo salio mal", new Array());
    }
}
function bajaAnuncio(anuncio)
{
    try{  
        if(!localStorage.getItem('listaMascotas'))
        {
            let arr = Array();
            return new Data("Sin datos",arr);
        }else
        {
            let arr = JSON.parse(localStorage.getItem('listaMascotas'));
            let nuevoArr = baja(anuncio,arr);
            localStorage.setItem('listaMascotas', JSON.stringify(nuevoArr));
           return new Data("Baja Exitosa",nuevoArr);
        }
    }catch(e)
    {
        console.log(e);
        return new Data("Algo salio mal", new Array());
    }
}
function modificarAnuncio(anuncio)
{
    try{  
        if(!localStorage.getItem('listaMascotas'))
        {
            let arr = Array();
            return new Data("Sin datos",arr);
        }else
        {
            let arr = JSON.parse(localStorage.getItem('listaMascotas'));
            let nuevoArr = modificacion(anuncio,arr);
            localStorage.setItem('listaMascotas', JSON.stringify(nuevoArr));
           return new Data("Modificacion Exitosa",nuevoArr);
        }
    }catch(e)
    {
        console.log(e);
        return new Data("Algo salio mal", new Array());
    }
}
export {inicializarManejadores,cargarLocalStorage,traerAnuncios,altaAnuncion,bajaAnuncio,modificarAnuncio}