const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {
  const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzczOTIzNTkyNDk0MzI1OTgiLCJib3QiOnRydWUsImlhdCI6MTY2Nzk5MDgwMH0.Sezi4wTpFeojS_StPFbNix1xo5ykBsvpf-C_IiBAQpM', client)
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
let cse = new Discord.MessageEmbed()//discord.gg/turkiye
.setTitle(client.user.username+" Yardım Menüsü")
.setColor("BLUE")
.setThumbnail(client.user.avatarURL())
.setDescription(`[OYVER](https://top.gg/bot/756883309270663229/vote)
**Strom Müzik botunu eklemek için [TIKLA](https://discord.com/api/oauth2/authorize?client_id=854122011151826975&permissions=8&scope=bot%20applications.commands)



**s!başlat** : Çekiliş Başlatırsınız..

**s!bitir** : Çekilişi Bitirirsiniz.

**s!edit** : Çekilişi Düzenlersiniz.

**s!reroll** : Çekilişteki Kazananları Tekrar Çekersiniz.

**s!sil** : Çekilişi Silersiniz.

`)
.setFooter("Strom / Discord'da Yeni Devrim \nherhangi bir hatada s!hata (hata)\nönerileriniz için s!öneri (öneriniz)")
.setTimestamp()
message.channel.send(cse)
} else {
        message.channel.send(` Bu Komutu Sadece 12 Saatte Bir Oyvererek Kullanabilirsiniz Oyvermek İçin (https://top.gg/bot/1037392359249432598/vote) linke Tıklayarak Oyverebilirsiniz. Oy Verdiyseniz 5 Dakka Bekleyiniz`) 
            .then(Strom => Strom.delete({ timeout: 10000 }));  
}
        })
      
      },
module.exports.conf = {
aliases: ["çekiliş-sistemi","çekiliş-yardım"]
}

module.exports.help = {
name: "yardım-çekiliş",
usage: "!yardım-çekiliş"

};