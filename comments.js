//Create webserver
var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Create server
server.listen(3000, function(){
    console.log('Server running on port 3000');
});

//Set up the static files
app.use(express.static(path.join(__dirname, 'public')));

//Array to store comments
var comments = [];

//Listen for connection
io.on('connection', function(socket){
    console.log('A user connected');
    socket.emit('comments', comments);

    //Listen for add comment
    socket.on('add comment', function(data){
        comments.push(data);
        io.sockets.emit('comments', comments);
    });

    //Listen for delete comment
    socket.on('delete comment', function(data){
        comments.splice(data, 1);
        io.sockets.emit('comments', comments);
    });

    //Listen for update comment
    socket.on('update comment', function(data){
        comments[data.index] = data.comment;
        io.sockets.emit('comments', comments);
    });
});