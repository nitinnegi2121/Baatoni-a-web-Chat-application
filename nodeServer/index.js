//Node server which will handle socket io connection

const io = require('socket.io')(5000);

const users = {};

io.on('connection', socket =>{
    //if any new user join, let other users connected to the server know
    socket.on('new-user-joined', name =>{
        //console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    //if someone sends a message , broadcast it to other people
    socket.on('send', message =>{
       socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    })
})
//if someone left the let other know
socket.on('disconnect', message =>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
 })