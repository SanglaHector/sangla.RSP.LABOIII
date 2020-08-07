export class Anuncio {
    constructor(id, titulo, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    // Setters & Getters
    get Id() { return this.id; }
    ;
    set Id(e) { this.id = e; }
    ;
    get Titulo() { return this.titulo; }
    set Titulo(e) { this.titulo = e; }
    ;
    get Descripcion() { return this.descripcion; }
    set Descricion(e) { this.descripcion = e; }
    ;
    get Precio() { return this.precio; }
    set Precio(e) { this.precio = e; }
    ;
}
//# sourceMappingURL=anuncio.js.map