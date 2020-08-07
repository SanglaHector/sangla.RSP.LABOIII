export class Anuncio
{
    protected id:any;
    protected titulo:string;
    protected descripcion:string;
    protected precio:number;
    
    constructor(id:any,titulo:string,descripcion:string,precio:number)
    {
        this.id  = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    // Setters & Getters
    get Id():any{return this.id;};
    set Id(e:any){this.id = e};

    get Titulo():string{return this.titulo;}
    set Titulo(e:string){this.titulo = e};

    get Descripcion():string{return this.descripcion;}
    set Descricion(e:string){this.descripcion = e};
    
    get Precio():number{return this.precio;}
    set Precio(e:number){this.precio = e};
}