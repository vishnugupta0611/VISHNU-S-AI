let library = document.querySelector(".headermiddlecontent")
let hanger = document.querySelector(".hanger")
bool = true;
let start = 0;

let userstorearr = [];
library.addEventListener('click', () => {
     (bool == true) ? hanger.style.display = 'inline-block' : hanger.style.display = 'none'
     bool = !bool;
})

let submitBtn = document.querySelector("#submit-btn")
let res = document.querySelector("#ai-response");
res.innerText = '';
let userInput = document.querySelector("#user-input")
let globalval;
async function fetchdata() {
     const userInputValue = userInput ? userInput.value.trim() : '';
     if (userInputValue !== '') {
          userstorearr.push(userInput.value);
          try {
               const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         'x-goog-api-key': 'AIzaSyBGaRQYS8RxwtRX4yA3I91WbD4jhpzXm38'
                    },
                    body: JSON.stringify({
                         contents: [
                              {
                                   role: 'user',
                                   parts: [
                                        {
                                             text: userInputValue
                                        }
                                   ]
                              }
                         ]
                    })
               });

               const responseData = await response.json();

               console.log(responseData.candidates[0].content.parts[0].text); // <--- Add this line to log the response data
               globalval = responseData.candidates[0].content.parts[0].text;


               for (let i = start; i < userstorearr.length; i++) {
                    let userdatadiv = document.createElement("div");
                    userdatadiv.style.color = "black"
                    userdatadiv.innerHTML = `${userstorearr[i]}`;
                    res.appendChild(userdatadiv);

                    start = start + 1;
               }
               let newdiv = document.createElement("div");
               newdiv.innerText = `${globalval}`;
               res.appendChild(newdiv);
               logoandtittlemover()
          } catch (error) {
               console.error(error);
          }
     }

}

let emptyinputdata = () => {
     userInput.value = '';
}

function logoandtittlemover() {
     if (window.innerWidth < 600) {
        
          return;
     }
     if (res.innerHTML.trim() != '') {
          let userinputempty = document.querySelector(".userinputempty");
          userinputempty.style.left = `30%`;
          userinputempty.style.top = `15%`;

     }
}

submitBtn.addEventListener('click', fetchdata)
submitBtn.addEventListener('click', emptyinputdata)
onkeydown = (event) => {
     // console.log(event.code)
     if (event.code == 'Enter') {
          fetchdata();
          emptyinputdata();
     }
}


//  this function for convert speech to text
let recog;
// let mic=ducument.querySelector(".mic");
function speechtotext() {
     recog = new webkitSpeechRecognition();
     recog.lang = "en-US";
     recog.onresult = function (event) {
          // console.log(event.results[0][0].transcript);
          userInput.value = event.results[0][0].transcript;
     }
     recog.onspeechend = () => {
          fetchdata();
          userInput.value = '';
     }

}

speechtotext();

let speech = document.querySelector(".speech");
speech.addEventListener('click', () => {
     recog.start();
})





//this is code for the text to speech
let texttospeek = document.querySelector(".texttospeech")
let speektext;
let cond = true;
function texttospeech(globalval) {
     if (cond == true) {
          speektext = new SpeechSynthesisUtterance();

          speektext.lang = "en-US";
          speektext.text = globalval;

          speechSynthesis.speak(speektext)
          cond = false;
     }
     else {
          speechSynthesis.cancel();
          cond = true;
     }
}
texttospeek.addEventListener('click', (event) => {
     texttospeech(globalval);
})






let imgtittle = [{ title: "love" },
{ title: "nature" },
{ title: "mountain" },
{ title: "books" },
{ title: "cars" },
{ title: "bikes" },
{ title: "toys" },
{ title: "houses" },
{ title: "forest" },
{ title: "flowers" },
{ title: "animal" }, { title: "tree" },

]
let i = 0;
let url;
let setintervalid = setInterval(() => {
     url = `https://api.pexels.com/v1/search?query=${imgtittle[i].title}&per_page=1`;
     fetchfun();
     i = i + 1;
     if (i == 9) {
          i = 0;
     }
}, 5000);



const apiKey = 'gLe2qjsTL2z6pZ8eY3F6l7Wgja7yc37n98hVBh8xi4YWI5t4FW97IPWy';


let imgsrc;
let fetchfun = async () => {
     const response = await fetch(url,

          {
               headers: {
                    Authorization: apiKey
               }
          });

     const responsedata = await response.json();
     imgsrc = responsedata.photos[0].src.original;
     fillimg(imgsrc)
}
fetchfun();
let imgsource;
let findimg = document.querySelector(".findimg img");
let downloadbtn = document.querySelector(".downloadbtn");
let fillimg = async (imgsrc) => {
     imgsource = await imgsrc;
     findimg.src = imgsource;
}
let anchortag = document.querySelector(".downloadbtn a");
downloadbtn.addEventListener('click', () => {

     if (imgsource != undefined) {
          anchortag.href = imgsource;
     }
})
let searchimginput = document.querySelector(".searchimginput");
let searchimginputbox = document.querySelector(".searchimginput input");
let searchimgbtn = document.querySelector(".imgsearchbtn")
userInput.addEventListener('input', (event) => {
     console.log(event.target.value);
     if (event.target.value == "imaginevishnu") {
          searchimginput.style.opacity = 1;
     }
     else {

          searchimginput.style.opacity = 0;
     }
});

searchimgbtn.onclick = () => {
     console.log(searchimginputbox.value)
     clearTimeout(setintervalid);
     url = `https://api.pexels.com/v1/search?query=${searchimginputbox.value}&per_page=1`;
     searchimginput.style.opacity = 0;
     userInput.value = '';
     fetchfun();
}


