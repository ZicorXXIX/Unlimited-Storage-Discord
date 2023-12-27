const express = require("express");

const app = express();

const fs = require('fs');

const status = require("express-status-monitor");
app.use(status())

const mongoose = require('mongoose');

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))

const { password } = require('./config.json');

const Milo = require("./Milo");

const { token } = require('./config.json');
const milo =new Milo(token);

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function( req, file, cb){
        return cb(null, "./uploads")
    },
    filename: function(req, file,cb){
        return cb(null, `${Date.now()}- ${file.originalname}`)
    }
})

const upload = multer({storage});

const uri = `mongodb+srv://milo:${password}@cluster0.rmdeyq6.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(uri)
.then(()=>console.log("Connected to Database"))
.catch(err=> console.log(err))

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Check Your Data Entry Name is Required Field"]
    },
    msgid:  Array
})

const File = mongoose.model("File", fileSchema);

// const file1 = new File({
//     name: "test.txt",
//     messageId: ["msgID"],
//     createdAt: Date.now()
// })
// file1.save()




// // Require the necessary discord.js classes
const { Client, GatewayIntentBits, Events , WebhookClient } = require('discord.js');
// const { token } = require('./config.json');

const channelId = "1187095180009025598";
const guildId = "1187095179497328711"

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]
 });

// // When the client is ready, run this code (only once).
// // The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// // It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


//Download Code:

let attachmentUrl = milo.fetchAttachment(guildId, channelId, ["1189278489199784007", "1189278527846101033"]);

attachmentUrl.then(attachmentUrl =>{
    console.log(attachmentUrl)
})


milo.downloadAttachment(attachmentUrl).then((data) => {
    // Write the data to a file
    fs.writeFile('output.txt', data, err => {
        if (err) {
            console.error("Error writing file: " + err.message);
        } else {
            console.log("Successfully wrote file.");
        }
    });
 })
 .catch(console.error);



app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
});


app.post("/", upload.single("myFile"), (req, res)=>{
    console.log(req.file, req.body)
    //req.file returns:
// {
//   fieldname: 'myFile',
//   originalname: 'ScreenShot-2023-1-26_14-47-11.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: './uploads',
//   filename: '1703500677726- ScreenShot-2023-1-26_14-47-11.png',
//   path: 'uploads\\1703500677726- ScreenShot-2023-1-26_14-47-11.png',
//   size: 3022143
// }
    const fileSize = req.file.size;
    const fileName = req.file.originalname;
    const path = req.file.path;

    const readable = fs.createReadStream(`./${path}`, {highWaterMark: 23* 1024 * 1024});

    const totalChunks = Math.ceil(fileSize/(23*1024*1024));
    let currentChunk = 0;
    let messageIds =[];

    readable.on("data", async (chunk)=>{
        id = await milo.sendAttachment(guildId,channelId,chunk);
        console.log("Pushing id");
        messageIds.push(id);
        console.log(messageIds)

        currentChunk++;
        if(currentChunk >= totalChunks){
            console.log(messageIds)
            const file = new File({
            name: `${fileName}${messageIds}`,
            msgid: messageIds
         });
         console.log("MessageID:",messageIds)
         file.save();

        } 
    }) 
})


app.listen(3000, ()=>{
    console.log("Server started and Running on port 3000")
})