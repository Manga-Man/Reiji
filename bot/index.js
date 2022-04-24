//A simple node.js discord bot made by M4nga#4659 
//uwu
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


const Discord = require('discord.js');
const config = require('./config.json');
const package = require('nhentai-api')
const h = new package.API()
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

var hface = ['https://localwaifu.stdcdn.com/Images/Ahegao/EXRxHmZX0AM6UM0.jpg', 'https://localwaifu.stdcdn.com/Images/Ahegao/EXa91zgXQAAkBG4.jpg', 'https://localwaifu.stdcdn.com/Images/Ahegao/artworks-c3JPa812HpFomgIs-iTEDyQ-t500x500.jpg', 'https://localwaifu.stdcdn.com/Images/Ahegao/avatars-000434396883-3whssn-t500x500.jpg', 'https://localwaifu.stdcdn.com/Images/Ahegao/cover256x256-87039ffe6dc5404fa33f7defc346b802.jpg', 'https://localwaifu.stdcdn.com/Images/Ahegao/flat,1000x1000,075,f.jpg', 'https://localwaifu.stdcdn.com/Images/Ahegao/images%20(1).jpeg', 'https://localwaifu.stdcdn.com/Images/Ahegao/images.jpeg', 'https://localwaifu.stdcdn.com/Images/Ahegao/main-qimg-07c9f323ffd4bb0623ff41dad473f8e5-lq.jpeg', 'https://localwaifu.stdcdn.com/Images/Ahegao/unnamed.png']

//just a bit of info when the bot logs in owo
client.on('ready', () => {
    console.log("Servers:")
    client.guilds.cache.forEach(guild => {
      console.log(`${guild.name} | ${guild.id}`);
    })
      console.log("------------------------------")
      console.log("Connected as " + client.user.tag)
  })

//command prefix
  const prefix = ">";

//channelset
 var albumChannel = client.channels.cache.get('938622559396720681'); 



  //do nothing if channel aint set ig...?
  var channelset = false;

//wait for client message uwu
client.on("messageCreate", function(message) { 
    if (message.author.bot) return; //i dont want the bot to respond to its own messages...
    if(message.attachments.size > -1) {
      message.attachments.forEach(attachment => {
        const uwuchannel = client.channels.cache.find(channel => channel.name === 'album-1')
        embed.setImage(attachment.proxyURL)
        embed.setFooter({iconURL:`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`, text: message.author.tag})
        const ImageLink = attachment.proxyURL;
        uwuchannel.send({embeds: [embed]}) 
      });
    }
    

  

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' '); //split args
  const command = args.shift().toLowerCase(); //convert command to lowercase     
  

    if(command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if(command === "h" && args[0].length <= 6) {
    const info = new Discord.MessageEmbed()
    info.setColor('#2ab8a0')

    var dojin = args[0]
    
      h.getBook(dojin).then(b => {
        
        var artist = b.artists
          info.setTitle(b.title.english)
          info.setImage(h.getImageURL(b.cover))
          info.addField('Catagories', `${b.categories}`)
          if(b.artists.length > 0) {
          info.addField('Artist', `${b.artists}`)
          }
          info.addField('Tags', `${b.tags[0]}, ${b.tags[1]}, ${b.tags[3]}, ${b.tags[4]}, ${b.tags[5]}...`)
          if(b.characters.length > 0) {
          info.addField('Characters', `${b.characters}`)
          }
          
          if(b.scanlator.length > 0) {
          info.addField('Scanlator', `${b.scanlator}`)
          }
          
          info.addField('Languages', `${b.languages}`)
          info.setAuthor(`${b.id}`)
          info.setFooter(`${b.pages.length} Pages | ${b.favorites} Favourited`)
          message.channel.send({embeds: [info]})
          console.error('hmm smt is off...')

      })
      process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
      });
  } else if(command === "fuck" || command === "rail" || command === "seggs") {
    const sussyface = new Discord.MessageEmbed()
    sussyface.setColor('#2ab8a0')
    sussyface.setImage(hface[Math.floor(Math.random() * 9)])
    sussyface.setTitle(`${message.author.username} X ${message.mentions.users.first().username}`)
    sussyface.setDescription(`W-whats this feeling!? Ah~ ♥️ ${message.author.username} what are you doing!??`)
    message.channel.send({embeds: [sussyface]})
    process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
    })
  }

  
}); 


const embed = new Discord.MessageEmbed()
embed.setColor('#2ab8a0')
embed.setDescription('nyaa~')

//login as bot
client.login(config.Bot_Token);