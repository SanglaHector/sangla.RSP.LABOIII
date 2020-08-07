import {AnuncioMascota} from '../dist/anuncioMascota.js';
export class Data{
    public message:string;
    public data:AnuncioMascota[];

    constructor(message,data)
    {
        this.message =  message;
        this.data = data;
    }
    armarData(data:any)
    {
        return data.map((e:any)=> new AnuncioMascota(e.id,e.titulo,e.descripcion,e.animal,e.precio,e.raza,e.fecha,e.elegir));
    }
}