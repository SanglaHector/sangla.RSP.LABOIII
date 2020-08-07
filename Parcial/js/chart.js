import {traerAnuncios} from './localStorage.js';
import {armarPropiedadDesdeForm} from './funciones.js';
function cargarChart(cantidadAnuncios, arrClicks)
{
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function cargarClicks()
{
    let anuncio = armarPropiedadDesdeForm();
    let anuncios = traerAnuncios();
    anuncios = anuncios.data;
    let cantidad = anuncios.length;
    let clicks = Array();
    let id = 0;
    let element = 0;
    
    if(!localStorage.getItem('listaClick'))
    {
        if(cantidad > 0)
        {
            anuncios.map(()=> clicks.push(0));
            anuncios.map((e)=> e.id == anuncio.id ? id = e.id : 0 );
            clicks.forEach(element => {
                if(element == id-1)
                {
                    element = element + 1;
                }
            });

        }
        localStorage.setItem('listaClick',JSON.stringify(clicks));
    }else
    {
        clicks = JSON.parse(localStorage.getItem('listaClick'));
        if(clicks.length == cantidad)
        {
            let nuevoClick = clicks
            cantidad = clicks.length;
            if(cantidad > 0)
            {
                anuncios.map((e)=> e.id == anuncio.id ? id = e.id : 0 );
                clicks.forEach((e,i) => {
                    if(i == id-1)
                    {
                        element = e + 1;
                        nuevoClick[i] = element;
                    }
                });
            }
            localStorage.setItem('listaClick',JSON.stringify(nuevoClick));
        }
    }
}
export {cargarChart,cargarClicks};