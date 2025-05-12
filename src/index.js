
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
function displayWeather(cityName){
    createWeatherObj(cityName).then(function(weather){
        if(weather!==null){
            console.log(weather);
        }
    });
}
const form=document.getElementById("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const input=document.getElementById("location");
    displayWeather(input.value);
    input.value="";
})
