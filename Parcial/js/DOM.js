import{verSelect, normalizarTabla,esconder,tratarDatos} from './funciones.js';
import{precioDeForm,precioDeServer} from './formateo.js';
import {eAnimales} from  '../dist/Eanimales.js';
//**********Traer  *****************************/
function traerFilas()
{
    let tr = document.getElementsByTagName('tr');
    let trArray = Array.from(tr);
    trArray.shift();
    return trArray;
}
function retornarCeldas(fila)//paso una fila y retorno sus celdas
{
    return Array.from(fila.childNodes);
}
/*************Filtrar ***********************/
function filtrarSelectAnimales()
{
    let filtro = verSelect('selectAnimal').textContent.toLocaleUpperCase();
    let retorno;
    if(filtro == "AMBOS")
    {
        retorno =  traerFilas();
    }else{
        retorno =  filtrarFilas(filtro,"name","CELDAANIMAL");
    }
    return retorno;
}

/********** Universal ********************/
/**
 esta funcion retorna las filas segun el filtro en una de sus celdas. 
 */
function filtrarFilas(filtro,atributo,valorAtributo)//atributo name y valor de atributo seria el nombre del atributo que le puse a cada fila
{   
    return traerFilas().filter((e)=> aplicarFiltro(atributo,valorAtributo,filtro,retornarCeldas(e)));
}
function aplicarFiltro(atributo,valorAtributo, filtro,celdas)
{
    let encontro = 0;
    celdas.forEach(
        element =>(element.getAttribute(atributo) == valorAtributo && filtro == element.textContent) ? encontro ++ : encontro + 0
    );
    return (encontro != 0)
}
function esconderFilas(filas)
{
    filas.map((e)=>e.hidden = true);
}
function mostrarFilas(filas)
{
    filas.map((e)=>e.hidden = false);
}
function cargarSelectAnimales()
{
    let select = document.getElementById('selectAnimal');
    let opciones = Array();
    for (const key in eAnimales) {
        if (eAnimales.hasOwnProperty(key)) {
            const element = eAnimales[key];
            (isNaN(parseInt(element)) ? opciones.push(element): false);
        }
    }
    opciones.map((e)=>{
        let op = document.createElement('option');
        let texto =  document.createTextNode(e);
        op.value = e;
        op.selected = true;
        op.appendChild(texto);
        select.appendChild(op);
    });
}
/*****Promedio **************************************************/
//Calcula el promedio de las de precio de las filas que le pase por el parametro fila
function calcularProm(filas)
{
    let promedio = document.getElementById('promedio');
    let max =  document.getElementById('precioMaximo');
    let min =  document.getElementById('precioMinimo');
    if(filas.length != 0 )
    {
        let celdas = traerColumna(filas,'name','CELDAPRECIO').map((e)=>parseInt(precioDeServer(e.textContent)));
        let precioFinal = celdas.reduce((a,b)=>  a + b) / celdas.length;
        let precioMaximo = celdas.reduce((a,b)=> a>=b ? a : b);
        let precioMinimo = celdas.reduce((a,b)=> a>=b ? b : a);
        promedio.value = precioDeForm(precioFinal);
        max.value = precioDeForm(precioMaximo);
        min.value = precioDeForm(precioMinimo);
    }
    else{
        promedio.value = precioDeForm(0);
        max.value = precioDeForm(0);
        min.value = precioDeForm(0);
    }
    porcentajeVacunados(filas);
}
function porcentajeVacunados(filas)
{
    let vacunados =  document.getElementById('porcentajeVacunado');
    if(filas.length != 0 )
    {
        let celdas = traerColumna(filas,'name','CELDAELEGIR').map((e)=>e.textContent);
        let cantidadVacunados = celdas.filter((e)=> e=="Si" );
        cantidadVacunados = cantidadVacunados.length * (100 / celdas.length);
        vacunados.value = parseFloat(cantidadVacunados).toFixed(2)+"%"
    }else{
        vacunados.value = parseFloat(0).toFixed(0)+"%";
    }
}
function filtroDeSelect(filas)
{
    normalizarTabla();
    esconderFilas(traerFilas());
    mostrarFilas(filas);
}
/****************************************************************************** */
//esta funcion retorna una columna especifica  de las filas que le mande
function traerColumna(filas,atributo,valorAtributo)
{
    let aux = filas.map((e)=> e.childNodes);//arreglar
    let celdas = Array();
    aux.filter((e)=> 
    {
        e.forEach(element => {
            element.getAttribute(atributo) == valorAtributo ? celdas.push(element) : 0;
        });
    });
    return celdas;
}
//*****Checks */
function traerCheckeados()
{
    let checks = $('input[name=check]');
    let arr = Array();
    checks.each((index,option)=> option.checked == true ? arr.push(option.value) : 0);
    return arr;
}
function filtrarDatosChecks(arr)//Escondo todo y luego muestro lo que viene en arr
{
    esconder();
    let celdas = Array();
    arr.map((e)=> celdas.push(document.getElementsByName("CELDA" + e)));
    celdas.map((e)=> 
    {
        e.forEach(element => {
         element.hidden =  false; 
        });
    });
}
//*********************ABM */
/*function alta(anuncio,data)
{
    let propiedades = tratarDatos(data);
    //data= array de objetos
    //propiedades: array de objetos anuncio mascota

    anuncio.id = generarId(propiedades);
    propiedades.push(anuncio);
    return propiedades;
}
function baja(anuncio,data)
{
    let propiedades = tratarDatos(data);
    let indice;
    propiedades.forEach((e,i)=> anuncio.id == e.id ? indice = i : null);
    propiedades.splice( indice, 1 );
    return propiedades;
}
function generarId(data)
{
    if(data.length == 0)
    {
        return 1;
    }else{
        let id = data.map((e)=>e.id)
                .reduce((a,b) => a>=b ?a:b);
        return parseInt(id) + 1;
    }
}
function modificacion(anuncio,data)
{
    let propiedades = baja(anuncio,data);
    propiedades.push(anuncio);
    return propiedades;
}*/
export{filtrarSelectAnimales,calcularProm,filtroDeSelect,
    traerCheckeados,filtrarDatosChecks
    /*,alta,baja,modificacion,generarId*/
,cargarSelectAnimales};