const db = require('quick.db');//krom code Krom#0516
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => {//krom code Krom#0516
  const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzczOTIzNTkyNDk0MzI1OTgiLCJib3QiOnRydWUsImlhdCI6MTY2Nzk5MDgwMH0.Sezi4wTpFeojS_StPFbNix1xo5ykBsvpf-C_IiBAQpM', client)
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  //krom code Krom#0516
  if (!args[0]) {//krom code Krom#0516
    
  const kinda = new Discord.MessageEmbed() //krom code Krom#0516
  
  .setDescription('Lütfen **aç** Veya **kapat** Yazın. Örnek Kullanım : **s!ever-here-engel aç/kapat**')//krom code Krom#0516
  .setColor("RED")//krom code Krom#0516

  return message.channel.send(kinda)//krom code Krom#0516
  }
  
  if (args[0] == 'aç') {//krom code Krom#0516
    
  db.set(`hereengel_${message.guild.id}`, 'acik')//krom code Krom#0516
    
  const kinda = new Discord.MessageEmbed() //krom code Krom#0516
  
  .setDescription('Ever-Here Engel Başarılı Bir Şekilde Aktif Edildi!')
  .setColor("GREEN")//krom code Krom#0516

  return message.channel.send(kinda)
  }

  if (args[0] == 'kapat') {
    //krom code Krom#0516
  db.set(`hereengel_${message.guild.id}`, 'kapali')//krom code Krom#0516
    //krom code Krom#0516
  const kinda = new Discord.MessageEmbed() //krom code Krom#0516
  
  .setDescription('Ever-Here Engel Başarılı Bir Şekilde Deaktif Edildi!')//krom code Krom#0516
  .setColor("GREEN")//krom code Krom#0516

  return message.channel.send(kinda)//krom code Krom#0516
  } 
  
 } else {
        message.channel.send(` Bu Komutu Sadece 12 Saatte Bir Oyvererek Kullanabilirsiniz Oyvermek İçin (https://top.gg/bot/1037392359249432598/vote) linke Tıklayarak Oyverebilirsiniz. Oy Verdiyseniz 5 Dakka Bekleyiniz`) 
             .then(Strom => Strom.delete({ timeout: 10000 })); 
}
        })
      
      },
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ever-here-engel','everhere-engel','ever-hereengel'],
  permLevel: 3
};

exports.help = {
  name: 'everhereengel',
  description: 'ever-here engel sistemi',
  usage: 'everhereengel'
};