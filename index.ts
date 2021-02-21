const app = require('express')();
const http = require('http').createServer(app);
var io = require('socket.io')(http);

// TODO define User data
interface User {
    id: number
    name?: string
}

// TODO define answer data
interface MultipleAnswer {
    isCorrect: boolean
    corrects: String[]
    wrongs: String[]
}

// Question Command enum
enum QuestionCommands {
    nextQuestion = 'nextQuestion',
    prevQuestion = 'prevQuestion',
    repeatQuestion = 'repeatQuestion',
};

// Question Command interface
interface QuestionMessage {
    command: QuestionCommands;
};

// Socket IO strings
enum SocketIOConstants {
    connection = 'connection',
    disconnect = 'disconnect',
}

// TODO define app constants

io.on(SocketIOConstants.connection, (socket) => {
    console.log(`A user connected with id ${socket.id}`);

    socket.on('answer', (user: User, data: string) => {
        console.log(user.id);
        console.log(data);
    });

    socket.on('questionCommand', (msg: QuestionCommands) => {
        console.log(msg);
        io.emit('questionCommand', { command: 'next' });
    })

    socket.on(SocketIOConstants.disconnect, () => {
        console.log(`User with id ${socket.id} disconnected`);
    });
});

// Server
http.listen(3000, () => {
    console.log('Pome server listening on *:3000');
});
