const btn = document.querySelector('#btn');
const content = document.querySelector('.content');

const commands = ['dark mode', 'light mode', 'default theme'];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('Listning...');
};

recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    readOutLoud(transcript);
    changeTheme('dark mode');
    console.log(transcript);
};

btn.addEventListener('click', () => {
    recognition.start();
});

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = new Date().toTimeString();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
}

function changeTheme (theme) {
    if(theme.includes('dark mode')){
        document.bgColor = 'black';
    }
}