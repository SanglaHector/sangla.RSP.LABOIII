//import {AnuncioMascota}  from './anuncioMascota.js';
import {AnuncioMascota}  from '../dist/anuncioMascota.js';
import {porDefault} from './funciones.js';
import { inicializarManejadores } from './localStorage.js';

let botonTraer = document.getElementById("btnBuscar");
let botonEliminar = document.getElementById("btnEliminar");
let botonModificar = document.getElementById("btnModificar");
let botonLimpiar = document.getElementById("btnLimpiar");
let form = document.forms[0];
let select = document.getElementById('selectAnimal');
let checks = document.getElementById('checks');

botonTraer.addEventListener('click',AnuncioMascota.traerPropiedades);
botonEliminar.addEventListener('click',AnuncioMascota.eliminarPropiedad);
botonModificar.addEventListener('click',AnuncioMascota.modificarPropiedad);
botonLimpiar.addEventListener('click',porDefault);

form.onsubmit = (e)=>{
    e.preventDefault();
    AnuncioMascota.altaPropiedad();
};
select.onchange = (e)=>
{
    e.preventDefault();
    AnuncioMascota.reCalcularPromedio();
}
checks.onclick = (e)=>
{
    AnuncioMascota.reArmarTabla();
}
window.addEventListener('load',inicializarManejadores);
