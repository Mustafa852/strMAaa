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
    return message.channel("`" + id + "` için bir hediye bulamıyorum ");
  }
  client.giveawaysManager
    .edit(hasGiveaway.messageID, {
      setEndTimestamp: Date.now()
    })
    .then(() => {})
    .catch(e => {
      message.channel.send(
        "Sanırım yanlış bir şeyler oldu: ```js\n" + e.message + "```"
      );
    });
  if (message.deletable) message.delete();
  return;
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
  name: "bitir"
};
