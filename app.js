const express = require("express");

const app = express();

const fs = require('fs');

const http = require('http')

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))

const { password } = require('./config.json');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://milo:${password}@cluster0.rmdeyq6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongo.connect();
    // Send a ping to confirm a successful connection
    await mongo.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongo.close();
  }
}
run().catch(console.dir);


// // Require the necessary discord.js classes
const { Client, GatewayIntentBits, Events , WebhookClient } = require('discord.js');
const { token } = require('./config.json');

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

// const readable = fs.createReadStream("./test.mp4", {highWaterMark: 25 * 1024 * 1024});


// readable.on("data", (chunk)=>{
//     client.guilds.fetch("1187095179497328711").then((guild)=>{
//         console.log(guild.channels.fetch("1187095180009025598").then(channel=>{
//             channel.send({
//                 files: [{
//                   attachment: chunk ,
//                   name: 'file.txt',
//                   description: 'A description of the file'
//                 }]
//               }).then(message => console.log(`Sent message: ${message.id}`))
//         }));
//     })
// })


// client.guilds.fetch("1187095179497328711").then((guild)=>{
//     guild.channels.fetch("1187095180009025598").then(channel=>{
//         console.log(channel.messages.fetch('1188117394388963348').then((message )=> {
//             console.log("Message Retreived:",message.attachments)})
//         .catch(console.error))
//     });
// })


const https = require('https');

https.get('https://cdn.discordapp.com/attachments/1187095180009025598/1188117393793359903/file.txt', res => {
   let data = [];

   res.on('data', chunk => {
       data.push(chunk);
   }).on('end', () => {
       let buffer = Buffer.concat(data);
       console.log(buffer);
   });
}).on('error', err => {
   console.error("Error: " + err.message);
});





app.listen(3000, ()=>{
    console.log("Server started and Running on port 3000")
})