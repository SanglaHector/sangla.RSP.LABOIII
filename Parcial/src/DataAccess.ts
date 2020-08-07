import{tratarDatos} from '../js/funciones.js';
import {AnuncioMascota} from './anuncioMascota.js';
function alta(anuncio:AnuncioMascota,data:any[]):AnuncioMascota[]
{
    let propiedades:AnuncioMascota[] = tratarDatos(data);
    //data= array de objetos
    //propiedades: array de objetos anuncio mascota

    anuncio.Id = generarId(propiedades);
    propiedades.push(anuncio);
    return propiedades;
}
function baja(anuncio:AnuncioMascota,data:any[]):AnuncioMascota[]
{
    let propiedades:AnuncioMascota[] = tratarDatos(data);
    let indice;
    propiedades.forEach((e:AnuncioMascota,i:number)=> anuncio.Id == e.Id ? indice = i : null);
    propiedades.splice( indice, 1 );
    return propiedades;
}
function generarId(data:any):number
{
    if(data.length == 0)
    {
        return 1;
    }else{
        let id:any = data.map((e:any)=>e.id)
                .reduce((a:any,b:any) => a>=b ?a:b);
        return parseInt(id) + 1;
    }
}
function modificacion(anuncio:AnuncioMascota,data:any[]):AnuncioMascota[]
{
    let propiedades:AnuncioMascota[] = baja(anuncio,data);
    propiedades.push(anuncio);
    return propiedades;
}
export {alta,baja,modificacion,generarId};