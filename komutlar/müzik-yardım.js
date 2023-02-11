const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 's!'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('RANDOM')
.addField('Strom Bot | Müzik Komutları',`
**s!çal <şarkıismi>** : Belirttiğiniz Şarkıyı Sesli Odada Söyler
**s!duraklat** : Çalan Şarkıyı Durdurur
**s!devam** : Durdurduğunuz Şarkıyı Devam Ettirir
**s!tekrar** : Çalan Şarkıyı Tekrarlar
**s!geç** : Bi Sonraki Şarkıya Geçiş Yapar
**s!durdur** : Şarkıyı Durdurur 
**s!ses** : Ses Seviyesini Belirler`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
.setThumbnail("https://media.giphy.com/media/Z9WQLSrsQKH3uBbiXq/giphy.gif")
.setImage("https://media.giphy.com/media/l46CqqobS7VRaIpSE/giphy.gif")

 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["müzik-yardım"], 
  permLevel: 0
};
exports.help = {
  name: 'müzik-yardım'
};
  