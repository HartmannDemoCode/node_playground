/**
 * Created by tha on 28-09-2017.
 */
var http = require('http');
var fs = require('fs');
//var io = require('socket.io');

var server = http.createServer(function (req, res) {
    fs.readFile('./views/client.html','utf-8',function (err, content) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    //The server stores Óne socket object for each client.
    socket.emit('message', 'You are connected!');
    console.log('A client is connected!');

    socket.on('sendUserName', function (username) {
        socket.userName = username;
        console.log(username + ' has now connected');
    });

    // When the server receives a “message” type signal from the client
    socket.on('message', function (message) {
        console.log(socket.userName+' is speaking to me! They’re saying: ' + message);
        socket.broadcast.emit('message', socket.userName+': '+message);
    });
    socket.broadcast.emit('message', 'A new client just connected');
});

server.listen(8001);