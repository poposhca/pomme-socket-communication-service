var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// Question Command enum
var QuestionCommands;
(function (QuestionCommands) {
    QuestionCommands["nextQuestion"] = "nextQuestion";
    QuestionCommands["prevQuestion"] = "prevQuestion";
    QuestionCommands["repeatQuestion"] = "repeatQuestion";
})(QuestionCommands || (QuestionCommands = {}));
;
;
// Socket IO strings
var SocketIOConstants;
(function (SocketIOConstants) {
    SocketIOConstants["connection"] = "connection";
    SocketIOConstants["disconnect"] = "disconnect";
})(SocketIOConstants || (SocketIOConstants = {}));
// TODO define app constants
io.on(SocketIOConstants.connection, function (socket) {
    console.log("A user connected with id " + socket.id);
    socket.on('answer', function (user, data) {
        console.log(user.id);
        console.log(data);
    });
    socket.on('questionCommand', function (msg) {
        console.log(msg);
        io.emit('questionCommand', { command: 'next' });
    });
    socket.on(SocketIOConstants.disconnect, function () {
        console.log("User with id " + socket.id + " disconnected");
    });
});
// Server
http.listen(3000, function () {
    console.log('Pome server listening on *:3000');
});
