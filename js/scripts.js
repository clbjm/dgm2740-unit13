const d = new Date();
const todayDayNumber = d.getDay();

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
const apiURL ="//api.openweathermap.org/data/2.5/forecast?id=5879400&APPID=7d2d8f62d1e1db7398d6f7a5ea5e6d30&units=imperial";

fetch (apiURL)
.then((response => response.json()))
.then((weatherInfo) => {
    console.log(weatherInfo);

     document.getElementById("name").textContent = `weather conditions for ${weatherInfo.city.name}`;
let mylist = weatherInfo.list;

let forcastDayNumber = todayDayNumber;

for (i = 0; i < mylist.length; i++) {
    let time = mylist[i].dt_txt;
    if (time.includes('21:00:00')) {
        console.log("found an entry with 21:00:00 in the time. it was report "+i+" from the mylist of 40");
        forcastDayNumber += 1;
        if(forcastDayNumber === 7){forcastDayNumber = 0;}
        console.log("forcast day number " + forcastDayNumber+" which is "+weekday[forcastDayNumber]);
        let theDayName = document.createElement("span");
        theDayName.textContent = weekday[forcastDayNumber];

        let theTemp = document.createElement("p");
        theTemp.textContent = weatherInfo.list[i].main.temp + `\xB0`;

        let iconCode = weatherInfo.list[i].weather[0].icon;
            let iconPath = "//openweathermap.org/img/w/" + iconCode + ".png";
            let theIcon = document.createElement("img");
            theIcon.src = iconPath;

        let theDay = document.createElement("div");
        theDay.appendChild(theDayName);
        theDay.appendChild(theTemp);
        theDay.appendChild(theIcon);
        document.getElementById("weatherforecast").appendChild(theDay);
    }
}
});