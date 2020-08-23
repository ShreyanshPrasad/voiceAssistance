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

    readOutLoud(result);
    console.log(transcript);
};

btn.addEventListener('click', () => {
    recognition.start();
});

clr.addEventListener('click', () => {
    tips.style.display = 'none';
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
    return "Command not recognised";
}

function changeTheme (theme) {
    if(theme.includes('dark mode')){
        document.bgColor = 'black';
    }
}