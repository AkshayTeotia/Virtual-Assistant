let btn=document.querySelector('#btn');
let con=document.querySelector('#con');
let voice=document.querySelector("#gif")

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch=1;
    utterance.rate=1;
    utterance.volume=1;
    utterance.lang="hi-IN";
    speechSynthesis.speak(utterance);
    
}

setInterval(() => {
    speak();
}, 1000);

function wish(){
    let day=new Date();

    let h=day.getHours();

    if(h>=0 && h<12){
        speak("Good Morning sir")
    }
    else if(h>=12 && h<=16){
        speak("Good After Noon sir");
    }
    else if(h>16 && h<=20){
        speak("Good Evening sir");
    }
    else{
        speak("Good Night sir");
    }
}

window.addEventListener('load',()=>{
    wish();
})

let speechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;   
let recog=new speechRecog();
recog.onresult=(event)=>{
    let currIndex=event.resultIndex;
    let transcript=event.results[currIndex][0].transcript;
    con.innerText=transcript;
    takeCommand(transcript.toLowerCase())

};


btn.addEventListener("click",()=>{
    recog.start()
    voice.style.display="block"
    btn.style.display="none"
})
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Akshay Sir")
    }
    else if (message.includes("what is your name") || message.includes("what's your name")) {
        speak("My name is Donald Trump.");
    }
    else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }
    else{
        let cleanedMessage = message.replace(/(search|Trump)/gi, '').trim();
        let finalText = "This is what I found on the internet regarding: " + cleanedMessage;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${cleanedMessage}`, "_blank");
    }
}