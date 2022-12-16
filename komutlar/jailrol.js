const Discord = require('discord.js')
const db = require("quick.db");
const database = require('quick.db');


exports.run = async(client, message, args) => {
const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzczOTIzNTkyNDk0MzI1OTgiLCJib3QiOnRydWUsImlhdCI6MTY2Nzk5MDgwMH0.Sezi4wTpFeojS_StPFbNix1xo5ykBsvpf-C_IiBAQpM', client)
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {  
var başarılı = ['**İŞTE BU!** <a:tik1:823900091143159828>', '**SÜPER!** <a:tik1:823900091143159828>', '**NASIL YAPTIN BUNU?!** <a:tik1:823900091143159828>', '**MÜKEMMEL!** <a:tik1:823900091143159828>', '**SEVDİM BUNU!** <a:tik1:823900091143159828>', '**ŞİMDİ OLDU!** <a:tik1:823900091143159828>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <a:alarm3:823900153831620658>', '**OLMADI BU!** <a:alarm3:823900153831620658>', '**HAY AKSİ!** <a:alarm3:823900153831620658>', '**HADİ ORADAN!** <a:alarm3:823900153831620658>', '**OLMADI YA!** <a:alarm3:823900153831620658>', '**BÖYLE OLMAZ?!** <a:alarm3:823900153831620658>', '**HADİ YA!** <a:alarm3:823900153831620658>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**s!jail-rol ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, s!jail-rol ayarla/sıfırla @rol yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let rol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!rol) return message.channel.send(x2 + ` Bir rol etiketle.`)
  
  db.set(`jailrol_${message.guild.id}`, rol.id)
  message.channel.send(x + ` Jail rolü ${rol} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailrol_${message.guild.id}`)
    message.channel.send(x + ` Jail rolü başarıyla sıfırlandı.`)
  }
  
  
} else {
        message.channel.send(` Bu Komutu Sadece 12 Saatte Bir Oyvererek Kullanabilirsiniz Oyvermek İçin (https://top.gg/bot/1037392359249432598/vote) linke Tıklayarak Oyverebilirsiniz. Oy Verdiyseniz 5 Dakka Bekleyiniz`) 
              .then(Strom => Strom.delete({ timeout: 10000 }));
}
        })
      
      },
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailrol'],
 permLevel: 0
};

exports.help = {
 name: 'jail-rol',
 description: 'Birisi jaile atılınca hangi role sahip olacağını ayarlarsınız.',
 usage: 'jail-rol ayarla/sıfırla @rol'
};