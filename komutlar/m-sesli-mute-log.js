const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
const profil = JSON.parse(fs.readFileSync("./mutesistemleri.json", "utf8"));

module.exports.config = { 
    name: 'ses-mute-log',
    aliases: ['s-m-log','sesmutelog-ayarla']
}

module.exports.maho = async(client, message, args, config) => {
let wellcome = message.mentions.channels.first() 

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanamazsınız Yetkiniz yok**`).then(m => m.delete({timeout: 5000}));
 
const maho = new Discord.MessageEmbed().setColor("ff0000");
 if(!wellcome) return message.channel.send(maho.setDescription(`:exclamation: Lütfen Bir Kanal Belirtiniz`)).then(m => m.delete({timeout: 5000}));
 
 if(wellcome) {
    if(!profil[message.guild.id]) {
      profil[message.guild.id] = {
        mutelog: wellcome 
      }
    }
    if(profil[message.guild.id]) {
      profil[message.guild.id].mutelog = wellcome.id;
    }
    fs.writeFile("./mutesistemleri.json", JSON.stringify(profil), (err) => {
        if(err) message.channel.send("Hata: " + err)
    })
  message.channel.send(new MessageEmbed()
  .setFooter("Strom")
  .setColor("#006bff")
  .setDescription(`
  <:barrl:879417882528849920> mutelog  ${wellcome} kanalına ayarlandı
  `)).then(m => m.delete({timeout: 5000}));

  db.set(`sesmute.log.${message.guild.id}`, wellcome.id)  

}
};