let lat;
let lon;
let timezone;
let weatherObject;
let sunrise;
let sunset;
let temp;
let pressure;
let humidity;
let dew_point;
let clouds ;
let uvi;
let visibility ;
let wind_speed;
let wind_deg;
let weather;
let weatherMain;
let weatherDesc;
const themes = ['dark', 'light', 'default'];


window.addEventListener('load', () => {
    document.body.style.background = 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%)';
    document.body.style.backgroundSize = '100vw 100vh';
    document.body.style.backgroundAttachment = 'fixed';

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=6c5e0f6f7728d60e79ab2eaa174d816c&units=metric`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    weatherObject = data;
                    console.log(data);
                    timezone = data.timezone;
                    [sunrise, sunset, temp, pressure, humidity, dew_point, clouds, uvi, visibility, wind_speed, wind_deg] = [data.current.sunrise, data.current.sunset, data.current.temp, data.current.pressure, data.current.humidity, data.current.dew_point, data.current.clouds, data.current.uvi, data.current.visibility, data.current.wind_speed, data.current.wind_deg];

                    weather = data.current.weather;
                    weatherMain = weather[0].main;
                    weatherDesc = weather[0].description;
                    console.log(weather);

                })
        });
    }else{
        console.log("Using old browser");
    }

    const btn = document.querySelector('#btn');
    const clr = document.querySelector('#clr');
    const tips = document.querySelector('.tips');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
        console.log('Listning...');
    };

    recognition.onresult = function (event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;

        tips.innerHTML += '<br>$ ' + transcript + ' ↵ <br>';
        var result = execute(transcript);
        tips.innerHTML += result + '<br>';
        if(transcript.includes('I like this'))
            readOutLoud('Thank you');
        else
            readOutLoud(result);
        console.log(transcript);
    };

    btn.addEventListener('click', () => {
        recognition.start();
    });

    clr.addEventListener('click', () => {
        tips.style.display = 'none';
    });
});



function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
}

function execute(command){
    if(command.includes('time now'))
        return changeTime(new Date());
    if(command.includes('date today'))
        return changeDate(new Date());
    if(command.includes('how are you'))
        return 'I am Fine';
    if(command.includes('what is this'))
        return 'This is a simple Voice Command Line or Voice Assistant';
    if(command.includes('help'))
        return 'For help please go through the commands mentiond above';
    if(command.includes('who made this'))
        return 'Shreyansh';
    if(command.includes('I like this'))
        return 'If you like this project, dont forget to give a Star @ <a class="link" src="https://github.com/ShreyanshPrasad/voiceAssistance">https://github.com/ShreyanshPrasad/voiceAssistance</a>';
    if(command.includes('weather'))
        return `${weatherMain} - ${weatherDesc} <img width="25px" height="25px" src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;
    if(command.includes('location'))
        return `Latitude : ${lat}, Longitude : ${lon}`;
    if(command.includes('time zone'))
        return timezone;
    if(command.includes('temperature'))
        return `${temp} degree celsius`;
    if(command.includes('sunrise and sunset') || command.includes('sunrise') || command.includes('sunset'))
        return `Sunrise at ${changeTime(new Date(sunrise))} and Sunset at ${changeTime(new Date(sunset))}`;
    if(command.includes('theme'))
        return changeTheme();
    if(command.includes('atmospheric pressure'))
        return `${pressure} Hectopascal Pressure Unit on the sea level`;
    if(command.includes('humidity'))
        return `${humidity}%`;
    if(command.includes('Dew Point'))
        return `${dew_point} kelvin`;
    if(command.includes('clouds'))
        return `${clouds} %`;
    if(command.includes('UV index'))
        return `${uvi}`;
    if(command.includes('visibility'))
        return `${visibility} meters`;
    if(command.includes('wind'))
        return `${wind_speed} metre per second in ${wind_deg} degrees`;
    
}

let themeKey = 0;

function changeTheme () {

    if(themeKey == 0){
        setTheme('light');
        themeKey++;
        return 'Enjoy light mode';
    }

    if(themeKey == 1){
        setTheme('dark');
        themeKey++;
        return 'Enjoy dark mode';
    }

    if(themeKey == 2){
        setTheme('default');
        themeKey = 0;
        return 'Enjoy Default theme';
    }
    
}

function changeDate(obj){
    return obj.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
}

function changeTime(obj){
    return obj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

function setTheme(theme){

    if(theme == 'dark'){
        document.body.style.background = 'black';
        document.querySelector('.cmdline').style.background = 'black';
        document.querySelector('.cmdline').style.color = 'lime';
        setCookie("userthemechoice", 'dark', 365);
    }

    if(theme == 'light'){
        document.body.style.background = 'white';
        document.querySelector('.cmdline').style.background = 'white';
        document.querySelector('.cmdline').style.color = 'black';
        setCookie("userthemechoice", 'light', 365);
    }

    if(theme == 'default'){
        document.body.style.background = 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%)';
        document.querySelector('.cmdline').style.background = 'black';
        document.querySelector('.cmdline').style.color = 'lime';
        setCookie("userthemechoice", 'default', 365);
    }
}

function checkCookie() {
    var userPreference = getCookie("userthemechoice");
    if (userPreference != "") {
        setTheme(userPreference);
    } else {
        setCookie("userthemechoice", themes[themeKey], 30);
    }
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }