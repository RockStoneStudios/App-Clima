const api =  {
    key: "491c5033d142d65bb5ea870504e97dfe",
    base: "http://api.openweathermap.org/data/2.5/"

}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress',setQuery);


function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
     let city= document.querySelector('.location .city');
     city.innerText = `${weather.name} , ${weather.sys.country}`;
     let now = new Date();
     let date = document.querySelector('.location .date');
     date.innerText = dateBuilder(now);
     let temp = document.querySelector('.current .temp');
     temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`
     let weather_el = document.querySelector('.current .weather');
     weather_el.innerText = weather.weather[0].main;
     let hilow = document.querySelector('.hi-low');
     hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

function dateBuilder(d){
    let mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre",
               "Octubre","Noviembre","Diciembre"];
    let dia = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    
    let day = dia[d.getDay()];
    let date = d.getDate();
    let month = mes[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`

}