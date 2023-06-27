const express = require("express");
const cors = require("cors");
const axios = require("axios");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 4040;

const app = express();
const server = app.listen(PORT);
const io = socketIO(server);


app.use(express.json());
app.use(cors({origin:true}));


//////////////////////// Socket.IO-Verbindungslogik Start ////////////////////////
// io.on("connection", (socket) => {
//     console.log("A user connected");
  
//     // Behandlung des "message" Ereignisses
//     socket.on("message", (data) => {
//       // Handle eingehende Nachrichten
//       // Du kannst die Nachricht an andere verbundene Sockets senden oder andere Aktionen durchführen
//       io.emit("message", data); // Sende die Nachricht an alle verbundenen Sockets
//     });
  
//     // Behandlung des "disconnect" Ereignisses
//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
//   });

//////////////////////// Socket.IO-Verbindungslogik Ende ////////////////////////


app.post("/authenticate", async(req, res) => {
    const {username} = req.body;

    try {
        const r = await axios.put("https://api.chatengine.io/users/",
        {username: username, 
         secret: username, first_name: username},
        {headers: {"private-key": "f2cab507-d7c9-451e-8747-d8967324cca8"}}
        )
        return res.status(r.status).json(r.data)
    } catch (e){
        return res.status(e.response.status).json(e.response.data);
    }
});

// app.listen(4040);