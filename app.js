const express = require("express");

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))

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

// client.on('messageCreate', (msg)=>{
//     msg.reply("hello")
// })

// // Log in to Discord with your client's token
// client.login(token);

// const file = new AttachmentBuilder('./config.json');




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

client.guilds.fetch("1187095179497328711").then((guild)=>{
    console.log(guild.channels.fetch("1187095180009025598").then(channel=>{
        channel.send("hello")
    }));
})

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




// cha.send('hello!')
//   .then(message => console.log(`Sent message: ${message.content}`))
//   .catch(console.error);

app.listen(3000, ()=>{
    console.log("Server started and Running on port 3000")
})