const socket = io('http://localhost:5000');


//get doms elements in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//audio that will play after recieving  messages
var audio = new Audio('hello.mp3')


//function will append event into the function
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(message);
    messageElement.classList.add('position');
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}


// ask new user for her /his name and let the server know
const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

//if a new  user join recieve his/her name from the server
socket.on('user-joined', name =>{
   append('${name} joined the chat', 'right')
})

//if server a message receive it
socket.on('receive', data =>{
    append('${data.name} : ${data.message}', 'left')
 })


 //if a user left the chat, append to the container
 socket.on('left', name =>{
    append('${name} left the chat', 'right')
 })


//if the form get submitted , send server the message
 form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    apend('youl: ${message}', 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
