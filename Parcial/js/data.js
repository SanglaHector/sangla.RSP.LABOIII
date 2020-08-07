import {AnuncioMascota} from './anuncioMascota.js';
export class Data{
    message;
    data;

    constructor(message,data)
    {
        this.message =  message;
        this.data = data;
    }
    armarData(data)
    {
        return data.map((e)=> new AnuncioMascota(e.id,e.titulo,e.descripcion,e.animal,e.precio,e.raza,e.fecha,e.elegir));
    }
}