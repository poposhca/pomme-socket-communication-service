const io = require('socket.io-client')
const socket = io("ws://localhost:3001")

console.log('Running mock')

//socket.emit('answer', { id: '01' }, 'correct')

socket.emit('questionCommand', { command: 'nextQuestion' })

socket.on('questionCommand', (msg) => {
    console.log(msg)
})