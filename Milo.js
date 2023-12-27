const { Client, GatewayIntentBits, Events , WebhookClient } = require('discord.js');
const https = require('https');

class Milo{
    constructor(token){
        this.client = new Client({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,]
         }),
         this.client.login(token);
        //  this.guild = this.client.guilds.fetch(`${guildId}`).then(guild=>{return guild});
        //  this.channel = this.guild.fetch(`${channelId}`).then(channel=>{return channel});

    }

    async sendAttachment(guildId, channelId, chunk) {
        const guild = await this.client.guilds.fetch(guildId);
        const channel = await guild.channels.fetch(channelId);
        const message = await channel.send({
          files: [{
            attachment: chunk,
            name: 'file.txt',
            description: 'A description of the file'
          }]
        });
        return message.id;
      }

  async fetchAttachment(guildId, channelId,messageIds){
    const attachmentUrls = [];
    const guild = await this.client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);
    for (const messageId of messageIds) {
      const message = await channel.messages.fetch(messageId);
      const url = await message.attachments.first().url; 
      attachmentUrls.push(url);     
    }
    return attachmentUrls;
  }


  async downloadAttachment(attachmentUrls){
    
    let promises = [];
    let urls = await attachmentUrls;
    for( const url of urls ){
        promises.push(new Promise((resolve, reject)=>{
            let data = [];
            https.get(`${url}`, res => {
                res.on("data", chunk =>{
                   data.push(chunk);         
                })
                .on("end", () =>{
                   resolve(Buffer.concat(data))
                })
                .on("error", err =>{
                   console.error("Error: ", err.message)
                   reject(err)
                })
            })
        }));
    }
    let results = await Promise.all(promises);
    return Buffer.concat(results);
 }
 


}


module.exports = Milo;

