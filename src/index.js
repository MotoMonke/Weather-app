import "./style.css"
async function getData(cityName){
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=AH3T5E9YZGFT3STYGKWFZH3DD&contentType=json`);
        if (!response.ok) {
            throw new Error(`City ${cityName} not found (Status: ${response.status})`);
        }
        return await response.json();
    } catch (error) {
        alert(error.message);
        return null; 
    }
}

class Weather{
    constructor(cityName,temperature,feelsLike,conditions,humidity,wind){
        this.cityName=cityName;
        this.temperature=temperature;
        this.feelsLike=feelsLike
        this.conditions=conditions;
        this.humidity=humidity;
        this.wind=wind;
    }
}
function createWeatherObj(cityName){
    return getData(cityName).then(function(data){
        if (!data){
            return null;
        }
        const city=cityName;
        const temperature=data.currentConditions.temp;
        const feelsLike=data.currentConditions.feelslike;
        const conditions=data.currentConditions.conditions;
        const humidity=data.currentConditions.humidity;
        const wind=data.currentConditions.windspeed;
        return new Weather(city,temperature,feelsLike,conditions,humidity,wind);
    })
}

//DOM
function displayWeather(cityName){
    createWeatherObj(cityName).then(function(weather){
        if(weather!==null){
            fillWeatherDiv(weather);
        }
    });
}

function fillWeatherDiv(data){
    const weatherDiv=document.getElementById("weather-div");
    weatherDiv.style.backgroundColor="rgb(30,33,45)";
    removeAllChildNodes(weatherDiv);
    //getting Weather object data
    const cityNameText=data.cityName;
    const temperatureText=data.temperature;
    const feelsLikeText=data.feelsLike;
    const conditionsText=data.conditions;
    const humidityText=data.humidity;
    const windText=data.wind;
    //creating weatherDiv elements
    const cityName=document.createElement("div");
    const temperature=document.createElement("div");
    const feelsLike=document.createElement("div");
    const conditions=document.createElement("div");
    const humidity=document.createElement("div");
    const wind=document.createElement("div");
    //filling elements with data
    cityName.innerText=cityNameText;
    temperature.innerText=`${temperatureText} °F`;
    feelsLike.innerText=`Feels like: ${feelsLikeText}`;
    conditions.innerText=`Conditions: ${conditionsText}`;
    humidity.innerText=`Humidity: ${humidityText}`;
    wind.innerText=`Wind ${windText} km/h`;
    //assigning classes to elements
    cityName.className="city-name";
    temperature.className="temperature";
    feelsLike.className="feels-like";
    conditions.className="conditions";
    humidity.className="humidity";
    wind.className="wind";
    //assigning weatherDiv its child nodes
    weatherDiv.appendChild(cityName);
    weatherDiv.appendChild(temperature);
    weatherDiv.appendChild(feelsLike);
    weatherDiv.appendChild(conditions);
    weatherDiv.appendChild(humidity);
    weatherDiv.appendChild(wind);
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const form=document.getElementById("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const input=document.getElementById("location");
    displayWeather(input.value);
    input.value="";
})
