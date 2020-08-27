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


window.addEventListener('load', () => {

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=6c5e0f6f7728d60e79ab2eaa174d816c&units=metric`;

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

                })
        });
    }else{
        console.log("Using old browser");
    }

    const btn = document.querySelector('#btn');
    const clr = document.querySelector('#clr');
    const tips = document.querySelector('.tips');

    const commands = ['dark mode', 'light mode', 'default theme'];

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
        console.log('Listning...');
    };

    recognition.onresult = function (event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;

        tips.innerHTML += '<br>' + transcript + '<br>';
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
        return new Date().toTimeString();
    if(command.includes('date today'))
        return new Date().toDateString();
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
        return 'Weather'
    if(command.includes('location'))
        return `Latitude : ${lat}, Longitude : ${lon}`;
    if(command.includes('time zone'))
        return timezone;
    if(command.includes('temperature'))
        return `${temp} celsius`;
    if(command.includes('sunrise and sunset') || command.includes('sunrise') || command.includes('sunset'))
    return `Sunrise at ${new Date(sunrise)} and Sunset at ${new Date(sunset)}`;
}

function changeTheme (theme) {
    if(theme.includes('dark mode')){
        document.bgColor = 'black';
    }
}