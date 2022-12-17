

const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
    const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzczOTIzNTkyNDk0MzI1OTgiLCJib3QiOnRydWUsImlhdCI6MTY2Nzk5MDgwMH0.Sezi4wTpFeojS_StPFbNix1xo5ykBsvpf-C_IiBAQpM', client)
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.inlineReply(
      "❌ | Sen çekiliş yapamazsın. `Sunucuyu Yönet` yetkisine sahip değilsin!"
    );
  let id = args[0];
  if (!id)
    return message.inlineReply("❌ | Geçerli bir mesaj ID'si belirtmelisiniz!");
  let hasGiveaway =
    client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
    client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);
  if (!hasGiveaway) {
    return message.channel("`" + id + "` için bir hediye bulamıyorum.");
  }
  let time = args[1];
  if (!time)
    return message.inlineReply(
      '❌ | Lütfen geçerli bir zaman girin. Örneğin: "1s", "1m", "1d" vb.'
    );
  if (ms(time) > ms("10d")) {
    return message.inlineReply(
      "❌ | Hediye verme süresi 10 günden az olmalıdır."
    );
  }
  let winners = args[2];
  if (!winners)
    return message.inlineReply(
      '❌ | Lütfen geçerli kazanan sayısı sağlayın. Örneğin: "1k", "2k"'
    );
  num(winners, 1);
  if (winners > 15)
    return message.inlineReply("❌ | Hediye kazananlar 15'ten az olmalıdır.");
  let prize = args.slice(3).join(" ");
  if (!prize)
    return message.inlineReply(
      "❌ | Lütfen hediye için ödülü sağlayın. Örneğin: `g.çekiliş 1d 2k Discord Nitro`."
    );

  client.giveawaysManager
    .edit(hasGiveaway.messageID, {
      addTime: ms(time),
      newWinnerCount: parseInt(winners),
      newPrize: prize
    })
    .then(() => {
      if (message.deletable) message.delete();
      return;
    })
    .catch(err => {
      message.channel.send("" + id + " çekiliş bulunamadı!");
    });
} else {
        message.channel.send(` Bu Komutu Sadece 12 Saatte Bir Oyvererek Kullanabilirsiniz Oyvermek İçin (https://top.gg/bot/1037392359249432598/vote) linke Tıklayarak Oyverebilirsiniz. Oy Verdiyseniz 5 Dakka Bekleyiniz`) 
            .then(Strom => Strom.delete({ timeout: 10000 }));  
}
        })
      
      },
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "ayarla"
};
