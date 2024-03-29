const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

var port = process.env.PORT || 3001

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
   },
});

const players = [];
const allClients = [];

io.on("connection", (socket) => {
    allClients.push(socket);

    socket.on('disconnect', function() {
        console.log('Got disconnect: '+socket.id);

        players.forEach(element => {
            if(element.soc == socket.id) {
                let ind = players.indexOf(element);
                players.splice(ind,1);
            }
        });

        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
        socket.broadcast.emit("update", {});
     });

    socket.on('addPlayer', (data)=>{
        players.push({soc: socket.id, p: {id: players.length+1, type: data.type, valid: true}});
        socket.join(players.length.toString());
        socket.broadcast.emit("update", {});
    });

    socket.on('requestInfo', (arg1, arg2, callback)=>{
        callback(players);
    });

    socket.on("join", (data)=>{
        socket.join(data.id);
    });

    socket.on('initGame', (data)=>{
        io.in(data.id).emit("startGame", {myId: data.id, id: socket.id});
        players.forEach(element => {
            if(element.p.id == data.id) {
                let ind = players.indexOf(element);
                players[ind].p.valid = false;
            }
        });
        console.log(players);
        socket.broadcast.emit("update", {});
    });
    console.log("Connected: "+socket.id);
});

server.listen(port, ()=>{
    console.log(`SERVER RUNNING ON ${port}`);
});