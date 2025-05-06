
async function getData(cityName){
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=AH3T5E9YZGFT3STYGKWFZH3DD&contentType=json`)
            .then(function(response){
                return response.json();
            })
            .catch(function(error){
                console.error(error);
            })
}
class Weather{
    constructor(dateTime,conditions,temperature){
        this.dateTime=dateTime;
        this.conditions=conditions;
        this.temperature=temperature;
    }
}
function createWeatherObj(cityName){
    return getData(cityName).then(function(data){
        const dateTime=data.currentConditions.datetime;
        const conditions=data.currentConditions.conditions;
        const temperature=data.currentConditions.temp;
        return new Weather(dateTime,conditions,temperature);
    })
}
function displayWeather(cityName){
    createWeatherObj(cityName).then(function(weather){
        console.log(weather);
    });
}
const form=document.getElementById("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const input=document.getElementById("location");
    displayWeather(input.value);
    input.value="";
})
