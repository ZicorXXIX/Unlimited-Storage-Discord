const express = require("express");

const app = express();

const fs = require('fs');

const status = require("express-status-monitor");
app.use(status())

const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))

const { password } = require('./config.json');

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
const { token } = require('./config.json');

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


client.login(token);

// client.on('messageCreate', async (message) => {
//     const channel = message.channel;
//     const permissions = channel ? channel.permissionsFor(message.guild.me) : null;
 
//     if (!permissions || !permissions.has('SEND_MESSAGES')) {
//         console.log('Bot does not have permission to send messages in this channel.');
//         return;
//     }
 
//     // Bot has permission to send messages, so proceed with the action
//     channel.send('Hello!');
//  });

// client.guilds.fetch("1187095179497328711").then((guild)=>{
//     console.log(guild.channels.fetch("1187095180009025598").then(channel=>{
//         channel.send("hello")
//     }));
// })

// const channel = client.guilds.fetch("1187095179497328711").channels;
// console.log(channel)
//  console.log(client.guilds.fetch("1187095180009025598"))

// const channelID = '1187095180009025598';
// client.channels.cache.get(channelID)
//  .then(channel => {
//    if(channel) {
//        channel.send("hello");
//    } else {
//        console.log('Channel not found');
//    }
//  })
//  .catch(console.error);
// console.log(client.guilds.fetch("1187095179497328711"));



// cha.send('hello!')
//   .then(message => console.log(`Sent message: ${message.content}`))
//   .catch(console.error);

// const readable = fs.createReadStream("./32mb.mp4", {highWaterMark: 25 * 1024 * 1024});


// readable.on("data", (chunk)=>{
//     client.guilds.fetch("1187095179497328711").then((guild)=>{
//         console.log(guild.channels.fetch("1187095180009025598").then(channel=>{
//             channel.send({
//                 files: [{
//                   attachment: chunk ,
//                   name: 'file.txt',
//                   description: 'A description of the file'
//                 }]
//               }).then(message => {
//                 console.log(`Sent message: ${message.id}`);
//                 const file = new File({
//                     name:"file.txt",
//                     messageId: `${message.id}`  
//                 })
//                 file.save()
//             })
//         }));
//     })
// })

const https = require('https');
const { type } = require("os");
const { log } = require("console");

// File.find({name: "file.txt"}).exec()
// .then(result=>{
    // let msgID = result[0].messageId;
    // let msgID = ["1188547809121677312", "1188547835143135242"]
    // console.log(msgID);
    // msgID.forEach(id => {
    //     client.guilds.fetch("1187095179497328711")
    //     .then((guild) => {
    //        return guild.channels.fetch("1187095180009025598")
    //        .then(channel => {
    //            return channel.messages.fetch(`${id}`)
    //            .then((message) => {
    //                return message.attachments.first().url;
    //            })
    //        })
    //     })
    //     .then((attachmentUrl) => {
    //        let id = attachmentUrl;
    //        return new Promise((resolve, reject) => {
    //            https.get(`${id}`, res => {
    //                let data = [];
    //                res.on('data', chunk => {
    //                    data.push(chunk);
    //                }).on('end', () => {
    //                    console.log("completed 1 chunk download");
    //                    resolve(Buffer.concat(data));
    //                }).on('error', err => {
    //                    console.error("Error: " + err.message);
    //                    reject(err);
    //                });
    //            });
    //        });
    //     })
    //     .then((data) => {
    //        // Write the data to a file
    //        fs.writeFile('output.txt', data, err => {
    //            if (err) {
    //                console.error("Error writing file: " + err.message);
    //            } else {
    //                console.log("Successfully wrote file.");
    //            }
    //        });
    //     })
    //     .catch(console.error);
            
        
        
    // });
// } )

// (async ()=>{
//     // let result = await File.find({name: "file.txt"}).exec();

//     let msgID = [ '1188406134005039125' ];

//     // let msgID = result[0].messageId;

//     let data = [];
//     await msgID.forEach(id => {
//         https.get(`https://cdn.discordapp.com/attachments/1187095180009025598/${id}/file.txt`, res => {
        
//         res.on('data', chunk => {
//             data.push(chunk);
//         }).on('end', () => {
//             //    let buffer = Buffer.concat(data);
//             console.log("completed 1 chunk dowload");

//         });
//         }).on('error', err => {
//         console.error("Error: " + err.message);
//         });       
        
//     });

//     console.log(data)
//     let blob= new Blob(data, {type: "octet-stream"});
//     console.log(URL.createObjectURL(blob));

    

// })()
// (async ()=>{
//     let msgID = [ '1188406133631754250' ];
 
//     let dataPromises = msgID.map(id => {
//         return new Promise((resolve, reject) => {
//             https.get(`https://cdn.discordapp.com/attachments/1187095180009025598/${id}/file.txt`, res => {
//                 let data = [];
//                 res.on('data', chunk => {
//                    data.push(chunk);
//                 }).on('end', () => {
//                    console.log("completed 1 chunk download");
//                    resolve(data);
//                 }).on('error', err => {
//                    console.error("Error: " + err.message);
//                    reject(err);
//                 });
//             });
//         });
//     });
 
//     let data = await Promise.all(dataPromises);
 
//     let fullData = Buffer.concat(data[0]);

//     // Write the data to a file
//     fs.writeFile('output.txt', fullData, err => {
//         if (err) {
//             console.error("Error writing file: " + err.message);
//         } else {
//             console.log("Successfully wrote file.");
//         }
//     });
//  })()

// const fs = require('fs');
// const https = require('https');

// client.guilds.fetch("1187095179497328711")
// .then((guild) => {
//    return guild.channels.fetch("1187095180009025598")
//    .then(channel => {
//        return channel.messages.fetch('1188117394388963348')
//        .then((message) => {
//            return message.attachments.first().url;
//        })
//    })
// })
// .then((attachmentUrl) => {
//    let id = attachmentUrl;
//    return new Promise((resolve, reject) => {
//        https.get(`${id}`, res => {
//            let data = [];
//            res.on('data', chunk => {
//                data.push(chunk);
//            }).on('end', () => {
//                console.log("completed 1 chunk download");
//                resolve(Buffer.concat(data));
//            }).on('error', err => {
//                console.error("Error: " + err.message);
//                reject(err);
//            });
//        });
//    });
// })
// .then((data) => {
//    // Write the data to a file
//    fs.writeFile('output.txt', data, err => {
//        if (err) {
//            console.error("Error writing file: " + err.message);
//        } else {
//            console.log("Successfully wrote file.");
//        }
//    });
// })
// .catch(console.error);

 

// (async ()=>{
//     let result = await File.find({name: "file.txt"}).exec();
 
//     let msgID = result[0].messageId;
 
//     let dataPromises = msgID.map(id => {
//         return new Promise((resolve, reject) => {
//             https.get(`https://cdn.discordapp.com/attachments/1187095180009025598/${id}/file.txt`, res => {
//                 let data = [];
//                 res.on('data', chunk => {
//                    data.push(chunk);
//                 }).on('end', () => {
//                    resolve(Buffer.concat(data));
//                 }).on('error', err => {
//                    reject(err);
//                 });
//             });
//         });
//     });
 
//     let data = await Promise.all(dataPromises);
//     console.log(data);
//     let blob= new Blob(data);
//     console.log(URL.createObjectURL(blob));
//  })()

 



// client.guilds.fetch("1187095179497328711").then((guild)=>{
//     guild.channels.fetch("1187095180009025598").then(channel=>{
//         console.log(channel.messages.fetch('1188117394388963348').then((message )=> {
//             console.log("Message Retreived:",message.attachments.first().url)})
//         .catch(console.error))
//     });
// })





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
const Milo = require("./Milo");

    const milo =new Milo(token);
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
    


//     let messageIds = [];

// readable.on("data", (chunk) => {
//   client.guilds.fetch("1187095179497328711").then((guild) => {
//       guild.channels.fetch("1187095180009025598").then(async channel => {
//           const message = await channel.send({
//               files: [{
//                 attachment: Blob[chunk],
//                 name: `${fileName}.txt`,
//                 description: 'A description of the file'
//               }]
//           });

//           console.log(`Sent message: ${message.id}`);
//           messageIds.push(message.id);
//       });
//   });
// });

// // After all chunks have been processed, save the file to the database
// const file = new File({
//    name: `${fileName}`,
//    messageIds: messageIds
// });
// file.save();



})


app.listen(3000, ()=>{
    console.log("Server started and Running on port 3000")
})