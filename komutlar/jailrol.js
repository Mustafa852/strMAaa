const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
const profil = JSON.parse(fs.readFileSync("./jailsistemi.json", "utf8"));


module.exports.config = { 
    name: 'jail-rol',
    aliases: ['j-rol','jail-role']
}

module.exports.maho = async(client, message, args, config) => {
let mahorol = message.mentions.roles.first()  

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanabilmek için yetkiniz yok **`);
const maho1 = new Discord.MessageEmbed().setColor("ff0000");

 
 if(!mahorol) return message.channel.send(maho1.setDescription(`:exclamation: Lütfen Bir Rol Belirt`))
 
 if(!mahorol) return message.channel.send(maho1.setDescription(`:exclamation: Lütfen Bir Rol Belirt`))
 
 if(mahorol) {
    if(!profil[message.guild.id]) {
      profil[message.guild.id] = {
        jailedrol: mahorol,
      }
    }
    if(profil[message.guild.id]) {
      profil[message.guild.id].jailedrol = mahorol;
    }
    fs.writeFile("./jailsistemi.json", JSON.stringify(profil), (err) => {
        if(err) message.channel.send("Hata: " + err)
    })

message.channel.send(new MessageEmbed()
.setFooter("Strom")
.setColor("#006bff")
.setDescription(`
 <:barrl:879417882528849920> Jail Cezalı **${mahorol}** Rolü Olarak Ayarlandı
`))

db.set(`jailrol.${message.guild.id}`, mahorol.id)  

 }
};