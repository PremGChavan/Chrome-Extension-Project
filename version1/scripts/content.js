const body = document.querySelector('body');

let btnBQ = document.createElement('button');
btnBQ.setAttribute('id', 'btnBQ');
btnBQ.addEventListener('click', listenUser);
body.appendChild(btnBQ);


// Speech Recognition
let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.maxAlternatives = 1;
speechRecognition.lang = 'en-US';
let transcript = "";
speechRecognition.onresult = function(event) {
    transcript = "";
    for(let i=0; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
    }
};

// Keyboard event handling
document.addEventListener("keydown", handleKbd);

function handleKbd(e) {
    if (e.shiftKey && e.altKey && e.code === "KeyQ") {
        let btnBQ = document.getElementById("btnBQ"); // Ensure button exists
        if (btnBQ) {
            btnBQ.click(); // Simulate button click
        }
    }
}

// Popup for the transcript and event handling
function listenUser() {
    if(btnBQ.hasAttribute("listening") === false ) {
        btnBQ.setAttribute("listening", "true");
        speechRecognition.start();
    } else {
        btnBQ.removeAttribute("listening");
        speechRecognition.stop();
        const myPopup = new Popup({
            id: "myPopup",
            title: "Here is what you said:",
            content: transcript,
        });
        myPopup.show();
        // console.log("this is what u said:" + transcript);
    }
}

