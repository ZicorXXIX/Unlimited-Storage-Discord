const { Client, GatewayIntentBits, Events , WebhookClient } = require('discord.js');

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

}

module.exports = Milo;

